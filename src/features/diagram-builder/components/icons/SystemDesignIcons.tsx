// Generated from the "System Design Kit v2" Excalidraw library. Each icon keeps the
// original drawing; colors follow the node's category color (currentColor).
import type { PropsWithChildren, ReactElement } from 'react';
import { NODE_KINDS, type NodeKind } from '../../types/diagram.types';

type IconProps = { size?: number | string };

/** Shared 60x60 canvas, the grid every icon in the kit is drawn on. */
function GlyphBase({ children, size = 22 }: PropsWithChildren<IconProps>) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

/** User */
function UserGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="30.02" cy="18.54" rx="10.2" ry="10.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="9.64,51.66 9.69,50.17 9.84,48.76 10.1,47.42 10.46,46.16 10.91,44.97 11.47,43.86 12.14,42.83 12.9,41.87 13.77,41 14.74,40.19 15.81,39.47 16.98,38.82 18.25,38.24 19.63,37.75 21.11,37.33 22.69,36.98 24.37,36.71 26.15,36.52 28.04,36.41 32.01,36.41 33.9,36.52 35.68,36.71 37.36,36.98 38.94,37.33 40.42,37.75 41.8,38.24 43.07,38.82 44.24,39.47 45.32,40.19 46.28,41 47.15,41.87 47.91,42.83 48.58,43.86 49.14,44.97 49.6,46.16 49.95,47.42 50.21,48.76 50.36,50.17" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Admin */
function AdminGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="24.05" cy="18.56" rx="8.23" ry="8.23" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="7.58,47.84 7.99,44.17 9.21,40.69 11.18,37.57 13.78,34.97 16.9,33 20.38,31.78 24.05,31.37 27.72,31.78 31.2,33 34.32,34.97 36.92,37.57 38.89,40.69 40.11,44.17 40.52,47.84" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="44.18,29.54 52.41,33.16 52.41,39.2 52.37,40.16 52.25,41.1 52.04,41.98 51.75,42.85 51.36,43.68 50.91,44.47 50.36,45.24 49.72,45.97 49.01,46.67 48.22,47.34 47.33,47.97 46.37,48.57 45.31,49.14 44.18,49.67 43.05,49.14 41.99,48.57 41.03,47.97 40.14,47.34 39.35,46.67 38.64,45.97 38,45.24 37.45,44.47 37,43.68 36.61,42.85 36.32,41.98 36.11,41.1 35.99,40.16 35.95,39.2 35.95,33.16" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="39.61,39.61 43.27,43.27 48.76,35.95" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Mobile App */
function MobileGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="15.46" y="3" width="29.08" height="54" rx="6.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="24.81,9.23 35.19,9.23" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="30" cy="48.69" rx="2.29" ry="2.29" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** ATM */
function AtmGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="11.58" y="6.06" width="36.84" height="47.89" rx="3.7" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="17.11" y="11.58" width="25.79" height="14.73" rx="1.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="18.03" y="30.92" width="4.6" height="3.68" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="24.47" y="30.92" width="4.6" height="3.68" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="30.92" y="30.92" width="4.6" height="3.68" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="18.03" y="37.37" width="4.6" height="3.68" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="24.47" y="37.37" width="4.6" height="3.68" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="30.92" y="37.37" width="4.6" height="3.68" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="38.29,32.76 42.89,32.76" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="18.95" y="45.66" width="22.1" height="3.68" rx="0.9" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** POS */
function PosGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="11.48" y="13.24" width="26.46" height="40.57" rx="4.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="15.89" y="18.54" width="17.64" height="9.7" rx="1.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="15.89" y="32.65" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="22.5" y="32.65" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="29.12" y="32.65" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="15.89" y="38.82" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="22.5" y="38.82" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="29.12" y="38.82" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="15.89" y="44.99" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="22.5" y="44.99" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="29.12" y="44.99" width="4.41" height="3.53" rx="0.88" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="25.59" y="6.19" width="22.93" height="14.11" rx="2.6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.59,11.48 48.52,11.48" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Web Browser */
function FrontendGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.74" y="11.04" width="46.53" height="37.91" rx="3.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="6.74,18.8 53.27,18.8" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="11.04" cy="14.92" rx="1.21" ry="1.21" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="15.36" cy="14.92" rx="1.21" ry="1.21" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="19.66" cy="14.92" rx="1.21" ry="1.21" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11.04" y="23.11" width="37.91" height="7.75" rx="1.94" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="16.22" cy="26.99" rx="2.07" ry="2.07" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="17.76,28.54 19.22,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="11.04" y="35.17" width="15.51" height="9.48" rx="1.7" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30,36.89 48.96,36.89" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30,41.2 43.79,41.2" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Web App */
function WebAppGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="7.17" y="10.68" width="45.66" height="38.63" rx="3.5" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="7.17,18.59 52.83,18.59" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="11.56" cy="14.63" rx="1.23" ry="1.23" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="15.95" cy="14.63" rx="1.23" ry="1.23" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="22.98,25.61 16.83,31.76 22.98,37.9" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="37.02,25.61 43.17,31.76 37.02,37.9" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="32.63,23.85 27.36,39.65" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** CLI */
function CliGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="7" y="10.83" width="46.01" height="38.34" rx="4.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="15.62,22.33 23.29,30 15.62,37.67" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="28.08,38.63 41.5,38.63" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** External System */
function ExternalGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="16.2,35.99 43.7,35.99 43.7,35.99 46.18,35.58 48.4,34.39 50.12,32.55 51.16,30.26 51.41,27.75 50.84,25.3 49.51,23.16 47.56,21.56 42.11,17.27 40.9,14.84 39.18,12.76 37.05,11.1 34.59,9.96 31.94,9.41 29.23,9.46 26.61,10.11 24.2,11.33 22.12,13.07 20.48,15.21 19.36,17.68 18.82,20.33 13.55,20.99 11.23,22.34 9.51,24.39 8.59,26.92 8.59,29.6 9.51,32.12 11.23,34.18 13.55,35.53" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="29.95,35.99 29.95,41.15" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="25.65" y="41.14" width="8.59" height="6.01" rx="1.5" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="27.8,47.16 27.8,50.6" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="32.1,47.16 32.1,50.6" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Internet */
function InternetGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="30" cy="30" rx="21" ry="21" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="29.99" cy="30" rx="8.16" ry="21" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="9,30 51,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="13.67,18.33 46.34,18.33" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="13.67,41.67 46.34,41.67" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Cloud */
function CloudGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="12.82,46.55 47.05,46.55 47.05,46.55 50.14,46.04 52.91,44.56 55.05,42.27 56.34,39.42 56.65,36.29 55.93,33.24 54.29,30.58 51.86,28.59 44.07,22.54 42.67,19.75 40.69,17.32 38.21,15.42 35.38,14.1 32.32,13.46 29.18,13.51 26.16,14.27 23.37,15.68 20.96,17.68 19.07,20.17 17.77,23.02 17.15,26.09 9.53,27.88 6.63,29.55 4.49,32.11 3.34,35.26 3.34,38.59 4.49,41.74 6.63,44.29 9.53,45.97" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** On-Premise DC */
function OnpremiseGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="7.73,49.8 52.28,49.8" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="11.03" y="10.2" width="17.32" height="37.95" rx="1.6" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="13.91" y="14.33" width="11.55" height="7.42" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="22.16" cy="18.04" rx="1.49" ry="1.49" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.91" y="25.05" width="11.55" height="7.42" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="22.16" cy="28.77" rx="1.49" ry="1.49" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.91" y="35.77" width="11.55" height="7.42" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="22.16" cy="39.48" rx="1.49" ry="1.49" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="31.65" y="10.2" width="17.32" height="37.95" rx="1.6" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="34.54" y="14.33" width="11.55" height="7.42" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="42.78" cy="18.04" rx="1.49" ry="1.49" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="34.54" y="25.05" width="11.55" height="7.42" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="42.78" cy="28.77" rx="1.49" ry="1.49" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="34.54" y="35.77" width="11.55" height="7.42" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="42.78" cy="39.48" rx="1.49" ry="1.49" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Payment Network */
function PaymentNetworkGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.14" y="19.68" width="29.23" height="20.63" rx="3.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="6.14,25.7 35.37,25.7" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="10.44" y="32.58" width="6.88" height="3.44" rx="0.86" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="35.37,30 47.41,14.52" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="47.41" cy="14.53" rx="3.01" ry="3.01" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="35.37,30 47.41,45.48" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="47.41" cy="45.48" rx="3.01" ry="3.01" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="35.37,30 50.85,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="50.85" cy="30" rx="3.01" ry="3.01" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** DNS */
function DnsGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="30.05" cy="15.52" rx="10.53" ry="10.53" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="30.05" cy="15.52" rx="4.42" ry="10.53" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="19.52,15.52 40.58,15.52" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <text x="30" y="43.16" fontSize="19" textAnchor="middle" dominantBaseline="central" fill="currentColor" stroke="none" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">DNS</text>
    </GlyphBase>
  );
}

