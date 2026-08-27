import type { PropsWithChildren, ReactElement } from 'react';
import { NODE_KINDS, type NodeKind } from '../../types/diagram.types';

type IconProps = { size?: number | string };
type IconBaseProps = PropsWithChildren<IconProps>;

/**
 * Shared 24x24 icon shell.
 * Outline uses --icon-ink (navy on light backgrounds by default); accent
 * masses use currentColor; inner marks drawn over an accent mass use
 * --icon-paper. Both variables can be overridden per-context — e.g. a solid
 * color badge on the canvas sets --icon-ink: #fff and color: #fff so the
 * whole glyph reads white, while --icon-paper is set to the badge's own
 * accent color so cut-out details stay legible against it.
 */
function IconBase({ children, size = 22 }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--icon-ink, #1e293b)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// ─── Base y actores ────────────────────────────────────────────────────────

export function BoxIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="6" y="4" width="15" height="16" rx="2.5" />
      <rect x="2.5" y="7" width="6" height="3.4" rx="1.2" fill="currentColor" stroke="none" />
      <rect x="2.5" y="13.6" width="6" height="3.4" rx="1.2" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function UserIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="8.2" r="3.7" fill="currentColor" stroke="none" />
      <path d="M4.5 20.5c0-4.1 3.36-7.4 7.5-7.4s7.5 3.3 7.5 7.4" />
    </IconBase>
  );
}

export function MonitorIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M4.5 4h15A2.5 2.5 0 0 1 22 6.5v3H2v-3A2.5 2.5 0 0 1 4.5 4Z M4.4 6.05h1.7v1.4H4.4Z M7.9 6.05h6.4v1.4H7.9Z"
      />
      <rect x="2" y="4" width="20" height="14" rx="2.5" />
      <path d="M12 18v3M8.5 21h7" />
    </IconBase>
  );
}

export function SmartphoneIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="5.5" y="2" width="13" height="20" rx="3" />
      <rect x="7.6" y="5.4" width="8.8" height="11.4" rx="1.2" fill="currentColor" stroke="none" />
      <path d="M10.6 3.6h2.8" strokeWidth="1.2" />
      <path d="M10.4 19.4h3.2" strokeWidth="1.6" />
    </IconBase>
  );
}

export function GatewayIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M2.5 8h9M2.5 12h9M2.5 16h9" strokeWidth="1.4" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M14.5 4a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-5 0v-11A2.5 2.5 0 0 1 14.5 4Z M12.9 12a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0Z"
      />
      <path d="M17.8 9.4h3.7M17.8 14.6h2.7" strokeWidth="1.4" />
    </IconBase>
  );
}

export function ServerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="3" width="18" height="5.5" rx="1.6" />
      <circle cx="6.3" cy="5.75" r="1.05" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <path d="M9.5 5.75h8" strokeWidth="1.2" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M4.6 9.25h14.8A1.6 1.6 0 0 1 21 10.85v2.3a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 13.15v-2.3a1.6 1.6 0 0 1 1.6-1.6Z M5.25 12a1.05 1.05 0 1 0 2.1 0 1.05 1.05 0 1 0-2.1 0Z M9.5 11.4h8v1.2h-8Z"
      />
      <rect x="3" y="15.5" width="18" height="5.5" rx="1.6" />
      <circle cx="6.3" cy="18.25" r="1.05" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <path d="M9.5 18.25h8" strokeWidth="1.2" />
    </IconBase>
  );
}

// ─── Datos ───────────────────────────────────────────────────────────────

export function DatabaseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill="currentColor" stroke="none" d="M12 2.5c4.42 0 8 1.12 8 2.5s-3.58 2.5-8 2.5-8-1.12-8-2.5 3.58-2.5 8-2.5Z" />
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M20 5v14c0 1.38-3.58 2.5-8 2.5s-8-1.12-8-2.5V5" />
      <path d="M4 10.6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5" />
      <path d="M4 16.2c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5" />
    </IconBase>
  );
}

