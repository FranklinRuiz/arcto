import { useState, type DragEvent } from 'react';
import { KIND_ICON_COLORS, PALETTE, PALETTE_GROUPS } from '../constants/diagram.constants';
import { NODE_KINDS, type PaletteItem } from '../types/diagram.types';
import { iconMap, ServerIcon, TypeIcon } from './icons/DiagramIcons';

interface LibraryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
  onClickItem: (payload: PaletteItem | { __isGroup: boolean } | { __isText: boolean }) => void;
}

const heroItem = PALETTE.find((p) => p.type === NODE_KINDS.DEFAULT)!;

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

export function LibraryPanel({ isOpen, onClose, onDragStart, onClickItem }: LibraryPanelProps) {
  const [search, setSearch] = useState('');
  const q = search.trim().toLowerCase();

  const HeroIcon = iconMap[heroItem.type] ?? ServerIcon;

  const showHero = !q || 'componente'.includes(q) || 'elemento libre'.includes(q);
  const showGroup = !q || 'contenedor'.includes(q) || 'agrupa elementos'.includes(q);
  const showText = !q || 'texto'.includes(q) || 'anotación'.includes(q) || 'texto libre'.includes(q);

  const filteredGroups = PALETTE_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => !q || item.label.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q),
    ),
  })).filter((group) => group.items.length > 0);

  const hasResults = showHero || showGroup || showText || filteredGroups.length > 0;

  return (
    <div className={`library-panel${isOpen ? '' : ' library-panel--collapsed'}`}>
      <div className="library-header">
        <span className="library-header__title">Elementos</span>
        <button type="button" className="library-header__close" onClick={onClose} aria-label="Cerrar">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="library-search">
        <div className="library-search__wrap">
          <span className="library-search__icon">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            className="library-search__input"
            placeholder="Buscar elementos…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="library-body">
        {!hasResults && (
          <div className="library-empty">Sin resultados para "{search}"</div>
        )}

        {showHero && (
          <div className="library-section">
            <div className="library-section__title">Elementos</div>
            <button
              type="button"
              draggable
              onDragStart={(e) => onDragStart(e, heroItem)}
              onClick={() => onClickItem(heroItem)}
              className="library-basic-item"
            >
              <div className="library-basic-item__icon" style={KIND_ICON_COLORS[heroItem.type]}>
                <HeroIcon size="100%" />
              </div>
              <div className="library-basic-item__text">
                <div className="library-basic-item__label">Componente</div>
                <div className="library-basic-item__sub" style={{ color: '#0369a1' }}>Elemento libre</div>
              </div>
            </button>
          </div>
        )}

        {showGroup && (
          <div className="library-section">
            <div className="library-section__title">Contenedores</div>
            <button
              type="button"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isGroup: true }));
                e.dataTransfer.effectAllowed = 'move';
                dragGhost('Contenedor', e);
              }}
              onClick={() => onClickItem({ __isGroup: true })}
              className="library-basic-item"
            >
              <div className="library-basic-item__icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" strokeDasharray="4 2" />
                  <path d="M3 8h18" />
                </svg>
              </div>
              <div className="library-basic-item__text">
                <div className="library-basic-item__label">Contenedor</div>
                <div className="library-basic-item__sub" style={{ color: '#16a34a' }}>Agrupa elementos</div>
              </div>
            </button>
          </div>
        )}

        {showText && (
          <div className="library-section">
            <div className="library-section__title">Anotaciones</div>
            <button
              type="button"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isText: true }));
                e.dataTransfer.effectAllowed = 'move';
                dragGhost('Texto', e);
              }}
              onClick={() => onClickItem({ __isText: true })}
              className="library-basic-item"
            >
              <div className="library-basic-item__icon" style={{ background: '#f8fafc', color: '#64748b' }}>
                <TypeIcon size="100%" />
              </div>
              <div className="library-basic-item__text">
                <div className="library-basic-item__label">Texto</div>
                <div className="library-basic-item__sub">Texto libre con formato</div>
              </div>
            </button>
          </div>
        )}

        {filteredGroups.map((group) => (
          <div key={group.label} className="library-section">
            <div className="library-section__title">{group.label}</div>
            <div className="library-grid">
              {group.items.map((item) => {
                const Icon = iconMap[item.type] ?? ServerIcon;
                return (
                  <button
                    key={`lib-${item.type}`}
                    type="button"
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                    onClick={() => onClickItem(item)}
                    className="library-item"
                    title={item.subtitle}
                  >
                    <div className="library-item__icon" style={KIND_ICON_COLORS[item.type]}>
                      <Icon size="100%" />
                    </div>
                    <div className="library-item__label">{item.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
