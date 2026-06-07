import type { PropsWithChildren, ReactElement } from 'react';
import { NODE_KINDS, type NodeKind } from '../../types/diagram.types';

type IconProps = { size?: number | string };
type IconBaseProps = PropsWithChildren<IconProps>;

/** Fixed ink color for outlines/silhouettes — accent fills use currentColor (category color) for contrast. */
const ICON_INK = '#1e293b';

function IconBase({ children, size = 22 }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={ICON_INK}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// ─── Core ────────────────────────────────────────────────────────────────────

export function BoxIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect fill="currentColor" stroke="none" x="3" y="7" width="5" height="3" rx="0.5" />
      <rect fill="currentColor" stroke="none" x="3" y="14" width="5" height="3" rx="0.5" />
      <rect x="8" y="4" width="13" height="16" rx="1.5" />
    </IconBase>
  );
}

export function UserIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </IconBase>
  );
}

export function MonitorIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M2 4h20v5H2z M4 6h2v1H4z M8 6h6v1H8z"
      />
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 22h8 M12 18v4" />
    </IconBase>
  );
}

export function SmartphoneIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <rect fill="currentColor" stroke="none" x="7.5" y="5" width="9" height="11" rx="1" />
      <circle cx="12" cy="19" r="1.2" fill={ICON_INK} />
    </IconBase>
  );
}

/** API Gateway — entry/exit endpoints flanking a routing bar */
export function GatewayIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="4.5" cy="4.5" r="2" />
      <circle cx="12" cy="4.5" r="2.5" />
      <circle cx="12" cy="4.5" r="0.8" fill={ICON_INK} />
      <circle cx="19.5" cy="4.5" r="2" />
      <path d="M6.5 4.5h3M14.5 4.5h3M12 7v3" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M2 10h20v4H2z M4 11.25h2.5v1.5H4z M9 11.25h11v1.5H9z"
      />
      <path d="M12 14v3" />
      <circle cx="4.5" cy="19.5" r="2" />
      <circle cx="12" cy="19.5" r="2.5" />
      <circle cx="12" cy="19.5" r="0.8" fill={ICON_INK} />
      <circle cx="19.5" cy="19.5" r="2" />
      <path d="M6.5 19.5h3M14.5 19.5h3" />
    </IconBase>
  );
}

export function ServerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M3 9.5h18v5H3z M5.5 11.25h2v1.5h-2z M10 11.25h9v1.5h-9z"
      />
      <rect x="3" y="3" width="18" height="5" rx="1.5" />
      <circle cx="6" cy="5.5" r="0.9" fill={ICON_INK} />
      <path d="M9 5.5h6" strokeWidth="0.9" />
      <rect x="3" y="9.5" width="18" height="5" rx="1.5" />
      <rect x="3" y="16" width="18" height="5" rx="1.5" />
      <circle cx="6" cy="18.5" r="0.9" fill={ICON_INK} />
      <path d="M9 18.5h6" strokeWidth="0.9" />
    </IconBase>
  );
}

export function DatabaseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path
        fill="currentColor" stroke="none"
        d="M4 10c0 1.66 3.58 3 8 3s8-1.34 8-3v4c0 1.66-3.58 3-8 3s-8-1.34-8-3v-4z"
      />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </IconBase>
  );
}

export function ZapIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        d="M13 2 4.09 12.56A1 1 0 0 0 5 14h6l-2 8 8.91-10.56A1 1 0 0 0 17 10h-6l2-8Z"
        fill="currentColor" stroke="none"
      />
    </IconBase>
  );
}

/** Message Queue — stacked packets + flow arrow */
export function QueueIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2" y="5" width="12" height="3.5" rx="1" />
      <rect fill="currentColor" stroke="none" x="2" y="10.25" width="12" height="3.5" rx="1" />
      <rect x="2" y="15.5" width="12" height="3.5" rx="1" />
      <path d="M14.5 12h4.5M17 9.75l2.5 2.25-2.5 2.25" strokeWidth="1.15" />
    </IconBase>
  );
}

export function ShieldIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none"
        d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4Z"
      />
      <path d="m9 12 2 2 4-5" stroke="white" strokeWidth="1.25" />
    </IconBase>
  );
}

export function CloudIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        d="M17.5 19H8a5 5 0 1 1 1.1-9.88A6 6 0 0 1 20 12.5 3.5 3.5 0 0 1 17.5 19Z"
        fill="currentColor" stroke="none"
      />
    </IconBase>
  );
}