export function CacheIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
      <path d="M9 2v2.5M15 2v2.5M9 19.5V22M15 19.5V22M2 9h2.5M2 15h2.5M19.5 9H22M19.5 15H22" strokeWidth="1.4" />
      <path fill="currentColor" stroke="none" d="M13.6 6.8 8.7 13.3h2.9L10.4 17.6 15.5 11h-3.1l1.2-4.2Z" />
    </IconBase>
  );
}

export function QueueIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M8.4 3.6h7.2M6 6.6h12" strokeWidth="1.4" />
      <path fill="currentColor" stroke="none" d="M5.4 9.4h13.2a2.6 2.6 0 0 1 2.4 1.6L12 16.6 3 11a2.6 2.6 0 0 1 2.4-1.6Z" />
      <rect x="3" y="9.4" width="18" height="11.2" rx="2.6" />
      <path d="M3.4 10.6 12 16.4l8.6-5.8" />
    </IconBase>
  );
}

export function ObjectStorageIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill="currentColor" stroke="none" d="M3.7 6.6h16.6l-.55 5.2H4.25L3.7 6.6Z" />
      <path d="M3.7 6.6h16.6l-1.35 13.1a2 2 0 0 1-1.99 1.8H7.04a2 2 0 0 1-1.99-1.8L3.7 6.6Z" />
      <path d="M2.6 6.6h18.8" />
      <rect x="7.2" y="14.2" width="9.6" height="2" rx="1" />
      <rect x="8.4" y="17.6" width="7.2" height="2" rx="1" />
    </IconBase>
  );
}

export function FileStorageIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M5.5 3.5h13a2 2 0 0 1 2 2v3.6H3.5V5.5a2 2 0 0 1 2-2Z M8.2 5.6h7.6v1.4H8.2Z"
      />
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 9.1h17M3.5 14.8h17" />
      <path d="M8.4 12h4.4M8.4 17.7h4.4" strokeWidth="1.4" />
    </IconBase>
  );
}

export function VectorDbIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M4 3.5v17h16.5" />
      <circle cx="8.2" cy="15.6" r="2.3" fill="currentColor" stroke="none" />
      <circle cx="12.6" cy="12.2" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="16.6" cy="8.6" r="2.3" fill="currentColor" stroke="none" />
      <circle cx="20" cy="5.4" r="2" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function EtlIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="4.2" cy="12" r="3.2" fill="currentColor" stroke="none" />
      <path d="M7.6 12h1.4" strokeWidth="1.6" />
      <rect x="9.2" y="8.4" width="6.6" height="7.2" rx="1.6" fill="currentColor" stroke="none" />
      <path d="m11.1 10.3 1.5 1.7-1.5 1.7M13.4 10.3l1.5 1.7-1.5 1.7" stroke="var(--icon-paper, #fff)" strokeWidth="1.2" />
      <path d="M16.2 12h1.4" strokeWidth="1.6" />
      <path fill="currentColor" stroke="none" d="M17.6 9.4c0-.78 1.03-1.4 2.3-1.4s2.3.62 2.3 1.4v5.2c0 .78-1.03 1.4-2.3 1.4s-2.3-.62-2.3-1.4V9.4Z" />
    </IconBase>
  );
}

// ─── Infraestructura ───────────────────────────────────────────────────────

export function ShieldIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill="currentColor" d="M12 2.6 4.2 6v5.6c0 4.9 3.3 9.4 7.8 10.7 4.5-1.3 7.8-5.8 7.8-10.7V6L12 2.6Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.9" stroke="var(--icon-paper, #fff)" strokeWidth="1.7" />
    </IconBase>
  );
}

export function CloudIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill="currentColor" d="M6.9 19.4a4.9 4.9 0 0 1 .5-9.78 6.3 6.3 0 0 1 11.6 1.6 4.1 4.1 0 0 1-.6 8.18H6.9Z" />
    </IconBase>
  );
}

