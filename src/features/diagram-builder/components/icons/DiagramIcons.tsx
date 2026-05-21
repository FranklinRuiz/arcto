import type { PropsWithChildren, ReactElement } from 'react';
import { NODE_KINDS, type NodeKind } from '../../types/diagram.types';

type IconProps = { size?: number | string };

type IconBaseProps = PropsWithChildren<IconProps>;

function IconBase({ children, size = 22 }: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ServerIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="3" width="18" height="5.5" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <rect x="3" y="3" width="18" height="5.5" rx="1.5" />
      <rect x="3" y="10" width="18" height="5.5" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <rect x="3" y="10" width="18" height="5.5" rx="1.5" />
      <rect x="3" y="17" width="18" height="4" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <rect x="3" y="17" width="18" height="4" rx="1.5" />
      <circle cx="6.5" cy="5.75" r="1" fill="currentColor" />
      <circle cx="6.5" cy="12.75" r="1" fill="currentColor" />
      <circle cx="6.5" cy="19" r="1" fill="currentColor" />
      <path d="M10 5.75h6M10 12.75h4" strokeWidth="1.2" strokeOpacity="0.5" />
    </IconBase>
  );
}

export function DatabaseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <ellipse cx="12" cy="5" rx="8" ry="3" fill="currentColor" fillOpacity="0.2" />
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" fill="currentColor" fillOpacity="0.08" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" fill="currentColor" fillOpacity="0.08" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      <path d="M4 14c0 1.65 3.6 3 8 3s8-1.35 8-3" strokeWidth="1" strokeOpacity="0.4" />
    </IconBase>
  );
}

export function MonitorIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.1" />
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M5.5 7.5h13" strokeWidth="1.5" strokeOpacity="0.55" />
      <path d="M5.5 10.5h9" strokeWidth="1.5" strokeOpacity="0.55" />
      <path d="M5.5 13.5h6" strokeWidth="1.5" strokeOpacity="0.55" />
    </IconBase>
  );
}

export function CloudIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M17.5 19H8a5 5 0 1 1 1.1-9.88A6 6 0 0 1 20 12.5 3.5 3.5 0 0 1 17.5 19Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M17.5 19H8a5 5 0 1 1 1.1-9.88A6 6 0 0 1 20 12.5 3.5 3.5 0 0 1 17.5 19Z" />
    </IconBase>
  );
}

export function CpuIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" fillOpacity="0.15" />
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" fill="currentColor" fillOpacity="0.5" />
      <path d="M3 10h4M3 14h4M17 10h4M17 14h4M10 3v4M14 3v4M10 17v4M14 17v4" />
    </IconBase>
  );
}

export function ShieldIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" strokeWidth="2.2" />
    </IconBase>
  );
}

export function BoxIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" fillOpacity="0.1" />
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M3 9h18M9 21V9" />
      <path d="M13 13h5M13 16h3" strokeWidth="1.3" strokeOpacity="0.5" />
    </IconBase>
  );
}

export function SmartphoneIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="5" y="2" width="14" height="20" rx="3" fill="currentColor" fillOpacity="0.1" />
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <rect x="7.5" y="5" width="9" height="11" rx="1" fill="currentColor" fillOpacity="0.18" />
      <path d="M9 8h6M9 11h4" strokeWidth="1.3" strokeOpacity="0.5" />
      <circle cx="12" cy="18.5" r="1.2" fill="currentColor" />
    </IconBase>
  );
}

export function NetworkIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="5" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5v3.5M12 11 7 16.5M12 11l5 5.5" />
    </IconBase>
  );
}

export function ZapIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M13 2 4.09 12.56A1 1 0 0 0 5 14h6l-2 8 8.91-10.56A1 1 0 0 0 17 10h-6l2-8Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M13 2 4.09 12.56A1 1 0 0 0 5 14h6l-2 8 8.91-10.56A1 1 0 0 0 17 10h-6l2-8Z" />
    </IconBase>
  );
}

export function InboxIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M2 14h4l2 3h8l2-3h4" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 14h4l2 3h8l2-3h4" />
      <path d="M7 8h10M7 11h7" strokeWidth="1.3" strokeOpacity="0.5" />
    </IconBase>
  );
}

export function MainframeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="2" width="18" height="7" rx="2" fill="currentColor" fillOpacity="0.12" />
      <rect x="3" y="2" width="18" height="7" rx="2" />
      <rect x="3" y="11" width="18" height="7" rx="2" fill="currentColor" fillOpacity="0.12" />
      <rect x="3" y="11" width="18" height="7" rx="2" />
      <circle cx="7" cy="5.5" r="1" fill="currentColor" />
      <circle cx="7" cy="14.5" r="1" fill="currentColor" />
      <path d="M10 5.5h6M10 14.5h6" strokeWidth="1.4" strokeOpacity="0.55" />
      <path d="M9 9v2M15 9v2" strokeWidth="1.5" />
    </IconBase>
  );
}

export function OnPremiseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-5 7 5v14" fill="currentColor" fillOpacity="0.1" />
      <path d="M5 21V7l7-5 7 5v14" />
      <rect x="9" y="13" width="6" height="8" fill="currentColor" fillOpacity="0.2" />
      <rect x="9" y="13" width="6" height="8" />
      <path d="M9 10h6" strokeWidth="1.4" strokeOpacity="0.55" />
    </IconBase>
  );
}

export function GlobeIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.1" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-2.5 2.5-4 6-4 9s1.5 6.5 4 9" />
      <path d="M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9" />
      <path d="M3 12h18" />
      <path d="M3.5 8.5h17M3.5 15.5h17" strokeWidth="1" strokeOpacity="0.4" />
    </IconBase>
  );
}

export function PlusIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

export function TrashIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </IconBase>
  );
}

export function DownloadIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </IconBase>
  );
}

export function UploadIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 21V9" />
      <path d="m7 14 5-5 5 5" />
      <path d="M5 3h14" />
    </IconBase>
  );
}

export function SaveIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8" />
      <path d="M7 3v5h8" />
    </IconBase>
  );
}

export function ResetIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v6h6" />
    </IconBase>
  );
}

export function CloseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </IconBase>
  );
}

export function LayersIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </IconBase>
  );
}

export function ChevronLeftIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}

export function ChevronRightIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="m9 18 6-6-6-6" />
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

export const iconMap: Record<NodeKind, (props: IconProps) => ReactElement> = {
  [NODE_KINDS.DEFAULT]:   BoxIcon,
  [NODE_KINDS.FRONTEND]:  MonitorIcon,
  [NODE_KINDS.MOBILE]:    SmartphoneIcon,
  [NODE_KINDS.GATEWAY]:   NetworkIcon,
  [NODE_KINDS.BACKEND]:   ServerIcon,
  [NODE_KINDS.DATABASE]:  DatabaseIcon,
  [NODE_KINDS.CACHE]:     ZapIcon,
  [NODE_KINDS.QUEUE]:     InboxIcon,
  [NODE_KINDS.SECURITY]:  ShieldIcon,
  [NODE_KINDS.CLOUD]:     CloudIcon,
  [NODE_KINDS.EXTERNAL]:  GlobeIcon,
  [NODE_KINDS.WORKER]:    CpuIcon,
  [NODE_KINDS.ONPREMISE]: OnPremiseIcon,
  [NODE_KINDS.MAINFRAME]: MainframeIcon,
};
