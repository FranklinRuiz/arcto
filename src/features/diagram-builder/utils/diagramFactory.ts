import { MarkerType, type XYPosition } from '@xyflow/react';
import { C4_BOUNDARY_SIZE, C4_GREY, getC4NodeSize } from '../constants/c4.constants';
import { NODE_KINDS, type AnnotationNode, type C4BoundaryNode, type C4Node, type C4TitleNode, type C4PaletteEntry, type EdgeFormData, type GroupNode, type IconNode, type LabelNode, type NodeFormData, type NodeKind, type PaletteItem, type SoftwareEdge, type SoftwareNode, type SoftwareNodeData } from '../types/diagram.types';

function isNodeKind(value: unknown): value is NodeKind {
  return Object.values(NODE_KINDS).includes(value as NodeKind);
}

export function normalizeNodeData(data: Partial<SoftwareNodeData> = {}): SoftwareNodeData {
  const kind = isNodeKind(data.kind) ? data.kind : NODE_KINDS.BACKEND;

  return {
    label: data.label?.trim() || 'Componente sin nombre',
    subtitle: data.subtitle?.trim() || 'Sin tecnología definida',
    description: data.description?.trim() || 'Sin descripción registrada.',
    kind,
    icon: kind,
  };
}

export function createNode(params: {
  item: PaletteItem;
  position: XYPosition;
  customLabel?: string;
  customSubtitle?: string;
}): SoftwareNode {
  const kind = params.item.type || NODE_KINDS.BACKEND;

  return {
    id: `${kind}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'softwareNode',
    position: params.position,
    data: {
      label: params.customLabel?.trim() || params.item.label || 'Nuevo componente',
      subtitle: params.customSubtitle?.trim() || params.item.subtitle || 'Descripción técnica',
      description: params.item.description || 'Describe aquí la responsabilidad técnica de este componente.',
      kind,
      icon: kind,
    },
  };
}

// A human has no protocol — if either end of the connection is a person,
// the label is left blank rather than guessing at a network protocol.
const HUMAN_KINDS: ReadonlySet<NodeKind> = new Set([NODE_KINDS.USER]);

// A browser/app acting as a client does speak a real protocol outward.
const CLIENT_KINDS: ReadonlySet<NodeKind> = new Set([NODE_KINDS.FRONTEND, NODE_KINDS.MOBILE]);

// Best-effort default protocol per target kind — the single most common
// real-world choice, not a vague noun ("Batch", "Logs", "Cola") describing
// the *kind* of connection instead of a protocol. Where implementations
// genuinely vary (e.g. a vector DB might be gRPC or REST depending on the
// product), this picks the most widely used one rather than leaving it
// blank — it's just a starting suggestion, always editable via double-click.
// This is a TARGET-only lookup on purpose: reusing it for the source side
// too (e.g. falling back to "Backend → HTTP" when a microservice is the
// *source* of an edge to something unmapped, like an event bus) previously
// produced wrong answers, since that entry only describes traffic arriving
// at a backend, not traffic a backend sends onward.
const PROTOCOL_BY_TARGET: Partial<Record<NodeKind, string>> = {
  [NODE_KINDS.GATEWAY]:         'HTTPS', // API gateways are exposed over HTTPS
  [NODE_KINDS.LOAD_BALANCER]:   'HTTPS', // fronting web/API traffic
  [NODE_KINDS.CDN]:             'HTTPS',
  [NODE_KINDS.BACKEND]:         'HTTP',  // inbound call to a microservice/API
  [NODE_KINDS.DATABASE]:        'JDBC',  // standard connectivity API for SQL/NoSQL access
  [NODE_KINDS.CACHE]:           'RESP',  // REdis Serialization Protocol — "Redis" is the product, not the protocol
  [NODE_KINDS.QUEUE]:           'AMQP',  // standard message-broker protocol
  [NODE_KINDS.EVENT_BUS]:       'AMQP',  // most brokered event buses speak AMQP
  [NODE_KINDS.PUBSUB]:          'HTTPS', // managed pub/sub services (e.g. Cloud Pub/Sub) expose an HTTPS/REST API
  [NODE_KINDS.WEBHOOK]:         'HTTPS', // webhooks are HTTP(S) callbacks by definition
  [NODE_KINDS.WORKER]:          'AMQP',  // workers typically consume from a broker queue
  [NODE_KINDS.ETL]:             'HTTPS', // most modern ETL/integration tools pull via REST APIs
  [NODE_KINDS.SERVICE_MESH]:    'mTLS',  // mesh sidecars enforce mutual TLS
  [NODE_KINDS.KUBERNETES]:      'HTTPS', // Kubernetes API server is an HTTPS/REST endpoint
  [NODE_KINDS.CONTAINER]:       'HTTPS', // container/orchestrator engine API
  [NODE_KINDS.FILE_STORAGE]:    'NFS',   // network file storage protocol
  [NODE_KINDS.OBJECT_STORAGE]:  'HTTPS', // S3-style object storage is a REST API over HTTPS
  [NODE_KINDS.ONPREMISE]:       'VPN',   // reaching an on-prem network typically goes over a VPN tunnel
  [NODE_KINDS.MAINFRAME]:       'MQ',    // IBM MQ is the standard mainframe integration middleware
  [NODE_KINDS.CLOUD]:           'HTTPS', // cloud provider APIs are HTTPS
  [NODE_KINDS.EXTERNAL]:        'HTTPS', // third-party integrations are HTTPS
  [NODE_KINDS.AI_MODEL]:        'HTTPS', // LLM/model provider APIs are HTTPS
  [NODE_KINDS.AI_AGENT]:        'HTTPS',
  [NODE_KINDS.MCP_SERVER]:      'MCP',   // Model Context Protocol — a real named protocol
  [NODE_KINDS.AI_TOOL]:         'MCP',   // AI tools are increasingly wired up via MCP
  [NODE_KINDS.PROMPT_TEMPLATE]: 'HTTPS',
  [NODE_KINDS.KNOWLEDGE_BASE]:  'HTTPS',
  [NODE_KINDS.RAG_PIPELINE]:    'HTTPS',
  [NODE_KINDS.GUARDRAILS]:      'HTTPS',
  [NODE_KINDS.AI_WORKFLOW]:     'HTTPS',
  [NODE_KINDS.VECTOR_DB]:       'gRPC',  // common in Milvus/Qdrant-style vector databases
  [NODE_KINDS.LOGGING]:         'Syslog', // RFC 5424 — the standard logging protocol
  [NODE_KINDS.METRICS]:         'HTTPS', // scraped/pushed over HTTP(S), e.g. Prometheus/OTLP-HTTP
  [NODE_KINDS.MONITORING]:      'HTTPS',
  [NODE_KINDS.TRACING]:         'OTLP',  // OpenTelemetry Protocol — the standard tracing protocol
  [NODE_KINDS.ALERTING]:        'HTTPS', // alerts are typically dispatched via HTTP webhook
  [NODE_KINDS.IAM]:             'OAuth2',
  [NODE_KINDS.OAUTH2]:          'OAuth2', // the node's own kind is the protocol
  [NODE_KINDS.KEY_VAULT]:       'HTTPS', // secret managers expose an HTTPS API
  [NODE_KINDS.SECRETS]:         'HTTPS',
  [NODE_KINDS.SECURITY]:        'HTTPS',
  [NODE_KINDS.API_SECURITY]:    'HTTPS',
  [NODE_KINDS.BANK]:            'SWIFT',  // interbank/correspondent messaging standard
  [NODE_KINDS.TOKENIZATION]:    'HTTPS',  // token vault API
  [NODE_KINDS.RISK]:            'HTTPS',  // risk/fraud engine API
  // System Design Kit
  [NODE_KINDS.GRAPHQL]:              'HTTPS',
  [NODE_KINDS.SERVERLESS]:           'HTTPS',
  [NODE_KINDS.TIME_SERIES_DB]:       'HTTP',
  [NODE_KINDS.DATA_WAREHOUSE]:       'JDBC',
  [NODE_KINDS.DATA_LAKE]:            'HTTPS',
  [NODE_KINDS.SEARCH_ENGINE]:        'HTTPS',
  [NODE_KINDS.BI_REPORTING]:         'JDBC',
  [NODE_KINDS.INTERNET]:             'HTTPS',
  [NODE_KINDS.DNS]:                  'DNS',
  [NODE_KINDS.REVERSE_PROXY]:        'HTTPS',
  [NODE_KINDS.VPN]:                  'IPsec',
  [NODE_KINDS.VIRTUAL_MACHINE]:      'SSH',
  [NODE_KINDS.STREAMING]:            'Kafka',
  [NODE_KINDS.ESB]:                  'SOAP',
  [NODE_KINDS.IPAAS]:                'HTTPS',
  [NODE_KINDS.EMAIL]:                'SMTP',
  [NODE_KINDS.PAYMENT_NETWORK]:      'ISO 8583',
  [NODE_KINDS.APM]:                  'OTLP',
  [NODE_KINDS.DASHBOARD]:            'HTTPS',
  [NODE_KINDS.HSM]:                  'PKCS#11',
  [NODE_KINDS.EMBEDDINGS]:           'HTTPS',
  [NODE_KINDS.ARTIFACT_REGISTRY]:    'HTTPS',
};

/** Suggests a protocol label for a new connection based on the kind of the two nodes it joins. Blank if none is known. */
export function inferConnectionLabel(sourceKind?: NodeKind, targetKind?: NodeKind): string {
  if ((sourceKind && HUMAN_KINDS.has(sourceKind)) || (targetKind && HUMAN_KINDS.has(targetKind))) return '';
  if (sourceKind && CLIENT_KINDS.has(sourceKind)) return 'HTTPS';
  if (targetKind && PROTOCOL_BY_TARGET[targetKind]) return PROTOCOL_BY_TARGET[targetKind]!;
  return '';
}

export function createAnimatedEdge(params: {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  label?: string;
  sourceKind?: NodeKind;
  targetKind?: NodeKind;
}): SoftwareEdge {
  return {
    id: `edge-${params.source}-${params.target}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    source: params.source,
    target: params.target,
    sourceHandle: params.sourceHandle,
    targetHandle: params.targetHandle,
    type: 'smoothstep',
    animated: false,
    label: params.label?.trim() || inferConnectionLabel(params.sourceKind, params.targetKind),
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 1.9 },
    data: { dashed: false, shape: 'smooth' as const },
  };
}

