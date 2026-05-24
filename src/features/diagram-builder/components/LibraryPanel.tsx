import { useState, type DragEvent } from 'react';
import { PALETTE, PALETTE_GROUPS, getKindStyle } from '../constants/diagram.constants';
import { NODE_KINDS, type PaletteItem } from '../types/diagram.types';
import { iconMap, ServerIcon, TypeIcon } from './icons/DiagramIcons';

interface LibraryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDragStart: (event: DragEvent<HTMLButtonElement>, item: PaletteItem) => void;
  onClickItem: (payload: PaletteItem | { __isGroup: boolean } | { __isText: boolean } | { __isCircleGroup: boolean } | { __isLabel: boolean }) => void;
}

type FilterKey = 'all' | 'ai' | 'services' | 'data';
type CSSVarProps = React.CSSProperties & { '--hover-border'?: string };

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Todo' },
  { key: 'ai', label: 'IA' },
  { key: 'services', label: 'Servicios' },
  { key: 'data', label: 'Datos' },
];

function groupMatchesFilter(groupLabel: string, filter: FilterKey): boolean {
  if (filter === 'all') return true;
  if (filter === 'ai') return groupLabel === 'Inteligencia Artificial';
  if (filter === 'services') return groupLabel === 'Servicios';
  if (filter === 'data') return groupLabel === 'Datos';
  return false;
}


