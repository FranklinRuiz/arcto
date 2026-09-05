import type { PropsWithChildren, ReactElement } from 'react';
import { NODE_KINDS, type NodeKind } from '../../types/diagram.types';

type IconProps = { size?: number | string };
type IconBaseProps = PropsWithChildren<IconProps>;

/**
 * Shared 24x24 icon shell — pure stroke, currentColor, inherited weight.
 */
function IconBase({ children, size = 22 }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function BoxIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="7" y="4" width="13" height="16" rx="2" />
      <rect x="4" y="7" width="6" height="3.2" rx="1.1" />
      <rect x="4" y="13.8" width="6" height="3.2" rx="1.1" />
    </IconBase>
  );
}

export function UserIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20.5a7 7 0 0 1 14 0" />
    </IconBase>
  );
}

export function MonitorIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M12 16.5v4M8 20.5h8" />
    </IconBase>
  );
}

export function SmartphoneIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.6" />
      <path d="M10.6 5.4h2.8" strokeWidth="1.3" />
      <circle cx="12" cy="18.4" r="1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function GatewayIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="9.5" y="3" width="5" height="18" rx="1.6" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M2.5 8h5M2.5 16h5M16.5 8h5M16.5 16h5" strokeWidth="1.3" />
    </IconBase>
  );
}

export function ServerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <circle cx="6.6" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="6.6" cy="16.5" r="1" fill="currentColor" stroke="none" />
      <path d="M10 7.5h7M10 16.5h7" strokeWidth="1.2" />
    </IconBase>
  );
}

export function WorkerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.75 5.75 7.3 7.3M16.7 16.7l1.55 1.55M18.25 5.75 16.7 7.3M7.3 16.7l-1.55 1.55" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="6.3" />
      <circle cx="12" cy="12" r="2.5" />
    </IconBase>
  );
}

export function ContainerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.5" y="7" width="19" height="10" rx="1.6" />
      <path d="M7.2 7v10M12 7v10M16.8 7v10" strokeWidth="1.2" />
    </IconBase>
  );
}

export function KubernetesIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 2.4 19.8 6.1l1.9 8.4-5.4 6.8H7.7l-5.4-6.8L4.2 6.1 12 2.4Z" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 9.4V5.2M14.3 10.5l3.6-2M13.6 14.1l2.5 3.4M10.4 14.1l-2.5 3.4M9.7 10.5l-3.6-2" strokeWidth="1.2" />
    </IconBase>
  );
}

export function OnPremiseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M4.5 20.8V4.2a1.2 1.2 0 0 1 1.2-1.2h8.6a1.2 1.2 0 0 1 1.2 1.2v16.6" />
      <path d="M15.5 9.4h3.8a1.2 1.2 0 0 1 1.2 1.2v10.2" />
      <path d="M3 20.8h18" />
      <path d="M7.6 6.6h1.6M11 6.6h1.6M7.6 10.4h1.6M11 10.4h1.6M7.6 14.2h1.6M11 14.2h1.6M17.4 13h1.4M17.4 16.4h1.4" strokeWidth="1.2" />
    </IconBase>
  );
}

export function MainframeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3.5" y="3" width="17" height="18" rx="2" />
      <path d="M3.5 12.4h17" />
      <circle cx="7.2" cy="16.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.6" cy="16.6" r="1" fill="currentColor" stroke="none" />
      <path d="M13.8 16.6h3.4" strokeWidth="1.3" />
    </IconBase>
  );
}

export function CloudIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M6.6 19h11.1a4 4 0 0 0 .5-7.97A6.1 6.1 0 0 0 6.9 10.1 4.45 4.45 0 0 0 6.6 19Z" />
    </IconBase>
  );
}

export function GlobeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.3 12h17.4" />
      <path d="M12 3c-2.9 2.5-4.4 5.5-4.4 9s1.5 6.5 4.4 9c2.9-2.5 4.4-5.5 4.4-9S14.9 5.5 12 3Z" />
    </IconBase>
  );
}

