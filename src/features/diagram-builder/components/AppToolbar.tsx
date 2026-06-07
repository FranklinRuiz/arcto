import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import {
  AlertTriangle, BrushCleaning, CheckCheck, ChevronRight,
  Download, Layers, LayoutGrid, Loader2,
  MoreHorizontal, Trash2, Undo2, Upload,
} from 'lucide-react';
import type { AlignAxis } from '../types/diagram.types';
import type { SizeMode } from './DiagramCanvas';

const ALIGN_ACTIONS: { axis: AlignAxis; title: string; icon: React.ReactNode }[] = [
  {
    axis: 'center-h', title: 'Centrar horizontalmente',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <line x1="7.5" y1="1" x2="7.5" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="2" y="3" width="11" height="3" rx="1" fill="currentColor" />
        <rect x="4" y="9" width="7" height="3" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    axis: 'center-v', title: 'Centrar verticalmente',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <line x1="1" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="2" y="2" width="3" height="11" rx="1" fill="currentColor" />
        <rect x="9" y="4" width="3" height="7" rx="1" fill="currentColor" />
      </svg>
    ),
  },
];

const SIZE_MODES: { key: SizeMode; label: string; title: string }[] = [
  { key: 'compact',      label: 'S', title: 'Vista compacta' },
  { key: 'standard',     label: 'M', title: 'Vista estándar' },
  { key: 'presentation', label: 'L', title: 'Vista presentación' },
];

interface AppToolbarProps {
  isLibraryOpen: boolean;
  hasSelection: boolean;
  selectedNodesCount: number;
  canUndo: boolean;
  saveStatus: 'saved' | 'saving';
  diagramTitle: string;
  onTitleChange: (title: string) => void;
  onToggleLibrary: () => void;
  undo: () => void;
  deleteSelected: () => void;
  alignNodes: (axis: AlignAxis) => void;
  clearDiagram: () => void;
  exportJson: (title?: string) => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
  sizeMode: SizeMode;
  onSizeModeChange: (mode: SizeMode) => void;
}

