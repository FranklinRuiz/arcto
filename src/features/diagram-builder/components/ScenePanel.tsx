import { useState } from 'react';
import { ArrowRight, CornerUpLeft, Pause, Play, Plus, Redo2, Repeat, SkipBack, SkipForward, Square, Trash2, Undo2, Video, X } from 'lucide-react';
import type { useDiagramBuilder } from '../hooks/useDiagramBuilder';
import type { DiagramNode } from '../types/diagram.types';

type DiagramBuilderState = ReturnType<typeof useDiagramBuilder>;

interface ScenePanelProps {
  builder: DiagramBuilderState;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

function labelForNode(node: DiagramNode | undefined): string {
  if (!node) return '(nodo eliminado)';
  const data = node.data as Record<string, unknown>;
  if (typeof data.label === 'string' && data.label) return data.label;
  if (typeof data.text === 'string' && data.text) return data.text;
  return node.id;
}

export function ScenePanel({ builder, collapsed, onToggleCollapsed }: ScenePanelProps) {
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

  if (builder.presentationMode) return null;

  return (
    <div className={`scene-dock${collapsed ? ' scene-dock--hidden' : ''}`}>
      <div className="scene-dock__header">
        <span className="library-header__title">Escenas</span>
        <div className="scene-dock__header-actions">
          <button type="button" className="scene-new-btn scene-new-btn--compact" onClick={() => builder.createScene()}>
            <Plus size={13} strokeWidth={2.2} />
            <span>Nueva escena</span>
          </button>
          <button type="button" className="scene-dock__close" onClick={onToggleCollapsed} aria-label="Ocultar escenas" title="Ocultar escenas">
            <X size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="scene-dock__body">
        {builder.scenes.length === 0 && (
          <div className="library-empty scene-dock__empty">
            Crea una escena y haz clic en los nodos, en orden, para animar una secuencia (por ejemplo: nodo 1 → nodo 2 → nodo 7).
          </div>
        )}

        {builder.scenes.map((scene) => {
          const isRecording = builder.recordingSceneId === scene.id;
          const isPlaying = builder.playingSceneId === scene.id;
          const canPlay = scene.steps.length >= 2;

          return (
            <div key={scene.id} className={`scene-row${isRecording ? ' scene-row--recording' : ''}${isPlaying ? ' scene-row--playing' : ''}`}>
              {isRecording ? (
                <button type="button" className="scene-row__primary-btn scene-row__primary-btn--recording" onClick={builder.stopRecordingScene} title="Detener grabación">
                  <Square size={16} />
                </button>
              ) : isPlaying ? (
                builder.isScenePlaying ? (
                  <button type="button" className="scene-row__primary-btn scene-row__primary-btn--playing" onClick={builder.pauseScenePlayback} title="Pausar">
                    <Pause size={16} />
                  </button>
                ) : (
                  <button type="button" className="scene-row__primary-btn scene-row__primary-btn--playing" onClick={builder.resumeScenePlayback} title="Reanudar">
                    <Play size={16} />
                  </button>
                )
              ) : (
                <button type="button" className="scene-row__primary-btn" onClick={() => builder.playScene(scene.id)} disabled={!canPlay} title={canPlay ? 'Reproducir' : 'Agrega al menos 2 pasos'}>
                  <Play size={16} />
                </button>
              )}

              <div className="scene-row__content">
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

                  <div className="scene-row__actions">
                    {isRecording ? (
                      <button type="button" className="scene-icon-btn" onClick={() => builder.undoLastSceneStep(scene.id)} disabled={scene.steps.length === 0} title="Deshacer último paso">
                        <Undo2 size={14} />
                      </button>
                    ) : isPlaying ? (
                      <>
                        <button type="button" className="scene-icon-btn" onClick={builder.stepSceneBackward} disabled={builder.scenePlaybackIndex === 0} title="Paso anterior">
                          <SkipBack size={14} />
                        </button>
                        <button
                          type="button"
                          className="scene-icon-btn"
                          onClick={builder.stepSceneForward}
                          disabled={builder.scenePlaybackIndex >= scene.steps.length - 1}
                          title="Paso siguiente"
                        >
                          <SkipForward size={14} />
                        </button>
                        <button
                          type="button"
                          className={`scene-icon-btn${builder.sceneLoop ? ' scene-icon-btn--active' : ''}`}
                          onClick={() => builder.setSceneLoop(!builder.sceneLoop)}
                          title={builder.sceneLoop ? 'Desactivar repetición' : 'Repetir'}
                        >
                          <Repeat size={14} />
                        </button>
                        <button type="button" className="scene-icon-btn scene-icon-btn--danger" onClick={builder.stopScenePlayback} title="Detener reproducción">
                          <Square size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="scene-icon-btn" onClick={() => builder.startRecordingScene(scene.id)} title={scene.steps.length ? 'Continuar grabando' : 'Grabar'}>
                          {scene.steps.length ? <Redo2 size={14} /> : <Video size={14} />}
                        </button>
                        {confirmingDeleteId === scene.id ? (
                          <button
                            type="button"
                            className="scene-icon-btn scene-icon-btn--danger"
                            onClick={() => { builder.deleteScene(scene.id); setConfirmingDeleteId(null); }}
                            title="Confirmar eliminación"
                          >
                            <Trash2 size={14} />
                          </button>
                        ) : (
                          <button type="button" className="scene-icon-btn" onClick={() => setConfirmingDeleteId(scene.id)} title="Eliminar escena">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {scene.steps.length > 0 && (
                  <div className="scene-steps">
                    {scene.steps.map((nodeId, i) => {
                      const isConnected = i > 0 && builder.edges.some((e) => e.source === scene.steps[i - 1] && e.target === nodeId);
                      return (
                        <span key={`${nodeId}-${i}`} className={`scene-step-chip${isPlaying && i === builder.scenePlaybackIndex ? ' scene-step-chip--current' : ''}`}>
                          {i > 0 && (
                            <span
                              className={`scene-step-chip__arrow${isConnected ? '' : ' scene-step-chip__arrow--jump'}`}
                              title={isConnected ? undefined : 'Salto a una rama anterior (sin animar la conexión)'}
                            >
                              {isConnected ? <ArrowRight size={11} strokeWidth={2.2} /> : <CornerUpLeft size={11} strokeWidth={2.2} />}
                            </span>
                          )}
                          {labelForNode(nodeById(nodeId))}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