export function LoadBalancerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="4.2" cy="12" r="2.3" />
      <path d="M6.6 12h3.4M10 12c2.4 0 1.4-5.4 3.6-5.4M10 12h3.6M10 12c2.4 0 1.4 5.4 3.6 5.4" strokeWidth="1.3" />
      <rect x="13.6" y="4.6" width="7.9" height="4" rx="1.3" />
      <rect x="13.6" y="10" width="7.9" height="4" rx="1.3" />
      <rect x="13.6" y="15.4" width="7.9" height="4" rx="1.3" />
    </IconBase>
  );
}

export function CdnIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="13.4" r="5.8" />
      <path d="M6.2 13.4h11.6" />
      <path d="M12 7.6c-1.7 1.8-2.6 3.7-2.6 5.8s.9 4 2.6 5.8c1.7-1.8 2.6-3.7 2.6-5.8s-.9-4-2.6-5.8Z" />
      <circle cx="4.2" cy="4.6" r="2" />
      <circle cx="19.8" cy="4.6" r="2" />
      <path d="M5.8 6 8.4 8.8M18.2 6 15.6 8.8" strokeWidth="1.2" />
    </IconBase>
  );
}

export function ServiceMeshIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="6.3" cy="6.3" r="2.4" />
      <circle cx="17.7" cy="6.3" r="2.4" />
      <circle cx="6.3" cy="17.7" r="2.4" />
      <circle cx="17.7" cy="17.7" r="2.4" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M8.7 6.3h6.6M6.3 8.7v6.6M17.7 8.7v6.6M8.7 17.7h6.6" strokeWidth="1.2" />
      <path d="M8.1 8.1l2.2 2.2M15.9 8.1l-2.2 2.2M8.1 15.9l2.2-2.2M15.9 15.9l-2.2-2.2" strokeWidth="1.2" />
    </IconBase>
  );
}

export function DatabaseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" />
      <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" />
    </IconBase>
  );
}

export function CacheIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.5" y="6.4" width="19" height="9.6" rx="1.6" />
      <path d="M6.5 16v2.6M10 16v2.6M14 16v2.6M17.5 16v2.6" strokeWidth="1.2" />
      <path d="M13 8.4 10.2 12.3h2.2l-.8 2.7 2.9-4h-2.2l.9-2.6Z" strokeWidth="1.2" />
    </IconBase>
  );
}

export function QueueIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M2 7.4h20M2 16.6h20" strokeWidth="1.3" />
      <rect x="4.4" y="10" width="3.4" height="4" rx="0.9" />
      <rect x="9.2" y="10" width="3.4" height="4" rx="0.9" />
      <rect x="14" y="10" width="3.4" height="4" rx="0.9" />
      <path d="M18.6 12h2.6M20.1 10.8 21.3 12l-1.2 1.2" strokeWidth="1.2" />
    </IconBase>
  );
}

export function ObjectStorageIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M4.2 7h15.6l-1.35 12.4a2 2 0 0 1-1.99 1.8H7.54a2 2 0 0 1-1.99-1.8L4.2 7Z" />
      <path d="M2.9 7h18.2" />
      <circle cx="12" cy="13.6" r="2.4" />
    </IconBase>
  );
}

export function FileStorageIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M3 6.6a1.8 1.8 0 0 1 1.8-1.8h3.8l1.9 2.4h7.7A1.8 1.8 0 0 1 20 9v9.2a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 18.2V6.6Z" />
      <path d="M7.8 12.4h8M7.8 15.6h5.2" strokeWidth="1.3" />
    </IconBase>
  );
}

export function VectorDbIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <ellipse cx="12" cy="5.6" rx="7" ry="2.8" />
      <path d="M5 5.6v12.8c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V5.6" />
      <path d="M8.4 17.6 12.9 12.6M8.4 17.6 15.5 15.4" strokeWidth="1.2" />
      <circle cx="13.2" cy="12.2" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="15.9" cy="15.2" r="0.95" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function EtlIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <ellipse cx="4.4" cy="7.6" rx="2.8" ry="1.3" />
      <path d="M1.6 7.6v6.3c0 .72 1.25 1.3 2.8 1.3s2.8-.58 2.8-1.3V7.6" />
      <path d="M8.2 12.2h5.4M11.8 10.4 13.8 12.2l-2 1.8" strokeWidth="1.5" />
      <ellipse cx="19.4" cy="9.9" rx="2.6" ry="1.2" />
      <path d="M16.8 9.9v6.3c0 .68 1.16 1.2 2.6 1.2s2.6-.52 2.6-1.2V9.9" />
    </IconBase>
  );
}