/** On-Premise — building/data-centre */
export function OnPremiseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-5 7 5v14" />
      <rect fill="currentColor" stroke="none" x="9" y="13" width="6" height="8" />
      <path d="M9 10h6" strokeWidth="0.9" />
    </IconBase>
  );
}

/** Mainframe — tall vertical cabinet */
export function MainframeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M8 10h8v4H8z M9 11.5h1v1H9z M11 11.5h4v1h-4z"
      />
      <circle cx="9.5" cy="5.5" r="0.8" fill={ICON_INK} />
      <circle cx="12" cy="5.5" r="0.8" fill={ICON_INK} />
      <circle cx="14.5" cy="5.5" r="0.8" fill={ICON_INK} />
      <path d="M8 17h8M8 19h5" strokeWidth="0.9" />
    </IconBase>
  );
}

export function GlobeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="12" r="9" />
      <path
        fill="currentColor" stroke="none"
        d="M12 3c-2.5 2.5-4 6-4 9 0 1.4.2 2.7.5 4h7c.3-1.3.5-2.6.5-4 0-3-1.5-6.5-4-9Z"
      />
      <path d="M12 3c-2.5 2.5-4 6-4 9s1.5 6.5 4 9M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9 M3 12h18" />
    </IconBase>
  );
}

/** Worker / Job — gear ring with clock hands */
export function WorkerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle fill="currentColor" stroke="none" cx="12" cy="12" r="4.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.4 5.4l2.1 2.1M16.5 16.5l2.1 2.1M5.4 18.6l2.1-2.1M16.5 7.5l2.1-2.1" />
      <path d="M12 10.5V12l1.5 1" stroke="white" strokeWidth="0.9" />
    </IconBase>
  );
}

/** AI Model / LLM — neural network with highlighted core */
export function AiModelIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="4.5" cy="7" r="2" />
      <circle cx="4.5" cy="17" r="2" />
      <circle fill="currentColor" stroke="none" cx="12" cy="12" r="2.8" />
      <circle cx="19.5" cy="7" r="2" />
      <circle cx="19.5" cy="17" r="2" />
      <path d="M6.3 8 9.5 10.5M6.3 16 9.5 13.5M14.5 10.5 17.7 8M14.5 13.5 17.7 16" />
    </IconBase>
  );
}

/** Vector Store — 2-D embedding space with two highlighted clusters */
export function VectorDbIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M4 4v16h16" strokeWidth="0.9" />
      <circle cx="8" cy="16" r="1.8" />
      <circle fill="currentColor" stroke="none" cx="12" cy="13" r="1.8" />
      <circle cx="16" cy="9" r="1.8" />
      <circle fill="currentColor" stroke="none" cx="19" cy="6" r="1.8" />
      <path d="M9.5 15 11 13.5M13.5 12 14.8 10.5M17 8 18 7" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
    </IconBase>
  );
}

/** AI Agent — bot face with antenna and feet */
export function AiAgentIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect fill="currentColor" stroke="none" x="6" y="9" width="12" height="10" rx="2.5" />
      <circle cx="9.5" cy="13.5" r="1" fill="white" />
      <circle cx="14.5" cy="13.5" r="1" fill="white" />
      <path d="M10 16.5h4" stroke="white" strokeWidth="0.9" />
      <path d="M12 6v3" />
      <circle cx="12" cy="5" r="1.5" />
      <path d="M5 14h1M18 14h1M9 19v2M15 19v2" strokeWidth="0.9" />
    </IconBase>
  );
}

export function TypeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </IconBase>
  );
}

// ─── Integration ─────────────────────────────────────────────────────────────

/** Event Bus — publishers → horizontal bus bar → subscribers */
export function EventBusIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M3 11h18v2.5H3z"
      />
      <rect x="3" y="11" width="18" height="2.5" rx="1.25" />
      <circle cx="6.5" cy="5" r="2" />
      <circle cx="13.5" cy="5" r="2" />
      <circle cx="9" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
      <path d="M6.5 7v4M13.5 7v4M9 13.5V17M17 13.5V17" />
    </IconBase>
  );
}

/** Pub/Sub — topic node connecting publishers and subscribers */
export function PubSubIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle fill="currentColor" stroke="none" cx="12" cy="12" r="3.5" />
      <path d="M10.5 12h3M12 10.5v3" stroke="white" strokeWidth="0.9" />
      <circle cx="3.5" cy="7" r="1.8" />
      <circle cx="3.5" cy="17" r="1.8" />
      <circle cx="20.5" cy="7" r="1.8" />
      <circle cx="20.5" cy="17" r="1.8" />
      <path d="M5.3 8 9 10.5M5.3 16 9 13.5M18.7 8 15 10.5M18.7 16 15 13.5" />
    </IconBase>
  );
}

