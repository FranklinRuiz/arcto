import { memo, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, getStraightPath, Position, useReactFlow, type EdgeProps } from '@xyflow/react';
import { EdgeEditContext } from './EdgeEditContext';
import { ANNOTATION_ICON_MAP } from './AnnotationNode';
import type { EdgeAnnotationData } from '../types/diagram.types';

const INSET = 4;

export const InlineEditableEdge = memo((props: EdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label, markerEnd, style, data } = props;
  const { setEdges } = useReactFlow();
  const dashed = Boolean((data as Record<string, unknown>)?.dashed);
  const annotations = ((data as Record<string, unknown>)?.annotations ?? []) as EdgeAnnotationData[];

  const removeAnnotation = (annotationId: string) => {
    setEdges((current) =>
      current.map((edge) => {
        if (edge.id !== id) return edge;
        const existing = ((edge.data as Record<string, unknown> | undefined)?.annotations ?? []) as EdgeAnnotationData[];
        return { ...edge, data: { ...edge.data, annotations: existing.filter((a) => a.id !== annotationId) } };
      }),
    );
  };

  const { editingEdgeId, onCommit, onCancel, activeEdgeIds, scenePlaybackActive } = useContext(EdgeEditContext);
  const flowAnimated = activeEdgeIds.has(id);
  const dotAnimRef = useRef<SVGAnimateMotionElement>(null);
  const [dotFinished, setDotFinished] = useState(false);
  const wasAnimatedRef = useRef(false);

  // Reset synchronously, during render, whenever a new activation begins — resetting
  // this in an effect instead would render one frame too late: the circle stays
  // unmounted under the still-`true` dotFinished from the last lap, so the ref the
  // effect below needs is still null and beginElement() silently never gets called
  // (this is exactly what made the dot vanish on a second Play).
  if (flowAnimated && !wasAnimatedRef.current && dotFinished) {
    setDotFinished(false);
  }
  wasAnimatedRef.current = flowAnimated;

  useLayoutEffect(() => {
    if (!flowAnimated) return;
    const el = dotAnimRef.current;
    if (!el) return;
    // Scene playback plays the dot once (repeatCount="1") and freezes it at the
    // target so it doesn't disappear mid-path — but that leaves it visibly sitting
    // on the destination node for the rest of the step (the node effects now start
    // 0.5s later and take a while to play out). Hide it as soon as it actually
    // finishes instead of waiting for the whole step to end.
    const handleEnd = () => setDotFinished(true);
    el.addEventListener('endEvent', handleEnd);
    // Declarative begin="0s" (the default) is relative to the SVG document's own
    // timeline, not to when this <animateMotion> was actually inserted — a dot
    // mounted well after page load can start mid-path, or even mid-loop, instead
    // of at the source. beginElement() forces a clean start at offset 0% the
    // moment this hop actually becomes active.
    el.beginElement();
    return () => el.removeEventListener('endEvent', handleEnd);
  }, [flowAnimated]);

  const edgeStyle = dashed
    ? { ...style, strokeDasharray: '8 5', animation: flowAnimated ? 'edge-flow-dash 0.6s linear infinite' : 'none' }
    : style;
  const strokeColor = (style as { stroke?: string } | undefined)?.stroke ?? '#94a3b8';
  const isEditing = editingEdgeId === id;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(String(label ?? ''));
  const isCancelledRef = useRef(false);

  // Snap endpoints to node border
  const sX = sourcePosition === Position.Right  ? sourceX - INSET
           : sourcePosition === Position.Left   ? sourceX + INSET
           : sourceX;
  const sY = sourcePosition === Position.Bottom ? sourceY - INSET
           : sourcePosition === Position.Top    ? sourceY + INSET
           : sourceY;
  const tX = targetPosition === Position.Left   ? targetX + INSET
           : targetPosition === Position.Right  ? targetX - INSET
           : targetX;
  const tY = targetPosition === Position.Top    ? targetY + INSET
           : targetPosition === Position.Bottom ? targetY - INSET
           : targetY;

  const shape = (data as Record<string, unknown>)?.shape as string | undefined;
  const [edgePath, labelX, labelY] = shape === 'straight'
    ? getStraightPath({ sourceX: sX, sourceY: sY, targetX: tX, targetY: tY })
    : getSmoothStepPath({
        sourceX: sX, sourceY: sY,
        targetX: tX, targetY: tY,
        sourcePosition, targetPosition,
        borderRadius: shape === 'step' ? 0 : 8,
      });

  // Sync value and focus when editing begins
  useEffect(() => {
    if (!isEditing) return;
    setValue(String(label ?? ''));
    isCancelledRef.current = false;
    const t = setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handleBlur = () => {
    if (isCancelledRef.current) { isCancelledRef.current = false; return; }
    onCommit(id, value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); onCommit(id, value); }
    if (e.key === 'Escape') { e.preventDefault(); isCancelledRef.current = true; onCancel(); }
  };

  const inputWidth = Math.max(60, value.length * 9 + 24);

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={edgeStyle} />
      {flowAnimated && !dotFinished && (
        <circle r="3.5" fill={strokeColor} className="edge-flow-dot">
          <animateMotion
            ref={dotAnimRef}
            dur="1.8s"
            begin="indefinite"
            repeatCount={scenePlaybackActive ? '1' : 'indefinite'}
            fill={scenePlaybackActive ? 'freeze' : 'remove'}
          >
            <mpath href={`#${id}`} />
          </animateMotion>
        </circle>
      )}
      <EdgeLabelRenderer>
        {isEditing ? (
          <div
            className="nodrag nopan"
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
          >
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="edge-label-input"
              style={{ width: inputWidth }}
            />
          </div>
        ) : label ? (
          <div
            className="edge-label-display"
            style={{
              position: 'absolute',
              transform: `translate(-50%, calc(-50% - 10px)) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'none',
            }}
          >
            {String(label)}
          </div>
        ) : null}

        {annotations.length > 0 && (
          <div
            className="edge-annotations nodrag nopan"
            style={{
              position: 'absolute',
              transform: `translate(-50%, calc(-50% + 16px)) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
          >
            {annotations.map((annotation) => {
              const Icon = ANNOTATION_ICON_MAP[annotation.icon];
              return (
                <div
                  key={annotation.id}
                  className="edge-annotation"
                  style={{ '--anno-bg': annotation.bg, '--anno-color': annotation.color, '--anno-border': annotation.color } as React.CSSProperties}
                >
                  {Icon && <Icon size={12} strokeWidth={2.25} />}
                  <button
                    type="button"
                    className="edge-annotation__remove"
                    title="Quitar anotación"
                    onClick={(e) => { e.stopPropagation(); removeAnnotation(annotation.id); }}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
});

InlineEditableEdge.displayName = 'InlineEditableEdge';