export function KnowledgeBaseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M13.9 3H6.4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10.2a2 2 0 0 0 2-2V7.6L13.9 3Z" />
      <path d="M13.9 3v3.6a1 1 0 0 0 1 1h3.7" />
      <circle cx="8.6" cy="12.4" r="1.3" />
      <circle cx="14" cy="11.2" r="1.3" />
      <circle cx="12.2" cy="16.8" r="1.3" />
      <path d="M9.9 12.1 12.7 11.5M9.4 13.5 11.4 15.6" strokeWidth="1.1" />
    </IconBase>
  );
}

export function MetricsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M4 3.5v17h16.5" />
      <rect x="7" y="12.8" width="3.2" height="7.7" rx="0.9" />
      <rect x="11.6" y="8.8" width="3.2" height="11.7" rx="0.9" />
      <rect x="16.2" y="5.8" width="3.2" height="14.7" rx="0.9" />
    </IconBase>
  );
}

export function EventBusIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.5" y="10.6" width="19" height="2.8" rx="1.4" />
      <circle cx="6.5" cy="5" r="2.2" />
      <circle cx="13.5" cy="5" r="2.2" />
      <circle cx="9" cy="19" r="2.2" />
      <circle cx="17" cy="19" r="2.2" />
      <path d="M6.5 7.2v3.4M13.5 7.2v3.4M9 13.4v3.3M17 13.4v3.3" strokeWidth="1.3" />
      <path d="M8.1 15.7 9 16.7l.9-1M16.1 15.7 17 16.7l.9-1" strokeWidth="1.2" />
    </IconBase>
  );
}

export function PubSubIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M1.8 12h4.4M4.6 10.4 6.2 12l-1.6 1.6" strokeWidth="1.3" />
      <rect x="6.8" y="7.4" width="5.4" height="9.2" rx="1.5" />
      <path d="M12.4 12h2.2M14.6 12c1.6 0 1.2-4.6 2.6-4.6M14.6 12c1.6 0 1.2 4.6 2.6 4.6" strokeWidth="1.3" />
      <circle cx="19.6" cy="7.4" r="1.9" />
      <circle cx="19.6" cy="16.6" r="1.9" />
    </IconBase>
  );
}

export function WebhookIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2" y="13.4" width="6.2" height="6.2" rx="1.6" />
      <rect x="15.8" y="4.4" width="6.2" height="6.2" rx="1.6" />
      <path d="M8.6 15.6c4.4 0 3.2-8.1 7.2-8.1" strokeWidth="1.4" />
      <path d="M14.4 6.2 15.9 7.5l-1.5 1.3" strokeWidth="1.3" />
    </IconBase>
  );
}

export function McpServerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.6" y="6.8" width="9.8" height="10.4" rx="2" />
      <circle cx="7.5" cy="12" r="2.3" />
      <path d="M12.6 9.8h3.6M12.6 14.2h3.6" strokeWidth="1.4" />
      <rect x="16.4" y="8.8" width="5.2" height="6.4" rx="1.5" />
    </IconBase>
  );
}

export function GuardrailsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3.5" y="6.5" width="3.8" height="11" rx="1.3" />
      <rect x="16.7" y="6.5" width="3.8" height="11" rx="1.3" />
      <path d="M4.6 9.6h1.6M4.6 12h1.6M4.6 14.4h1.6M17.8 9.6h1.6M17.8 12h1.6M17.8 14.4h1.6" strokeWidth="1.1" />
      <path d="M9.2 14.4h5.4M12.6 12.4 14.6 14.4l-2 2" strokeWidth="1.4" />
      <path d="M9.6 9.6 11 11l3-3.4" strokeWidth="1.3" />
    </IconBase>
  );
}

