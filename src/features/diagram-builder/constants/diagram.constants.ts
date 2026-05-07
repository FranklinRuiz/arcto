import { MarkerType } from '@xyflow/react';
import { NODE_KINDS, type PaletteItem, type SoftwareEdge, type SoftwareNode } from '../types/diagram.types';

export const PALETTE: PaletteItem[] = [
  { type: NODE_KINDS.FRONTEND, label: 'Cliente Web', subtitle: 'UI / SPA' },
  { type: NODE_KINDS.BACKEND, label: 'Servicio API', subtitle: 'REST / Microservicio' },
  { type: NODE_KINDS.DATABASE, label: 'Base de Datos', subtitle: 'Persistencia' },
  { type: NODE_KINDS.CLOUD, label: 'Nube', subtitle: 'Azure / AWS' },
  { type: NODE_KINDS.SECURITY, label: 'Seguridad', subtitle: 'WAF / Firewall' },
  { type: NODE_KINDS.WORKER, label: 'Worker', subtitle: 'Proceso async' },
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
