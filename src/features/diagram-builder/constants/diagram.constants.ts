import { MarkerType } from '@xyflow/react';
import { NODE_KINDS, type NodeKind, type PaletteItem, type SoftwareEdge, type SoftwareNode } from '../types/diagram.types';

export const KIND_ICON_COLORS: Record<NodeKind, { background: string; color: string }> = {
  [NODE_KINDS.DEFAULT]:   { background: '#f1f5f9', color: '#64748b' },
  [NODE_KINDS.FRONTEND]:  { background: '#e0f2fe', color: '#0369a1' },
  [NODE_KINDS.MOBILE]:    { background: '#cffafe', color: '#0e7490' },
  [NODE_KINDS.GATEWAY]:   { background: '#ffedd5', color: '#c2410c' },
  [NODE_KINDS.BACKEND]:   { background: '#ede9fe', color: '#6d28d9' },
  [NODE_KINDS.DATABASE]:  { background: '#d1fae5', color: '#065f46' },
  [NODE_KINDS.CACHE]:     { background: '#dcfce7', color: '#166534' },
  [NODE_KINDS.QUEUE]:     { background: '#fce7f3', color: '#9d174d' },
  [NODE_KINDS.SECURITY]:  { background: '#fef3c7', color: '#92400e' },
  [NODE_KINDS.CLOUD]:     { background: '#e0e7ff', color: '#3730a3' },
  [NODE_KINDS.EXTERNAL]:  { background: '#f1f5f9', color: '#475569' },
  [NODE_KINDS.WORKER]:    { background: '#ffe4e6', color: '#be123c' },
  [NODE_KINDS.ONPREMISE]: { background: '#dbeafe', color: '#1e3a8a' },
  [NODE_KINDS.MAINFRAME]: { background: '#e7e5e4', color: '#1c1917' },
};

interface PaletteGroup {
  label: string;
  items: PaletteItem[];
}

export const PALETTE: PaletteItem[] = [
  {
    type: NODE_KINDS.DEFAULT,
    label: 'Componente',
    subtitle: 'Elemento libre',
    description: 'Elemento genérico reutilizable en cualquier capa del diagrama.',
  },
  {
    type: NODE_KINDS.FRONTEND,
    label: 'Frontend Web',
    subtitle: 'React / Angular',
    description: 'Interfaz web consumida por clientes o funcionarios del banco.',
  },
  {
    type: NODE_KINDS.MOBILE,
    label: 'App Móvil',
    subtitle: 'iOS / Android',
    description: 'Aplicación móvil bancaria para clientes iOS y Android.',
  },
  {
    type: NODE_KINDS.GATEWAY,
    label: 'API Gateway',
    subtitle: 'Enrutamiento / Auth',
    description: 'Punto de entrada único: autenticación, rate limiting y enrutamiento de APIs.',
  },
  {
    type: NODE_KINDS.BACKEND,
    label: 'Microservicio',
    subtitle: 'REST / gRPC',
    description: 'Servicio autónomo con lógica de negocio bancaria, expuesto vía REST o gRPC.',
  },
  {
    type: NODE_KINDS.DATABASE,
    label: 'Base de Datos',
    subtitle: 'SQL / NoSQL',
    description: 'Almacén de datos transaccional o analítico del banco.',
  },
  {
    type: NODE_KINDS.CACHE,
    label: 'Caché',
    subtitle: 'Redis / Memcached',
    description: 'Capa de caché en memoria para reducir latencia y descargar la base de datos.',
  },
  {
    type: NODE_KINDS.QUEUE,
    label: 'Message Queue',
    subtitle: 'Kafka / RabbitMQ',
    description: 'Bus de mensajería asíncrona para desacoplar productores y consumidores.',
  },
  {
    type: NODE_KINDS.SECURITY,
    label: 'Seguridad / WAF',
    subtitle: 'Firewall / mTLS',
    description: 'Firewall de aplicaciones, control de acceso mTLS y gestión de identidad.',
  },
  {
    type: NODE_KINDS.CLOUD,
    label: 'Servicio Cloud',
    subtitle: 'Azure / AWS / GCP',
    description: 'Servicio gestionado en nube pública: cómputo, almacenamiento o PaaS.',
  },
  {
    type: NODE_KINDS.ONPREMISE,
    label: 'On-Premise',
    subtitle: 'Data center propio',
    description: 'Servidor físico o virtual alojado en el data center propio del banco.',
  },
  {
    type: NODE_KINDS.MAINFRAME,
    label: 'Mainframe / Host',
    subtitle: 'IBM z/OS · Core',
    description: 'Core bancario sobre mainframe IBM z/OS: procesa transacciones críticas 24/7.',
  },
  {
    type: NODE_KINDS.EXTERNAL,
    label: 'Sistema Externo',
    subtitle: 'API terceros',
    description: 'API o sistema externo: pasarelas de pago, SBS, BCRP, SWIFT, VISA, etc.',
  },
  {
    type: NODE_KINDS.WORKER,
    label: 'Worker / Job',
    subtitle: 'Proceso async',
    description: 'Proceso asíncrono o batch para tareas de larga duración en segundo plano.',
  },
];

