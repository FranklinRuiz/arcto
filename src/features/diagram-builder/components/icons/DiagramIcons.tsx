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

/** API Gateway — horizontal lines feeding into an ellipse port with output spurs */
export function GatewayIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke="currentColor"
         strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <path d="M2 8h12" strokeWidth="1.5"/>
      <path d="M2 12h12" strokeWidth="1.5"/>
      <path d="M2 16h12" strokeWidth="1.5"/>
      <ellipse cx="14" cy="12" rx="3" ry="7" strokeWidth="2.2"/>
      <path d="M18.5 10.5h3.5" strokeWidth="1.5"/>
      <path d="M18.5 13.5h2.5" strokeWidth="1.5"/>
    </svg>
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
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke="currentColor"
         strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8" ry="2.5"/>
      <path d="M4 5v5c0 1.4 3.58 2.5 8 2.5s8-1.1 8-2.5V5"/>
      <path d="M4 10v5c0 1.4 3.58 2.5 8 2.5s8-1.1 8-2.5v-5"/>
      <path d="M4 15v5c0 1.4 3.58 2.5 8 2.5s8-1.1 8-2.5v-5"/>
      <circle cx="16.5" cy="8.5" r="0.95"/>
      <circle fill="currentColor" stroke="none" cx="16.5" cy="8.5" r="0.4"/>
      <circle cx="16.5" cy="13.5" r="0.95"/>
      <circle fill="currentColor" stroke="none" cx="16.5" cy="13.5" r="0.4"/>
      <circle cx="16.5" cy="18.5" r="0.95"/>
      <circle fill="currentColor" stroke="none" cx="16.5" cy="18.5" r="0.4"/>
    </svg>
  );
}

export function CacheIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 -18 256 256"
         xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="xMidYMid meet"
         aria-hidden="true">
      {/* Layer 3 bottom — shadow */}
      <path fill="currentColor" fillOpacity={0.6} stroke="#9ca3af" strokeWidth={1.5}
        d="M245.97 168.943c-13.662 7.121-84.434 36.22-99.501 44.075-15.067 7.856-23.437 7.78-35.34 2.09-11.902-5.69-87.216-36.112-100.783-42.597C3.566 169.271 0 166.535 0 163.951v-25.876s98.05-21.345 113.879-27.024c15.828-5.679 21.32-5.884 34.79-.95 13.472 4.936 94.018 19.468 107.331 24.344l-.006 25.51c.002 2.558-3.07 5.364-10.024 8.988"/>
      {/* Layer 3 bottom — face */}
      <path fill="currentColor" stroke="#9ca3af" strokeWidth={1.5}
        d="M245.965 143.22c-13.661 7.118-84.431 36.218-99.498 44.072-15.066 7.857-23.436 7.78-35.338 2.09-11.903-5.686-87.214-36.113-100.78-42.594-13.566-6.485-13.85-10.948-.524-16.166 13.326-5.22 88.224-34.605 104.055-40.284 15.828-5.677 21.319-5.884 34.789-.948 13.471 4.934 83.819 32.935 97.13 37.81 13.316 4.881 13.827 8.9.166 16.02"/>
      {/* Layer 2 middle — shadow */}
      <path fill="currentColor" fillOpacity={0.6} stroke="#9ca3af" strokeWidth={1.5}
        d="M245.97 127.074c-13.662 7.122-84.434 36.22-99.501 44.078-15.067 7.853-23.437 7.777-35.34 2.087-11.903-5.687-87.216-36.112-100.783-42.597C3.566 127.402 0 124.67 0 122.085V96.206s98.05-21.344 113.879-27.023c15.828-5.679 21.32-5.885 34.79-.95C162.142 73.168 242.688 87.697 256 92.574l-.006 25.513c.002 2.557-3.07 5.363-10.024 8.987"/>
      {/* Layer 2 middle — face */}
      <path fill="currentColor" stroke="#9ca3af" strokeWidth={1.5}
        d="M245.965 101.351c-13.661 7.12-84.431 36.218-99.498 44.075-15.066 7.854-23.436 7.777-35.338 2.087-11.903-5.686-87.214-36.112-100.78-42.594-13.566-6.483-13.85-10.947-.524-16.167C23.151 83.535 98.05 54.148 113.88 48.47c15.828-5.678 21.319-5.884 34.789-.949 13.471 4.934 83.819 32.933 97.13 37.81 13.316 4.88 13.827 8.9.166 16.02"/>
      {/* Layer 1 top — shadow */}
      <path fill="currentColor" fillOpacity={0.6} stroke="#9ca3af" strokeWidth={1.5}
        d="M245.97 83.653c-13.662 7.12-84.434 36.22-99.501 44.078-15.067 7.854-23.437 7.777-35.34 2.087-11.903-5.687-87.216-36.113-100.783-42.595C3.566 83.98 0 81.247 0 78.665v-25.88s98.05-21.343 113.879-27.021c15.828-5.68 21.32-5.884 34.79-.95C162.142 29.749 242.688 44.278 256 49.155l-.006 25.512c.002 2.555-3.07 5.361-10.024 8.986"/>
      {/* Layer 1 top — face */}
      <path fill="currentColor" stroke="#9ca3af" strokeWidth={1.5}
        d="M245.965 57.93c-13.661 7.12-84.431 36.22-99.498 44.074-15.066 7.854-23.436 7.777-35.338 2.09C99.227 98.404 23.915 67.98 10.35 61.497-3.217 55.015-3.5 50.55 9.825 45.331 23.151 40.113 98.05 10.73 113.88 5.05c15.828-5.679 21.319-5.883 34.789-.948 13.471 4.935 83.819 32.934 97.13 37.811 13.316 4.876 13.827 8.897.166 16.017"/>
      {/* Top-layer decorations */}
      <path fill="white"
        d="M159.283 32.757l-22.01 2.285-4.927 11.856-7.958-13.23-25.415-2.284 18.964-6.839-5.69-10.498 17.755 6.944 16.738-5.48-4.524 10.855 17.067 6.391M131.032 90.275L89.955 73.238l58.86-9.035-17.783 26.072M74.082 39.347c17.375 0 31.46 5.46 31.46 12.194 0 6.736-14.085 12.195-31.46 12.195s-31.46-5.46-31.46-12.195c0-6.734 14.085-12.194 31.46-12.194"/>
      {/* Corner accent */}
      <path fill="currentColor" fillOpacity={0.35}
        d="M185.295 35.998l34.836 13.766-34.806 13.753-.03-27.52"/>
      <path fill="currentColor" fillOpacity={0.5}
        d="M146.755 51.243l38.54-15.245.03 27.519-3.779 1.478-34.791-13.752"/>
    </svg>
  );
}

