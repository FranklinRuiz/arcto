import { useState } from 'react';
import { Pause, Play, Plus, Redo2, SkipBack, SkipForward, Square, Trash2, Undo2, Video, X } from 'lucide-react';
import type { useDiagramBuilder } from '../hooks/useDiagramBuilder';
import type { DiagramNode } from '../types/diagram.types';

type DiagramBuilderState = ReturnType<typeof useDiagramBuilder>;

interface ScenePanelProps {
  isOpen: boolean;
  onClose: () => void;
  builder: DiagramBuilderState;
}

function labelForNode(node: DiagramNode | undefined): string {
  if (!node) return '(nodo eliminado)';
  const data = node.data as Record<string, unknown>;
  if (typeof data.label === 'string' && data.label) return data.label;
  if (typeof data.text === 'string' && data.text) return data.text;
  return node.id;
}

export function ScenePanel({ isOpen, onClose, builder }: ScenePanelProps) {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState('');
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);

  const nodeById = (id: string) => builder.nodes.find((n) => n.id === id);

  const startRename = (id: string, currentName: string) => {
    setRenamingId(id);
    setNameDraft(currentName);
  };

  const commitRename = (id: string) => {
    builder.renameScene(id, nameDraft);
    setRenamingId(null);
  };

  return (
    <div className={`library-panel scene-panel${isOpen ? '' : ' library-panel--collapsed'}`}>
      <div className="library-header">
        <span className="library-header__title">Escenas</span>
        <button type="button" className="library-header__close" onClick={onClose} aria-label="Cerrar">
          <X size={12} strokeWidth={1.8} />
        </button>
      </div>

      <div className="library-body scene-body">
        <button type="button" className="scene-new-btn" onClick={() => builder.createScene()}>
          <Plus size={14} strokeWidth={2.2} />
          <span>Nueva escena</span>
        </button>

        {builder.scenes.length === 0 && (
          <div className="library-empty">
            Crea una escena y haz clic en los nodos, en orden, para animar una secuencia (por ejemplo: nodo 1 → nodo 2 → nodo 7).
          </div>
        )}

        {builder.scenes.map((scene) => {
          const isRecording = builder.recordingSceneId === scene.id;
          const isPlaying = builder.playingSceneId === scene.id;
          const canPlay = scene.steps.length >= 2;

          return (
            <div key={scene.id} className={`scene-row${isRecording ? ' scene-row--recording' : ''}${isPlaying ? ' scene-row--playing' : ''}`}>
              <div className="scene-row__header">
                {renamingId === scene.id ? (
                  <input
                    className="scene-row__name-input"
                    value={nameDraft}
                    autoFocus
                    maxLength={40}
                    onChange={(e) => setNameDraft(e.target.value)}
                    onBlur={() => commitRename(scene.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename(scene.id);
                      if (e.key === 'Escape') setRenamingId(null);
                    }}
                  />
                ) : (
                  <button type="button" className="scene-row__name" onClick={() => startRename(scene.id, scene.name)} title="Renombrar">
                    {scene.name}
                  </button>
                )}
                <span className="scene-row__count">{scene.steps.length} {scene.steps.length === 1 ? 'paso' : 'pasos'}</span>
              </div>

              {scene.steps.length > 0 && (
                <div className="scene-steps">
                  {scene.steps.map((nodeId, i) => (
                    <span key={`${nodeId}-${i}`} className={`scene-step-chip${isPlaying && i === builder.scenePlaybackIndex ? ' scene-step-chip--current' : ''}`}>
                      {i > 0 && (
                        <span
                          className={`scene-step-chip__arrow${builder.edges.some((e) => e.source === scene.steps[i - 1] && e.target === nodeId) ? '' : ' scene-step-chip__arrow--jump'}`}
                          title={builder.edges.some((e) => e.source === scene.steps[i - 1] && e.target === nodeId) ? undefined : 'Salto a una rama anterior (sin animar la conexión)'}
                        >
                          {builder.edges.some((e) => e.source === scene.steps[i - 1] && e.target === nodeId) ? '→' : '↩'}
                        </span>
                      )}
                      {labelForNode(nodeById(nodeId))}
                    </span>
                  ))}
                </div>
              )}

              <div className="scene-row__actions">
                {isRecording ? (
                  <>
                    <button type="button" className="scene-action-btn" onClick={() => builder.undoLastSceneStep(scene.id)} disabled={scene.steps.length === 0} title="Deshacer último paso">
                      <Undo2 size={13} />
                    </button>
                    <button type="button" className="scene-action-btn scene-action-btn--primary" onClick={builder.stopRecordingScene} title="Detener grabación">
                      <Square size={13} />
                      <span>Detener</span>
                    </button>
                  </>
                ) : isPlaying ? (
                  <>
                    <button type="button" className="scene-action-btn" onClick={builder.stepSceneBackward} disabled={builder.scenePlaybackIndex === 0} title="Paso anterior">
                      <SkipBack size={13} />
                    </button>
                    {builder.isScenePlaying ? (
                      <button type="button" className="scene-action-btn" onClick={builder.pauseScenePlayback} title="Pausar">
                        <Pause size={13} />
                      </button>
                    ) : (
                      <button type="button" className="scene-action-btn" onClick={builder.resumeScenePlayback} title="Reanudar">
                        <Play size={13} />
                      </button>
                    )}
                    <button
                      type="button"
                      className="scene-action-btn"
                      onClick={builder.stepSceneForward}
                      disabled={builder.scenePlaybackIndex >= scene.steps.length - 1}
                      title="Paso siguiente"
                    >
                      <SkipForward size={13} />
                    </button>
                    <button type="button" className="scene-action-btn" onClick={builder.stopScenePlayback} title="Detener reproducción">
                      <Square size={13} />
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="scene-action-btn scene-action-btn--primary" onClick={() => builder.playScene(scene.id)} disabled={!canPlay} title={canPlay ? 'Reproducir' : 'Agrega al menos 2 pasos'}>
                      <Play size={13} />
                      <span>Reproducir</span>
                    </button>
                    <button type="button" className="scene-action-btn" onClick={() => builder.startRecordingScene(scene.id)} title={scene.steps.length ? 'Continuar grabando' : 'Grabar'}>
                      {scene.steps.length ? <Redo2 size={13} /> : <Video size={13} />}
                    </button>
                    {confirmingDeleteId === scene.id ? (
                      <button
                        type="button"
                        className="scene-action-btn scene-action-btn--danger"
                        onClick={() => { builder.deleteScene(scene.id); setConfirmingDeleteId(null); }}
                        title="Confirmar eliminación"
                      >
                        <Trash2 size={13} />
                        <span>¿Seguro?</span>
                      </button>
                    ) : (
                      <button type="button" className="scene-action-btn" onClick={() => setConfirmingDeleteId(scene.id)} title="Eliminar escena">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </>
                )}
              </div>

              {isPlaying && (
                <div className="scene-playback-controls">
                  <label className="scene-loop-toggle">
                    <input type="checkbox" checked={builder.sceneLoop} onChange={(e) => builder.setSceneLoop(e.target.checked)} />
                    Repetir
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
