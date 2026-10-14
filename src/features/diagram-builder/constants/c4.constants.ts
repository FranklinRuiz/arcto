import type { C4PaletteEntry, C4Shape } from '../types/diagram.types';

/** Colours sampled from the example diagrams on c4model.com. */
export const C4_COLORS = [
  { value: '#1168bd', label: 'Azul' },
  { value: '#bf101d', label: 'Rojo' },
  { value: '#ed8609', label: 'Naranja' },
  { value: '#297e06', label: 'Verde' },
  { value: '#8411bd', label: 'Púrpura' },
  { value: '#1a849c', label: 'Teal' },
  { value: '#444444', label: 'Gris' },
] as const;

export const C4_BLUE = '#1168bd';
export const C4_GREY = '#444444';

const BOX_SIZE = { width: 225, height: 150 };

export function getC4NodeSize(shape: C4Shape): { width: number; height: number } {
  return shape === 'person' ? { width: 200, height: 200 } : BOX_SIZE;
}

export const C4_BOUNDARY_SIZE = { width: 520, height: 360 };

export const C4_PALETTE: C4PaletteEntry[] = [
  {
    id: 'person', label: 'Persona', subtitle: 'Usuario, actor o rol', group: 'Elementos',
    node: { label: 'Persona', c4Type: 'Person', technology: '', description: 'Describe quién es y qué hace.', shape: 'person', color: '#297e06' },
  },
  {
    id: 'system', label: 'Sistema de software', subtitle: 'Propio o externo, según color', group: 'Elementos',
    node: { label: 'Sistema de software', c4Type: 'Software System', technology: '', description: 'Describe qué hace el sistema.', shape: 'box', color: C4_BLUE },
  },
  {
    id: 'container', label: 'Contenedor', subtitle: 'Aplicación o servicio', group: 'Elementos',
    node: { label: 'Contenedor', c4Type: 'Container', technology: 'Tecnología', description: 'Describe su responsabilidad.', shape: 'box', color: C4_BLUE },
  },
  {
    id: 'browser', label: 'Navegador', subtitle: 'Aplicación web / SPA', group: 'Elementos',
    node: { label: 'UI', c4Type: 'Container', technology: 'JavaScript', description: 'Aplicación que corre en el navegador.', shape: 'browser', color: C4_BLUE },
  },
  {
    id: 'shell', label: 'Terminal', subtitle: 'Proceso del lado servidor', group: 'Elementos',
    node: { label: 'Backend', c4Type: 'Container', technology: 'Java y Spring Boot', description: 'Expone la funcionalidad vía API.', shape: 'shell', color: C4_BLUE },
  },
  {
    id: 'folder', label: 'Carpeta', subtitle: 'Directorio, contenido estático', group: 'Elementos',
    node: { label: 'Contenido estático', c4Type: 'Container', technology: 'Directory', description: 'HTML, CSS, JavaScript, etc.', shape: 'folder', color: C4_BLUE },
  },
  {
    id: 'database', label: 'Base de datos', subtitle: 'Esquema relacional o NoSQL', group: 'Elementos',
    node: { label: 'Base de datos', c4Type: 'Container', technology: 'Esquema MySQL', description: 'Describe qué datos guarda.', shape: 'cylinder', color: C4_BLUE },
  },
  {
    id: 'bucket', label: 'Bucket', subtitle: 'Almacén de objetos', group: 'Elementos',
    node: { label: 'Almacén', c4Type: 'Container', technology: 'Bucket S3', description: 'Describe qué archivos guarda.', shape: 'bucket', color: C4_BLUE },
  },
  {
    id: 'component', label: 'Componente', subtitle: 'Pieza dentro de un contenedor', group: 'Elementos',
    node: { label: 'Componente', c4Type: 'Component', technology: 'Spring Bean', description: 'Describe su responsabilidad.', shape: 'component', color: C4_BLUE },
  },
  {
    id: 'infra', label: 'Nodo de infraestructura', subtitle: 'Balanceador, DNS, firewall', group: 'Elementos',
    node: { label: 'Load Balancer', c4Type: 'Infrastructure Node', technology: 'Tecnología', description: 'Describe qué hace.', shape: 'ellipse', color: C4_GREY },
  },
  {
    id: 'system-boundary', label: 'Límite de sistema', subtitle: 'Agrupa los contenedores de un sistema', group: 'Límites',
    boundary: { label: 'Sistema de software', c4Type: 'Software System', technology: '', variant: 'boundary', color: C4_BLUE, instances: '' },
  },
  {
    id: 'container-boundary', label: 'Límite de contenedor', subtitle: 'Agrupa los componentes de un contenedor', group: 'Límites',
    boundary: { label: 'Contenedor', c4Type: 'Container', technology: '', variant: 'boundary', color: C4_BLUE, instances: '' },
  },
  {
    id: 'deployment-node', label: 'Nodo de despliegue', subtitle: 'Servidor, región, runtime', group: 'Límites',
    boundary: { label: 'Nodo de despliegue', c4Type: 'Deployment Node', technology: 'Tecnología', variant: 'deployment', color: C4_GREY, instances: '' },
  },
  {
    id: 'group', label: 'Grupo', subtitle: 'Empresa, equipo, proveedor', group: 'Límites',
    boundary: { label: 'Grupo', c4Type: '', technology: '', variant: 'group', color: C4_GREY, instances: '' },
  },
];

export function findC4Entry(id: unknown): C4PaletteEntry | undefined {
  return C4_PALETTE.find((entry) => entry.id === id);
}

/** "[Container: Java]" — the bracketed type line every C4 element carries. */
export function formatC4Meta(c4Type: string, technology: string): string {
  const type = (c4Type ?? '').trim();
  const tech = (technology ?? '').trim();
  if (!type && !tech) return '';
  if (!tech) return `[${type}]`;
  if (!type) return `[${tech}]`;
  return `[${type}: ${tech}]`;
}