export function OnPremiseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M4.5 5.5h15a2 2 0 0 1 2 2V10H2.5V7.5a2 2 0 0 1 2-2Z M4.9 7.1h1.8v1.4H4.9Z M8.3 7.1h1.8v1.4H8.3Z M11.7 7.1h1.8v1.4h-1.8Z M15.1 7.1h1.8v1.4h-1.8Z"
      />
      <rect x="2.5" y="5.5" width="19" height="15.5" rx="2.5" />
      <path d="M2.5 10h19" />
      <rect x="10" y="15.4" width="4" height="5.6" rx="0.6" fill="currentColor" stroke="none" />
      <path d="M5.4 13.4h3.6M15 13.4h3.6" strokeWidth="1.4" />
    </IconBase>
  );
}

export function MainframeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M4.6 5.6h14.8v5H4.6Z M6.1 7.4h4.4v1.4H6.1Z M11.9 7.4h6v1.4h-6Z"
      />
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M3 12.6h18" />
      <circle cx="6.5" cy="15.4" r="1.05" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <circle cx="9.8" cy="15.4" r="1.05" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <circle cx="13.1" cy="15.4" r="1.05" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <path d="M6 18.4h12" strokeWidth="1.4" />
    </IconBase>
  );
}

export function GlobeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M3.3 9.4h17.4M3.3 14.6h17.4" stroke="var(--icon-paper, #fff)" strokeWidth="1.3" />
      <path
        d="M12 3v18M12 3c-2.8 2.5-4.3 5.6-4.3 9s1.5 6.5 4.3 9c2.8-2.5 4.3-5.6 4.3-9s-1.5-6.5-4.3-9Z"
        stroke="var(--icon-paper, #fff)" strokeWidth="1.3"
      />
    </IconBase>
  );
}

export function WorkerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor"
        d="M9.98 5.4 10.37 2.74h3.26L14.02 5.4a6.9 6.9 0 0 1 1.22.51L17.39 4.3l2.31 2.31-1.61 2.15a6.9 6.9 0 0 1 .51 1.22l2.66.39v3.26l-2.66.39a6.9 6.9 0 0 1-.51 1.22l1.61 2.15-2.31 2.31-2.15-1.61a6.9 6.9 0 0 1-1.22.51l-.39 2.66h-3.26l-.39-2.66a6.9 6.9 0 0 1-1.22-.51L6.61 19.7 4.3 17.39l1.61-2.15a6.9 6.9 0 0 1-.51-1.22l-2.66-.39v-3.26l2.66-.39a6.9 6.9 0 0 1 .51-1.22L4.3 6.61 6.61 4.3l2.15 1.61a6.9 6.9 0 0 1 1.22-.51Z"
      />
      <circle cx="12" cy="12" r="3" fill="var(--icon-paper, #fff)" />
    </IconBase>
  );
}

export function ContainerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M4.5 4.5h15a2 2 0 0 1 2 2v2.3H2.5V6.5a2 2 0 0 1 2-2Z M5.1 5.95h1.5v1.4H5.1Z M7.7 5.95h1.5v1.4H7.7Z M10.3 5.95h1.5v1.4h-1.5Z"
      />
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M2.5 8.8h19" />
      <rect x="6" y="12" width="12" height="4.6" rx="1.4" />
      <path d="M9 14.3h6" strokeWidth="1.3" />
    </IconBase>
  );
}