/** Webhook — source box → HTTP push arrow → curved endpoint */
export function WebhookIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect fill="currentColor" stroke="none" x="1.5" y="9" width="6" height="6" rx="1.5" />
      <path d="M7.5 12h5M10 10l2 2-2 2" strokeWidth="0.9" />
      <path d="M12 8v4h6a2 2 0 0 1 0 4h-6 M14 14l-2 2 2 2" />
    </IconBase>
  );
}

/** ETL — Extract circle → Transform box → Load cylinder */
export function EtlIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="4" cy="12" r="2.5" />
      <path d="M6.5 12h2" />
      <rect fill="currentColor" stroke="none" x="8.5" y="9.5" width="7" height="5" rx="1" />
      <path d="M11 12h2M12 11v2" stroke="white" strokeWidth="0.9" />
      <path d="M15.5 12h2" />
      <ellipse cx="20" cy="12" rx="2" ry="3.5" />
    </IconBase>
  );
}

/** Service Mesh — 4 services connected in a grid */
export function ServiceMeshIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="7" cy="7" r="2" />
      <circle fill="currentColor" stroke="none" cx="17" cy="7" r="2" />
      <circle fill="currentColor" stroke="none" cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 7h6M7 9v6M17 9v6M9 17h6" strokeWidth="0.9" />
    </IconBase>
  );
}

// ─── Infrastructure ───────────────────────────────────────────────────────────

/** Kubernetes — hexagonal outline with highlighted core and 6 spokes */
export function KubernetesIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 2l8.66 5v10L12 22l-8.66-5V7Z" />
      <circle fill="currentColor" stroke="none" cx="12" cy="12" r="2.8" />
      <path d="M12 9.2V5M12 14.8V19M8.3 10.5L4.5 7M15.7 13.5L19.5 17M8.3 13.5L4.5 17M15.7 10.5L19.5 7" strokeWidth="0.9" />
    </IconBase>
  );
}

/** Container — terminal-window frame + highlighted app block */
export function ContainerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M2 6h20v4H2z M5 7.5h1.5v1H5z M8 7.5h1.5v1H8z M11 7.5h1.5v1H11z"
      />
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <rect x="6" y="13" width="12" height="5" rx="1" />
      <path d="M9 15.5h6" strokeWidth="0.9" />
    </IconBase>
  );
}

/** Load Balancer — single input → 3 highlighted backend slots */
export function LoadBalancerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="4" cy="12" r="2.5" />
      <path d="M6.5 12h3M9.5 12l2.5-5M9.5 12h2.5M9.5 12l2.5 5" />
      <rect fill="currentColor" stroke="none" x="12" y="5" width="8.5" height="3.5" rx="1" />
      <rect x="12" y="10.25" width="8.5" height="3.5" rx="1" />
      <rect x="12" y="15.5" width="8.5" height="3.5" rx="1" />
    </IconBase>
  );
}

/** CDN — globe with highlighted polar cap + 2 edge nodes */
export function CdnIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="13" r="6" />
      <path
        fill="currentColor" stroke="none"
        d="M12 7c-1.7 1.7-2.5 3.8-2.5 6 0 1 .15 2 .45 3h4.1c.3-1 .45-2 .45-3 0-2.2-.8-4.3-2.5-6z"
      />
      <path d="M12 7c1.7 1.7 2.5 3.8 2.5 6s-.8 4.3-2.5 6 M6 13h12" />
      <circle cx="5" cy="4" r="2" />
      <circle cx="19" cy="4" r="2" />
      <path d="M6.5 5.5l3.5 4M17.5 5.5L14 9.5" strokeWidth="0.75" />
    </IconBase>
  );
}

/** Object Storage — bucket with highlighted lid + stacked object pills */
export function ObjectStorageIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M3.5 7h17l-1 5H4.5z"
      />
      <path d="M4 7h16l-2 14H6L4 7Z" />
      <path d="M3 7h18 M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M7 15h10M7 18h6" strokeWidth="0.9" />
    </IconBase>
  );
}

/** File Storage — cabinet with highlighted header band + drawers */
export function FileStorageIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M3 4h18v6H3z"
      />
      <path d="M3 10h18M3 16h18" />
      <path d="M6 13h5M6 19h4" strokeWidth="0.9" />
      <circle cx="17" cy="13" r="0.8" fill={ICON_INK} />
      <circle cx="17" cy="19" r="0.8" fill={ICON_INK} />
    </IconBase>
  );
}