/** Message Queue — three mail-slot envelopes with diagonal fold lines */
export function QueueIcon({ size }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 -24.29 70 70"
         xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true">
      <path
        fill="currentColor"
        transform="translate(75.978 -561.815)"
        d="m -74.536841,582.9697 c -0.5739,-0.3564 -0.9798,-0.8262 -1.2288,-1.42208 -0.1842,-0.44084 -0.2124,-1.67048 -0.2124,-9.25077 l 0,-8.74235 0.3412,-0.58221 c 0.2275,-0.38821 0.5392,-0.67807 0.9355,-0.8699 l 0.5943,-0.28769 30.6283,0 30.6284,0 0.4666,0.40964 c 0.576,0.50575 1.5351,1.8918 2.8031998,4.05114 1.1169,1.90172 3.6025,6.50778 3.6025,6.67569 0,0.0625 -0.5343,1.02571 -1.1873,2.14052 -2.5548,4.36132 -4.0824998,6.67906 -5.0211998,7.61777 l -0.517,0.517 -30.7108,-5.5e-4 c -29.72,-5.5e-4 -30.724,-0.009 -31.1225,-0.25625 z m 61.8655,-2.00794 c 1.0439,-1.36682 4.9089998,-7.7182 4.9089998,-8.06671 0,-0.35714 -3.7130998,-6.91975 -4.9688998,-8.78224 l -0.5328,-0.79012 -30.4073,0.0352 c -29.9204,0.0346 -30.4104,0.0395 -30.6021,0.30165 -0.1632,0.22317 -0.1948,1.61999 -0.1948,8.60381 0,4.71803 0.055,8.48097 0.1258,8.66815 0.069,0.18193 0.2281,0.43315 0.3532,0.55826 0.2107,0.21065 2.4691,0.22493 30.5106,0.19287 l 30.2832,-0.0346 0.5241,-0.68627 z m -59.0663,-1.45522 c -0.1967,-0.0731 -0.4283,-0.28802 -0.5147,-0.47764 -0.1105,-0.24251 -0.1571,-2.17256 -0.1571,-6.50712 l 0,-6.16236 0.3312,-0.38511 0.3312,-0.3851 8.0071,-0.0403 c 4.4038,-0.0222 8.2112,-0.003 8.4607,0.042 0.2496,0.0453 0.5738,0.20238 0.7206,0.34915 0.2567,0.25671 0.2669,0.51135 0.2669,6.69656 0,6.36177 0,6.43247 -0.2889,6.69118 -0.2766,0.25041 -0.6379,0.26253 -8.5441,0.28656 -5.0499,0.0154 -8.3941,-0.0265 -8.6129,-0.10776 z m 15.5243,-5.89602 c 0,-3.15544 -0.036,-3.9665 -0.1716,-3.88322 -0.094,0.0579 -1.5304,1.16294 -3.1911,2.45564 -3.6181,2.81614 -3.6786,2.85716 -4.0477,2.74004 -0.1576,-0.05 -1.5349,-1.06002 -3.0606,-2.24443 -1.5258,-1.1844 -3.0057,-2.32946 -3.2888,-2.54456 l -0.5147,-0.39109 0,3.92806 0,3.92805 7.1373,0 7.1372,0 0,-3.98849 z m -3.3639,-3.84379 2.7438,-2.1187 -3.3272,-0.0367 c -1.8299,-0.0202 -4.8013,-0.0202 -6.6031,0 l -3.2759,0.0367 3.3038,2.56723 3.3037,2.56724 0.5555,-0.44854 c 0.3055,-0.2467 1.7902,-1.40195 3.2994,-2.56723 z m 7.7685,9.74312 c -0.7006,-0.2836 -0.6897,-0.17635 -0.6943,-6.81124 0,-4.35355 0.042,-6.30658 0.1518,-6.54709 0.086,-0.18852 0.3421,-0.40761 0.5695,-0.48685 0.5876,-0.20487 16.0989,-0.1978 16.6881,0.008 0.2393,0.0834 0.4956,0.26467 0.5695,0.40274 0.082,0.15342 0.1343,2.72848 0.1343,6.62116 0,6.30118 0,6.37293 -0.2888,6.63157 -0.2766,0.25036 -0.6395,0.26262 -8.5441,0.28872 -5.1129,0.0169 -8.3812,-0.0237 -8.586,-0.10661 z m 15.4974,-5.89933 c 0,-3.1556 -0.036,-3.96645 -0.1715,-3.88292 -0.094,0.0581 -1.5613,1.18509 -3.2598,2.50449 -3.5206,2.7348 -3.6967,2.84559 -4.1469,2.60967 -0.1726,-0.0905 -1.6727,-1.21553 -3.3335,-2.50017 -1.6608,-1.28464 -3.0968,-2.39511 -3.1912,-2.46771 -0.1363,-0.1049 -0.1715,0.6748 -0.1715,3.79656 l 0,3.92857 7.1372,0 7.1373,0 0,-3.98849 z m -2.9642,-4.16012 2.3202,-1.80237 -3.3153,-0.0367 c -1.8234,-0.0202 -4.7891,-0.0202 -6.5906,0 l -3.2753,0.0367 3.2907,2.56932 3.2908,2.56931 0.9797,-0.76694 c 0.5388,-0.42182 2.0237,-1.57801 3.2998,-2.56932 z m 7.2877,10.05068 c -0.626,-0.34633 -0.6179,-0.2553 -0.6133,-6.90379 0,-6.81272 -0.013,-6.64929 0.7364,-6.93406 0.5357,-0.2037 16.087,-0.19527 16.673,0.009 0.2394,0.0834 0.4956,0.26466 0.5695,0.40274 0.082,0.15331 0.1344,2.70672 0.1344,6.55859 0,6.0054 -0.013,6.32307 -0.2623,6.63157 l -0.2624,0.32403 -8.3504,0.0319 c -5.9014,0.0225 -8.4309,-0.0127 -8.6249,-0.12 z m 15.5784,-5.89056 c 0,-3.1548 -0.036,-3.96674 -0.1715,-3.88441 -0.094,0.0573 -1.5613,1.18433 -3.2598,2.50462 -3.5193,2.73555 -3.6964,2.8471 -4.147,2.61103 -0.1726,-0.0905 -1.6727,-1.21553 -3.3334,-2.50017 -1.6608,-1.28464 -3.0969,-2.39511 -3.1912,-2.46771 -0.1363,-0.1049 -0.1716,0.6748 -0.1716,3.79656 l 0,3.92857 7.1373,0 7.1372,0 0,-3.98849 z m -3.958,-5.99924 c -1.8241,-0.0202 -4.7957,-0.0202 -6.6037,0 l -3.2872,0.0367 3.2982,2.56232 3.2982,2.56232 3.3055,-2.56232 3.3055,-2.56232 -3.3165,-0.0367 z"/>
    </svg>
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
    <svg width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke="currentColor"
         strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18"/>
      <path d="M12 3a14 14 0 0 1 0 18"/>
      <path d="M12 3a14 14 0 0 0 0 18"/>
    </svg>
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
