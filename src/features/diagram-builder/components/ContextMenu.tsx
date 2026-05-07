import { useEffect } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  type: 'node' | 'edge';
  onDelete: () => void;
  onClose: () => void;
}

export function ContextMenu({ x, y, type, onDelete, onClose }: ContextMenuProps) {
  useEffect(() => {
    const handle = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
      onClose();
    };
    document.addEventListener('click', handle);
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('click', handle);
      document.removeEventListener('keydown', handle);
    };
  }, [onClose]);

  const label = type === 'node' ? 'Eliminar nodo' : 'Eliminar conexión';

  return (
    <div
      className="context-menu"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="context-menu__item context-menu__item--danger" onClick={onDelete}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
        {label}
      </button>
    </div>
  );
}
