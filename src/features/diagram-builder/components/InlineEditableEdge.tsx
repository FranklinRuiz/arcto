import { memo, useContext, useEffect, useRef, useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, getStraightPath, Position, type EdgeProps } from '@xyflow/react';
import { EdgeEditContext } from './EdgeEditContext';

const INSET = 4;

export const InlineEditableEdge = memo((props: EdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, label, markerEnd, style, data, animated } = props;
  const dashed = Boolean((data as Record<string, unknown>)?.dashed);
  const edgeStyle = dashed
    ? { ...style, strokeDasharray: '8 5', ...(animated ? {} : { animation: 'none' }) }
    : style;

  const { editingEdgeId, onCommit, onCancel } = useContext(EdgeEditContext);
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
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={edgeStyle} />
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
      </EdgeLabelRenderer>
    </>
  );
});

InlineEditableEdge.displayName = 'InlineEditableEdge';