/** CDN */
function CdnGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="30" cy="34.7" rx="14.09" ry="14.09" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="30" cy="34.7" rx="6.58" ry="14.09" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="15.91,34.7 44.08,34.7" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="11.21" cy="15.92" rx="4.7" ry="4.7" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="48.79" cy="15.92" rx="4.7" ry="4.7" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="14.5,19.2 21.78,26.48" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="45.5,19.2 38.22,26.48" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Load Balancer */
function LoadBalancerGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="21.22" y="10.68" width="17.56" height="10.54" rx="2.6" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,21.22 30,28.24" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="13.32,28.24 46.69,28.24" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="13.32,28.24 13.32,37.02" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="7.17" y="37.02" width="12.29" height="12.29" rx="2.6" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="13.32" cy="43.16" rx="1.75" ry="1.75" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,28.24 30,37.02" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="23.85" y="37.02" width="12.29" height="12.29" rx="2.6" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="29.99" cy="43.16" rx="1.75" ry="1.75" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="46.68,28.24 46.68,37.02" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="40.54" y="37.02" width="12.29" height="12.29" rx="2.6" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="46.69" cy="43.16" rx="1.75" ry="1.75" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Reverse Proxy */
function ReverseProxyGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.06" y="11.58" width="47.89" height="36.84" rx="4.6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="13.42,24.47 46.57,24.47" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="42.78,27.07 46.58,24.47 42.78,21.87" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="46.58,35.53 13.43,35.53" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="17.22,32.93 13.42,35.53 17.22,38.13" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** API Gateway */
function GatewayGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="8.8" y="21.2" width="17.6" height="17.6" rx="2.4" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <text x="17.6" y="30.08" fontSize="7.2" textAnchor="middle" dominantBaseline="central" fill="currentColor" stroke="none" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">API</text>
      <polyline points="26.4,30 32,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="32,14.8 32,45.2" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="32,14.8 40,14.8" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="40" y="9.2" width="11.2" height="11.2" rx="2.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="45.6" cy="14.8" rx="1.6" ry="1.6" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="32,30 40,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="40" y="24.4" width="11.2" height="11.2" rx="2.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="43.6" y="28" width="4" height="4" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="32,45.2 40,45.2" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="40" y="39.6" width="11.2" height="11.2" rx="2.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="45.6,42.8 48,47.2 43.2,47.2" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Router */
function RouterGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.35" y="30.45" width="47.3" height="18.19" rx="3.6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="17.27,30.45 13.63,14.08" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="42.73,30.45 46.37,14.08" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="13.63" cy="13.17" rx="1.82" ry="1.82" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="46.37" cy="13.17" rx="1.82" ry="1.82" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="14.54" cy="39.55" rx="1.82" ry="1.82" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="21.81" cy="39.55" rx="1.82" ry="1.82" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="29.09" cy="39.55" rx="1.82" ry="1.82" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="37.28,39.55 46.38,39.55" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Switch */
function SwitchGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="4.28" y="12.85" width="51.44" height="34.29" rx="4.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="10" y="24.28" width="7.62" height="11.43" rx="1.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <rect x="20.47" y="24.28" width="7.62" height="11.43" rx="1.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <rect x="30.95" y="24.28" width="7.62" height="11.43" rx="1.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <rect x="41.43" y="24.28" width="7.62" height="11.43" rx="1.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="10" cy="18.56" rx="1.52" ry="1.52" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="14.76" cy="18.56" rx="1.52" ry="1.52" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** VPN */
function VpnGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="6.06,48.42 9.74,31.84 10.05,28.33 10.97,24.92 12.46,21.71 14.49,18.82 16.98,16.33 19.87,14.3 23.08,12.81 26.49,11.89 30,11.58 33.52,11.89 36.93,12.81 40.13,14.3 43.03,16.33 45.52,18.82 47.55,21.71 49.04,24.92 49.96,28.33 50.26,31.84 53.95,48.42" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="6.06,48.42 53.95,48.42" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="24.47,30 24.74,28.3 25.53,26.75 26.74,25.53 28.29,24.74 30,24.47 31.7,24.74 33.25,25.53 34.46,26.75 35.25,28.3 35.52,30 35.52,33.68" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="24.47,30 24.47,33.68" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="20.79" y="31.84" width="18.42" height="12.89" rx="2.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="30" cy="37.83" rx="1.66" ry="1.66" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Firewall */
function SecurityGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.52" y="11.22" width="46.96" height="37.57" rx="2.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="6.52,20.61 53.48,20.61" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="6.52,30 53.48,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="6.52,39.39 53.48,39.39" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="22.49,11.22 22.49,20.61" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="37.51,11.22 37.51,20.61" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="14.97,20.61 14.97,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30,20.61 30,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="45.03,20.61 45.03,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="22.49,30 22.49,39.39" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="37.51,30 37.51,39.39" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="14.97,39.39 14.97,48.78" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30,39.39 30,48.78" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="45.03,39.39 45.03,48.78" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** WAF */
function ApiSecurityGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="30,7.61 49.7,15.67 49.7,29.1 49.6,31.24 49.3,33.3 48.8,35.3 48.09,37.21 47.18,39.06 46.08,40.83 44.77,42.53 43.27,44.16 41.56,45.71 39.65,47.19 37.54,48.6 35.23,49.94 32.71,51.19 30,52.38 27.29,51.19 24.77,49.94 22.46,48.6 20.35,47.19 18.44,45.71 16.73,44.16 15.23,42.53 13.92,40.83 12.82,39.06 11.91,37.21 11.2,35.3 10.7,33.3 10.4,31.24 10.3,29.1 10.3,15.67" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="30" cy="29.1" rx="9.85" ry="9.85" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="30" cy="29.1" rx="4.03" ry="9.85" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="20.15,29.1 39.85,29.1" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** IAM */
function IamGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="23.06" cy="19.02" rx="8.09" ry="8.09" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="6.88,49.07 6.92,47.72 7.04,46.43 7.24,45.22 7.53,44.08 7.89,43 8.34,42 8.86,41.06 9.47,40.19 10.16,39.39 10.93,38.67 11.78,38.01 12.71,37.42 13.72,36.9 14.81,36.45 15.98,36.06 17.24,35.75 18.57,35.51 19.99,35.34 21.49,35.23 23.97,35.21 24.86,35.26 25.71,35.33 26.53,35.43 27.33,35.56 28.09,35.72 28.83,35.91 29.54,36.12 30.22,36.37 30.87,36.64 31.49,36.95 32.08,37.28 32.64,37.64 33.18,38.03 33.69,38.45 34.16,38.9 34.61,39.37 35.03,39.88 35.42,40.41" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="46.19" cy="23.64" rx="6.93" ry="6.93" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="46.18" cy="23.64" rx="2.77" ry="2.77" fill="#ffffff" stroke="none" />
      <polyline points="46.18,30.58 46.18,47.92" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="41.56,38.67 46.18,38.67" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="42.72,44.45 46.19,44.45" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Identity Provider */
