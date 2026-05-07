import { SparklesIcon } from './icons/DiagramIcons';

export function AppHeader() {
  return (
    <div className="app-header">
      <div className="app-header__icon">
        <SparklesIcon size={22} />
      </div>
      <div>
        <h1 className="app-header__title">Software Diagram</h1>
        <p className="app-header__subtitle">Arquitectura visual, nodos editables y conexiones animadas.</p>
      </div>
    </div>
  );
}
