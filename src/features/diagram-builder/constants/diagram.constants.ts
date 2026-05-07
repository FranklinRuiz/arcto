import { MarkerType } from '@xyflow/react';
import { NODE_KINDS, type PaletteItem, type SoftwareEdge, type SoftwareNode } from '../types/diagram.types';

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

export const INITIAL_NODES: SoftwareNode[] = [
  {
    id: 'frontend-1',
    type: 'softwareNode',
    position: { x: 160, y: 120 },
    data: {
      label: 'Frontend Web',
      subtitle: 'React / Angular',
      description: 'Interfaz principal consumida por usuarios finales.',
      kind: NODE_KINDS.FRONTEND,
      icon: NODE_KINDS.FRONTEND,
    },
  },
  {
    id: 'api-1',
    type: 'softwareNode',
    position: { x: 480, y: 120 },
    data: {
      label: 'API Backend',
      subtitle: 'Spring Boot / .NET',
      description: 'Expone servicios REST y contiene la lógica de negocio.',
      kind: NODE_KINDS.BACKEND,
      icon: NODE_KINDS.BACKEND,
    },
  },
  {
    id: 'db-1',
    type: 'softwareNode',
    position: { x: 800, y: 120 },
    data: {
      label: 'Base de Datos',
      subtitle: 'SQL Server / MySQL',
      description: 'Almacena la información transaccional del sistema.',
      kind: NODE_KINDS.DATABASE,
      icon: NODE_KINDS.DATABASE,
    },
  },
];

export const INITIAL_EDGES: SoftwareEdge[] = [
  {
    id: 'frontend-api',
    source: 'frontend-1',
    target: 'api-1',
    type: 'smoothstep',
    animated: true,
    label: 'HTTPS / JSON',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 3 },
  },
  {
    id: 'api-db',
    source: 'api-1',
    target: 'db-1',
    type: 'smoothstep',
    animated: true,
    label: 'JPA / Query',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 3 },
  },
];
