import { PlusIcon } from './icons/DiagramIcons';

interface QuickCreatePanelProps {
  nodeLabel: string;
  nodeSubtitle: string;
  setNodeLabel: (value: string) => void;
  setNodeSubtitle: (value: string) => void;
  addQuickNode: () => void;
}

export function QuickCreatePanel({ nodeLabel, nodeSubtitle, setNodeLabel, setNodeSubtitle, addQuickNode }: QuickCreatePanelProps) {
  return (
    <section className="panel">
      <div className="panel__title">Crear rápido</div>
      <input
        value={nodeLabel}
        onChange={(event) => setNodeLabel(event.target.value)}
        placeholder="Nombre del componente"
        className="form-control"
      />
      <input
        value={nodeSubtitle}
        onChange={(event) => setNodeSubtitle(event.target.value)}
        placeholder="Tecnología o descripción"
        className="form-control"
      />
      <button type="button" onClick={addQuickNode} className="button button--primary button--full">
        <PlusIcon size={17} /> Agregar nodo
      </button>
    </section>
  );
}