export function KubernetesIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 2.3 20.4 7v10L12 21.7 3.6 17V7L12 2.3Z" />
      <path
        d="M12 9V5.8M12 15v3.2M9.4 10.5 6.6 8.9M17.4 15.1l-2.8-1.6M9.4 13.5l-2.8 1.6M15.7 10.5l3.8-3.5"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function LoadBalancerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="3.8" cy="12" r="2.6" />
      <path d="M6.4 12h1.6M8 12h1.5c1.5 0 1.1-5.2 2.3-5.2M8 12h3.8M8 12h1.5c1.5 0 1.1 5.2 2.3 5.2" strokeWidth="1.3" />
      <rect x="11.8" y="4.8" width="9.4" height="4" rx="1.4" fill="currentColor" stroke="none" />
      <rect x="11.8" y="10" width="9.4" height="4" rx="1.4" />
      <rect x="11.8" y="15.2" width="9.4" height="4" rx="1.4" />
    </IconBase>
  );
}

export function CdnIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="13.6" r="6.2" />
      <path fill="currentColor" stroke="none" d="M12 7.4c-1.8 1.9-2.7 4-2.7 6.2s.9 4.3 2.7 6.2c1.8-1.9 2.7-4 2.7-6.2s-.9-4.3-2.7-6.2Z" />
      <path d="M5.8 13.6h12.4" />
      <circle cx="4" cy="4.6" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="20" cy="4.6" r="2.2" fill="currentColor" stroke="none" />
      <path d="M5.7 6.1 8.5 9.1M18.3 6.1 15.5 9.1" strokeWidth="1.3" />
    </IconBase>
  );
}

export function ServiceMeshIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M9.2 6.5h5.6M6.5 9.2v5.6M17.5 9.2v5.6M9.2 17.5h5.6" strokeWidth="1.5" />
      <path d="M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5" strokeWidth="1.2" />
      <circle cx="6.5" cy="6.5" r="2.7" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="6.5" r="2.7" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="17.5" r="2.7" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="17.5" r="2.7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="2.3" fill="var(--icon-paper, #fff)" />
    </IconBase>
  );
}

export function McpServerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M4.5 5.5h10a2 2 0 0 1 2 2v2.2H2.5V7.5a2 2 0 0 1 2-2Z M5.1 7h2.4v1.4H5.1Z"
      />
      <rect x="2.5" y="5.5" width="14" height="13" rx="2.5" />
      <path d="M2.5 9.7h14M2.5 14.1h14" />
      <circle cx="5.5" cy="11.9" r="1" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <circle cx="5.5" cy="16.3" r="1" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <path d="M8.4 11.9h5.2M8.4 16.3h5.2" strokeWidth="1.3" />
      <path d="M15.6 11h1.8M15.6 13h1.8" strokeWidth="1.4" />
      <rect x="17.4" y="9.6" width="4.6" height="4.8" rx="1.4" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

// ─── Mensajería / integración ──────────────────────────────────────────────

export function EventBusIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="6.5" cy="4.8" r="2.5" />
      <circle cx="13.5" cy="4.8" r="2.5" />
      <circle cx="9" cy="19.2" r="2.5" />
      <circle cx="17" cy="19.2" r="2.5" />
      <path d="M6.5 7.3v3.2M13.5 7.3v3.2M9 13.5v3.2M17 13.5v3.2" strokeWidth="1.4" />
      <rect x="2.5" y="10.5" width="19" height="3" rx="1.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function PubSubIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="4.2" cy="6.6" r="2.4" />
      <circle cx="4.2" cy="17.4" r="2.4" />
      <circle cx="19.8" cy="6.6" r="2.4" />
      <circle cx="19.8" cy="17.4" r="2.4" />
      <path d="M6.3 7.8 8.9 9.6M6.3 16.2 8.9 14.4M17.7 7.8 15.1 9.6M17.7 16.2 15.1 14.4" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.9" fill="none" stroke="var(--icon-paper, #fff)" strokeWidth="1.3" />
    </IconBase>
  );
}

export function WebhookIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2" y="8.8" width="6.4" height="6.4" rx="1.8" fill="currentColor" stroke="none" />
      <path d="M8.4 12h4.6M11 9.9 13.1 12 11 14.1" strokeWidth="1.4" />
      <circle cx="18" cy="12" r="3.9" />
      <path fill="currentColor" stroke="none" d="M18.9 9.3 16.3 12.8h2l-.9 3 2.6-3.6h-2l.9-2.9Z" />
    </IconBase>
  );
}

