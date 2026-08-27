import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { addEdge, getNodesBounds, getViewportForBounds, MarkerType, reconnectEdge, useEdgesState, useNodesState, type Connection, type Edge, type ReactFlowInstance } from '@xyflow/react';
import { toPng } from 'html-to-image';
import { INITIAL_EDGES, INITIAL_NODES } from '../constants/diagram.constants';
import { SoftwareNodeComponent } from '../components/SoftwareNode';
import { TextNodeComponent } from '../components/TextNode';
import { IconNodeComponent } from '../components/IconNode';
import { GroupNodeComponent } from '../components/GroupNode';
import { LabelNodeComponent } from '../components/LabelNode';
import { AnnotationNodeComponent } from '../components/AnnotationNode';
import { NODE_KINDS, type AlignAxis, type EdgeFormData, type GroupFormData, type LabelFormData, type NodeFormData, type PaletteItem, type SoftwareEdge, type SoftwareNode, type TextNodeData } from '../types/diagram.types';
import { createAnimatedEdge, createAnnotationNode, createGroupNode, createIconNode, createLabelNode, createNode, normalizeNodeData } from '../utils/diagramFactory';
import { isValidDiagramPayload } from '../utils/diagramValidation';

const STORAGE_KEY = 'arcto-diagram';

function loadFromStorage(): { nodes: SoftwareNode[]; edges: SoftwareEdge[] } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isValidDiagramPayload(parsed)) return null;
    return parsed as { nodes: SoftwareNode[]; edges: SoftwareEdge[] };
  } catch {
    return null;
  }
}

