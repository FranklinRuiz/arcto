# Arcto — Architecture Diagrams

> Herramienta web open source para diseñar diagramas de arquitectura de software de forma visual e interactiva.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-latest-646cff?logo=vite&logoColor=white)](https://vitejs.dev)

**[🚀 Pruébalo en vivo →](https://franklinruiz.github.io/arcto/)**

---

## ¿Qué es Arcto?

Arcto es un editor de diagramas de arquitectura que corre completamente en el navegador — sin backend, sin cuenta, sin instalación. Diseña la arquitectura de tu sistema arrastrando componentes al lienzo, conectándolos y exportando el resultado como JSON para compartirlo con tu equipo.

---

## Características

### Paleta de elementos
15 componentes organizados en 6 grupos que cubren los bloques principales de una arquitectura moderna:

| Grupo | Elementos |
|---|---|
| Anotaciones | Texto libre |
| Presentación | Frontend Web, App Móvil |
| Servicios | API Gateway, Microservicio, Worker / Job |
| Datos | Base de Datos, Caché, Message Queue |
| Infraestructura | Servicio Cloud, On-Premise, Mainframe / Host |
| Seguridad y Ext. | Seguridad / WAF, Sistema Externo, Componente genérico |

### Lienzo interactivo
- Arrastrar y soltar elementos desde la paleta
- **16 puntos de conexión** por nodo, visibles al pasar el cursor con animación
- Conexiones animadas `smoothstep` con etiqueta editable
- Doble clic sobre un nodo o conexión para editarlo
- **Selección múltiple por lazo** (arrastrar sobre el canvas)
- **Paneo** con clic derecho + arrastrar
- Controles de zoom y fondo de cuadrícula

### Texto libre
- Nodos de anotación editables directamente en el lienzo
- Formato: negrita, cursiva, subrayado, tamaño (12–32 px) y 8 colores
- Panel de formato en el sidebar al seleccionar el nodo

### Edición
- Modal compacto: nombre, tecnología, tipo de componente con icono en tiempo real
- `Enter` para guardar · `Escape` para cancelar

### Persistencia y historial
- **Guardado automático** en `localStorage` — el diagrama sobrevive a recargas
- **Deshacer** con `Ctrl+Z` / `Cmd+Z` — hasta 60 pasos
- **Importar / Exportar JSON** para compartir o hacer backup

### Barra de herramientas
- Contraer / expandir sidebar
- Eliminar selección (`Supr`)
- Limpiar lienzo
- Importar y exportar diagrama

---

## Stack

| | |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite |
| Diagramas | @xyflow/react v12 |
| Tests | Vitest |
| Estilos | CSS puro (sin Tailwind ni librerías de iconos externas) |

---

## Desarrollo local

```bash
# 1. Clona el repositorio
git clone https://github.com/franklinruiz/arcto.git
cd arcto

# 2. Instala dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Otros comandos:

```bash
npm run build     # build de producción
npm run preview   # previsualiza el build localmente
npm test          # ejecuta la suite de pruebas
npm run test:watch  # modo watch
```

---

## Estructura del proyecto

```
src/
├── app/
│   └── App.tsx
├── features/
│   └── diagram-builder/
│       ├── components/
│       │   ├── icons/DiagramIcons.tsx   # todos los SVG del proyecto
│       │   ├── AppToolbar.tsx
│       │   ├── DiagramCanvas.tsx
│       │   ├── EdgeEditModal.tsx
│       │   ├── NodeEditModal.tsx
│       │   ├── PalettePanel.tsx
│       │   ├── Sidebar.tsx
│       │   ├── SoftwareNode.tsx
│       │   └── TextNode.tsx
│       ├── constants/diagram.constants.ts
│       ├── hooks/useDiagramBuilder.ts   # lógica central del editor
│       ├── pages/DiagramBuilderPage.tsx
│       ├── types/diagram.types.ts
│       ├── utils/
│       │   ├── diagramFactory.ts
│       │   └── diagramValidation.ts
│       └── __tests__/
│           ├── diagramFactory.test.ts
│           └── diagramValidation.test.ts
└── styles/index.css
```

---

## Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar Arcto, aquí tienes cómo hacerlo:

### Reportar un bug o sugerir una mejora

1. Revisa los [issues existentes](https://github.com/franklinruiz/arcto/issues) para evitar duplicados.
2. Abre un nuevo issue describiendo:
   - **Bug:** qué ocurrió, qué esperabas que ocurriera y pasos para reproducirlo.
   - **Mejora:** qué problema resuelve y cómo lo imaginas.

### Enviar un Pull Request

1. Haz un fork del repositorio y crea tu rama desde `main`:
   ```bash
   git checkout -b feat/nombre-de-tu-feature
   ```
2. Realiza tus cambios siguiendo las convenciones del proyecto (TypeScript estricto, CSS puro, sin dependencias innecesarias).
3. Asegúrate de que los tests pasen:
   ```bash
   npm test
   ```
4. Abre un Pull Request hacia `main` con una descripción clara de los cambios y el problema que resuelven.

### Guías de estilo

- **TypeScript:** tipos explícitos, sin `any`.
- **Componentes:** funcionales con hooks; lógica de estado en `useDiagramBuilder`.
- **CSS:** clases BEM-like (`.bloque__elemento--modificador`); sin frameworks de utilidades.
- **Commits:** mensajes en imperativo, en inglés o español, ej. `feat: add export to PNG`.

---

## Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## Autor

Hecho con ❤️ por [Franklin Ruiz](https://github.com/franklinruiz).  
¿Tienes alguna pregunta? Abre un [issue](https://github.com/franklinruiz/arcto/issues) o escríbeme directamente.