export function LoggingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M8.6 12h6.8M8.6 15.2h6.8M8.6 18.4h4.2" strokeWidth="1.3" />
    </IconBase>
  );
}

export function MonitoringIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M6 12.5 9.2 9l2.8 2.2 3.4-4L18.6 9.6" strokeWidth="1.4" />
      <path d="M12 16.5v4M8 20.5h8" />
    </IconBase>
  );
}

export function TracingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="5" width="18" height="3.2" rx="1.6" />
      <rect x="6.6" y="10.4" width="11" height="3.2" rx="1.6" />
      <rect x="10.2" y="15.8" width="8" height="3.2" rx="1.6" />
      <path d="M6.6 8.2v2.2M10.2 13.6v2.2" strokeWidth="1.2" />
    </IconBase>
  );
}

export function AlertingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M6.4 10.6a5.6 5.6 0 0 1 11.2 0v5l1.8 2.2H4.6l1.8-2.2v-5Z" />
      <path d="M10 18.2a2 2 0 0 0 4 0" />
      <path d="M12 3v2" strokeWidth="1.3" />
    </IconBase>
  );
}

export function ShieldIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 3 5 6v5.4c0 4.4 2.9 8.4 7 9.6 4.1-1.2 7-5.2 7-9.6V6l-7-3Z" />
      <path d="M9.2 11.8 11.3 14l3.6-4.4" strokeWidth="1.4" />
    </IconBase>
  );
}

export function ApiSecurityIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 3 5 6v5.4c0 4.4 2.9 8.4 7 9.6 4.1-1.2 7-5.2 7-9.6V6l-7-3Z" />
      <path d="M10 10.2 8.3 12l1.7 1.8M14 10.2 15.7 12 14 13.8M12.7 9.6l-1.4 4.8" strokeWidth="1.2" />
    </IconBase>
  );
}

export function IamIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="8.6" cy="7.6" r="3.2" />
      <path d="M2.6 20.5a6 6 0 0 1 12 0" />
      <circle cx="18.2" cy="8.6" r="2.5" />
      <path d="M17 10.9 15.2 15M16.1 12.9h1.8" strokeWidth="1.3" />
    </IconBase>
  );
}

export function OAuth2Icon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.2" y="9" width="6" height="6" rx="1.6" />
      <path d="M8.8 12h3.4M10.6 10.2 12.4 12l-1.8 1.8" strokeWidth="1.3" />
      <rect x="14" y="11.8" width="6.6" height="5.8" rx="1.3" />
      <path d="M15.6 11.8v-1.4a1.7 1.7 0 0 1 3.4 0v1.4" strokeWidth="1.3" />
    </IconBase>
  );
}

export function KeyVaultIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.5" y="4" width="15.5" height="16" rx="2" />
      <circle cx="10.2" cy="12" r="3.6" />
      <path d="M10.2 6.8v1.6M10.2 15.6v1.6M5 12h1.6M13.8 12h1.6" strokeWidth="1.2" />
      <path d="M18 12h3" strokeWidth="1.4" />
    </IconBase>
  );
}

export function SecretsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M8 10.4V7.8a4 4 0 0 1 8 0v2.6" />
      <rect x="4.6" y="10.4" width="14.8" height="10.4" rx="2.2" />
      <circle cx="9.5" cy="15.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="15.6" r="1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function AiModelIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="4.6" cy="7" r="2.2" />
      <circle cx="4.6" cy="17" r="2.2" />
      <circle cx="19.4" cy="7" r="2.2" />
      <circle cx="19.4" cy="17" r="2.2" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M6.5 8.2 9.4 10.3M6.5 15.8 9.4 13.7M14.6 10.3 17.5 8.2M14.6 13.7 17.5 15.8" strokeWidth="1.3" />
    </IconBase>
  );
}

