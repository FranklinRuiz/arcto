import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { addEdge, useEdgesState, useNodesState, type Connection, type Edge, type ReactFlowInstance } from '@xyflow/react';
import { INITIAL_EDGES, INITIAL_NODES } from '../constants/diagram.constants';
import { SoftwareNodeComponent } from '../components/SoftwareNode';
import { NODE_KINDS, type EdgeFormData, type NodeFormData, type PaletteItem, type SoftwareEdge, type SoftwareNode } from '../types/diagram.types';
import { createAnimatedEdge, createNode, normalizeNodeData } from '../utils/diagramFactory';
import { isValidDiagramPayload } from '../utils/diagramValidation';

export function useDiagramBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState<SoftwareNode>(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState<SoftwareEdge>(INITIAL_EDGES);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<SoftwareNode, SoftwareEdge> | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null);
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeSubtitle, setNodeSubtitle] = useState('');
  const [message, setMessage] = useState('Arrastra elementos al lienzo. Pasa el cursor sobre un nodo para ver los conectores en los 4 lados.');
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: 'node' | 'edge' } | null>(null);

  const selectedNode = useMemo(() => nodes.find((node) => node.id === selectedNodeId) || null, [nodes, selectedNodeId]);
  const selectedEdge = useMemo(() => edges.find((edge) => edge.id === selectedEdgeId) || null, [edges, selectedEdgeId]);
  const editingNode = useMemo(() => nodes.find((node) => node.id === editingNodeId) || null, [nodes, editingNodeId]);
  const editingEdge = useMemo(() => edges.find((edge) => edge.id === editingEdgeId) || null, [edges, editingEdgeId]);

  const nodeTypes = useMemo(() => ({ softwareNode: SoftwareNodeComponent }), []);

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
    setContextMenu(null);
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
        const item = JSON.parse(rawData) as PaletteItem;
        const position = rfInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
        const newNode = createNode({ item, position });

        setNodes((current) => current.concat(newNode));
        setSelectedNodeId(newNode.id);
        setMessage(`Nodo agregado: ${newNode.data.label}`);
      } catch {
        setMessage('No se pudo agregar el nodo arrastrado.');
      }
    },
    [rfInstance, setNodes],
  );

  const addQuickNode = useCallback(() => {
    const newNode = createNode({
      item: { type: NODE_KINDS.BACKEND, label: 'Nuevo componente', subtitle: 'Descripción técnica' },
      position: { x: 260 + nodes.length * 30, y: 300 + nodes.length * 20 },
      customLabel: nodeLabel,
      customSubtitle: nodeSubtitle,
    });

    setNodes((current) => [...current, newNode]);
    setSelectedNodeId(newNode.id);
    setNodeLabel('');
    setNodeSubtitle('');
    setMessage('Nodo rápido agregado. Haz doble clic sobre él para editarlo.');
  }, [nodeLabel, nodeSubtitle, nodes.length, setNodes]);

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

  const saveEdgeEditor = useCallback(
    (edgeId: string, formData: EdgeFormData) => {
      updateEdgeDataById(edgeId, formData);
      setEditingEdgeId(null);
      setMessage('Cambios de la conexión guardados correctamente.');
    },
    [updateEdgeDataById],
  );

  const deleteSelected = useCallback(() => {
    if (selectedNodeId) {
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
    setContextMenu(null);
  }, [selectedNodeId, selectedEdgeId, setNodes, setEdges]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Delete') return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      deleteSelected();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [deleteSelected]);

  const openContextMenu = useCallback((x: number, y: number, type: 'node' | 'edge') => {
    setContextMenu({ x, y, type });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const resetDiagram = useCallback(() => {
    setNodes(INITIAL_NODES);
    setEdges(INITIAL_EDGES);
    setSelectedNodeId(null);
    setEditingNodeId(null);
    setEditingEdgeId(null);
    setMessage('Diagrama restaurado al estado inicial.');
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

          setNodes(parsed.nodes.map((node) => ({ ...node, data: normalizeNodeData(node.data) })));
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
    editingNode,
    editingEdge,
    contextMenu,
    nodeLabel,
    nodeSubtitle,
    message,
    setRfInstance,
    setNodeLabel,
    setNodeSubtitle,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragStart,
    onDragOver,
    onDrop,
    addQuickNode,
    openNodeEditor,
    closeNodeEditor,
    saveNodeEditor,
    openEdgeEditor,
    closeEdgeEditor,
    saveEdgeEditor,
    deleteSelected,
    resetDiagram,
    exportJson,
    importJson,
    selectNode,
    selectEdge,
    clearSelection,
    openContextMenu,
    closeContextMenu,
  };
}
