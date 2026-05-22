import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { addEdge, MarkerType, reconnectEdge, useEdgesState, useNodesState, type Connection, type Edge, type ReactFlowInstance } from '@xyflow/react';
import { INITIAL_EDGES, INITIAL_NODES } from '../constants/diagram.constants';
import { SoftwareNodeComponent } from '../components/SoftwareNode';
import { TextNodeComponent } from '../components/TextNode';
import { IconNodeComponent } from '../components/IconNode';
import { GroupNodeComponent } from '../components/GroupNode';
import { NODE_KINDS, type EdgeFormData, type GroupFormData, type NodeFormData, type PaletteItem, type SoftwareEdge, type SoftwareNode, type TextNodeData } from '../types/diagram.types';
import { createAnimatedEdge, createGroupNode, createIconNode, createNode, normalizeNodeData } from '../utils/diagramFactory';
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

  const nodeTypes = useMemo(() => ({
    softwareNode: SoftwareNodeComponent,
    textNode: TextNodeComponent,
    iconNode: IconNodeComponent,
    groupNode: GroupNodeComponent,
  }), []);

  // ── Historial para deshacer ──
  const historyRef = useRef<Array<{ nodes: SoftwareNode[]; edges: SoftwareEdge[] }>>([]);
  const historyIndexRef = useRef(-1);
  const isUndoingRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isUndoingRef.current) {
        isUndoingRef.current = false;
        return;
      }
      const snapshot = { nodes, edges };
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      historyRef.current.push(snapshot);
      if (historyRef.current.length > 60) historyRef.current.shift();
      else historyIndexRef.current++;
    }, 500);
    return () => clearTimeout(timer);
  }, [nodes, edges]);

  // ── Guardar en localStorage ──
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
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
    [rfInstance, setNodes],
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
    (edgeId: string, patch: { label?: string; color?: string; strokeWidth?: number }) => {
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

  const saveEdgeEditor = useCallback(
    (edgeId: string, formData: EdgeFormData) => {
      updateEdgeDataById(edgeId, formData);
      setEditingEdgeId(null);
    },
    [updateEdgeDataById],
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
    (payload: PaletteItem | { __isGroup: boolean } | { __isText: boolean }) => {
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
      } else {
        const item = payload as PaletteItem;
        const newNode = createNode({ item, position });
        setNodes((current) => current.concat(newNode));
        setSelectedNodeId(newNode.id);
      }
    },
    [rfInstance, setNodes],
  );

  const exportJson = useCallback(() => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagrama-software.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const importJson = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (!isValidDiagramPayload(parsed)) return;

          setNodes(parsed.nodes.map((node) => {
            if (node.type === 'textNode' || node.type === 'groupNode') return node as unknown as SoftwareNode;
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
    saveEdgeEditor,
    commitInlineEdgeEdit,
    toggleEdgeAsync,
    onReconnect,
    deleteSelected,
    clearDiagram,
    exportJson,
    importJson,
    selectNode,
    selectEdge,
    clearSelection,
    liveUpdateEdge,
    liveUpdateGroup,
    liveUpdateNode,
    updateTextNodeData,
    placeItem,
  };
}