export function useDiagramBuilder() {
  const saved = useMemo(() => loadFromStorage(), []);
  const [nodes, setNodes, onNodesChange] = useNodesState<SoftwareNode>(saved?.nodes ?? INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState<SoftwareEdge>(saved?.edges ?? INITIAL_EDGES);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<SoftwareNode, SoftwareEdge> | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  const selectedNode = useMemo(() => nodes.find((node) => node.id === selectedNodeId) || null, [nodes, selectedNodeId]);
  const selectedEdge = useMemo(() => edges.find((edge) => edge.id === selectedEdgeId) || null, [edges, selectedEdgeId]);
  const editingEdge = useMemo(() => edges.find((edge) => edge.id === editingEdgeId) || null, [edges, editingEdgeId]);
  const hasSelection = useMemo(
    () => nodes.some((n) => n.selected) || edges.some((e) => e.selected) || !!selectedNodeId || !!selectedEdgeId,
    [nodes, edges, selectedNodeId, selectedEdgeId],
  );

  const selectedNodesCount = useMemo(
    () => nodes.filter((n) => n.selected).length,
    [nodes],
  );

  const nodeTypes = useMemo(() => ({
    softwareNode: SoftwareNodeComponent,
    textNode: TextNodeComponent,
    iconNode: IconNodeComponent,
    groupNode: GroupNodeComponent,
    labelNode: LabelNodeComponent,
    annotationNode: AnnotationNodeComponent,
  }), []);

  // ── Historial para deshacer ──
  const historyRef = useRef<Array<{ nodes: SoftwareNode[]; edges: SoftwareEdge[] }>>([]);
  const historyIndexRef = useRef(-1);
  const isUndoingRef = useRef(false);
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isUndoingRef.current) {
        isUndoingRef.current = false;
        setCanUndo(historyIndexRef.current > 0);
        return;
      }
      const snapshot = { nodes, edges };
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      historyRef.current.push(snapshot);
      if (historyRef.current.length > 60) historyRef.current.shift();
      else historyIndexRef.current++;
      setCanUndo(historyIndexRef.current > 0);
    }, 500);
    return () => clearTimeout(timer);
  }, [nodes, edges]);

  // ── Guardar en localStorage ──
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const isFirstSave = useRef(true);

  useEffect(() => {
    if (!isFirstSave.current) setSaveStatus('saving');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
      isFirstSave.current = false;
      setSaveStatus('saved');
    }, 600);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [nodes, edges]);

  const selectNode = useCallback((node: SoftwareNode) => {
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);
  }, []);

  const selectEdge = useCallback((edge: SoftwareEdge) => {
    setSelectedEdgeId(edge.id);
    setSelectedNodeId(null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
  }, []);

  const openEdgeEditor = useCallback((edge: Edge) => {
    setEditingEdgeId(edge.id);
  }, []);

  const closeEdgeEditor = useCallback(() => {
    setEditingEdgeId(null);
  }, []);

  const toggleEdgeDashed = useCallback(
    (edgeId: string) => {
      setEdges((current) =>
        current.map((edge) => {
          if (edge.id !== edgeId) return edge;
          const nowDashed = !edge.data?.dashed;
          return {
            ...edge,
            animated: false,
            data: { ...edge.data, dashed: nowDashed },
          };
        }),
      );
    },
    [setEdges],
  );

  const toggleEdgeAsync = useCallback(
    (edgeId: string) => {
      setEdges((current) =>
        current.map((edge) => {
          if (edge.id !== edgeId) return edge;
          const nowAsync = !(edge.data?.dashed && edge.animated);
          return {
            ...edge,
            animated: nowAsync,
            data: { ...edge.data, dashed: nowAsync },
          };
        }),
      );
    },
    [setEdges],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = createAnimatedEdge({
        source: params.source || '',
        target: params.target || '',
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        label: 'conexión',
      });

      setEdges((current) => addEdge(newEdge, current));
    },
    [setEdges],
  );

  const onDragStart = useCallback((event: DragEvent<HTMLButtonElement>, item: PaletteItem) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(item));
    event.dataTransfer.effectAllowed = 'move';
    const ghost = document.createElement('div');
    ghost.style.cssText =
      'position:fixed;top:-200px;left:-200px;padding:6px 14px;background:#0f172a;color:white;' +
      'border-radius:10px;font:700 13px/1.4 Inter,sans-serif;white-space:nowrap;pointer-events:none;' +
      'box-shadow:0 8px 24px rgba(15,23,42,0.35);';
    ghost.textContent = item.label;
    document.body.appendChild(ghost);
    event.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, 20);
    requestAnimationFrame(() => document.body.removeChild(ghost));
  }, []);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData || !rfInstance) return;

      try {
        const payload = JSON.parse(rawData) as Record<string, unknown>;
        const position = rfInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });

        if (payload.__isText) {
          const newNode = {
            id: `text-${Date.now()}`,
            type: 'textNode',
            position,
            data: { text: 'Texto', bold: false, italic: false, underline: false, fontSize: 16, color: '#0f172a', fontFamily: 'inter' },
          } as unknown as SoftwareNode;
          setNodes((current) => current.concat(newNode));
          setSelectedNodeId(newNode.id);
        } else if (payload.__isGroup) {
          const newGroup = createGroupNode({ position: { x: position.x - 200, y: position.y - 140 } });
          setNodes((current) => [newGroup as unknown as SoftwareNode, ...current]);
          setSelectedNodeId(newGroup.id);
        } else if (payload.__isLabel) {
          const newNode = createLabelNode({ position });
          setNodes((current) => current.concat(newNode as unknown as SoftwareNode));
          setSelectedNodeId(newNode.id);
        } else if (payload.__isAnnotation) {
          // Dropping an annotation directly onto a connection attaches it as a
          // small inline indicator on that edge instead of creating a standalone node.
          const targetEl = event.target as HTMLElement | null;
          const edgeEl = targetEl?.closest?.('.react-flow__edge') as HTMLElement | null;
          const edgeId = edgeEl?.dataset.id;

          if (edgeId) {
            const newAnnotation = {
              id: `eanno-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              icon: payload.icon as string,
              label: payload.label as string,
              color: payload.color as string,
              bg: payload.bg as string,
            };
            setEdges((current) =>
              current.map((edge) => {
                if (edge.id !== edgeId) return edge;
                const existing = edge.data?.annotations ?? [];
                return { ...edge, data: { ...edge.data, annotations: [...existing, newAnnotation] } };
              }),
            );
          } else {
            const newNode = createAnnotationNode({
              position,
              icon: payload.icon as string,
              label: payload.label as string,
              color: payload.color as string,
              bg: payload.bg as string,
            });
            setNodes((current) => current.concat(newNode as unknown as SoftwareNode));
            setSelectedNodeId(newNode.id);
          }
        } else if (payload.__isIcon) {
          const item = payload as unknown as PaletteItem;
          const newNode = createIconNode({ item, position });
          setNodes((current) => current.concat(newNode as unknown as SoftwareNode));
          setSelectedNodeId(newNode.id);
        } else {
          const item = payload as unknown as PaletteItem;
          const newNode = createNode({ item, position });
          setNodes((current) => current.concat(newNode));
          setSelectedNodeId(newNode.id);
        }
      } catch {
        // invalid drop data, ignore
      }
    },
    [rfInstance, setNodes, setEdges],
  );

  const updateEdgeDataById = useCallback(
    (edgeId: string, formData: EdgeFormData) => {
      setEdges((current) =>
        current.map((edge) => {
          if (edge.id !== edgeId) return edge;
          return { ...edge, label: formData.label.trim() || 'conexión' };
        }),
      );
    },
    [setEdges],
  );

  const liveUpdateEdge = useCallback(
    (edgeId: string, patch: { label?: string; color?: string; strokeWidth?: number; shape?: 'smooth' | 'straight' }) => {
      setEdges((current) =>
        current.map((edge) => {
          if (edge.id !== edgeId) return edge;
          const next = { ...edge };
          if (patch.label !== undefined) next.label = patch.label;
          if (patch.color !== undefined || patch.strokeWidth !== undefined) {
            next.style = {
              ...edge.style,
              ...(patch.color !== undefined ? { stroke: patch.color } : {}),
              ...(patch.strokeWidth !== undefined ? { strokeWidth: patch.strokeWidth } : {}),
            };
          }
          if (patch.color !== undefined) {
            const prevMarker = typeof edge.markerEnd === 'object' && edge.markerEnd !== null ? edge.markerEnd : { type: MarkerType.ArrowClosed };
            next.markerEnd = { ...prevMarker, color: patch.color };
          }
          if (patch.shape !== undefined) {
            next.data = { ...next.data, shape: patch.shape };
          }
          return next;
        }),
      );
    },
    [setEdges],
  );

  const liveUpdateGroup = useCallback(
    (nodeId: string, patch: Partial<GroupFormData>) => {
      setNodes((current) =>
        current.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...patch } } : node,
        ),
      );
    },
    [setNodes],
  );

  const liveUpdateLabel = useCallback(
    (nodeId: string, patch: Partial<LabelFormData>) => {
      setNodes((current) =>
        current.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...patch } } : node,
        ),
      );
    },
    [setNodes],
  );

  const liveUpdateNode = useCallback(
    (nodeId: string, patch: Partial<NodeFormData>) => {
      setNodes((current) =>
        current.map((node) => {
          if (node.id !== nodeId) return node;
          const data = { ...node.data, ...patch };
          if (patch.kind) data.icon = patch.kind;
          return { ...node, data };
        }),
      );
    },
    [setNodes],
  );

  const updateTextNodeData = useCallback(
    (nodeId: string, patch: Partial<TextNodeData>) => {
      setNodes((current) =>
        current.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...patch } } : node,
        ),
      );
    },
    [setNodes],
  );

  const commitInlineEdgeEdit = useCallback(
    (edgeId: string, label: string) => {
      updateEdgeDataById(edgeId, { label });
      setEditingEdgeId(null);
    },
    [updateEdgeDataById],
  );

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges((current) => reconnectEdge(oldEdge, newConnection, current));
    },
    [setEdges],
  );

  const alignNodes = useCallback((axis: AlignAxis) => {
    const selected = nodes.filter((n) => n.selected);
    if (selected.length < 2) return;

    const getW = (n: SoftwareNode) => (n as { measured?: { width?: number } }).measured?.width ?? 180;
    const getH = (n: SoftwareNode) => (n as { measured?: { height?: number } }).measured?.height ?? 80;

    const minX = Math.min(...selected.map((n) => n.position.x));
    const maxX = Math.max(...selected.map((n) => n.position.x + getW(n)));
    const minY = Math.min(...selected.map((n) => n.position.y));
    const maxY = Math.max(...selected.map((n) => n.position.y + getH(n)));
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    const idSet = new Set(selected.map((n) => n.id));
    setNodes((current) =>
      current.map((n) => {
        if (!idSet.has(n.id)) return n;
        const w = getW(n), h = getH(n);
        const x = axis === 'center-h' ? midX - w / 2 : n.position.x;
        const y = axis === 'center-v' ? midY - h / 2 : n.position.y;
        return { ...n, position: { x, y } };
      }),
    );
  }, [nodes, setNodes]);

  const deleteSelected = useCallback(() => {
    const multiNodes = nodes.filter((n) => n.selected);
    const multiEdges = edges.filter((e) => e.selected);

    if (multiNodes.length > 0 || multiEdges.length > 0) {
      const nodeIds = new Set(multiNodes.map((n) => n.id));
      const edgeIds = new Set(multiEdges.map((e) => e.id));
      setNodes((current) => current.filter((n) => !nodeIds.has(n.id) && !(n.parentId && nodeIds.has(n.parentId))));
      setEdges((current) => current.filter((e) => !nodeIds.has(e.source) && !nodeIds.has(e.target) && !edgeIds.has(e.id)));
      setSelectedNodeId(null);
      setEditingEdgeId(null);
    } else if (selectedNodeId) {
      setNodes((current) => current.filter((node) => node.id !== selectedNodeId));
      setEdges((current) => current.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
      setSelectedNodeId(null);
      setEditingEdgeId(null);
    } else if (selectedEdgeId) {
      setEdges((current) => current.filter((edge) => edge.id !== selectedEdgeId));
      setSelectedEdgeId(null);
      setEditingEdgeId(null);
    }
  }, [nodes, edges, selectedNodeId, selectedEdgeId, setNodes, setEdges]);

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current--;
    const snapshot = historyRef.current[historyIndexRef.current];
    isUndoingRef.current = true;
    setNodes(snapshot.nodes);
    setEdges(snapshot.edges);
    setSelectedNodeId(null);
    setEditingEdgeId(null);
    setCanUndo(historyIndexRef.current > 0);
  }, [setNodes, setEdges]);

  const deleteSelectedRef = useRef(deleteSelected);
  deleteSelectedRef.current = deleteSelected;
  const undoRef = useRef(undo);
  undoRef.current = undo;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelectedRef.current();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undoRef.current();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const clearDiagram = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setEditingEdgeId(null);
  }, [setNodes, setEdges]);

  const placeItem = useCallback(
    (payload: PaletteItem | { __isGroup: boolean } | { __isText: boolean } | { __isLabel: boolean } | { __isAnnotation: boolean; icon: string; label: string; color: string; bg: string }) => {
      if (!rfInstance) return;
      const container = document.querySelector('.canvas-shell');
      const rect = container?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      const base = rfInstance.screenToFlowPosition({ x: cx, y: cy });
      const jitter = () => (Math.random() - 0.5) * 40;
      const position = { x: base.x + jitter(), y: base.y + jitter() };

      if ('__isText' in payload) {
        const newNode = {
          id: `text-${Date.now()}`,
          type: 'textNode',
          position,
          data: { text: 'Texto', bold: false, italic: false, underline: false, fontSize: 16, color: '#0f172a', fontFamily: 'inter' },
        } as unknown as SoftwareNode;
        setNodes((current) => current.concat(newNode));
        setSelectedNodeId(newNode.id);
      } else if ('__isGroup' in payload) {
        const newGroup = createGroupNode({ position: { x: position.x - 200, y: position.y - 140 } });
        setNodes((current) => [newGroup as unknown as SoftwareNode, ...current]);
        setSelectedNodeId(newGroup.id);
      } else if ('__isLabel' in payload) {
        const newNode = createLabelNode({ position });
        setNodes((current) => current.concat(newNode as unknown as SoftwareNode));
        setSelectedNodeId(newNode.id);
      } else if ('__isAnnotation' in payload) {
        const p = payload as { __isAnnotation: boolean; icon: string; label: string; color: string; bg: string };
        const newNode = createAnnotationNode({ position, icon: p.icon, label: p.label, color: p.color, bg: p.bg });
        setNodes((current) => current.concat(newNode as unknown as SoftwareNode));
        setSelectedNodeId(newNode.id);
      } else {
        const item = payload as PaletteItem;
        const newNode = createNode({ item, position });
        setNodes((current) => current.concat(newNode));
        setSelectedNodeId(newNode.id);
      }
    },
    [rfInstance, setNodes],
  );

  const exportJson = useCallback((title = 'diagrama-software') => {
    const safeFilename = title.trim().replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '-') || 'diagrama-software';
    const data = JSON.stringify({ title, nodes, edges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeFilename}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const exportPng = useCallback((title = 'diagrama-software') => {
    const viewportEl = document.querySelector('.react-flow__viewport') as HTMLElement | null;
    if (!viewportEl || nodes.length === 0) return;

    const safeFilename = title.trim().replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '-') || 'diagrama-software';
    const PADDING = 64;
    const nodesBounds = getNodesBounds(nodes);
    const imageWidth = Math.round(nodesBounds.width + PADDING * 2);
    const imageHeight = Math.round(nodesBounds.height + PADDING * 2);
    const { x, y, zoom } = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2, 0);

    // Arrowheads reference shared <marker> defs via `url('#id')`. That fragment
    // only resolves within the same SVG fragment — but html-to-image rasterizes
    // the cloned DOM through a foreignObject/data-URI pipeline where the shared
    // <defs> (a sibling <svg className="react-flow__marker">) ends up isolated
    // from the edges' own <svg> wrappers, so most arrowheads silently vanish.
    // Cloning the marker defs directly into every edge's <svg> makes each
    // reference resolve locally regardless of that pipeline's quirks.
    const markerDefs = viewportEl.querySelector('svg.react-flow__marker defs');
    const restoreMarkerDefs: Array<() => void> = [];
    if (markerDefs) {
      viewportEl.querySelectorAll('svg').forEach((svg) => {
        if (!svg.querySelector('[marker-end], [marker-start]')) return;
        const clone = markerDefs.cloneNode(true) as SVGDefsElement;
        svg.insertBefore(clone, svg.firstChild);
        restoreMarkerDefs.push(() => clone.remove());
      });
    }
    const restoreMarkers = () => restoreMarkerDefs.forEach((restore) => restore());

    // Edge line color comes from a CSS custom-property cascade
    // (`stroke: var(--xy-edge-stroke, var(--xy-edge-stroke-default))`), which
    // html-to-image's DOM clone doesn't carry over — so the lines render
    // transparent/invisible in the snapshot while their markers (defined with
    // explicit fill colors) still show up. Baking the resolved stroke/fill as
    // explicit inline styles before the snapshot sidesteps that cascade.
    const edgePaths = Array.from(viewportEl.querySelectorAll<SVGPathElement>('.react-flow__edge-path'));
    const restoreEdgePaths: Array<() => void> = edgePaths.map((path) => {
      const prevStroke = path.style.stroke;
      const prevFill = path.style.fill;
      const prevStrokeWidth = path.style.strokeWidth;
      const prevDashArray = path.style.strokeDasharray;
      const computed = window.getComputedStyle(path);
      path.style.stroke = computed.stroke;
      path.style.fill = computed.fill || 'none';
      path.style.strokeWidth = computed.strokeWidth;
      path.style.strokeDasharray = computed.strokeDasharray;
      return () => {
        path.style.stroke = prevStroke;
        path.style.fill = prevFill;
        path.style.strokeWidth = prevStrokeWidth;
        path.style.strokeDasharray = prevDashArray;
      };
    });
    const restoreEdgeStyles = () => restoreEdgePaths.forEach((restore) => restore());

    toPng(viewportEl, {
      width: imageWidth,
      height: imageHeight,
      backgroundColor: '#ffffff',
      pixelRatio: 2,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${x}px, ${y}px) scale(${zoom})`,
      },
    }).then((dataUrl) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${safeFilename}.png`;
      link.click();
    }).catch(() => {
      // image generation failed, ignore
    }).finally(() => {
      restoreMarkers();
      restoreEdgeStyles();
    });
  }, [nodes]);

  const importJson = useCallback(
    (event: ChangeEvent<HTMLInputElement>, onTitleFound?: (title: string) => void) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (!isValidDiagramPayload(parsed)) return;

          if (typeof parsed.title === 'string' && parsed.title.trim()) {
            onTitleFound?.(parsed.title.trim());
          }

          setNodes(parsed.nodes.map((node) => {
            if (node.type === 'textNode' || node.type === 'groupNode' || node.type === 'labelNode' || node.type === 'annotationNode') return node as unknown as SoftwareNode;
            return { ...node, data: normalizeNodeData(node.data) };
          }) as SoftwareNode[]);
          setEdges(parsed.edges);
          setSelectedNodeId(null);
          setEditingEdgeId(null);
        } catch {
          // invalid JSON, ignore
        } finally {
          event.target.value = '';
        }
      };
      reader.readAsText(file);
    },
    [setNodes, setEdges],
  );

  return {
    nodes,
    edges,
    nodeTypes,
    selectedNode,
    selectedEdge,
    hasSelection,
    selectedNodesCount,
    editingEdge,
    setRfInstance,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragStart,
    onDragOver,
    onDrop,
    openEdgeEditor,
    closeEdgeEditor,
    commitInlineEdgeEdit,
    toggleEdgeAsync,
    onReconnect,
    undo,
    canUndo,
    saveStatus,
    alignNodes,
    deleteSelected,
    clearDiagram,
    exportJson,
    exportPng,
    importJson,
    selectNode,
    selectEdge,
    clearSelection,
    liveUpdateEdge,
    liveUpdateGroup,
    liveUpdateLabel,
    liveUpdateNode,
    updateTextNodeData,
    placeItem,
  };
}
