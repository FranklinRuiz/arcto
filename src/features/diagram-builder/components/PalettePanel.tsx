import type { DragEvent } from 'react';
import { KIND_ICON_COLORS, PALETTE, PALETTE_GROUPS } from '../constants/diagram.constants';
import { NODE_KINDS, type PaletteItem, type SoftwareEdge, type SoftwareNode, type TextNodeData } from '../types/diagram.types';
import { iconMap, ServerIcon, TypeIcon } from './icons/DiagramIcons';

interface PalettePanelProps {
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
  selectedNode: SoftwareNode | null;
  updateTextNodeData: (nodeId: string, patch: Partial<TextNodeData>) => void;
  selectedEdge: SoftwareEdge | null;
  toggleEdgeAsync: (edgeId: string) => void;
}

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48];
const TEXT_COLORS = [
  { value: '#0f172a', label: 'Negro' },
  { value: '#334155', label: 'Gris oscuro' },
  { value: '#64748b', label: 'Gris' },
  { value: '#6366f1', label: 'Índigo' },
  { value: '#0ea5e9', label: 'Azul' },
  { value: '#16a34a', label: 'Verde' },
  { value: '#dc2626', label: 'Rojo' },
  { value: '#ea580c', label: 'Naranja' },
];

const heroItem = PALETTE.find((p) => p.type === NODE_KINDS.DEFAULT)!;

function SyncPreview() {
  return (
    <svg width="44" height="12" viewBox="0 0 44 12" fill="none">
      <line x1="0" y1="6" x2="36" y2="6" stroke="currentColor" strokeWidth="2" />
      <path d="M36 2 L44 6 L36 10 Z" fill="currentColor" />
    </svg>
  );
}

function AsyncPreview() {
  return (
    <svg width="44" height="12" viewBox="0 0 44 12" fill="none">
      <line x1="0" y1="6" x2="36" y2="6" stroke="currentColor" strokeWidth="2" strokeDasharray="5 3" />
      <path d="M36 2 L44 6 L36 10 Z" fill="currentColor" />
    </svg>
  );
}

function EdgePropertiesPanel({
  edge,
  onToggleAsync,
}: {
  edge: SoftwareEdge;
  onToggleAsync: () => void;
}) {
  const isAsync = Boolean(edge.data?.dashed) && (edge as { animated?: boolean }).animated;

  return (
    <div className="edge-props-panel">
      <div className="panel__title">Conexión seleccionada</div>
      <div className="edge-type-row">
        <button
          type="button"
          className={`edge-type-btn${!isAsync ? ' edge-type-btn--active' : ''}`}
          onClick={() => { if (isAsync) onToggleAsync(); }}
        >
          <SyncPreview />
          <span>Síncrona</span>
        </button>
        <button
          type="button"
          className={`edge-type-btn${isAsync ? ' edge-type-btn--active' : ''}`}
          onClick={() => { if (!isAsync) onToggleAsync(); }}
        >
          <AsyncPreview />
          <span>Asíncrona</span>
        </button>
      </div>
      <div className="edge-hint">Doble clic sobre la flecha para editar etiqueta</div>
    </div>
  );
}

interface TextEditPanelProps {
  data: TextNodeData;
  onUpdate: (patch: Partial<TextNodeData>) => void;
}

function TextEditPanel({ data, onUpdate }: TextEditPanelProps) {
  return (
    <div className="text-edit-panel">
      <div className="text-edit-panel__row">
        <div className="text-edit-panel__fmt">
          <button
            type="button"
            className={`text-edit-btn${data.bold ? ' text-edit-btn--active' : ''}`}
            onClick={() => onUpdate({ bold: !data.bold })}
            title="Negrita"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className={`text-edit-btn${data.italic ? ' text-edit-btn--active' : ''}`}
            onClick={() => onUpdate({ italic: !data.italic })}
            title="Cursiva"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className={`text-edit-btn${data.underline ? ' text-edit-btn--active' : ''}`}
            onClick={() => onUpdate({ underline: !data.underline })}
            title="Subrayado"
          >
            <span style={{ textDecoration: 'underline' }}>U</span>
          </button>
        </div>

        <div className="select-wrapper select-wrapper--sm">
          <select
            className="form-control form-control--select text-edit-panel__size"
            value={data.fontSize}
            onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
            title="Tamaño"
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-edit-panel__colors">
        {TEXT_COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            className={`text-edit-swatch${data.color === c.value ? ' text-edit-swatch--active' : ''}`}
            style={{ background: c.value }}
            onClick={() => onUpdate({ color: c.value })}
            title={c.label}
          />
        ))}
      </div>
    </div>
  );
}

