import { MarkerType } from '@xyflow/react';
import { NODE_KINDS, type NodeKind, type PaletteItem, type SoftwareEdge, type SoftwareNode } from '../types/diagram.types';

// 6 categorías — tono fijado por categoría, no por nodo (dos nodos de
// "compute" comparten azul aunque tengan íconos distintos). Colores
// derivados 1:1 de los oklch(L C H) del set de íconos: compute=250,
// data=160, messaging=285, observability=70, security=25, ai=340.
export type NodeCategory = 'compute' | 'data' | 'messaging' | 'observability' | 'security' | 'ai';

export const CATEGORY_STYLES: Record<NodeCategory, { bg: string; color: string; border: string }> = {
  compute:       { bg: '#E7F3FF', color: '#32669A', border: '#A7C8EA' },
  data:          { bg: '#E6F7ED', color: '#1F744F', border: '#A3D1B7' },
  messaging:     { bg: '#F0F0FF', color: '#5E5A9A', border: '#BFBFEA' },
  observability: { bg: '#FCF0E2', color: '#875814', border: '#DEBE9A' },
  security:      { bg: '#FFEDEA', color: '#944A46', border: '#E9B6B1' },
  ai:            { bg: '#FDECF6', color: '#884B75', border: '#E0B6D0' },
};

export const KIND_CATEGORY: Record<NodeKind, NodeCategory> = {
  // Cómputo y clientes
  [NODE_KINDS.DEFAULT]:        'compute',
  [NODE_KINDS.USER]:           'compute',
  [NODE_KINDS.FRONTEND]:       'compute',
  [NODE_KINDS.MOBILE]:         'compute',
  [NODE_KINDS.GATEWAY]:        'compute',
  [NODE_KINDS.BACKEND]:        'compute',
  [NODE_KINDS.WORKER]:         'compute',
  [NODE_KINDS.CONTAINER]:      'compute',
  [NODE_KINDS.KUBERNETES]:     'compute',
  [NODE_KINDS.ONPREMISE]:      'compute',
  [NODE_KINDS.MAINFRAME]:      'compute',
  [NODE_KINDS.CLOUD]:          'compute',
  [NODE_KINDS.EXTERNAL]:       'compute',
  [NODE_KINDS.LOAD_BALANCER]:  'compute',
  [NODE_KINDS.CDN]:            'compute',
  [NODE_KINDS.SERVICE_MESH]:   'compute',
  // Datos y almacenamiento
  [NODE_KINDS.DATABASE]:       'data',
  [NODE_KINDS.CACHE]:          'data',
  [NODE_KINDS.QUEUE]:          'data',
  [NODE_KINDS.OBJECT_STORAGE]: 'data',
  [NODE_KINDS.FILE_STORAGE]:   'data',
  [NODE_KINDS.VECTOR_DB]:      'data',
  [NODE_KINDS.ETL]:            'data',
  [NODE_KINDS.KNOWLEDGE_BASE]: 'data',
  [NODE_KINDS.METRICS]:        'data',
  // Mensajería e integración
  [NODE_KINDS.EVENT_BUS]:      'messaging',
  [NODE_KINDS.PUBSUB]:         'messaging',
  [NODE_KINDS.WEBHOOK]:        'messaging',
  [NODE_KINDS.MCP_SERVER]:     'messaging',
  [NODE_KINDS.GUARDRAILS]:     'messaging',
  // Observabilidad
  [NODE_KINDS.LOGGING]:        'observability',
  [NODE_KINDS.MONITORING]:     'observability',
  [NODE_KINDS.TRACING]:        'observability',
  [NODE_KINDS.ALERTING]:       'observability',
  // Seguridad e identidad
  [NODE_KINDS.SECURITY]:       'security',
  [NODE_KINDS.API_SECURITY]:   'security',
  [NODE_KINDS.IAM]:            'security',
  [NODE_KINDS.OAUTH2]:         'security',
  [NODE_KINDS.KEY_VAULT]:      'security',
  [NODE_KINDS.SECRETS]:        'security',
  [NODE_KINDS.TOKENIZATION]:   'security',
  [NODE_KINDS.RISK]:           'security',
  // IA
  [NODE_KINDS.AI_MODEL]:        'ai',
  [NODE_KINDS.AI_AGENT]:        'ai',
  [NODE_KINDS.AI_TOOL]:         'ai',
  [NODE_KINDS.PROMPT_TEMPLATE]: 'ai',
  [NODE_KINDS.RAG_PIPELINE]:    'ai',
  [NODE_KINDS.AI_WORKFLOW]:     'ai',
  // Arquitectura (agrupado con Cómputo, mismo tono azul en el set de íconos)
  [NODE_KINDS.LAYER]:          'compute',
  [NODE_KINDS.BANK]:           'compute',
};

