import type { Edge, Node } from '@xyflow/react';

export const NODE_KINDS = {
  // Core
  DEFAULT:        'default',
  USER:           'user',
  FRONTEND:       'frontend',
  MOBILE:         'mobile',
  GATEWAY:        'gateway',
  BACKEND:        'backend',
  DATABASE:       'database',
  CACHE:          'cache',
  QUEUE:          'queue',
  SECURITY:       'security',
  CLOUD:          'cloud',
  EXTERNAL:       'external',
  WORKER:         'worker',
  ONPREMISE:      'onpremise',
  MAINFRAME:      'mainframe',
  AI_MODEL:       'ai_model',
  VECTOR_DB:      'vector_db',
  AI_AGENT:       'ai_agent',
  // Integration
  EVENT_BUS:      'event_bus',
  PUBSUB:         'pubsub',
  WEBHOOK:        'webhook',
  ETL:            'etl',
  SERVICE_MESH:   'service_mesh',
  // Infrastructure
  KUBERNETES:     'kubernetes',
  CONTAINER:      'container',
  LOAD_BALANCER:  'load_balancer',
  CDN:            'cdn',
  OBJECT_STORAGE: 'object_storage',
  FILE_STORAGE:   'file_storage',
  // Observability
  LOGGING:        'logging',
  METRICS:        'metrics',
  MONITORING:     'monitoring',
  TRACING:        'tracing',
  ALERTING:       'alerting',
  // Security
  IAM:            'iam',
  OAUTH2:         'oauth2',
  KEY_VAULT:      'key_vault',
  SECRETS:        'secrets',
  API_SECURITY:   'api_security',
  // AI extended
  MCP_SERVER:       'mcp_server',
  AI_TOOL:          'ai_tool',
  PROMPT_TEMPLATE:  'prompt_template',
  KNOWLEDGE_BASE:   'knowledge_base',
  RAG_PIPELINE:     'rag_pipeline',
  GUARDRAILS:       'guardrails',
  AI_WORKFLOW:      'ai_workflow',
  // Arquitectura y riesgo
  LAYER:            'layer',
  BANK:             'bank',
  TOKENIZATION:     'tokenization',
  RISK:             'risk',
  // System Design Kit
  ADMIN:              'admin',
  WEB_APP:            'web_app',
  CLI:                'cli',
  ATM:                'atm',
  POS:                'pos',
  GRAPHQL:            'graphql',
  SERVERLESS:         'serverless',
  SCHEDULER:          'scheduler',
  BATCH:              'batch',
  TIME_SERIES_DB:     'time_series_db',
  DATA_WAREHOUSE:     'data_warehouse',
  DATA_LAKE:          'data_lake',
  SEARCH_ENGINE:      'search_engine',
  BI_REPORTING:       'bi_reporting',
  INTERNET:           'internet',
  DNS:                'dns',
  REVERSE_PROXY:      'reverse_proxy',
  ROUTER:             'router',
  SWITCH:             'switch',
  VPN:                'vpn',
  VIRTUAL_MACHINE:    'virtual_machine',
  AUTO_SCALING:       'auto_scaling',
  STREAMING:          'streaming',
  ESB:                'esb',
  IPAAS:              'ipaas',
  EMAIL:              'email',
  PAYMENT_NETWORK:    'payment_network',
  APM:                'apm',
  DASHBOARD:          'dashboard',
  HSM:                'hsm',
  EMBEDDINGS:         'embeddings',
  CICD:               'cicd',
  ARTIFACT_REGISTRY:  'artifact_registry',
  IAC:                'iac',
} as const;

export type NodeKind = (typeof NODE_KINDS)[keyof typeof NODE_KINDS];

export interface SoftwareNodeData extends Record<string, unknown> {
  label: string;
  subtitle: string;
  description: string;
  kind: NodeKind;
  icon: NodeKind;
}