function Oauth2Glyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.19" y="16.77" width="47.62" height="31.75" rx="3.5" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="25.59" y="11.48" width="8.82" height="7.06" rx="1.76" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="18.54" cy="29.12" rx="4.41" ry="4.41" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="10.6,42.35 10.99,39.9 12.12,37.68 13.87,35.93 16.09,34.8 18.54,34.41 20.99,34.8 23.2,35.93 24.96,37.68 26.09,39.9 26.47,42.35" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="31.76,27.35 48.52,27.35" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="31.76,33.53 44.99,33.53" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="31.76,39.7 47.63,39.7" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Secrets Manager */
function SecretsGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="18.99,20.99 19.27,18.54 20.08,16.21 21.39,14.12 23.13,12.38 25.23,11.07 27.55,10.26 30,9.98 32.46,10.26 34.78,11.07 36.87,12.38 38.61,14.12 39.92,16.21 40.73,18.54 41.01,20.99 41.01,24.99" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="18.99,20.99 18.99,24.99" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="7.98" y="23.99" width="44.05" height="26.03" rx="4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="18.99,33 18.99,41.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="15.52,35.01 22.46,39.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="22.46,35.01 15.52,39.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,33 30,41.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="26.53,35.01 33.47,39.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="33.47,35.01 26.53,39.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="41.01,33 41.01,41.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="37.54,35.01 44.48,39.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="44.48,35.01 37.54,39.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Key Vault */
function KeyVaultGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="8.31" y="9.67" width="43.38" height="36.15" rx="3.6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="27.29" cy="27.73" rx="9.04" ry="9.04" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="27.29" cy="27.74" rx="2.26" ry="2.26" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="43.56,22.32 43.56,33.16" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="11.93" y="45.81" width="7.23" height="4.52" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="40.84" y="45.81" width="7.23" height="4.52" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** HSM */
function HsmGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="3" y="14.42" width="54" height="31.15" rx="4.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="9.23,37.27 25.85,37.27" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="48.69" cy="37.27" rx="1.87" ry="1.87" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="32.08,22.73 32.38,20.81 33.27,19.06 34.65,17.69 36.39,16.8 38.31,16.5 40.23,16.8 41.98,17.69 43.35,19.06 44.24,20.81 44.54,22.73 44.54,25.85" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="32.08,22.73 32.08,25.85" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="28.96" y="24.81" width="18.69" height="13.5" rx="2.1" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="38.31" cy="31.04" rx="1.87" ry="1.87" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="15.46" cy="24.81" rx="5.19" ry="5.19" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="20.65,24.81 24.8,24.81" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Service */
function BackendGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="9" y="9" width="42" height="11.67" rx="2.92" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="16" cy="14.84" rx="2.33" ry="2.33" fill="currentColor" stroke="none" />
      <polyline points="23,14.83 37,14.83" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="9" y="24.17" width="42" height="11.67" rx="2.92" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="16" cy="30.01" rx="2.33" ry="2.33" fill="#ffffff" stroke="none" />
      <polyline points="23,27.67 44,27.67" fill="none" stroke="#ffffff" strokeWidth="2.1" />
      <polyline points="23,32.33 37,32.33" fill="none" stroke="#ffffff" strokeWidth="2.1" />
      <rect x="9" y="39.33" width="42" height="11.67" rx="2.92" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="16" cy="45.16" rx="2.33" ry="2.33" fill="currentColor" stroke="none" />
      <polyline points="23,45.17 37,45.17" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** GraphQL */
function GraphqlGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="30" cy="13.2" rx="4.2" ry="4.2" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="46.8" cy="23.7" rx="4.2" ry="4.2" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="46.8" cy="36.3" rx="4.2" ry="4.2" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="30" cy="46.8" rx="4.2" ry="4.2" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="13.2" cy="36.3" rx="4.2" ry="4.2" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="13.2" cy="23.7" rx="4.2" ry="4.2" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,17.4 46.8,23.7" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="46.8,23.7 46.8,36.3" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="46.8,36.3 30,46.8" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,46.8 13.2,36.3" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="13.2,36.3 13.2,23.7" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="13.2,23.7 30,17.4" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Serverless */
function ServerlessGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="30,7.43 49.54,18.71 49.54,41.28 30,52.57 10.46,41.28 10.46,18.71" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="19.66,16.84 25.3,16.84 40.35,44.11 43.17,44.11" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="31.41,28.12 21.54,44.11" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Virtual Machine */
function VirtualMachineGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.06" y="11.58" width="47.89" height="36.84" rx="4.6" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <text x="30.05" y="30.23" fontSize="16.6" textAnchor="middle" dominantBaseline="central" fill="currentColor" stroke="none" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">VM</text>
    </GlyphBase>
  );
}

