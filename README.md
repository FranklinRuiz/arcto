# Software Diagram Builder

Aplicación web en React para crear diagramas de software con nodos arrastrables, conexiones animadas y edición por doble clic.

## Stack

- React + TypeScript
- Vite
- @xyflow/react
- Vitest
- CSS puro, sin Tailwind ni librerías de iconos externas

## Funcionalidades

- Arrastrar componentes al lienzo.
- Conectar nodos visualmente.
- Doble clic sobre un nodo para editar sus datos.
- Doble clic sobre una conexión para editar su texto.
- Exportar/importar diagrama en JSON.
- Resetear diagrama.
- Borrar nodo seleccionado con sus conexiones.

## Estructura

```txt
src/
├── app/
│   └── App.tsx
├── features/
│   └── diagram-builder/
│       ├── components/
│       │   ├── icons/
│       │   │   └── DiagramIcons.tsx
│       │   ├── AppHeader.tsx
│       │   ├── DiagramActions.tsx
│       │   ├── DiagramCanvas.tsx
│       │   ├── EdgeEditModal.tsx
│       │   ├── NodeEditModal.tsx
│       │   ├── PalettePanel.tsx
│       │   ├── QuickCreatePanel.tsx
│       │   ├── Sidebar.tsx
│       │   └── SoftwareNode.tsx
│       ├── constants/
│       │   └── diagram.constants.ts
│       ├── hooks/
│       │   └── useDiagramBuilder.ts
│       ├── pages/
│       │   └── DiagramBuilderPage.tsx
│       ├── types/
│       │   └── diagram.types.ts
│       ├── utils/
│       │   ├── diagramFactory.ts
│       │   └── diagramValidation.ts
│       └── __tests__/
│           ├── diagramFactory.test.ts
│           └── diagramValidation.test.ts
└── styles/
    └── index.css
```

## Instalación

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Pruebas

```bash
npm test
```

## Uso

- Arrastra un elemento desde el panel izquierdo al lienzo.
- Une el punto derecho de un nodo con el punto izquierdo de otro.
- Haz doble clic sobre un nodo para editarlo.
- Haz doble clic sobre una conexión para cambiar su texto.
- Selecciona un nodo con un clic y presiona `Borrar` para eliminarlo con sus conexiones.
