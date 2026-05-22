import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import {
  AlertTriangle, BrushCleaning, CheckCheck, ChevronRight,
  Download, Layers, LayoutGrid, Loader2,
  MoreHorizontal, Trash2, Undo2, Upload,
} from 'lucide-react';

interface AppToolbarProps {
  isLibraryOpen: boolean;
  hasSelection: boolean;
  canUndo: boolean;
  saveStatus: 'saved' | 'saving';
  diagramTitle: string;
  onTitleChange: (title: string) => void;
  onToggleLibrary: () => void;
  undo: () => void;
  deleteSelected: () => void;
  clearDiagram: () => void;
  exportJson: (title?: string) => void;
  importJson: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function AppToolbar({
  isLibraryOpen,
  hasSelection,
  canUndo,
  saveStatus,
  diagramTitle,
  onTitleChange,
  onToggleLibrary,
  undo,
  deleteSelected,
  clearDiagram,
  exportJson,
  importJson,
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