/** Container */
function ContainerGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.7" y="28.06" width="15.53" height="13.59" rx="1.9" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="22.23" y="28.06" width="15.53" height="13.59" rx="1.9" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="37.77" y="28.06" width="15.53" height="13.59" rx="1.9" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="14.47" y="12.53" width="15.53" height="13.59" rx="1.9" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="30" y="12.53" width="15.53" height="13.59" rx="1.9" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="4.76,47.47 55.24,47.47" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Kubernetes */
function KubernetesGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="30,9.26 47.06,17.47 51.27,35.93 39.46,50.73 20.54,50.73 8.73,35.93 12.94,17.47" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="30" cy="31.08" rx="9.23" ry="9.23" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,31.08 30,15.14" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,31.08 42.46,21.14" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,31.08 45.54,34.63" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,31.08 36.91,45.44" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,31.08 23.09,45.44" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,31.08 14.46,34.63" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,31.08 17.54,21.14" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="29.99" cy="31.07" rx="2.94" ry="2.94" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Auto Scaling */
function AutoScalingGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="19.92" y="19.92" width="20.16" height="20.16" rx="3.4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="17.4,17.4 9,9" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="14.88,9 9,9 9,14.88" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="42.6,17.4 51,9" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="45.12,9 51,9 51,14.88" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="17.4,42.6 9,51" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="14.88,51 9,51 9,45.12" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="42.6,42.6 51,51" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="45.12,51 51,51 51,45.12" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Service Mesh */
function ServiceMeshGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="14.78,16.57 43.43,16.57" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="14.78,16.57 29.11,43.43" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="43.43,16.57 29.1,43.43" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="7.61" y="10.3" width="11.64" height="12.54" rx="2.7" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="18.36" y="12.99" width="5.37" height="7.16" rx="1.3" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="36.27" y="10.3" width="11.64" height="12.54" rx="2.7" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="47.01" y="12.99" width="5.37" height="7.16" rx="1.3" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="21.94" y="37.16" width="11.64" height="12.54" rx="2.7" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="32.69" y="39.85" width="5.37" height="7.16" rx="1.3" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Worker */
function WorkerGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="34.87,35.38 38.94,37.18 38.1,40.67 33.66,40.43 31.62,43.25 33.22,47.39 30.15,49.26 27.19,45.95 23.75,46.5 21.95,50.57 18.46,49.73 18.7,45.29 15.88,43.25 11.74,44.85 9.87,41.78 13.17,38.82 12.63,35.38 8.56,33.58 9.4,30.09 13.84,30.33 15.88,27.51 14.28,23.37 17.35,21.5 20.31,24.81 23.75,24.26 25.55,20.19 29.04,21.03 28.8,25.47 31.62,27.51 35.76,25.91 37.63,28.98 34.32,31.94" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="23.74" cy="35.38" rx="4.63" ry="4.63" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="48.77,17.77 51.45,19.08 50.64,21.56 47.7,21.04 45.99,22.59 46.2,25.55 43.65,26.1 42.63,23.3 40.43,22.59 37.96,24.25 36.21,22.31 38.13,20.03 37.65,17.77 34.97,16.46 35.78,13.98 38.71,14.5 40.43,12.95 40.22,9.99 42.77,9.44 43.79,12.24 45.99,12.95 48.45,11.29 50.21,13.23 48.29,15.51" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="43.2" cy="17.77" rx="2.31" ry="2.31" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Scheduler */
function SchedulerGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="25.51" cy="34.89" rx="16.31" ry="16.31" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="36.93,34.89 40.19,34.89" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.51,46.31 25.51,49.57" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="14.1,34.89 10.84,34.89" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.51,23.48 25.51,20.22" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.51,34.89 25.51,25.1" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.51,34.89 32.85,38.97" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="25.52" cy="34.9" rx="1.79" ry="1.79" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="36.93" y="10.43" width="13.86" height="12.23" rx="2.4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="40.6,8.8 40.6,12.06" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="47.13,8.8 47.13,12.06" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="39.38,16.14 48.35,16.14" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Batch */
function BatchGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="15.72" y="9" width="31.92" height="21.84" rx="2.5" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="9" y="15.72" width="31.92" height="21.84" rx="2.5" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="13.2,23.28 30,23.28" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="13.2,30 24.12,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="40.92" cy="40.92" rx="10.08" ry="10.08" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="37.98,35.88 45.96,40.92 37.98,45.96" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Mainframe */
function MainframeGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="11.52" y="9" width="36.96" height="40.32" rx="2.5" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="15.72" y="13.2" width="28.56" height="7.56" rx="1.7" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="40.09" cy="16.98" rx="1.34" ry="1.34" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="19.08,25.8 19.08,44.28" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="24.96,25.8 24.96,44.28" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30.84,25.8 30.84,44.28" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="36.72,25.8 36.72,44.28" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="42.6,25.8 42.6,44.28" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="9,51 51,51" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Core Banking */
function BankGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="7.91,21.08 30,10.04 52.09,21.08" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <rect x="7.91" y="21.08" width="44.18" height="3.4" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="12.16" y="26.18" width="5.1" height="18.69" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="21.5" y="26.18" width="5.1" height="18.69" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="33.4" y="26.18" width="5.1" height="18.69" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="42.74" y="26.18" width="5.1" height="18.69" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7.91" y="45.72" width="44.18" height="4.25" rx="0.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Message Queue */
function QueueGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="10.94" y="15.71" width="38.12" height="28.59" rx="4.8" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="15.71" y="21.26" width="5.56" height="17.47" rx="1.39" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="23.25" y="21.26" width="5.56" height="17.47" rx="1.39" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="30.79" y="21.26" width="5.56" height="17.47" rx="1.39" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="38.34" y="21.26" width="5.56" height="17.47" rx="1.39" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="3,30 10.15,30" fill="none" stroke="currentColor" strokeWidth="4.2" />
      <polyline points="7.2,32.02 10.15,30 7.2,27.99" fill="none" stroke="currentColor" strokeWidth="4.2" />
      <polyline points="49.85,30 57,30" fill="none" stroke="currentColor" strokeWidth="4.2" />
      <polyline points="54.05,32.02 57,30 54.05,27.99" fill="none" stroke="currentColor" strokeWidth="4.2" />
    </GlyphBase>
  );
}

