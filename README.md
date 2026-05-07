# Arcto

Herramienta web para diseñar diagramas de arquitectura de software bancaria. Permite representar visualmente tanto la capa cloud como la infraestructura on-premise (core bancario, mainframe, servicios, datos y seguridad) mediante nodos arrastrables, conexiones animadas y edición en línea.

## Stack

- React 19 + TypeScript
- Vite
- @xyflow/react v12
- Vitest
- CSS puro (sin Tailwind ni librerías de iconos externas)

## Funcionalidades

### Paleta de elementos bancarios
14 elementos organizados en 5 grupos:

| Grupo | Elementos |
|---|---|
| Presentación | Frontend Web, App Móvil |
| Servicios | API Gateway, Microservicio, Worker / Job |
| Datos | Base de Datos, Caché, Message Queue |
| Infraestructura | Servicio Cloud, On-Premise, Mainframe / Host |
| Seguridad y Ext. | Seguridad / WAF, Sistema Externo |

Más un elemento libre **Componente** para uso genérico.

Cada elemento incluye icono con color propio, etiqueta, tecnología de referencia y descripción que se precarga al soltar el nodo en el lienzo.

### Lienzo interactivo
- Arrastrar elementos desde la paleta al lienzo
- **16 puntos de conexión** por nodo (5 arriba, 5 abajo, 3 izquierda, 3 derecha), visibles al pasar el cursor
- Conexiones animadas tipo `smoothstep` con flechas
- Doble clic sobre un nodo para editar etiqueta, tecnología, descripción y tipo
- Doble clic sobre una conexión para editar su texto
- Clic derecho sobre nodo o conexión → menú contextual para eliminar
- **Selección múltiple por lazo** (arrastrar con clic izquierdo sobre el canvas)
- Eliminar selección con la tecla `Supr` o el botón de la barra superior
- **Paneo del canvas** con clic derecho + arrastrar
- MiniMapa, controles de zoom y fondo de cuadrícula

### Barra superior (AppToolbar)
- Botón para contraer / expandir el panel lateral
- **Eliminar** — elimina el nodo, la conexión o la selección múltiple activa
- **Reset** — restaura el diagrama al estado inicial
- **Exportar** — descarga el diagrama como `diagrama-software.json`
- **Importar** — carga un JSON exportado previamente

### Panel lateral colapsable
- Se contrae con transición suave para maximizar el espacio del lienzo
- Scroll fino con estilo personalizado

## Estructura

```
src/
├── app/
│   └── App.tsx
├── features/
│   └── diagram-builder/
│       ├── components/
│       │   ├── icons/
│       │   │   └── DiagramIcons.tsx
│       │   ├── AppToolbar.tsx
│       │   ├── ContextMenu.tsx
│       │   ├── DiagramCanvas.tsx
│       │   ├── EdgeEditModal.tsx
│       │   ├── NodeEditModal.tsx
│       │   ├── PalettePanel.tsx
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