export interface PaletteItem {
  type: NodeKind;
  label: string;
  subtitle: string;
  description: string;
}

export interface NodeFormData {
  label: string;
  subtitle: string;
  description: string;
  kind: NodeKind;
}

export interface EdgeFormData {
  label: string;
}

export type GroupLabelAlign = 'left' | 'center' | 'right';

export interface GroupNodeData extends Record<string, unknown> {
  label: string;
  color: string;
  dashed?: boolean;
  rounded?: boolean;
  filled?: boolean;
  labelAlign?: GroupLabelAlign;
}

export interface GroupFormData {
  label: string;
  color: string;
  dashed?: boolean;
  rounded?: boolean;
  filled?: boolean;
  labelAlign?: GroupLabelAlign;
}

export type SoftwareNode = Node<SoftwareNodeData, 'softwareNode'>;
export type IconNode = Node<SoftwareNodeData, 'iconNode'>;
export type GroupNode = Node<GroupNodeData, 'groupNode'>;
export type EdgeShape = 'smooth' | 'straight';
export type AlignAxis = 'center-h' | 'center-v';

export interface EdgeAnnotationData {
  id: string;
  icon: string;
  label: string;
  color: string;
  bg: string;
}
export type SoftwareEdge = Edge<{ dashed?: boolean; shape?: EdgeShape; annotations?: EdgeAnnotationData[]; c4?: boolean; technology?: string }>;

export interface TextNodeData extends Record<string, unknown> {
  text: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontSize: number;
  color: string;
  fontFamily: 'inter' | 'jetbrains';
}
export type TextNode = Node<TextNodeData, 'textNode'>;

export interface LabelNodeData extends Record<string, unknown> {
  text: string;
  color: string;
  rotation: number;
  bold?: boolean;
}
export interface LabelFormData {
  text: string;
  color: string;
  rotation: number;
  bold: boolean;
}
export type LabelNode = Node<LabelNodeData, 'labelNode'>;

export interface AnnotationNodeData extends Record<string, unknown> {
  icon: string;
  label: string;
  color: string;
  bg: string;
}
export type AnnotationNode = Node<AnnotationNodeData, 'annotationNode'>;

// ── C4 model (c4model.com notation) ──
export type C4Shape = 'box' | 'person' | 'browser' | 'shell' | 'folder' | 'cylinder' | 'bucket' | 'component' | 'ellipse';

export interface C4NodeData extends Record<string, unknown> {
  label: string;
  /** Element type shown in brackets, e.g. "Software System", "Container". */
  c4Type: string;
  technology: string;
  description: string;
  shape: C4Shape;
  color: string;
}
export type C4Node = Node<C4NodeData, 'c4Node'>;

export type C4BoundaryVariant = 'boundary' | 'deployment' | 'group';

export interface C4BoundaryData extends Record<string, unknown> {
  label: string;
  c4Type: string;
  technology: string;
  variant: C4BoundaryVariant;
  color: string;
  /** Deployment nodes only, e.g. "x1..10". Non-empty draws the stacked outline. */
  instances: string;
}
export type C4BoundaryNode = Node<C4BoundaryData, 'c4Boundary'>;

export interface C4PaletteEntry {
  id: string;
  label: string;
  subtitle: string;
  group: 'Elementos' | 'Límites';
  node?: C4NodeData;
  boundary?: C4BoundaryData;
}

export type C4PalettePayload = { __isC4: true; id: string };

export type DiagramNode = SoftwareNode | TextNode | IconNode | GroupNode | LabelNode | AnnotationNode | C4Node | C4BoundaryNode;

export interface Scene {
  id: string;
  name: string;
  /** Node ids in playback order. Consecutive steps must be joined by a direct edge. */
  steps: string[];
}

export interface DiagramPayload {
  title?: string;
  nodes: DiagramNode[];
  edges: SoftwareEdge[];
  scenes?: Scene[];
}