/** Streaming */
function StreamingGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="3.23,19.7 5.93,21.67 8.64,23.34 11.34,24.46 14.04,24.85 16.74,24.46 19.45,23.34 22.15,21.67 24.85,19.7 27.55,17.73 30.26,16.06 32.97,14.94 35.66,14.55 38.36,14.94 41.07,16.06 43.78,17.73 46.47,19.7" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="48.53,13.53 56.77,19.71 48.53,25.89" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="3.23,40.3 5.93,42.27 8.64,43.94 11.34,45.06 14.04,45.45 16.74,45.06 19.45,43.94 22.15,42.27 24.85,40.3 27.55,38.33 30.26,36.66 32.97,35.54 35.66,35.15 38.36,35.54 41.07,36.66 43.78,38.33 46.47,40.3" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="48.53,34.12 56.77,40.3 48.53,46.48" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Event Bus */
function EventBusGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="5.27,12.17 54.73,12.17" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="5.27,23.58 54.73,23.58" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="17.48,13.48 14.28,18.27 16.28,18.27 15.48,22.27 19.08,17.08 17.08,17.08 18.28,13.48" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polygon points="30.8,13.48 27.6,18.27 29.6,18.27 28.8,22.27 32.4,17.08 30.4,17.08 31.6,13.48" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polygon points="44.11,13.48 40.91,18.27 42.91,18.27 42.11,22.27 45.71,17.08 43.71,17.08 44.91,13.48" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="12.88,25.48 12.88,38.8" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="11,36.05 12.88,38.8 14.76,36.05" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="12.88" cy="44.51" rx="3.33" ry="3.33" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30,25.48 30,38.8" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="28.12,36.05 30,38.8 31.88,36.05" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="30" cy="44.51" rx="3.33" ry="3.33" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="47.12,25.48 47.12,38.8" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="45.24,36.05 47.12,38.8 49,36.05" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="47.12" cy="44.51" rx="3.33" ry="3.33" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Pub/Sub */
function PubsubGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.14" y="23.98" width="10.32" height="12.04" rx="1.7" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="17.32,30 23.34,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="20.85,31.7 23.33,30 20.85,28.3" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="29.36" cy="30" rx="6.02" ry="6.02" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="35.37,26.13 46.55,14.52" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="46.05,17.49 46.55,14.52 43.6,15.13" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="50.85" cy="14.53" rx="3.01" ry="3.01" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="35.37,30 46.55,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="44.07,31.7 46.55,30 44.07,28.3" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="50.85" cy="30" rx="3.01" ry="3.01" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="35.37,33.87 46.55,45.48" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="43.6,44.86 46.55,45.47 46.05,42.5" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="50.85" cy="45.48" rx="3.01" ry="3.01" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** ESB */
function EsbGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="8.14" y="26.64" width="43.71" height="6.73" rx="1.68" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="14.03,19.91 14.03,26.64" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="8.98" y="9.82" width="10.09" height="10.09" rx="1.7" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,19.91 30,26.64" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="24.96" y="9.82" width="10.09" height="10.09" rx="1.7" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="45.97,19.91 45.97,26.64" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="40.93" y="9.82" width="10.09" height="10.09" rx="1.7" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="21.59,33.36 21.59,40.09" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="16.55" y="40.09" width="10.09" height="10.09" rx="1.7" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="38.41,33.36 38.41,40.09" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="33.36" y="40.09" width="10.09" height="10.09" rx="1.7" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** iPaaS */
function IpaasGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="32.14,12.85 55.72,12.85 55.72,47.14 32.14,47.14 32.14,36.77 33.19,36.17 34.12,35.41 34.93,34.51 35.57,33.48 36.04,32.38 36.33,31.2 36.43,30 36.33,28.8 36.04,27.62 35.57,26.51 34.93,25.48 34.12,24.58 33.19,23.82 32.14,23.22" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="4.28,12.85 27.86,12.85 27.86,23.57 29.41,23.59 30.97,23.9 32.42,24.6 33.64,25.62 34.58,26.92 35.15,28.41 35.36,30 35.15,31.58 34.58,33.07 33.64,34.37 32.42,35.4 30.97,36.09 29.41,36.4 27.86,36.43 27.86,47.14 4.28,47.14" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Webhook */
function WebhookGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="14.31,15.99 14.31,42.89 14.31,42.89 14.75,45.66 16.02,48.16 18.01,50.14 20.51,51.42 23.28,51.86 26.05,51.42 28.55,50.14 30.53,48.16 31.81,45.66 32.24,42.89 32.24,36.17" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="27.76,39.53 32.24,35.05 36.73,39.53" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="14.3" cy="12.62" rx="4.49" ry="4.49" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="43.45,11.51 36.72,27.2 43.45,27.2 37.85,40.65 50.18,22.72 43.45,22.72 47.93,11.51" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Notifications */
function AlertingGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="14.72,26.69 15,23.91 15.81,21.23 17.12,18.76 18.9,16.61 21.06,14.83 23.52,13.52 26.2,12.7 28.98,12.43 31.76,12.7 34.44,13.52 36.91,14.83 39.07,16.61 40.84,18.76 42.15,21.23 42.97,23.91 43.24,26.69 43.24,36.88 48.34,44.01 9.63,44.01 14.72,36.88" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="33.57,47.06 33.22,48.81 32.23,50.3 30.74,51.3 28.99,51.64 27.23,51.3 25.75,50.3 24.75,48.81 24.4,47.06" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="28.98,8.35 28.98,12.42" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="45.28" cy="13.45" rx="5.09" ry="5.09" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Email / SMTP */
function EmailGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="4.76" y="12.53" width="50.48" height="34.95" rx="3.9" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="6.7,15.44 30,32.91 53.29,15.44" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="6.7,44.56 22.23,28.06" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="53.3,44.56 37.77,28.06" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** SFTP */
function FileStorageGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="5.25,12.18 22.08,12.18 27.03,17.13 54.75,17.13 54.75,47.82 5.25,47.82" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="23.07,41.88 23.07,24.06" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.31,27.33 23.07,24.06 20.84,27.33" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="36.93,24.06 36.93,41.88" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="34.69,38.61 36.93,41.88 39.16,38.61" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** ETL */
function EtlGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="15.85" cy="13.64" rx="2.65" ry="2.65" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="24.7" cy="11.88" rx="2.65" ry="2.65" fill="currentColor" stroke="currentColor" strokeWidth="2.8" opacity="0.6" />
      <ellipse cx="33.53" cy="13.64" rx="2.65" ry="2.65" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="42.38" cy="11.88" rx="2.65" ry="2.65" fill="currentColor" stroke="currentColor" strokeWidth="2.8" opacity="0.6" />
      <polygon points="8.78,18.95 51.22,18.95 35.31,34.87 35.31,45.48 24.7,50.78 24.7,34.87" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="15.85,24.25 44.15,24.25" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Database */
function DatabaseGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="30" cy="12.4" rx="18.79" ry="5.87" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="11.21,12.4 11.21,24.14 11.27,24.63 11.46,25.11 11.76,25.57 12.17,26.01 12.69,26.45 13.31,26.86 14.02,27.25 14.83,27.63 15.73,27.98 16.71,28.31 17.77,28.61 18.9,28.89 20.1,29.14 21.36,29.37 22.68,29.56 24.06,29.72 25.48,29.84 26.95,29.94 28.46,29.99 31.54,29.99 33.05,29.94 34.51,29.84 35.94,29.72 37.31,29.56 38.63,29.37 39.89,29.14 41.09,28.89 42.22,28.61 43.28,28.31 44.26,27.98 45.16,27.63 45.97,27.25 46.69,26.86 47.31,26.45 47.83,26.01 48.24,25.57 48.54,25.11 48.72,24.63 48.78,12.4" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="11.21,24.14 11.21,35.88 11.27,36.37 11.46,36.85 11.76,37.31 12.17,37.75 12.69,38.19 13.31,38.6 14.02,38.99 14.83,39.37 15.73,39.72 16.71,40.05 17.77,40.35 18.9,40.63 20.1,40.88 21.36,41.11 22.68,41.3 24.06,41.46 25.48,41.58 26.95,41.68 28.46,41.73 31.54,41.73 33.05,41.68 34.51,41.58 35.94,41.46 37.31,41.3 38.63,41.11 39.89,40.88 41.09,40.63 42.22,40.35 43.28,40.05 44.26,39.72 45.16,39.37 45.97,38.99 46.69,38.6 47.31,38.19 47.83,37.75 48.24,37.31 48.54,36.85 48.72,36.37 48.78,24.14" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="11.21,35.88 11.21,47.62 11.27,48.11 11.46,48.59 11.76,49.05 12.17,49.49 12.69,49.93 13.31,50.34 14.02,50.73 14.83,51.11 15.73,51.46 16.71,51.79 17.77,52.09 18.9,52.37 20.1,52.62 21.36,52.85 22.68,53.04 24.06,53.2 25.48,53.32 26.95,53.42 28.46,53.47 31.54,53.47 33.05,53.42 34.51,53.32 35.94,53.2 37.31,53.04 38.63,52.85 39.89,52.62 41.09,52.37 42.22,52.09 43.28,51.79 44.26,51.46 45.16,51.11 45.97,50.73 46.69,50.34 47.31,49.93 47.83,49.49 48.24,49.05 48.54,48.59 48.72,48.11 48.78,35.88" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="40.57" cy="20.62" rx="2.23" ry="2.23" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="40.57" cy="20.62" rx="0.94" ry="0.94" fill="currentColor" stroke="none" />
      <ellipse cx="40.57" cy="32.36" rx="2.23" ry="2.23" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="40.57" cy="32.36" rx="0.94" ry="0.94" fill="currentColor" stroke="none" />
      <ellipse cx="40.57" cy="44.1" rx="2.23" ry="2.23" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="40.57" cy="44.1" rx="0.94" ry="0.94" fill="currentColor" stroke="none" />
    </GlyphBase>
  );
}

/** Cache */
function CacheGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="11" y="13.12" width="37.99" height="33.77" rx="4.2" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="17.34,6.78 17.34,13.11" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="17.34,46.88 17.34,53.21" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.78,6.78 25.78,13.11" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.78,46.88 25.78,53.21" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="34.22,6.78 34.22,13.11" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="34.22,46.88 34.22,53.21" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="42.66,6.78 42.66,13.11" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="42.66,46.88 42.66,53.21" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="32.11,18.39 23.67,31.05 28.94,31.05 26.83,41.61 36.33,27.89 31.05,27.89 34.22,18.39" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Object Storage */
function ObjectStorageGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="9.48,13.88 16.32,48.08 43.68,48.08 50.51,13.88" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="30" cy="48.08" rx="13.68" ry="3.42" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="30" cy="13.88" rx="20.52" ry="5.38" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="19.25" y="24.63" width="8.79" height="8.79" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="31.95" y="26.58" width="8.79" height="8.79" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <rect x="25.11" y="36.35" width="8.79" height="8.79" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
    </GlyphBase>
  );
}

