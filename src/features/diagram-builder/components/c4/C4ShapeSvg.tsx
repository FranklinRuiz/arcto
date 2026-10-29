import type { C4Shape } from '../../types/diagram.types';

interface C4ShapeSvgProps {
  shape: C4Shape;
  width: number;
  height: number;
  color: string;
  strokeWidth?: number;
  /** Scale for fixed-size details (corner radius, browser bar, shell glyph). 1 = canvas node. */
  detail?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Proportions that the text layout also needs, so both stay in sync. */
function c4ShapeMetrics(shape: C4Shape, w: number, h: number, u = 1) {
  return {
    personHeadR: w * 0.225,
    personBodyTop: w * 0.225 * 1.75,
    browserBar: 25 * u,
    browserFrame: 5 * u,
    folderTab: 12 * u,
    cylinderRy: h * 0.1,
    bucketInset: shape === 'bucket' ? w * 0.07 : 0,
    lugW: w * 0.133,
    lugH: h * 0.107,
  };
}

/** Padding (px) of the area where the name / type / description go. */
export function c4TextInsets(shape: C4Shape, w: number, h: number): { top: number; right: number; bottom: number; left: number } {
  const m = c4ShapeMetrics(shape, w, h);
  switch (shape) {
    case 'person':    return { top: m.personBodyTop + 4, right: 8, bottom: 6, left: 8 };
    case 'browser':   return { top: m.browserBar + 4, right: 10, bottom: 8, left: 10 };
    case 'shell':     return { top: 22, right: 8, bottom: 8, left: 8 };
    case 'folder':    return { top: m.folderTab + 4, right: 8, bottom: 6, left: 8 };
    case 'cylinder':  return { top: m.cylinderRy * 2 + 2, right: 8, bottom: m.cylinderRy * 0.8, left: 8 };
    case 'bucket':    return { top: m.cylinderRy * 2 + 2, right: w * 0.09, bottom: m.cylinderRy * 0.8, left: w * 0.09 };
    case 'component': return { top: 8, right: 8, bottom: 8, left: m.lugW + 6 };
    case 'ellipse':   return { top: h * 0.14, right: w * 0.12, bottom: h * 0.14, left: w * 0.12 };
    default:          return { top: 8, right: 8, bottom: 8, left: 8 };
  }
}

export function C4ShapeSvg({ shape, width: w, height: h, color, strokeWidth: sw = 2.5, detail: u = 1, className, style }: C4ShapeSvgProps) {
  const m = c4ShapeMetrics(shape, w, h, u);
  const o = sw / 2;
  const W = w - sw;
  const H = h - sw;
  const stroke = { fill: '#ffffff', stroke: color, strokeWidth: sw, strokeLinejoin: 'round' as const };
  let body: React.ReactNode;

  switch (shape) {
    case 'person': {
      const r = m.personHeadR;
      const top = m.personBodyTop;
      const bodyH = h - top - o;
      body = (
        <>
          <rect x={o} y={top} width={W} height={bodyH} rx={w * 0.17} {...stroke} />
          {u >= 1 && (
            <path
              d={`M${w * 0.2},${top + bodyH * 0.44}V${top + bodyH}M${w * 0.8},${top + bodyH * 0.44}V${top + bodyH}`}
              stroke={color} strokeWidth={0.75} opacity={0.65} fill="none"
            />
          )}
          <circle cx={w / 2} cy={r + o} r={r} {...stroke} />
        </>
      );
      break;
    }
    case 'browser': {
      const b = m.browserFrame;
      const bar = m.browserBar;
      const dot = 4.5 * u;
      const gap = 13 * u;
      const urlX = b + 3 * gap + 4 * u;
      body = (
        <>
          <rect x={0} y={0} width={w} height={h} rx={6 * u} fill={color} />
          <rect x={b} y={bar} width={w - 2 * b} height={h - bar - b} rx={2.5 * u} fill="#ffffff" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={b + dot + 2 * u + i * gap} cy={bar / 2} r={dot} fill="#ffffff" />
          ))}
          <rect x={urlX} y={bar / 2 - dot} width={Math.max(0, w - b - urlX)} height={dot * 2} rx={dot} fill="#ffffff" />
        </>
      );
      break;
    }
    case 'shell':
      body = (
        <>
          <rect x={o} y={o} width={W} height={H} rx={6 * u} {...stroke} />
          <path
            d={`M${12 * u},${13 * u}l${12 * u},${7 * u}l${-12 * u},${7 * u}M${27 * u},${30 * u}h${15 * u}`}
            fill="none" stroke={color} strokeWidth={Math.max(sw, 3.5 * u)} strokeLinecap="round" strokeLinejoin="round"
          />
        </>
      );
      break;
    case 'folder': {
      // Tab like c4model.com: rounded top corners, inset from the left edge,
      // with the body's top line running underneath it.
      const th = m.folderTab;
      const r = 5 * u;
      const tabLeft = w * 0.04;
      const tabRight = w * 0.36;
      body = (
        <>
          <rect x={o} y={th} width={W} height={h - th - o} rx={5 * u} {...stroke} />
          <path d={`M${tabLeft},${th}V${o + r}a${r},${r} 0 0 1 ${r},${-r}H${tabRight - r}a${r},${r} 0 0 1 ${r},${r}V${th}`} {...stroke} />
          <path d={`M${o + 5 * u},${th}H${w - o - 5 * u}`} fill="none" stroke={color} strokeWidth={sw} />
        </>
      );
      break;
    }
    case 'cylinder':
    case 'bucket': {
      const ry = m.cylinderRy;
      const d = m.bucketInset;
      const hw = W / 2;
      const bw = (W - 2 * d) / 2;
      body = (
        <path
          d={`M${o},${ry + o}a${hw},${ry} 0 0 1 ${W},0a${hw},${ry} 0 0 1 ${-W},0L${o + d},${h - ry - o}a${bw},${ry} 0 0 0 ${W - 2 * d},0L${o + W},${ry + o}`}
          {...stroke}
        />
      );
      break;
    }
    case 'component': {
      const half = m.lugW / 2;
      body = (
        <>
          <rect x={o + half} y={o} width={W - half} height={H} rx={6 * u} {...stroke} />
          <rect x={o} y={h * 0.15} width={m.lugW} height={m.lugH} rx={3 * u} {...stroke} />
          <rect x={o} y={h * 0.32} width={m.lugW} height={m.lugH} rx={3 * u} {...stroke} />
        </>
      );
      break;
    }
    case 'ellipse':
      body = <ellipse cx={w / 2} cy={h / 2} rx={W / 2} ry={H / 2} {...stroke} />;
      break;
    default:
      body = <rect x={o} y={o} width={W} height={H} rx={6 * u} {...stroke} />;
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={className} style={style} aria-hidden="true">
      {body}
    </svg>
  );
}