export function getKindStyle(kind: NodeKind): { bg: string; color: string; border: string } {
  return CATEGORY_STYLES[KIND_CATEGORY[kind] ?? 'compute'];
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
  // Integration
  {
    type: NODE_KINDS.EVENT_BUS,
    label: 'Event Bus',
    subtitle: 'EventBridge · SNS',
    description: 'Bus de eventos central que desacopla productores y consumidores mediante publicación asíncrona.',
  },
  {
    type: NODE_KINDS.PUBSUB,
    label: 'Pub/Sub',
    subtitle: 'Topic · Suscripción',
    description: 'Mensajería publicar/suscribir con tópicos y múltiples suscriptores independientes.',
  },
  {
    type: NODE_KINDS.WEBHOOK,
    label: 'Webhook',
    subtitle: 'HTTP Callback',
    description: 'Notificación HTTP push desencadenada por un evento en un sistema origen.',
  },
  {
    type: NODE_KINDS.ETL,
    label: 'ETL / Pipeline',
    subtitle: 'Extract · Transform · Load',
    description: 'Pipeline de integración de datos: extracción, transformación y carga hacia el destino.',
  },
  {
    type: NODE_KINDS.SERVICE_MESH,
    label: 'Service Mesh',
    subtitle: 'Istio · Linkerd',
    description: 'Capa de infraestructura que gestiona la comunicación entre microservicios con sidecars proxy.',
  },
  // Infrastructure
  {
    type: NODE_KINDS.KUBERNETES,
    label: 'Kubernetes',
    subtitle: 'K8s · Orquestación',
    description: 'Plataforma de orquestación de contenedores para despliegue, escalado y gestión automatizada.',
  },
  {
    type: NODE_KINDS.CONTAINER,
    label: 'Contenedor',
    subtitle: 'Docker · OCI',
    description: 'Unidad de despliegue aislada que empaqueta una aplicación con sus dependencias.',
  },
  {
    type: NODE_KINDS.LOAD_BALANCER,
    label: 'Load Balancer',
    subtitle: 'Distribución de tráfico',
    description: 'Distribuye el tráfico entrante entre múltiples instancias de servicio de forma equitativa.',
  },
  {
    type: NODE_KINDS.CDN,
    label: 'CDN',
    subtitle: 'Edge · Caché global',
    description: 'Red de distribución de contenido con nodos edge que aceleran la entrega a los usuarios finales.',
  },
  {
    type: NODE_KINDS.OBJECT_STORAGE,
    label: 'Object Storage',
    subtitle: 'S3 · Blob · GCS',
    description: 'Almacenamiento de objetos no estructurados: imágenes, documentos, backups y datos binarios.',
  },
  {
    type: NODE_KINDS.FILE_STORAGE,
    label: 'File Storage',
    subtitle: 'NFS · SMB · EFS',
    description: 'Sistema de archivos compartido accesible por múltiples servicios mediante protocolos de red.',
  },
  // Observability
  {
    type: NODE_KINDS.LOGGING,
    label: 'Logging',
    subtitle: 'ELK · Loki · Splunk',
    description: 'Recolección, almacenamiento y análisis centralizado de registros de aplicaciones e infraestructura.',
  },
  {
    type: NODE_KINDS.METRICS,
    label: 'Métricas',
    subtitle: 'Prometheus · Datadog',
    description: 'Recolección y visualización de métricas de rendimiento: latencia, throughput, error rate.',
  },
  {
    type: NODE_KINDS.MONITORING,
    label: 'Monitoring',
    subtitle: 'Grafana · CloudWatch',
    description: 'Dashboard de monitoreo en tiempo real con alertas basadas en umbrales y anomalías.',
  },
  {
    type: NODE_KINDS.TRACING,
    label: 'Tracing',
    subtitle: 'Jaeger · Zipkin · OTEL',
    description: 'Rastreo distribuido de solicitudes a través de múltiples microservicios para diagnóstico de latencia.',
  },
  {
    type: NODE_KINDS.ALERTING,
    label: 'Alerting',
    subtitle: 'PagerDuty · OpsGenie',
    description: 'Sistema de notificaciones y escalación de incidentes basado en reglas y umbrales de métricas.',
  },
  // Security extended
  {
    type: NODE_KINDS.IAM,
    label: 'IAM',
    subtitle: 'Identidad y Acceso',
    description: 'Gestión de identidades, roles y permisos para controlar el acceso a recursos del sistema.',
  },
  {
    type: NODE_KINDS.OAUTH2,
    label: 'OAuth2 / OIDC',
    subtitle: 'Autorización · Tokens',
    description: 'Protocolo de autorización delegada con tokens de acceso y flujos de autenticación estándar.',
  },
  {
    type: NODE_KINDS.KEY_VAULT,
    label: 'Key Vault',
    subtitle: 'HSM · KMS',
    description: 'Almacén seguro para claves criptográficas, certificados y secretos con control de acceso granular.',
  },
  {
    type: NODE_KINDS.SECRETS,
    label: 'Secrets Manager',
    subtitle: 'HashiCorp Vault · AWS SM',
    description: 'Gestión centralizada de credenciales, tokens y secretos con rotación automática.',
  },
  {
    type: NODE_KINDS.API_SECURITY,
    label: 'API Security',
    subtitle: 'mTLS · JWT · RBAC',
    description: 'Capa de seguridad para APIs: autenticación, autorización, validación y protección contra ataques.',
  },
  // AI extended
  {
    type: NODE_KINDS.MCP_SERVER,
    label: 'MCP Server',
    subtitle: 'Model Context Protocol',
    description: 'Servidor MCP que expone herramientas, recursos y prompts a agentes de IA de forma estandarizada.',
  },
  {
    type: NODE_KINDS.AI_TOOL,
    label: 'Tool / Función',
    subtitle: 'Function Calling',
    description: 'Función o herramienta invocable por un agente de IA para ejecutar acciones externas.',
  },
  {
    type: NODE_KINDS.PROMPT_TEMPLATE,
    label: 'Prompt Template',
    subtitle: 'System · Few-shot',
    description: 'Plantilla de prompt reutilizable con variables de contexto, instrucciones y ejemplos few-shot.',
  },
  {
    type: NODE_KINDS.KNOWLEDGE_BASE,
    label: 'Knowledge Base',
    subtitle: 'Documentos · Índice',
    description: 'Base de conocimiento estructurada usada por agentes de IA para búsqueda y recuperación de información.',
  },
  {
    type: NODE_KINDS.RAG_PIPELINE,
    label: 'RAG Pipeline',
    subtitle: 'Retrieval Augmented Gen.',
    description: 'Pipeline de generación aumentada por recuperación: embeddings, búsqueda vectorial y generación LLM.',
  },
  {
    type: NODE_KINDS.GUARDRAILS,
    label: 'Guardrails',
    subtitle: 'Safety · Moderation',
    description: 'Capa de seguridad y moderación que filtra entradas/salidas de modelos de IA para cumplimiento.',
  },
  {
    type: NODE_KINDS.AI_WORKFLOW,
    label: 'AI Workflow',
    subtitle: 'Orquestación · DAG',
    description: 'Flujo de trabajo orquestado de pasos de IA: retrieval, razonamiento, generación y acciones.',
  },
  // Arquitectura y riesgo
  {
    type: NODE_KINDS.LAYER,
    label: 'Capa Arquitectónica',
    subtitle: 'Presentación · Negocio · Datos',
    description: 'Marcador visual de una capa lógica de la arquitectura para agrupar componentes por responsabilidad.',
  },
  {
    type: NODE_KINDS.BANK,
    label: 'Banco / Entidad Financiera',
    subtitle: 'Core bancario · Contraparte',
    description: 'Entidad bancaria o institución financiera representada como bloque de dominio: banco emisor, corresponsal o regulador.',
  },
  {
    type: NODE_KINDS.TOKENIZATION,
    label: 'Tokenización',
    subtitle: 'PCI DSS · Token Vault',
    description: 'Servicio que sustituye datos sensibles de tarjeta o cuenta por tokens no reversibles, reduciendo el alcance PCI DSS.',
  },
  {
    type: NODE_KINDS.RISK,
    label: 'Motor de Riesgo',
    subtitle: 'Scoring · Antifraude',
    description: 'Motor de evaluación de riesgo crediticio o antifraude que califica transacciones u operaciones en tiempo real.',
  },
];