function DragHandle() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" aria-hidden="true">
      <circle cx="2" cy="2" r="1.1" /><circle cx="6" cy="2" r="1.1" />
      <circle cx="2" cy="6" r="1.1" /><circle cx="6" cy="6" r="1.1" />
      <circle cx="2" cy="10" r="1.1" /><circle cx="6" cy="10" r="1.1" />
    </svg>
  );
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
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const q = search.trim().toLowerCase();

  const HeroIcon = iconMap[heroItem.type] ?? ServerIcon;

  const showHero  = !q || 'componente'.includes(q) || 'elemento libre'.includes(q);
  const showGroup = !q || 'contenedor'.includes(q) || 'zona'.includes(q) || 'dominio'.includes(q) || 'circular'.includes(q) || 'clúster'.includes(q) || 'cluster'.includes(q);
  const showText  = !q || 'texto'.includes(q) || 'anotación'.includes(q) || 'texto libre'.includes(q);
  const showLabel = !q || 'etiqueta'.includes(q) || 'caja'.includes(q) || 'label'.includes(q);

  const filteredGroups = PALETTE_GROUPS
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !q || item.label.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q),
      ),
    }))
    .filter((group) => group.items.length > 0 && groupMatchesFilter(group.label, activeFilter));

  const showUtilSections = q || activeFilter === 'all';
  const hasResults = (showUtilSections && (showHero || showGroup || showText || showLabel)) || filteredGroups.length > 0;

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

      <div className="library-filters">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`library-filter-pill${activeFilter === key ? ' library-filter-pill--active' : ''}`}
            onClick={() => setActiveFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="library-body">
        {!hasResults && (
          <div className="library-empty">Sin resultados para "{search}"</div>
        )}

        {showUtilSections && showHero && (
          <div className="library-section">
            <div className="library-section__title">
              Elementos <span className="library-section__count">1</span>
            </div>
            <div className="library-grid">
              {(() => {
                const heroStyle = getKindStyle(heroItem.type);
                return (
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => onDragStart(e, heroItem)}
                  onClick={() => onClickItem(heroItem)}
                  className="library-item"
                  style={{ '--hover-border': heroStyle.border } as CSSVarProps}
                >
                  <div className="library-item__icon" style={{ background: heroStyle.bg, color: heroStyle.color }}>
                    <HeroIcon size="100%" />
                  </div>
                  <div className="library-item__info">
                    <div className="library-item__label">Componente</div>
                    <div className="library-item__subtitle">Elemento libre</div>
                  </div>
                  <div className="library-item__drag"><DragHandle /></div>
                </button>
                );
              })()}
            </div>
          </div>
        )}

        {showUtilSections && showGroup && (
          <div className="library-section">
            <div className="library-section__title">
              Contenedores <span className="library-section__count">2</span>
            </div>
            <div className="library-grid">
              <button
                type="button"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isGroup: true }));
                  e.dataTransfer.effectAllowed = 'move';
                  dragGhost('Contenedor', e);
                }}
                onClick={() => onClickItem({ __isGroup: true })}
                className="library-item"
              >
                <div className="library-item__icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" strokeDasharray="4 2" />
                    <path d="M3 8h18" />
                  </svg>
                </div>
                <div className="library-item__info">
                  <div className="library-item__label">Zona / Dominio</div>
                  <div className="library-item__subtitle">Delimita un área o contexto</div>
                </div>
                <div className="library-item__drag"><DragHandle /></div>
              </button>
              <button
                type="button"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isCircleGroup: true }));
                  e.dataTransfer.effectAllowed = 'move';
                  dragGhost('Clúster', e);
                }}
                onClick={() => onClickItem({ __isCircleGroup: true })}
                className="library-item"
              >
                <div className="library-item__icon" style={{ background: '#f0fdfa', color: '#0d9488' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
                  </svg>
                </div>
                <div className="library-item__info">
                  <div className="library-item__label">Clúster</div>
                  <div className="library-item__subtitle">Agrupación visual libre</div>
                </div>
                <div className="library-item__drag"><DragHandle /></div>
              </button>
            </div>
          </div>
        )}

        {showUtilSections && (showText || showLabel) && (
          <div className="library-section">
            <div className="library-section__title">
              Anotaciones <span className="library-section__count">{[showText, showLabel].filter(Boolean).length}</span>
            </div>
            <div className="library-grid">
              {showText && (
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isText: true }));
                    e.dataTransfer.effectAllowed = 'move';
                    dragGhost('Texto', e);
                  }}
                  onClick={() => onClickItem({ __isText: true })}
                  className="library-item"
                >
                  <div className="library-item__icon" style={{ background: '#f8fafc', color: '#64748b' }}>
                    <TypeIcon size="100%" />
                  </div>
                  <div className="library-item__info">
                    <div className="library-item__label">Texto libre</div>
                    <div className="library-item__subtitle">Anotación</div>
                  </div>
                  <div className="library-item__drag"><DragHandle /></div>
                </button>
              )}
              {showLabel && (
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/reactflow', JSON.stringify({ __isLabel: true }));
                    e.dataTransfer.effectAllowed = 'move';
                    dragGhost('Etiqueta', e);
                  }}
                  onClick={() => onClickItem({ __isLabel: true })}
                  className="library-item"
                >
                  <div className="library-item__icon" style={{ background: '#fff7ed', color: '#ea580c' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="7" width="18" height="10" rx="3" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <div className="library-item__info">
                    <div className="library-item__label">Etiqueta</div>
                    <div className="library-item__subtitle">Texto destacado</div>
                  </div>
                  <div className="library-item__drag"><DragHandle /></div>
                </button>
              )}
            </div>
          </div>
        )}

        {filteredGroups.map((group) => (
          <div key={group.label} className="library-section">
            <div className="library-section__title">
              {group.label} <span className="library-section__count">{group.items.length}</span>
            </div>
            <div className="library-grid">
              {group.items.map((item) => {
                const Icon = iconMap[item.type] ?? ServerIcon;
                const itemStyle = getKindStyle(item.type);
                return (
                  <button
                    key={`lib-${item.type}`}
                    type="button"
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                    onClick={() => onClickItem(item)}
                    className="library-item"
                    title={item.description}
                    style={{ '--hover-border': itemStyle.border } as CSSVarProps}
                  >
                    <div className="library-item__icon" style={{ background: itemStyle.bg, color: itemStyle.color }}>
                      <Icon size="100%" />
                    </div>
                    <div className="library-item__info">
                      <div className="library-item__label">{item.label}</div>
                      <div className="library-item__subtitle">{item.subtitle}</div>
                    </div>
                    <div className="library-item__drag"><DragHandle /></div>
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