export function GuardrailsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3.4" y="6.5" width="4" height="11" rx="1.4" />
      <rect x="16.6" y="6.5" width="4" height="11" rx="1.4" />
      <path d="M4.5 9.6h1.8M4.5 12h1.8M4.5 14.4h1.8M17.7 9.6h1.8M17.7 12h1.8M17.7 14.4h1.8" strokeWidth="1.2" />
      <path fill="currentColor" stroke="none" d="M8.8 10.4h3.4V8l3.6 4-3.6 4v-2.4H8.8Z" />
    </IconBase>
  );
}

// ─── Observabilidad ─────────────────────────────────────────────────────────

export function LoggingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill="currentColor" stroke="none" d="M13.8 2.5 19.5 8.2H15a1.2 1.2 0 0 1-1.2-1.2V2.5Z" />
      <path d="M13.8 2.5H6.5a2.2 2.2 0 0 0-2.2 2.2v14.6a2.2 2.2 0 0 0 2.2 2.2h11a2.2 2.2 0 0 0 2.2-2.2V8.4l-5.9-5.9Z" />
      <path d="M13.8 2.6V7a1.2 1.2 0 0 0 1.2 1.2h4.4" />
      <circle cx="7.9" cy="12.2" r="1" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <circle cx="7.9" cy="15.5" r="1" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <circle cx="7.9" cy="18.8" r="1" fill="var(--icon-ink, #1e293b)" stroke="none" />
      <rect x="10.2" y="11.4" width="6.4" height="1.6" rx="0.8" fill="currentColor" stroke="none" />
      <rect x="10.2" y="14.7" width="5.2" height="1.6" rx="0.8" fill="currentColor" stroke="none" />
      <rect x="10.2" y="18" width="4.4" height="1.6" rx="0.8" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function MetricsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M4 3.5v17h16.5" />
      <rect x="6.6" y="13" width="3.4" height="7.5" rx="1" />
      <rect x="16.2" y="10.4" width="3.4" height="10.1" rx="1" />
      <rect x="11.4" y="7.4" width="3.4" height="13.1" rx="1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function MonitoringIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M4.5 3.5h15a2 2 0 0 1 2 2v2.3H2.5V5.5a2 2 0 0 1 2-2Z M4.6 4.95h1.5v1.4H4.6Z M7.2 4.95h1.5v1.4H7.2Z"
      />
      <rect x="2.5" y="3.5" width="19" height="14" rx="2.5" />
      <path d="M5.2 14.2 8.4 10.8l2.8 2.1 3.4-4 4.2 2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 17.5v3.2M8.5 20.7h7" />
    </IconBase>
  );
}

export function TracingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="5.4" width="18" height="3.2" rx="1.6" />
      <rect x="9.4" y="15.4" width="8" height="3.2" rx="1.6" />
      <path d="M6.6 8.8v2M9.6 13.6v1.6" strokeWidth="1.2" />
      <rect x="6.4" y="10.4" width="11" height="3.2" rx="1.6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function AlertingIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M6 10.9a6 6 0 0 1 12 0v5.1l1.9 2.2H4.1L6 16v-5.1Z" />
      <path d="M9.8 18.2a2.2 2.2 0 0 0 4.4 0" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M18.6 2.2a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8Z M18 3.6h1.2v2.6H18Z M18 6.9h1.2v1.2H18Z"
      />
    </IconBase>
  );
}

// ─── Seguridad ──────────────────────────────────────────────────────────────

export function IamIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="8.5" cy="7.6" r="3.3" />
      <path d="M2.5 20.5c0-3.4 2.7-6.1 6-6.1s6 2.7 6 6.1" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M18 5.6a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8Z M17 8.5a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"
      />
      <path d="m17.2 11.1-2 4.2M16 13h1.9M15.4 14.5h1.7" strokeWidth="1.3" />
    </IconBase>
  );
}

