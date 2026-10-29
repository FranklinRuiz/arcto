import type { PropsWithChildren, ReactElement } from 'react';
import { NODE_KINDS, type NodeKind } from '../../types/diagram.types';
import { systemDesignIcons } from './SystemDesignIcons';

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

const baseIconMap: Partial<Record<NodeKind, (props: IconProps) => ReactElement>> = {
  // Core
  [NODE_KINDS.DEFAULT]:        BoxIcon,
  // AI extended
  [NODE_KINDS.PROMPT_TEMPLATE]: PromptTemplateIcon,
  [NODE_KINDS.KNOWLEDGE_BASE]:  KnowledgeBaseIcon,
  [NODE_KINDS.RAG_PIPELINE]:    RagPipelineIcon,
  // Arquitectura y riesgo
  [NODE_KINDS.LAYER]:           LayerIcon,
  [NODE_KINDS.TOKENIZATION]:    TokenizationIcon,
  [NODE_KINDS.RISK]:            RiskIcon,
};

/** Icons from the System Design Kit replace the hand-drawn ones wherever the kit has a match. */
// Every kind has an icon in one of the two maps (checked in icons.test.ts).
export const iconMap = { ...baseIconMap, ...systemDesignIcons } as Record<NodeKind, (props: IconProps) => ReactElement>;