const paletteMap = new Map(PALETTE.map((p) => [p.type, p]));
const pick = (kind: keyof typeof NODE_KINDS) => paletteMap.get(NODE_KINDS[kind])!;

export const PALETTE_GROUPS: PaletteGroup[] = [
  {
    label: 'Actores',
    items: [pick('USER'), pick('EXTERNAL')],
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
    items: [pick('DATABASE'), pick('CACHE'), pick('QUEUE'), pick('VECTOR_DB')],
  },
  {
    label: 'Infraestructura',
    items: [pick('CLOUD'), pick('ONPREMISE'), pick('MAINFRAME'), pick('KUBERNETES'), pick('CONTAINER'), pick('LOAD_BALANCER'), pick('CDN'), pick('OBJECT_STORAGE'), pick('FILE_STORAGE')],
  },
  {
    label: 'Integración',
    items: [pick('EVENT_BUS'), pick('PUBSUB'), pick('WEBHOOK'), pick('ETL'), pick('SERVICE_MESH')],
  },
  {
    label: 'Observabilidad',
    items: [pick('LOGGING'), pick('METRICS'), pick('MONITORING'), pick('TRACING'), pick('ALERTING')],
  },
  {
    label: 'Seguridad',
    items: [pick('SECURITY'), pick('IAM'), pick('OAUTH2'), pick('KEY_VAULT'), pick('SECRETS'), pick('API_SECURITY')],
  },
  {
    label: 'Inteligencia Artificial',
    items: [pick('AI_MODEL'), pick('AI_AGENT'), pick('MCP_SERVER'), pick('AI_TOOL'), pick('PROMPT_TEMPLATE'), pick('KNOWLEDGE_BASE'), pick('RAG_PIPELINE'), pick('GUARDRAILS'), pick('AI_WORKFLOW')],
  },
  {
    label: 'Arquitectura',
    items: [pick('LAYER'), pick('BANK')],
  },
  {
    label: 'Riesgo y Cumplimiento',
    items: [pick('TOKENIZATION'), pick('RISK')],
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
    style: { strokeWidth: 1.9 },
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
    style: { strokeWidth: 1.9 },
    data: { dashed: false },
  },
];