const paletteMap = new Map(PALETTE.map((p) => [p.type, p]));
const pick = (kind: keyof typeof NODE_KINDS) => paletteMap.get(NODE_KINDS[kind])!;

export const PALETTE_GROUPS: PaletteGroup[] = [
  {
    label: 'Presentación',
    items: [pick('FRONTEND'), pick('MOBILE')],
  },
  {
    label: 'Servicios',
    items: [pick('GATEWAY'), pick('BACKEND'), pick('WORKER')],
  },
  {
    label: 'Datos',
    items: [pick('DATABASE'), pick('CACHE'), pick('QUEUE')],
  },
  {
    label: 'Infraestructura',
    items: [pick('CLOUD'), pick('ONPREMISE'), pick('MAINFRAME')],
  },
  {
    label: 'Seguridad y Ext.',
    items: [pick('SECURITY'), pick('EXTERNAL')],
  },
];

export const ICON_PALETTE_GROUPS: PaletteGroup[] = [
  {
    label: 'Clientes',
    items: [pick('FRONTEND'), pick('MOBILE')],
  },
  {
    label: 'Servicios',
    items: [pick('GATEWAY'), pick('BACKEND'), pick('EXTERNAL')],
  },
  {
    label: 'Infraestructura',
    items: [pick('DATABASE'), pick('CLOUD'), pick('SECURITY')],
  },
];

export const INITIAL_NODES: SoftwareNode[] = [
  {
    id: 'init-frontend',
    type: 'softwareNode',
    position: { x: 60, y: 160 },
    data: {
      label: 'Frontend Web',
      subtitle: 'React / Angular',
      description: 'Interfaz web consumida por clientes o...',
      kind: NODE_KINDS.FRONTEND,
      icon: NODE_KINDS.FRONTEND,
    },
  },
  {
    id: 'init-service',
    type: 'softwareNode',
    position: { x: 390, y: 160 },
    data: {
      label: 'Microservicio',
      subtitle: 'REST / gRPC',
      description: 'Servicio autónomo con lógica de negocio...',
      kind: NODE_KINDS.BACKEND,
      icon: NODE_KINDS.BACKEND,
    },
  },
  {
    id: 'init-db',
    type: 'softwareNode',
    position: { x: 720, y: 160 },
    data: {
      label: 'Base de Datos',
      subtitle: 'SQL / NoSQL',
      description: 'Almacén de datos transaccional o analítico...',
      kind: NODE_KINDS.DATABASE,
      icon: NODE_KINDS.DATABASE,
    },
  },
] as unknown as SoftwareNode[];

export const INITIAL_EDGES: SoftwareEdge[] = [
  {
    id: 'init-frontend-service',
    source: 'init-frontend',
    sourceHandle: 'right-2',
    target: 'init-service',
    targetHandle: 'left-2',
    type: 'smoothstep',
    animated: false,
    label: '/api/consulta',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
    data: { dashed: false },
  },
  {
    id: 'init-service-db',
    source: 'init-service',
    sourceHandle: 'right-2',
    target: 'init-db',
    targetHandle: 'left-2',
    type: 'smoothstep',
    animated: false,
    label: 'jdbc',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2 },
    data: { dashed: false },
  },
];