/** A C4 relationship: grey, dashed, straight, with a filled arrowhead. */
export function createC4Edge(params: {
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}): SoftwareEdge {
  return {
    id: `edge-${params.source}-${params.target}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    source: params.source,
    target: params.target,
    sourceHandle: params.sourceHandle,
    targetHandle: params.targetHandle,
    type: 'smoothstep',
    animated: false,
    label: '',
    markerEnd: { type: MarkerType.ArrowClosed, color: C4_GREY },
    style: { stroke: C4_GREY, strokeWidth: 1.9 },
    data: { dashed: true, shape: 'straight' as const, c4: true, technology: '' },
  };
}

export function createC4Node(params: { entry: C4PaletteEntry; position: XYPosition }): C4Node | null {
  if (!params.entry.node) return null;
  const size = getC4NodeSize(params.entry.node.shape);
  return {
    id: `c4-${params.entry.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'c4Node',
    position: params.position,
    width: size.width,
    height: size.height,
    data: { ...params.entry.node },
  };
}

export function createC4Boundary(params: { entry: C4PaletteEntry; position: XYPosition }): C4BoundaryNode | null {
  if (!params.entry.boundary) return null;
  return {
    id: `c4-${params.entry.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'c4Boundary',
    position: params.position,
    width: C4_BOUNDARY_SIZE.width,
    height: C4_BOUNDARY_SIZE.height,
    zIndex: -1,
    data: { ...params.entry.boundary },
  };
}

export function createC4Title(params: { entry: C4PaletteEntry; position: XYPosition }): C4TitleNode | null {
  if (!params.entry.title) return null;
  return {
    id: `c4-${params.entry.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'c4Title',
    position: params.position,
    data: { ...params.entry.title },
  };
}

export function createIconNode(params: {
  item: PaletteItem;
  position: XYPosition;
}): IconNode {
  const kind = params.item.type || NODE_KINDS.BACKEND;
  return {
    id: `icon-${kind}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'iconNode',
    position: params.position,
    data: {
      label: params.item.label,
      subtitle: params.item.subtitle,
      description: params.item.description,
      kind,
      icon: kind,
    },
  };
}

export function createGroupNode(params: { position: XYPosition }): GroupNode {
  return {
    id: `group-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'groupNode',
    position: params.position,
    style: { width: 460, height: 320 },
    zIndex: -1,
    data: { label: 'Zona / Dominio', color: '#1D5A96', dashed: true, rounded: true },
  };
}

export function createLabelNode(params: { position: XYPosition }): LabelNode {
  return {
    id: `label-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'labelNode',
    position: params.position,
    data: { text: 'Etiqueta', color: '#7A5A22', rotation: 0, bold: false },
  };
}

export function createAnnotationNode(params: {
  position: XYPosition;
  icon: string;
  label: string;
  color: string;
  bg: string;
}): AnnotationNode {
  return {
    id: `annotation-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'annotationNode',
    position: params.position,
    data: { icon: params.icon, label: params.label, color: params.color, bg: params.bg },
  };
}

export function buildNodeFormFromNode(node: SoftwareNode | null): NodeFormData {
  return {
    label: node?.data?.label || '',
    subtitle: node?.data?.subtitle || '',
    description: node?.data?.description || '',
    kind: node?.data?.kind || NODE_KINDS.BACKEND,
  };
}

export function buildEdgeFormFromEdge(edge: SoftwareEdge | null): EdgeFormData {
  return {
    label: typeof edge?.label === 'string' ? edge.label : '',
  };
}
