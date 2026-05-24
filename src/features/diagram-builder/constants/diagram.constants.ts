import { MarkerType } from '@xyflow/react';
import { NODE_KINDS, type NodeKind, type PaletteItem, type SoftwareEdge, type SoftwareNode } from '../types/diagram.types';

export type NodeCategory = 'ai' | 'data' | 'services' | 'presentation' | 'actors';

export const CATEGORY_STYLES: Record<NodeCategory, { bg: string; color: string; border: string }> = {
  ai:           { bg: '#EEEDFE', color: '#534AB7', border: '#AFA9EC' },
  data:         { bg: '#E1F5EE', color: '#0F6E56', border: '#5DCAA5' },
  services:     { bg: '#FAECE7', color: '#993C1D', border: '#F0997B' },
  presentation: { bg: '#E6F1FB', color: '#185FA5', border: '#85B7EB' },
  actors:       { bg: '#F1EFE8', color: '#5F5E5A', border: '#B4B2A9' },
};

export const KIND_CATEGORY: Record<NodeKind, NodeCategory> = {
  [NODE_KINDS.AI_MODEL]:  'ai',
  [NODE_KINDS.AI_AGENT]:  'ai',
  [NODE_KINDS.VECTOR_DB]: 'data',
  [NODE_KINDS.DATABASE]:  'data',
  [NODE_KINDS.CACHE]:     'data',
  [NODE_KINDS.GATEWAY]:   'services',
  [NODE_KINDS.BACKEND]:   'services',
  [NODE_KINDS.WORKER]:    'services',
  [NODE_KINDS.QUEUE]:     'services',
  [NODE_KINDS.MAINFRAME]: 'services',
  [NODE_KINDS.ONPREMISE]: 'services',
  [NODE_KINDS.CLOUD]:     'services',
  [NODE_KINDS.SECURITY]:  'services',
  [NODE_KINDS.FRONTEND]:  'presentation',
  [NODE_KINDS.MOBILE]:    'presentation',
  [NODE_KINDS.USER]:      'actors',
  [NODE_KINDS.EXTERNAL]:  'actors',
  [NODE_KINDS.DEFAULT]:   'actors',
};

export function getKindStyle(kind: NodeKind): { bg: string; color: string; border: string } {
  return CATEGORY_STYLES[KIND_CATEGORY[kind] ?? 'actors'];
}

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
    type: NODE_KINDS.USER,
    label: 'Usuario',
    subtitle: 'Actor / Cliente',
    description: 'Persona o actor externo que interactúa con el sistema.',
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
  {
    type: NODE_KINDS.AI_MODEL,
    label: 'Modelo IA / LLM',
    subtitle: 'GPT · Claude · Gemini',
    description: 'Modelo de lenguaje grande o servicio de IA generativa: Azure OpenAI, AWS Bedrock, Google Vertex AI.',
  },
  {
    type: NODE_KINDS.VECTOR_DB,
    label: 'Vector Store',
    subtitle: 'RAG · Embeddings',
    description: 'Base de datos vectorial para búsqueda semántica y RAG: Pinecone, Weaviate, pgvector, ChromaDB.',
  },
  {
    type: NODE_KINDS.AI_AGENT,
    label: 'Agente IA',
    subtitle: 'LangChain · AutoGen',
    description: 'Agente o orquestador de IA que coordina herramientas, memoria y modelos para tareas autónomas.',
  },
];

const paletteMap = new Map(PALETTE.map((p) => [p.type, p]));
const pick = (kind: keyof typeof NODE_KINDS) => paletteMap.get(NODE_KINDS[kind])!;

export const PALETTE_GROUPS: PaletteGroup[] = [
  {
    label: 'Actores',
    items: [pick('USER')],
  },
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
  {
    label: 'Inteligencia Artificial',
    items: [pick('AI_MODEL'), pick('VECTOR_DB'), pick('AI_AGENT')],
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