export function AiAgentIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="4" r="1.4" />
      <path d="M12 5.4V8" strokeWidth="1.3" />
      <rect x="5.5" y="8" width="13" height="11" rx="3" />
      <circle cx="9.8" cy="12.8" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="12.8" r="1.05" fill="currentColor" stroke="none" />
      <path d="M10 16h4M3.8 12.6h1.7M18.5 12.6h1.7" strokeWidth="1.3" />
    </IconBase>
  );
}

export function AiToolIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M8.6 3.5H7A2.5 2.5 0 0 0 4.5 6v3.5A2.5 2.5 0 0 1 2 12a2.5 2.5 0 0 1 2.5 2.5V18A2.5 2.5 0 0 0 7 20.5h1.6" />
      <path d="M15.4 3.5H17A2.5 2.5 0 0 1 19.5 6v3.5A2.5 2.5 0 0 0 22 12a2.5 2.5 0 0 0-2.5 2.5V18a2.5 2.5 0 0 1-2.5 2.5h-1.6" />
      <circle cx="12" cy="12" r="2.6" />
    </IconBase>
  );
}

export function PromptTemplateIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M13.2 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.4a2 2 0 0 0 2-2V6.4L13.2 3Z" />
      <path d="M13.2 3v2.4a1 1 0 0 0 1 1h2.2" />
      <path d="M7 11h6M7 14.4h7M7 17.8h4.4" strokeWidth="1.3" />
      <path d="M19.6 3.6 20.4 5.6 22.4 6.4 20.4 7.2 19.6 9.2 18.8 7.2 16.8 6.4 18.8 5.6Z" strokeWidth="1.2" />
    </IconBase>
  );
}

export function RagPipelineIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <ellipse cx="4.6" cy="7.4" rx="2.6" ry="1.3" />
      <path d="M2 7.4v8.2c0 .72 1.16 1.3 2.6 1.3s2.6-.58 2.6-1.3V7.4" />
      <path d="M7.6 12h1.4" strokeWidth="1.4" />
      <circle cx="13.4" cy="11.4" r="3.2" />
      <path d="m15.7 13.7 2.1 2.1" strokeWidth="1.4" />
      <rect x="18.4" y="8.6" width="3.4" height="6.8" rx="1.2" />
    </IconBase>
  );
}

export function AiWorkflowIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="3.6" cy="12" r="2.3" />
      <path d="M5.9 12h1.5M14.6 12h1.3" strokeWidth="1.4" />
      <rect x="7.7" y="8.3" width="6.6" height="7.4" rx="1.6" />
      <path d="M11 10.1 11.8 11.6 13.3 12.4 11.8 13.2 11 14.7 10.2 13.2 8.7 12.4 10.2 11.6Z" strokeWidth="1.1" />
      <path d="M18.6 8.3 22 12l-3.4 3.7L15.2 12Z" />
    </IconBase>
  );
}

export function TypeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M5 6.5V4.5h14v2M12 4.5v15M9 19.5h6" />
    </IconBase>
  );
}

export function LayerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 3 21 7.5 12 12 3 7.5 12 3Z" />
      <path d="M3.4 12.2 12 16.5l8.6-4.3" />
      <path d="M3.4 16.7 12 21l8.6-4.3" />
    </IconBase>
  );
}

export function BankIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M2.6 9.4 12 4l9.4 5.4" />
      <path d="M5.2 9.4v8.4M9.8 9.4v8.4M14.2 9.4v8.4M18.8 9.4v8.4" strokeWidth="1.3" />
      <path d="M3.2 17.8h17.6M3.2 20.6h17.6" />
    </IconBase>
  );
}

export function TokenizationIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.4" y="8" width="7.4" height="8" rx="1.6" />
      <circle cx="6.1" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M10.4 12h2.4M11.6 10.8 12.8 12l-1.2 1.2" strokeWidth="1.2" />
      <path d="M17.8 7.6 21.6 9.8v4.4l-3.8 2.2-3.8-2.2V9.8l3.8-2.2Z" />
      <circle cx="17.8" cy="12" r="1.1" />
    </IconBase>
  );
}

export function RiskIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 4.4 21.4 19.6H2.6L12 4.4Z" />
      <path d="M12 10.4v3.6" strokeWidth="1.4" />
      <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

