import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { addEdge, reconnectEdge, useEdgesState, useNodesState, type Connection, type Edge, type ReactFlowInstance } from '@xyflow/react';
import { INITIAL_EDGES, INITIAL_NODES } from '../constants/diagram.constants';
import { SoftwareNodeComponent } from '../components/SoftwareNode';
import { TextNodeComponent } from '../components/TextNode';
import { IconNodeComponent } from '../components/IconNode';
import { GroupNodeComponent } from '../components/GroupNode';
import { NODE_KINDS, type EdgeFormData, type GroupFormData, type GroupNode, type NodeFormData, type PaletteItem, type SoftwareEdge, type SoftwareNode, type TextNodeData } from '../types/diagram.types';
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
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [message, setMessage] = useState('Arrastra elementos al lienzo');
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  const selectedNode = useMemo(() => nodes.find((node) => node.id === selectedNodeId) || null, [nodes, selectedNodeId]);
  const selectedEdge = useMemo(() => edges.find((edge) => edge.id === selectedEdgeId) || null, [edges, selectedEdgeId]);
  const editingNode = useMemo(() => nodes.find((node) => node.id === editingNodeId) || null, [nodes, editingNodeId]);
  const editingEdge = useMemo(() => edges.find((edge) => edge.id === editingEdgeId) || null, [edges, editingEdgeId]);
  const editingGroup = useMemo(
    () => (nodes.find((n) => n.id === editingGroupId) as GroupNode | undefined) || null,
    [nodes, editingGroupId],
  );
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

  const openNodeEditor = useCallback((node: SoftwareNode) => {
    setSelectedNodeId(node.id);
    setEditingNodeId(node.id);
    setMessage(`Editando nodo: ${node.data.label}`);
  }, []);

  const closeNodeEditor = useCallback(() => {
    setEditingNodeId(null);
  }, []);

  const openEdgeEditor = useCallback((edge: Edge) => {
    setEditingEdgeId(edge.id);
    setMessage(`Editando conexión: ${typeof edge.label === 'string' ? edge.label : 'sin texto'}`);
  }, []);

  const closeEdgeEditor = useCallback(() => {
    setEditingEdgeId(null);
  }, []);

  const openGroupEditor = useCallback((node: SoftwareNode) => {
    setEditingGroupId(node.id);
  }, []);

  const closeGroupEditor = useCallback(() => {
    setEditingGroupId(null);
  }, []);

  const saveGroupEditor = useCallback(
    (nodeId: string, formData: GroupFormData) => {
      setNodes((current) =>
        current.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...formData } } : node,
        ),
      );
      setEditingGroupId(null);
      setMessage('Grupo actualizado correctamente.');
    },
    [setNodes],
  );

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
      setMessage('Conexión creada correctamente.');
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
          setMessage('Contenedor agregado. Doble clic para editar su nombre.');
        } else if (payload.__isIcon) {
          const item = payload as unknown as PaletteItem;
          const newNode = createIconNode({ item, position });
          setNodes((current) => current.concat(newNode as unknown as SoftwareNode));
          setSelectedNodeId(newNode.id);
          setMessage(`Nodo icónico agregado: ${newNode.data.label}`);
        } else {
          const item = payload as unknown as PaletteItem;
          const newNode = createNode({ item, position });
          setNodes((current) => current.concat(newNode));
          setSelectedNodeId(newNode.id);
          setMessage(`Nodo agregado: ${newNode.data.label}`);
        }
      } catch {
        setMessage('No se pudo agregar el nodo arrastrado.');
      }
    },
    [rfInstance, setNodes],
  );

  const updateNodeDataById = useCallback(
    (nodeId: string, formData: NodeFormData) => {
      setNodes((current) =>
        current.map((node) => {
          if (node.id !== nodeId) return node;
          return { ...node, data: normalizeNodeData({ ...node.data, ...formData }) };
        }),
      );
    },
    [setNodes],
  );

  const saveNodeEditor = useCallback(
    (nodeId: string, formData: NodeFormData) => {
      updateNodeDataById(nodeId, formData);
      setSelectedNodeId(nodeId);
      setEditingNodeId(null);
      setMessage('Cambios del nodo guardados correctamente.');
    },
    [updateNodeDataById],
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
      setMessage('Cambios de la conexión guardados correctamente.');
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
      setEditingNodeId(null);
      setEditingEdgeId(null);
      const total = multiNodes.length + multiEdges.length;
      setMessage(`${total} elemento${total !== 1 ? 's' : ''} eliminado${total !== 1 ? 's' : ''}.`);
    } else if (selectedNodeId) {
      setNodes((current) => current.filter((node) => node.id !== selectedNodeId));
      setEdges((current) => current.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
      setSelectedNodeId(null);
      setEditingNodeId(null);
      setEditingEdgeId(null);
      setMessage('Nodo eliminado junto con sus conexiones.');
    } else if (selectedEdgeId) {
      setEdges((current) => current.filter((edge) => edge.id !== selectedEdgeId));
      setSelectedEdgeId(null);
      setEditingEdgeId(null);
      setMessage('Conexión eliminada.');
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
    setEditingNodeId(null);
    setEditingEdgeId(null);
  }, [setNodes, setEdges]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Delete') {
        deleteSelected();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [deleteSelected, undo]);

  const clearDiagram = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setEditingNodeId(null);
    setEditingEdgeId(null);
  }, [setNodes, setEdges]);

  const exportJson = useCallback(() => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagrama-software.json';
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Diagrama exportado en JSON.');
  }, [nodes, edges]);

  const importJson = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result));
          if (!isValidDiagramPayload(parsed)) {
            setMessage('El archivo JSON no tiene la estructura esperada: { nodes: [], edges: [] }.');
            return;
          }

          setNodes(parsed.nodes.map((node) => {
            if (node.type === 'textNode' || node.type === 'groupNode') return node as unknown as SoftwareNode;
            return { ...node, data: normalizeNodeData(node.data) };
          }) as SoftwareNode[]);
          setEdges(parsed.edges);
          setSelectedNodeId(null);
          setEditingNodeId(null);
          setEditingEdgeId(null);
          setMessage('Diagrama importado correctamente.');
        } catch {
          setMessage('El archivo no tiene un formato JSON válido.');
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
    editingNode,
    editingEdge,
    editingGroup,
    message,
    setRfInstance,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragStart,
    onDragOver,
    onDrop,
    openNodeEditor,
    closeNodeEditor,
    saveNodeEditor,
    openEdgeEditor,
    closeEdgeEditor,
    saveEdgeEditor,
    openGroupEditor,
    closeGroupEditor,
    saveGroupEditor,
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
    updateTextNodeData,
  };
}