// ─── Observability ────────────────────────────────────────────────────────────

/** Logging — document with highlighted header + timestamped log lines */
export function LoggingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M4 2h10v6h6v-2L14 2z"
      />
      <path d="M4 2h10l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M14 2v6h6" />
      <circle cx="7.5" cy="12" r="0.9" fill={ICON_INK} />
      <path d="M9.5 12h7" strokeWidth="0.9" />
      <circle cx="7.5" cy="15.5" r="0.9" fill={ICON_INK} />
      <path d="M9.5 15.5h5" strokeWidth="0.9" />
      <circle cx="7.5" cy="19" r="0.9" fill={ICON_INK} />
      <path d="M9.5 19h6" strokeWidth="0.9" />
    </IconBase>
  );
}

/** Metrics — bar chart with one highlighted bar */
export function MetricsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M4 4v16h16" strokeWidth="0.9" />
      <rect x="6" y="14" width="3" height="6" rx="0.5" />
      <rect fill="currentColor" stroke="none" x="11" y="8" width="3" height="12" rx="0.5" />
      <rect x="16" y="11" width="3" height="9" rx="0.5" />
    </IconBase>
  );
}

/** Monitoring — dashboard frame with highlighted header bar + line chart */
export function MonitoringIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2" y="3" width="20" height="15" rx="2" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M2 3h20v4H2z"
      />
      <circle cx="5" cy="5" r="0.7" fill="white" />
      <circle cx="7.5" cy="5" r="0.7" fill="white" />
      <path d="M4 13l3-3 3 2 4-4 5 2" strokeWidth="1.15" />
      <path d="M8 21h8M12 18v3" strokeWidth="0.9" />
    </IconBase>
  );
}

/** Tracing — root span + nested highlighted child span (Gantt-like) */
export function TracingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="7" width="18" height="2.5" rx="1" />
      <rect fill="currentColor" stroke="none" x="6" y="11.5" width="10" height="2.5" rx="1" />
      <rect x="9" y="16" width="7" height="2.5" rx="1" />
      <path d="M6 9.5v2M9 14v2" strokeWidth="0.75" />
    </IconBase>
  );
}

/** Alerting — bell + highlighted alert badge */
export function AlertingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M6 10a6 6 0 0 1 12 0v4l2 2H4l2-2v-4Z" />
      <path d="M10 18a2 2 0 0 0 4 0" />
      <circle fill="currentColor" stroke="none" cx="19" cy="5" r="3" />
    </IconBase>
  );
}

// ─── Security ─────────────────────────────────────────────────────────────────

/** IAM — user silhouette + highlighted role badge with key */
export function IamIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="8" cy="8" r="3" />
      <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle fill="currentColor" stroke="none" cx="18" cy="9" r="2.5" />
      <path d="M16.2 10.8 13 20 M14.5 16.5h2.5M14 18.5h2" strokeWidth="0.9" />
    </IconBase>
  );
}

/** OAuth2 — client box → token → highlighted auth server with lock */
export function OAuth2Icon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="1.5" y="9" width="6" height="6" rx="1.5" />
      <path d="M7.5 12h5M10.5 10.5l2 1.5-2 1.5" strokeWidth="0.9" />
      <circle fill="currentColor" stroke="none" cx="16.5" cy="12" r="4" />
      <rect x="14.5" y="11.5" width="4" height="3" rx="0.5" fill="white" />
      <path d="M15 11.5V10a1.5 1.5 0 0 1 3 0v1.5" stroke="white" strokeWidth="0.85" />
    </IconBase>
  );
}

/** Key Vault — safe door with highlighted dial */
export function KeyVaultIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="4" width="16" height="16" rx="2" />
      <circle fill="currentColor" stroke="none" cx="11" cy="12" r="3.5" />
      <circle cx="11" cy="12" r="1.2" fill="white" />
      <path d="M14.5 12h4 M19 10.5v3" strokeWidth="1.15" />
    </IconBase>
  );
}

/** Secrets Manager — highlighted padlock body with keyhole */
export function SecretsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect fill="currentColor" stroke="none" x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.5" fill="white" />
      <path d="M12 17v2" stroke="white" strokeWidth="0.9" />
    </IconBase>
  );
}

/** API Security — highlighted shield with code chevrons inside */
export function ApiSecurityIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none"
        d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4Z"
      />
      <path d="M9 10l-2 2 2 2M15 10l2 2-2 2M13 9l-2 6" stroke="white" strokeWidth="0.9" />
    </IconBase>
  );
}