function dragGhost(label: string, e: DragEvent<HTMLButtonElement>) {
  const ghost = document.createElement('div');
  ghost.style.cssText =
    'position:fixed;top:-200px;left:-200px;padding:6px 14px;background:#0f172a;color:white;' +
    'border-radius:10px;font:700 13px/1.4 Inter,sans-serif;white-space:nowrap;pointer-events:none;' +
    'box-shadow:0 8px 24px rgba(15,23,42,0.35);';
  ghost.textContent = label;
  document.body.appendChild(ghost);
  e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, 20);
  requestAnimationFrame(() => document.body.removeChild(ghost));
}

export function PalettePanel({ onDragStart, selectedNode, updateTextNodeData, selectedEdge, toggleEdgeAsync }: PalettePanelProps) {
  const HeroIcon = iconMap[heroItem.type] ?? ServerIcon;

  const isTextSelected = selectedNode !== null && (selectedNode.type as string) === 'textNode';
  const textData = isTextSelected ? (selectedNode!.data as unknown as TextNodeData) : null;

  return (
    <section className="palette-section">
      <div className="panel__title">Elementos</div>

      {selectedEdge && (
        <EdgePropertiesPanel
          edge={selectedEdge}
          onToggleAsync={() => toggleEdgeAsync(selectedEdge.id)}
        />
      )}

      <button
        type="button"
        draggable
        onDragStart={(e) => onDragStart(e, heroItem)}
        className="palette__hero"
      >
        <div className="palette__icon" style={KIND_ICON_COLORS[heroItem.type]}>
          <HeroIcon size="100%" />
        </div>
        <div className="palette__hero-text">
          <div className="palette__label">{heroItem.label}</div>
          <div className="palette__subtitle">{heroItem.subtitle}</div>
        </div>
      </button>

      <div className="palette__group">
        <div className="palette__group-label">Contenedores</div>
        <button
          type="button"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isGroup: true }));
            e.dataTransfer.effectAllowed = 'move';
            dragGhost('Contenedor', e);
          }}
          className="palette__hero palette__hero--group"
        >
          <div className="palette__icon palette__icon--group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" strokeDasharray="4 2" />
              <path d="M3 8h18" />
            </svg>
          </div>
          <div className="palette__hero-text">
            <div className="palette__label">Contenedor</div>
            <div className="palette__subtitle">Agrupa elementos</div>
          </div>
        </button>
      </div>

      <div className="palette__group">
        <div className="palette__group-label">Anotaciones</div>
        <button
          type="button"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isText: true }));
            e.dataTransfer.effectAllowed = 'move';
            dragGhost('Texto', e);
          }}
          className="palette__text-item"
        >
          <div className="palette__icon" style={{ background: '#f8fafc', color: '#64748b' }}>
            <TypeIcon size="100%" />
          </div>
          <div>
            <div className="palette__label">Texto</div>
            <div className="palette__subtitle">Texto libre con formato</div>
          </div>
        </button>

        {isTextSelected && textData && selectedNode && (
          <TextEditPanel
            data={textData}
            onUpdate={(patch) => updateTextNodeData(selectedNode!.id, patch)}
          />
        )}
      </div>

      <div className="palette__group">
        {PALETTE_GROUPS.map((group) => (
          <div key={group.label} className="palette__icon-subgroup">
            <div className="palette__group-label">{group.label}</div>
            <div className="palette__group-grid">
              {group.items.map((item) => {
                const Icon = iconMap[item.type] ?? ServerIcon;
                return (
                  <button
                    key={`card-${item.type}`}
                    type="button"
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                    className="palette__item"
                  >
                    <div className="palette__icon" style={KIND_ICON_COLORS[item.type]}>
                      <Icon size="100%" />
                    </div>
                    <div className="palette__label">{item.label}</div>
                    <div className="palette__subtitle">{item.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