export function AppToolbar({
  isLibraryOpen,
  hasSelection,
  selectedNodesCount,
  canUndo,
  saveStatus,
  diagramTitle,
  onTitleChange,
  onToggleLibrary,
  undo,
  deleteSelected,
  alignNodes,
  clearDiagram,
  exportJson,
  importJson,
  sizeMode,
  onSizeModeChange,
}: AppToolbarProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(diagramTitle);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moreWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditingTitle) titleInputRef.current?.select();
  }, [isEditingTitle]);

  useEffect(() => {
    if (!showMoreMenu) return;
    const onOutsideClick = (e: MouseEvent) => {
      if (!moreWrapRef.current?.contains(e.target as Node)) {
        setShowMoreMenu(false);
        setConfirmingClear(false);
        if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [showMoreMenu]);

  const commitTitle = () => {
    const trimmed = titleDraft.trim() || 'Arquitectura sin título';
    onTitleChange(trimmed);
    setTitleDraft(trimmed);
    setIsEditingTitle(false);
  };

  const cancelTitle = () => {
    setTitleDraft(diagramTitle);
    setIsEditingTitle(false);
  };

  const onTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitTitle();
    if (e.key === 'Escape') cancelTitle();
  };

  const handleClearClick = () => {
    if (confirmingClear) {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      setConfirmingClear(false);
      setShowMoreMenu(false);
      clearDiagram();
    } else {
      setConfirmingClear(true);
      confirmTimerRef.current = setTimeout(() => setConfirmingClear(false), 3000);
    }
  };

  return (
    <header className="app-header">
      {/* ── Left: Brand + Breadcrumb ── */}
      <div className="app-header__left">
        <div className="app-header__brand">
          <Layers size={15} className="app-header__logo" strokeWidth={2.2} />
          <span className="app-header__brand-name">Arcto</span>
        </div>

        <span className="app-header__slash" aria-hidden>/</span>
        <span className="app-header__workspace">Mi Proyecto</span>
        <ChevronRight size={13} className="app-header__chevron" strokeWidth={2} aria-hidden />

        {isEditingTitle ? (
          <input
            ref={titleInputRef}
            className="app-header__title-input"
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={commitTitle}
            onKeyDown={onTitleKeyDown}
            maxLength={60}
            aria-label="Nombre del diagrama"
          />
        ) : (
          <button
            className="app-header__title-btn"
            onClick={() => { setTitleDraft(diagramTitle); setIsEditingTitle(true); }}
            title="Haz clic para renombrar"
          >
            {diagramTitle}
          </button>
        )}
      </div>

      <div className="app-header__spacer" />

      {/* ── Right: Status + Actions ── */}
      <div className="app-header__right">
        {/* Save status */}
        <div className={`app-header__save-status app-header__save-status--${saveStatus}`}>
          {saveStatus === 'saving'
            ? <><Loader2 size={12} className="app-header__spin" /><span>Guardando…</span></>
            : <><CheckCheck size={12} /><span>Guardado</span></>}
        </div>

        <div className="app-header__div" />

        {/* History */}
        <button
          type="button"
          onClick={undo}
          disabled={!canUndo}
          className="header-btn"
          title="Deshacer (Ctrl+Z)"
        >
          <Undo2 size={15} />
        </button>
        <button
          type="button"
          onClick={deleteSelected}
          disabled={!hasSelection}
          className="header-btn header-btn--delete"
          title="Eliminar selección (Supr)"
        >
          <Trash2 size={15} />
        </button>

        {selectedNodesCount >= 2 && (
          <>
            <div className="app-header__div" />
            <div className="align-group" title="Alinear nodos seleccionados">
              {ALIGN_ACTIONS.map(({ axis, title, icon }) => (
                <button
                  key={axis}
                  type="button"
                  className="header-btn align-btn"
                  title={title}
                  onClick={() => alignNodes(axis)}
                >
                  {icon}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="app-header__div" />

        {/* Size mode */}
        <div className="size-mode-group" role="group" aria-label="Tamaño de vista">
          {SIZE_MODES.map(({ key, label, title }) => (
            <button
              key={key}
              type="button"
              className={`size-mode-btn${sizeMode === key ? ' size-mode-btn--active' : ''}`}
              title={title}
              onClick={() => onSizeModeChange(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="app-header__div" />

        {/* File actions */}
        <label className="header-btn-label" title="Importar diagrama desde JSON">
          <Upload size={14} />
          <span>Importar</span>
          <input type="file" accept="application/json" className="visually-hidden" onChange={importJson} />
        </label>
        <button
          type="button"
          onClick={() => exportJson(diagramTitle)}
          className="header-btn-label header-btn-label--primary"
          title="Exportar diagrama como JSON"
        >
          <Download size={14} />
          <span>Exportar</span>
        </button>

        <div className="app-header__div" />

        {/* More menu */}
        <div className="app-header__more-wrap" ref={moreWrapRef}>
          <button
            type="button"
            onClick={() => setShowMoreMenu((v) => !v)}
            className={`header-btn${showMoreMenu ? ' header-btn--active' : ''}`}
            title="Más opciones"
          >
            <MoreHorizontal size={15} />
          </button>

          {showMoreMenu && (
            <div className="app-header__more-menu" role="menu">
              <button
                type="button"
                role="menuitem"
                onClick={handleClearClick}
                className={`more-menu-item${confirmingClear ? ' more-menu-item--confirm' : ' more-menu-item--danger'}`}
              >
                {confirmingClear
                  ? <><AlertTriangle size={14} /><span>¿Confirmar? Haz clic de nuevo</span></>
                  : <><BrushCleaning size={14} /><span>Limpiar diagrama</span></>}
              </button>
            </div>
          )}
        </div>

        <div className="app-header__div" />

        {/* Library toggle */}
        <button
          type="button"
          onClick={onToggleLibrary}
          className={`header-btn${isLibraryOpen ? ' header-btn--active' : ''}`}
          title={isLibraryOpen ? 'Cerrar elementos' : 'Abrir elementos'}
        >
          <LayoutGrid size={15} />
        </button>
      </div>
    </header>
  );
}