// ─── Icon map ─────────────────────────────────────────────────────────────

export const iconMap: Record<NodeKind, (props: IconProps) => ReactElement> = {
  // Core
  [NODE_KINDS.DEFAULT]:        BoxIcon,
  [NODE_KINDS.USER]:           UserIcon,
  [NODE_KINDS.FRONTEND]:       MonitorIcon,
  [NODE_KINDS.MOBILE]:         SmartphoneIcon,
  [NODE_KINDS.GATEWAY]:        GatewayIcon,
  [NODE_KINDS.BACKEND]:        ServerIcon,
  [NODE_KINDS.DATABASE]:       DatabaseIcon,
  [NODE_KINDS.CACHE]:          CacheIcon,
  [NODE_KINDS.QUEUE]:          QueueIcon,
  [NODE_KINDS.SECURITY]:       ShieldIcon,
  [NODE_KINDS.CLOUD]:          CloudIcon,
  [NODE_KINDS.EXTERNAL]:       GlobeIcon,
  [NODE_KINDS.WORKER]:         WorkerIcon,
  [NODE_KINDS.ONPREMISE]:      OnPremiseIcon,
  [NODE_KINDS.MAINFRAME]:      MainframeIcon,
  [NODE_KINDS.AI_MODEL]:       AiModelIcon,
  [NODE_KINDS.VECTOR_DB]:      VectorDbIcon,
  [NODE_KINDS.AI_AGENT]:       AiAgentIcon,
  // Integration
  [NODE_KINDS.EVENT_BUS]:      EventBusIcon,
  [NODE_KINDS.PUBSUB]:         PubSubIcon,
  [NODE_KINDS.WEBHOOK]:        WebhookIcon,
  [NODE_KINDS.ETL]:            EtlIcon,
  [NODE_KINDS.SERVICE_MESH]:   ServiceMeshIcon,
  // Infrastructure
  [NODE_KINDS.KUBERNETES]:     KubernetesIcon,
  [NODE_KINDS.CONTAINER]:      ContainerIcon,
  [NODE_KINDS.LOAD_BALANCER]:  LoadBalancerIcon,
  [NODE_KINDS.CDN]:            CdnIcon,
  [NODE_KINDS.OBJECT_STORAGE]: ObjectStorageIcon,
  [NODE_KINDS.FILE_STORAGE]:   FileStorageIcon,
  // Observability
  [NODE_KINDS.LOGGING]:        LoggingIcon,
  [NODE_KINDS.METRICS]:        MetricsIcon,
  [NODE_KINDS.MONITORING]:     MonitoringIcon,
  [NODE_KINDS.TRACING]:        TracingIcon,
  [NODE_KINDS.ALERTING]:       AlertingIcon,
  // Security
  [NODE_KINDS.IAM]:            IamIcon,
  [NODE_KINDS.OAUTH2]:         OAuth2Icon,
  [NODE_KINDS.KEY_VAULT]:      KeyVaultIcon,
  [NODE_KINDS.SECRETS]:        SecretsIcon,
  [NODE_KINDS.API_SECURITY]:   ApiSecurityIcon,
  // AI extended
  [NODE_KINDS.MCP_SERVER]:      McpServerIcon,
  [NODE_KINDS.AI_TOOL]:         AiToolIcon,
  [NODE_KINDS.PROMPT_TEMPLATE]: PromptTemplateIcon,
  [NODE_KINDS.KNOWLEDGE_BASE]:  KnowledgeBaseIcon,
  [NODE_KINDS.RAG_PIPELINE]:    RagPipelineIcon,
  [NODE_KINDS.GUARDRAILS]:      GuardrailsIcon,
  [NODE_KINDS.AI_WORKFLOW]:     AiWorkflowIcon,
  // Arquitectura y riesgo
  [NODE_KINDS.LAYER]:           LayerIcon,
  [NODE_KINDS.BANK]:            BankIcon,
  [NODE_KINDS.TOKENIZATION]:    TokenizationIcon,
  [NODE_KINDS.RISK]:            RiskIcon,
};