/** Search Engine */
function SearchEngineGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="25.06" cy="25.06" rx="16.06" ry="16.06" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="37.41,37.41 51,51" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="18.88,25.06 31.23,25.06" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="25.06,18.88 25.06,31.23" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Time Series DB */
function TimeSeriesDbGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="9.82" y="13.15" width="31.29" height="31.29" fill="currentColor" fillOpacity="0.14" stroke="none" />
      <polyline points="9.82,13.15 9.82,44.44" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="41.12,13.15 41.12,44.44" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="41.12,44.44 40.82,45.42 39.93,46.36 38.48,47.22 36.54,47.98 34.17,48.61 31.46,49.07 28.53,49.35 25.47,49.45 22.42,49.35 19.49,49.07 16.78,48.61 14.4,47.98 12.46,47.22 11.02,46.36 10.13,45.42 9.83,44.44" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="25.46" cy="13.14" rx="15.64" ry="5" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="41.12,24.68 40.82,25.66 39.93,26.6 38.48,27.46 36.54,28.22 34.17,28.85 31.46,29.31 28.53,29.59 25.47,29.69 22.42,29.59 19.49,29.31 16.78,28.85 14.4,28.22 12.46,27.46 11.02,26.6 10.13,25.66 9.83,24.68" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="41.12,34.56 40.82,35.54 39.93,36.48 38.48,37.34 36.54,38.1 34.17,38.73 31.46,39.19 28.53,39.47 25.47,39.57 22.42,39.47 19.49,39.19 16.78,38.73 14.4,38.1 12.46,37.34 11.02,36.48 10.13,35.54 9.83,34.56" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="41.12" cy="42.8" rx="9.06" ry="9.06" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="41.12,37.03 41.12,42.79 45.24,45.27" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Data Warehouse */
function DataWarehouseGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="11.38" y="12.27" width="37.23" height="35.46" fill="currentColor" fillOpacity="0.14" stroke="none" />
      <polyline points="11.38,12.27 11.38,47.73" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="48.62,12.27 48.62,47.73" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="48.62,47.73 48.27,48.89 47.2,50.01 45.48,51.04 43.17,51.94 40.35,52.69 37.13,53.24 33.64,53.57 30,53.69 26.37,53.57 22.88,53.24 19.66,52.69 16.84,51.94 14.52,51.04 12.8,50.01 11.74,48.89 11.39,47.73" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="29.99" cy="12.27" rx="18.61" ry="5.96" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <rect x="18.48" y="33.55" width="4.43" height="8.87" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="25.12" y="26.45" width="4.43" height="15.96" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="31.77" y="30" width="4.43" height="12.41" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="38.42" y="21.13" width="4.43" height="21.28" rx="0.9" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** BI / Reporting */
function BiReportingGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="21.55" cy="29.5" rx="16.9" ry="16.9" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="21.55,29.5 21.55,12.6 24.77,12.91 27.88,13.83 30.76,15.32 33.29,17.34 35.4,19.81 36.99,22.63 38.01,25.7 38.44,28.91 38.24,32.14 37.43,35.28" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="43.42" y="33.48" width="4.97" height="13.92" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="50.38" y="23.54" width="4.97" height="23.86" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Data Lake */
function DataLakeGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="29.99" cy="39.06" rx="21.41" ry="11.53" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="15.17,37 20.11,41.12 25.05,37 30,41.12 34.94,37 39.88,41.12 44.82,37" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,9.41 30,24.24" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="27.67,20.84 29.99,24.24 32.32,20.84" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Vector Store */
function VectorDbGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="9.55" y="13.06" width="28.88" height="28.88" fill="currentColor" fillOpacity="0.14" stroke="none" />
      <polyline points="9.55,13.06 9.55,41.94" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="38.42,13.06 38.42,41.94" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="38.42,41.94 38.14,42.84 37.32,43.7 35.99,44.51 34.19,45.2 32,45.78 29.51,46.21 26.8,46.47 23.98,46.56 21.17,46.47 18.46,46.21 15.96,45.78 13.77,45.2 11.97,44.51 10.64,43.7 9.82,42.84 9.54,41.94" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="23.99" cy="13.06" rx="14.44" ry="4.62" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="38.42,24.29 38.14,25.19 37.32,26.05 35.99,26.86 34.19,27.55 32,28.13 29.51,28.56 26.8,28.82 23.98,28.91 21.17,28.82 18.46,28.56 15.96,28.13 13.77,27.55 11.97,26.86 10.64,26.05 9.82,25.19 9.54,24.29" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="38.42,33.11 38.14,34.01 37.32,34.87 35.99,35.68 34.19,36.37 32,36.95 29.51,37.38 26.8,37.64 23.98,37.73 21.17,37.64 18.46,37.38 15.96,36.95 13.77,36.37 11.97,35.68 10.64,34.87 9.82,34.01 9.54,33.11" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="40.03" cy="41.14" rx="10.43" ry="10.43" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="35.21,45.95 44.03,36.32" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="43.58,39.5 44.04,36.32 40.91,37.05" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="35.21,45.95 45.64,44.35" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="43.3,46.53 45.64,44.34 42.75,42.95" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** LLM */
function AiModelGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="27.06,13.62 32.24,26.93 45.54,32.1 32.24,37.28 27.06,50.59 21.88,37.28 8.58,32.1 21.88,26.93" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polygon points="44.7,9.42 46.58,14.26 51.42,16.14 46.58,18.02 44.7,22.86 42.82,18.02 37.98,16.14 42.82,14.26" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polygon points="46.38,38.82 47.56,41.84 50.58,43.02 47.56,44.2 46.38,47.22 45.2,44.2 42.18,43.02 45.2,41.84" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** AI Agent */
function AiAgentGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="12" y="21.9" width="35.99" height="28.28" rx="7.07" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="22.29" cy="34.75" rx="3.85" ry="3.85" fill="currentColor" stroke="none" />
      <ellipse cx="37.71" cy="34.75" rx="3.85" ry="3.85" fill="currentColor" stroke="none" />
      <polyline points="23.57,43.75 36.42,43.75" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="30,14.19 30,21.9" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="30" cy="12.91" rx="3.08" ry="3.08" fill="currentColor" stroke="none" />
      <polyline points="12,34.76 8.14,34.76" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="48,34.76 51.86,34.76" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** AI Workflow */
function AiWorkflowGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <ellipse cx="17.64" cy="30" rx="14.64" ry="14.64" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="17.64,20.85 20.2,27.44 26.79,30 20.2,32.57 17.64,39.16 15.08,32.57 8.49,30 15.08,27.44" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="33.2,30 39.61,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="36.59,32.07 39.61,30 36.59,27.93" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="40.53" y="15.36" width="16.47" height="29.29" rx="2.7" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="44.19,23.59 53.34,23.59" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="44.19,30 51.51,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="44.19,36.41 53.34,36.41" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Embeddings */
function EmbeddingsGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="7.17,21.22 22.97,21.22" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="7.17,30 19.46,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="7.17,38.78 22.97,38.78" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="26.49,30 34.39,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="31.49,31.98 34.39,30 31.49,28.01" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="41.41,10.68 38.78,10.68 38.78,49.31 41.41,49.31" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="50.2,10.68 52.83,10.68 52.83,49.31 50.2,49.31" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="45.8" cy="15.96" rx="2.63" ry="2.63" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="45.8" cy="25.17" rx="2.63" ry="2.63" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="45.8" cy="34.4" rx="2.63" ry="2.63" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="45.8" cy="43.61" rx="2.63" ry="2.63" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** MCP Server */
function McpServerGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="5.38" y="12.09" width="32.24" height="35.82" rx="4.5" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <text x="21.45" y="29.78" fontSize="12.5" textAnchor="middle" dominantBaseline="central" fill="currentColor" stroke="none" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">MCP</text>
      <polyline points="37.61,30 42.09,30" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <rect x="42.09" y="23.73" width="8.06" height="12.54" rx="1.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="50.15,26.87 54.63,26.87" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="50.15,33.13 54.63,33.13" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Tool */
function AiToolGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="49.44,16.01 50.2,17.71 50.72,19.5 50.99,21.34 51,23.2 50.76,25.04 50.25,26.84 49.51,28.54 48.54,30.12 47.35,31.56 45.98,32.82 44.44,33.87 42.78,34.7 41.02,35.29 39.19,35.63 37.33,35.72 35.48,35.54 33.66,35.11 31.92,34.43 16.62,49.74 15.49,50.56 14.15,51 12.75,51 11.41,50.56 10.26,49.74 9.44,48.59 9,47.26 9,45.85 9.44,44.52 10.26,43.38 25.58,28.08 24.89,26.35 24.46,24.53 24.28,22.68 24.37,20.81 24.71,18.98 25.3,17.22 26.13,15.56 27.18,14.02 28.45,12.65 29.88,11.46 31.46,10.49 33.16,9.75 34.96,9.25 36.8,9 38.66,9.01 40.5,9.28 42.29,9.8 43.99,10.56 36.07,18.48 41.52,23.93" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="16.84" cy="43.15" rx="1.93" ry="1.93" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Guardrails */
function GuardrailsGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="30,7.61 49.7,15.67 49.7,29.1 49.6,31.24 49.3,33.3 48.8,35.3 48.09,37.21 47.18,39.06 46.08,40.83 44.77,42.53 43.27,44.16 41.56,45.71 39.65,47.19 37.54,48.6 35.23,49.94 32.71,51.19 30,52.38 27.29,51.19 24.77,49.94 22.46,48.6 20.35,47.19 18.44,45.71 16.73,44.16 15.23,42.53 13.92,40.83 12.82,39.06 11.91,37.21 11.2,35.3 10.7,33.3 10.4,31.24 10.3,29.1 10.3,15.67" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="22.84,40.75 22.84,22.84" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="37.16,40.75 37.16,22.84" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30,40.75 30,21.95" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="32.53,25.64 30,21.94 27.47,25.64" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Logging */
function LoggingGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="9" y="9" width="42" height="42" rx="3.4" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <rect x="13.2" y="14.04" width="7.56" height="3.36" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="24.12,15.72 42.6,15.72" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="13.2" y="21.18" width="7.56" height="3.36" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="24.12,22.86 37.56,22.86" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="13.2" y="28.32" width="7.56" height="3.36" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="24.12,30 44.28,30" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="13.2" y="35.46" width="7.56" height="3.36" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="24.12,37.14 34.2,37.14" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="13.2" y="42.6" width="7.56" height="3.36" rx="0.8" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="24.12,44.28 40.08,44.28" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Metrics */
function MetricsGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="8.79,9.21 8.79,50.8 51.21,50.8" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="14.61" y="35.82" width="6.65" height="14.97" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="23.76" y="25.84" width="6.65" height="24.95" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="32.91" y="32.5" width="6.65" height="18.3" rx="1.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="42.06" y="17.52" width="6.65" height="33.27" rx="1.2" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Tracing */
function TracingGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="9.61,8.37 9.61,51.64" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <rect x="13.78" y="10.03" width="36.61" height="5.82" rx="1.46" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="17.1" y="18.35" width="21.63" height="5.82" rx="1.46" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="22.1" y="26.67" width="14.98" height="5.82" rx="1.46" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
      <rect x="38.74" y="34.99" width="9.98" height="5.82" rx="1.46" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="25.42" y="43.31" width="8.32" height="5.82" rx="1.46" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** APM */
function ApmGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polyline points="5.38,36.72 5.59,33.51 6.22,30.35 7.25,27.3 8.68,24.41 10.47,21.73 12.59,19.3 15.02,17.19 17.69,15.4 20.58,13.96 23.64,12.93 26.79,12.31 30,12.1 33.22,12.31 36.37,12.93 39.43,13.96 42.32,15.4 44.99,17.19 47.42,19.3 49.54,21.73 51.33,24.41 52.76,27.3 53.79,30.35 54.42,33.51 54.63,36.72" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="9.85,36.72 14.33,36.72" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="15.75,22.47 18.92,25.64" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30,16.57 30,21.05" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="44.25,22.47 41.08,25.64" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="50.15,36.72 45.67,36.72" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="30,36.72 39.63,22.96" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="30" cy="36.72" rx="3.92" ry="3.92" fill="currentColor" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="5.38,47.91 54.63,47.91" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** Monitoring */
function MonitoringGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="6.95" y="16.08" width="43.49" height="33.05" rx="4.3" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="10.43,34.35 19.13,34.35 23.48,23.04 28.69,43.92 33.91,29.13 37.39,34.35 46.96,34.35" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <ellipse cx="46.96" cy="16.96" rx="6.09" ry="6.09" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="46.96,13.91 46.96,17.39" fill="none" stroke="#ffffff" strokeWidth="2.8" />
      <ellipse cx="46.96" cy="20" rx="0.52" ry="0.52" fill="#ffffff" stroke="#ffffff" strokeWidth="1.4" />
    </GlyphBase>
  );
}

/** Dashboard */
function DashboardGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <rect x="7.17" y="10.68" width="45.66" height="38.63" rx="3.5" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="7.17,18.59 52.83,18.59" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="11.56" cy="14.63" rx="1.23" ry="1.23" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="15.95" cy="14.63" rx="1.23" ry="1.23" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11.56" y="22.98" width="12.29" height="8.78" rx="1.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <rect x="11.56" y="35.27" width="12.29" height="8.78" rx="1.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="28.24,43.17 34.39,33.51 39.65,37.9 48.44,25.61" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="28.24,44.93 48.44,44.93" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** CI/CD Pipeline */
function CicdGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="57,30 56.61,33.26 55.51,36.22 53.82,38.65 51.76,40.41 49.48,41.48 47.15,41.91 44.88,41.8 42.73,41.25 40.72,40.36 38.87,39.22 37.16,37.89 35.57,36.44 34.09,34.89 32.69,33.29 31.33,31.65 30,30 28.67,28.35 27.31,26.71 25.91,25.11 24.43,23.56 22.84,22.11 21.13,20.78 19.28,19.64 17.27,18.75 15.12,18.2 12.85,18.09 10.52,18.52 8.24,19.59 6.18,21.35 4.49,23.78 3.39,26.74 3,30 3.39,33.26 4.49,36.22 6.18,38.65 8.24,40.41 10.52,41.48 12.85,41.91 15.12,41.8 17.27,41.25 19.28,40.36 21.13,39.22 22.84,37.89 24.43,36.44 25.91,34.89 27.31,33.29 28.67,31.65 30,30 31.33,28.35 32.69,26.71 34.09,25.11 35.57,23.56 37.16,22.11 38.87,20.78 40.72,19.64 42.73,18.75 44.88,18.2 47.15,18.09 49.48,18.52 51.76,19.59 53.82,21.35 55.51,23.78 56.61,26.74" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="15.96,15.42 21.36,17.04 17.58,21.36" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="44.04,44.58 38.64,42.96 42.42,38.64" fill="none" stroke="currentColor" strokeWidth="2.8" />
    </GlyphBase>
  );
}