export function OAuth2Icon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="1.8" y="8.8" width="6.4" height="6.4" rx="1.8" />
      <path d="M8.2 12h4.2M10.5 10.1 12.4 12l-1.9 1.9" strokeWidth="1.3" />
      <circle cx="17.2" cy="12" r="4.7" fill="currentColor" stroke="none" />
      <rect x="15.3" y="11.6" width="3.8" height="3.2" rx="0.7" fill="var(--icon-paper, #fff)" stroke="none" />
      <path d="M16 11.6v-1.1a1.2 1.2 0 0 1 2.4 0v1.1" stroke="var(--icon-paper, #fff)" strokeWidth="1.1" />
    </IconBase>
  );
}

export function KeyVaultIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2.5" y="3.5" width="16" height="17" rx="2.5" />
      <circle cx="10.5" cy="12" r="4" fill="currentColor" stroke="none" />
      <path d="M10.5 8.4v1.4M10.5 14.2v1.4M6.9 12h1.4M12.7 12h1.4" stroke="var(--icon-paper, #fff)" strokeWidth="1.2" />
      <circle cx="10.5" cy="12" r="1.4" fill="var(--icon-paper, #fff)" stroke="none" />
      <path d="M18.6 12h2.4M21 10.2v3.6" strokeWidth="1.6" />
    </IconBase>
  );
}

export function SecretsIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M7.8 10.6V7.9a4.2 4.2 0 0 1 8.4 0v2.7" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M7 10.6h10a2.6 2.6 0 0 1 2.6 2.6v5.4A2.6 2.6 0 0 1 17 21.2H7a2.6 2.6 0 0 1-2.6-2.6v-5.4A2.6 2.6 0 0 1 7 10.6Z M10.6 14.9a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 1 0-2.8 0Z M11.3 15.8h1.4v2.6h-1.4Z"
      />
    </IconBase>
  );
}

export function ApiSecurityIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill="currentColor" d="M12 2.6 4.2 6v5.6c0 4.9 3.3 9.4 7.8 10.7 4.5-1.3 7.8-5.8 7.8-10.7V6L12 2.6Z" />
      <path d="M9.6 9.9 7.7 12l1.9 2.1M14.4 9.9 16.3 12l-1.9 2.1M12.9 9.1l-1.8 5.8" stroke="var(--icon-paper, #fff)" strokeWidth="1.35" />
    </IconBase>
  );
}

// ─── IA ─────────────────────────────────────────────────────────────────────

export function AiModelIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M6.6 8.3 9.4 10.5M6.6 15.7 9.4 13.5M14.6 10.5 17.4 8.3M14.6 13.5 17.4 15.7" strokeWidth="1.6" />
      <circle cx="4.5" cy="7" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="17" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="7" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="17" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="3.6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function AiAgentIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="4.2" r="1.7" />
      <path d="M12 5.9v2.1" />
      <path d="M3.7 12.6h1.5M18.8 12.6h1.5M9.2 19.2v2.3M14.8 19.2v2.3" strokeWidth="1.4" />
      <path
        fill="currentColor" stroke="none" fillRule="evenodd"
        d="M8.2 8h7.6a3 3 0 0 1 3 3v5.2a3 3 0 0 1-3 3H8.2a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z M8.5 12.6a1.3 1.3 0 1 0 2.6 0 1.3 1.3 0 1 0-2.6 0Z M12.9 12.6a1.3 1.3 0 1 0 2.6 0 1.3 1.3 0 1 0-2.6 0Z M9.7 15.7h4.6v1.4H9.7Z"
      />
    </IconBase>
  );
}

