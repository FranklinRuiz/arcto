import type { PropsWithChildren, ReactElement } from 'react';
import { NODE_KINDS, type NodeKind } from '../../types/diagram.types';

type IconProps = { size?: number };

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
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01" />
      <path d="M7 17h.01" />
    </IconBase>
  );
}

export function DatabaseIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </IconBase>
  );
}

export function MonitorIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </IconBase>
  );
}

export function CloudIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M17.5 19H8a5 5 0 1 1 1.1-9.88A6 6 0 0 1 20 12.5 3.5 3.5 0 0 1 17.5 19Z" />
    </IconBase>
  );
}

export function CpuIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <rect x="8" y="8" width="8" height="8" rx="1" />
      <path d="M3 10h3" />
      <path d="M3 14h3" />
      <path d="M18 10h3" />
      <path d="M18 14h3" />
      <path d="M10 3v3" />
      <path d="M14 3v3" />
      <path d="M10 18v3" />
      <path d="M14 18v3" />
    </IconBase>
  );
}

export function ShieldIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
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

export function SparklesIcon({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
      <path d="M5 15l.7 1.6L7 17l-1.3.4L5 19l-.7-1.6L3 17l1.3-.4L5 15Z" />
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

export const iconMap: Record<NodeKind, (props: IconProps) => ReactElement> = {
  [NODE_KINDS.FRONTEND]: MonitorIcon,
  [NODE_KINDS.BACKEND]: ServerIcon,
  [NODE_KINDS.DATABASE]: DatabaseIcon,
  [NODE_KINDS.CLOUD]: CloudIcon,
  [NODE_KINDS.SECURITY]: ShieldIcon,
  [NODE_KINDS.WORKER]: CpuIcon,
};