/** Artifact Registry */
function ArtifactRegistryGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="7.81,20.06 25.1,30 25.1,49.87 7.81,39.93" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polygon points="25.1,30 42.39,20.06 42.39,39.94 25.1,49.87" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polygon points="25.1,10.13 42.39,20.07 25.1,30 7.81,20.07" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="16.42,15.1 33.76,25.04" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polygon points="37.74,33.61 48.58,33.61 52.19,39.03 48.58,44.45 37.74,44.45" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
      <ellipse cx="48.59" cy="39.04" rx="1.26" ry="1.26" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      <polyline points="40.45,39.03 44.97,39.03" fill="none" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

/** IaC */
function IacGlyph({ size }: IconProps) {
  return (
    <GlyphBase size={size}>
      <polygon points="9.5,8.49 29.35,8.49 37.63,16.76 37.63,48.2 9.5,48.2" fill="#ffffff" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="29.35,8.49 29.35,16.76 37.62,16.76" fill="none" stroke="currentColor" strokeWidth="2.1" />
      <polyline points="17.77,23.38 13.63,27.52 17.77,31.65" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polyline points="26.04,23.38 30.18,27.52 26.04,31.65" fill="none" stroke="currentColor" strokeWidth="2.8" />
      <polygon points="34.67,37.86 42.59,42.41 42.59,51.51 34.67,46.96" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.1" />
      <polygon points="42.59,42.41 50.51,37.86 50.51,46.96 42.59,51.51" fill="currentColor" stroke="currentColor" strokeWidth="2.1" />
      <polygon points="42.59,33.31 50.51,37.86 42.59,42.41 34.67,37.86" fill="#ffffff" stroke="currentColor" strokeWidth="2.1" />
    </GlyphBase>
  );
}

export const systemDesignIcons: Partial<Record<NodeKind, (props: IconProps) => ReactElement>> = {
  [NODE_KINDS.USER]: UserGlyph,
  [NODE_KINDS.ADMIN]: AdminGlyph,
  [NODE_KINDS.MOBILE]: MobileGlyph,
  [NODE_KINDS.ATM]: AtmGlyph,
  [NODE_KINDS.POS]: PosGlyph,
  [NODE_KINDS.FRONTEND]: FrontendGlyph,
  [NODE_KINDS.WEB_APP]: WebAppGlyph,
  [NODE_KINDS.CLI]: CliGlyph,
  [NODE_KINDS.EXTERNAL]: ExternalGlyph,
  [NODE_KINDS.INTERNET]: InternetGlyph,
  [NODE_KINDS.CLOUD]: CloudGlyph,
  [NODE_KINDS.ONPREMISE]: OnpremiseGlyph,
  [NODE_KINDS.PAYMENT_NETWORK]: PaymentNetworkGlyph,
  [NODE_KINDS.DNS]: DnsGlyph,
  [NODE_KINDS.CDN]: CdnGlyph,
  [NODE_KINDS.LOAD_BALANCER]: LoadBalancerGlyph,
  [NODE_KINDS.REVERSE_PROXY]: ReverseProxyGlyph,
  [NODE_KINDS.GATEWAY]: GatewayGlyph,
  [NODE_KINDS.ROUTER]: RouterGlyph,
  [NODE_KINDS.SWITCH]: SwitchGlyph,
  [NODE_KINDS.VPN]: VpnGlyph,
  [NODE_KINDS.SECURITY]: SecurityGlyph,
  [NODE_KINDS.API_SECURITY]: ApiSecurityGlyph,
  [NODE_KINDS.IAM]: IamGlyph,
  [NODE_KINDS.OAUTH2]: Oauth2Glyph,
  [NODE_KINDS.SECRETS]: SecretsGlyph,
  [NODE_KINDS.KEY_VAULT]: KeyVaultGlyph,
  [NODE_KINDS.HSM]: HsmGlyph,
  [NODE_KINDS.BACKEND]: BackendGlyph,
  [NODE_KINDS.GRAPHQL]: GraphqlGlyph,
  [NODE_KINDS.SERVERLESS]: ServerlessGlyph,
  [NODE_KINDS.VIRTUAL_MACHINE]: VirtualMachineGlyph,
  [NODE_KINDS.CONTAINER]: ContainerGlyph,
  [NODE_KINDS.KUBERNETES]: KubernetesGlyph,
  [NODE_KINDS.AUTO_SCALING]: AutoScalingGlyph,
  [NODE_KINDS.SERVICE_MESH]: ServiceMeshGlyph,
  [NODE_KINDS.WORKER]: WorkerGlyph,
  [NODE_KINDS.SCHEDULER]: SchedulerGlyph,
  [NODE_KINDS.BATCH]: BatchGlyph,
  [NODE_KINDS.MAINFRAME]: MainframeGlyph,
  [NODE_KINDS.BANK]: BankGlyph,
  [NODE_KINDS.QUEUE]: QueueGlyph,
  [NODE_KINDS.STREAMING]: StreamingGlyph,
  [NODE_KINDS.EVENT_BUS]: EventBusGlyph,
  [NODE_KINDS.PUBSUB]: PubsubGlyph,
  [NODE_KINDS.ESB]: EsbGlyph,
  [NODE_KINDS.IPAAS]: IpaasGlyph,
  [NODE_KINDS.WEBHOOK]: WebhookGlyph,
  [NODE_KINDS.ALERTING]: AlertingGlyph,
  [NODE_KINDS.EMAIL]: EmailGlyph,
  [NODE_KINDS.FILE_STORAGE]: FileStorageGlyph,
  [NODE_KINDS.ETL]: EtlGlyph,
  [NODE_KINDS.DATABASE]: DatabaseGlyph,
  [NODE_KINDS.CACHE]: CacheGlyph,
  [NODE_KINDS.OBJECT_STORAGE]: ObjectStorageGlyph,
  [NODE_KINDS.SEARCH_ENGINE]: SearchEngineGlyph,
  [NODE_KINDS.TIME_SERIES_DB]: TimeSeriesDbGlyph,
  [NODE_KINDS.DATA_WAREHOUSE]: DataWarehouseGlyph,
  [NODE_KINDS.BI_REPORTING]: BiReportingGlyph,
  [NODE_KINDS.DATA_LAKE]: DataLakeGlyph,
  [NODE_KINDS.VECTOR_DB]: VectorDbGlyph,
  [NODE_KINDS.AI_MODEL]: AiModelGlyph,
  [NODE_KINDS.AI_AGENT]: AiAgentGlyph,
  [NODE_KINDS.AI_WORKFLOW]: AiWorkflowGlyph,
  [NODE_KINDS.EMBEDDINGS]: EmbeddingsGlyph,
  [NODE_KINDS.MCP_SERVER]: McpServerGlyph,
  [NODE_KINDS.AI_TOOL]: AiToolGlyph,
  [NODE_KINDS.GUARDRAILS]: GuardrailsGlyph,
  [NODE_KINDS.LOGGING]: LoggingGlyph,
  [NODE_KINDS.METRICS]: MetricsGlyph,
  [NODE_KINDS.TRACING]: TracingGlyph,
  [NODE_KINDS.APM]: ApmGlyph,
  [NODE_KINDS.MONITORING]: MonitoringGlyph,
  [NODE_KINDS.DASHBOARD]: DashboardGlyph,
  [NODE_KINDS.CICD]: CicdGlyph,
  [NODE_KINDS.ARTIFACT_REGISTRY]: ArtifactRegistryGlyph,
  [NODE_KINDS.IAC]: IacGlyph,
};