export function AiToolIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M8.6 3.5H7A2.5 2.5 0 0 0 4.5 6v3.5A2.5 2.5 0 0 1 2 12a2.5 2.5 0 0 1 2.5 2.5V18A2.5 2.5 0 0 0 7 20.5h1.6" strokeWidth="1.8" />
      <path d="M15.4 3.5H17A2.5 2.5 0 0 1 19.5 6v3.5A2.5 2.5 0 0 0 22 12a2.5 2.5 0 0 0-2.5 2.5V18a2.5 2.5 0 0 1-2.5 2.5h-1.6" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function PromptTemplateIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill="currentColor" stroke="none" d="M13.4 2.5 16.9 6h-2.3a1.2 1.2 0 0 1-1.2-1.2V2.5Z" />
      <path d="M13.4 2.5H5.6a2.2 2.2 0 0 0-2.2 2.2v14.6a2.2 2.2 0 0 0 2.2 2.2h9a2.2 2.2 0 0 0 2.2-2.2V5.7l-3.4-3.2Z" />
      <path d="M13.4 2.6v2.6A1.2 1.2 0 0 0 14.6 6.4h2.2" />
      <rect x="6" y="10.2" width="6.8" height="2.8" rx="1" fill="currentColor" stroke="none" />
      <path d="M6 16h8M6 18.6h5" strokeWidth="1.35" />
      <path fill="currentColor" stroke="none" d="M19.6 3.2 20.4 5.4 22.6 6.2 20.4 7 19.6 9.2 18.8 7 16.6 6.2 18.8 5.4Z" />
    </IconBase>
  );
}

export function KnowledgeBaseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="5.6" y="5.6" width="12.8" height="4.6" rx="1.3" />
      <path d="M9.2 5.6v4.6" strokeWidth="1.3" />
      <rect x="4.6" y="10.5" width="14.8" height="4.6" rx="1.3" />
      <path d="M8.6 10.5v4.6" strokeWidth="1.3" />
      <rect x="3.4" y="15.4" width="17.2" height="4.8" rx="1.3" fill="currentColor" stroke="none" />
      <path d="M8 15.4v4.8" stroke="var(--icon-paper, #fff)" strokeWidth="1.4" />
    </IconBase>
  );
}

export function RagPipelineIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill="currentColor" stroke="none" d="M1.7 9.3c0-.9 1.05-1.6 2.35-1.6s2.35.7 2.35 1.6v5.4c0 .9-1.05 1.6-2.35 1.6S1.7 15.6 1.7 14.7V9.3Z" />
      <path d="M6.6 12h1.5" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.9" fill="currentColor" stroke="none" />
      <circle cx="11.3" cy="11.3" r="1.7" fill="none" stroke="var(--icon-paper, #fff)" strokeWidth="1.2" />
      <path d="m12.6 12.6 1.7 1.7" stroke="var(--icon-paper, #fff)" strokeWidth="1.3" />
      <path d="M16 12h1.5" strokeWidth="1.6" />
      <rect x="17.6" y="8.2" width="4.4" height="7.6" rx="1.4" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function AiWorkflowIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="3.4" cy="12" r="2.6" fill="currentColor" stroke="none" />
      <path d="M6.1 12h1.5" strokeWidth="1.6" />
      <rect x="7.7" y="8.3" width="6.4" height="7.4" rx="1.6" fill="currentColor" stroke="none" />
      <path fill="var(--icon-paper, #fff)" stroke="none" d="M10.9 9.4 11.75 11.15 13.5 12l-1.75.85-.85 1.75-.85-1.75L8.3 12l1.75-.85Z" />
      <path d="M14.4 12h1.4" strokeWidth="1.6" />
      <path fill="currentColor" stroke="none" d="M18.6 8.2 22.1 12l-3.5 3.8L15.1 12Z" />
    </IconBase>
  );
}

// ─── Tipografía / otros ─────────────────────────────────────────────────────

export function TypeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3.5" y="4" width="17" height="3.4" rx="1.2" fill="currentColor" stroke="none" />
      <path d="M12 7.4v12.2M8.6 19.8h6.8" strokeWidth="1.8" />
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
};