// ─── AI Extended ──────────────────────────────────────────────────────────────

/** MCP Server — server rack with highlighted plug connector */
export function McpServerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M2 6h15v4H2z M5 7.5h1.5v1H5z"
      />
      <rect x="2" y="6" width="15" height="12" rx="2" />
      <path d="M2 10h15M2 14h15" />
      <circle cx="5.5" cy="12" r="0.8" fill={ICON_INK} />
      <circle cx="5.5" cy="16" r="0.8" fill={ICON_INK} />
      <rect fill="currentColor" stroke="none" x="17" y="10" width="5" height="4" rx="1" />
      <path d="M19 8v2M19 14v2" />
    </IconBase>
  );
}

/** AI Tool — function braces with highlighted core */
export function AiToolIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4c0 1.1.9 2 2 2h2 M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2" />
      <circle fill="currentColor" stroke="none" cx="12" cy="12" r="2" />
    </IconBase>
  );
}

/** Prompt Template — document with highlighted template variable + AI sparkle */
export function PromptTemplateIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="2" width="15" height="20" rx="2" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M3 2h11v6h4v-3l-4-3z"
      />
      <path d="M14 2v4h4" />
      <rect fill="currentColor" stroke="none" x="6" y="11" width="7" height="2.5" rx="0.5" />
      <path d="M6 16h9M6 18.5h5" strokeWidth="0.9" />
      <path d="M20.5 4.5l1.5-1.5M21.5 5.5l-1.5-1.5" strokeWidth="0.9" />
    </IconBase>
  );
}

/** Knowledge Base — stacked books with highlighted base volume */
export function KnowledgeBaseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect fill="currentColor" stroke="none" x="4" y="15" width="16" height="4" rx="0.8" />
      <rect x="5" y="11" width="14" height="4" rx="0.8" />
      <rect x="6" y="7" width="12" height="4" rx="0.8" />
      <path d="M9 7v12" strokeWidth="0.75" />
    </IconBase>
  );
}

/** RAG Pipeline — vector DB → highlighted retrieval core → generation box */
export function RagPipelineIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <ellipse cx="3.5" cy="12" rx="2" ry="3.5" />
      <path d="M5.5 12h3M7 10.5l2 1.5-2 1.5" strokeWidth="0.9" />
      <circle fill="currentColor" stroke="none" cx="12" cy="12" r="3" />
      <circle cx="11.2" cy="11.2" r="1.2" fill="white" />
      <path d="M12.2 12.2l1.5 1.5" stroke="white" strokeWidth="0.9" />
      <path d="M15.5 12h2.5M16.5 10.5l2 1.5-2 1.5" strokeWidth="0.9" />
      <rect x="18" y="9" width="4" height="6" rx="1" />
    </IconBase>
  );
}

/** Guardrails — two barrier gates flanking a checked channel */
export function GuardrailsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M3 12h18" strokeWidth="0.9" />
      <rect x="6" y="8" width="3" height="8" rx="0.8" />
      <rect x="15" y="8" width="3" height="8" rx="0.8" />
      <path d="M6.5 6l1 1 2-2M15.5 6l1 1 2-2" strokeWidth="0.9" />
      <path fill="currentColor" stroke="none" d="M12 5l-1.5 3h3L12 5Z" />
    </IconBase>
  );
}

/** AI Workflow — start node → highlighted AI step box → diamond branch */
export function AiWorkflowIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="3" cy="12" r="2" />
      <path d="M5 12h2" strokeWidth="0.9" />
      <rect fill="currentColor" stroke="none" x="7" y="9" width="5.5" height="6" rx="1" />
      <circle cx="9.75" cy="12" r="1.2" fill="white" />
      <path d="M12.5 12h2" strokeWidth="0.9" />
      <path d="M18 8.5l3 3.5-3 3.5-3-3.5 3-3.5Z" />
    </IconBase>
  );
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

export const iconMap: Record<NodeKind, (props: IconProps) => ReactElement> = {
  // Core
  [NODE_KINDS.DEFAULT]:        BoxIcon,
  [NODE_KINDS.USER]:           UserIcon,
  [NODE_KINDS.FRONTEND]:       MonitorIcon,
  [NODE_KINDS.MOBILE]:         SmartphoneIcon,
  [NODE_KINDS.GATEWAY]:        GatewayIcon,
  [NODE_KINDS.BACKEND]:        ServerIcon,
  [NODE_KINDS.DATABASE]:       DatabaseIcon,
  [NODE_KINDS.CACHE]:          ZapIcon,
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
};
