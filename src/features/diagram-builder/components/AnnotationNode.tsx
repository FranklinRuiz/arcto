import { useEffect, useRef, useState } from 'react';
import { useReactFlow, type NodeProps } from '@xyflow/react';
import {
  Lock, Key, Shield, ShieldCheck, Fingerprint,
  AlertTriangle, Ban, Bell,
  ArrowRight, GitBranch, RefreshCw, Clock, Timer, Repeat,
  Cloud, Server, Wifi, WifiOff, Globe, Building,
  Mail,
  File, FileText, Folder, Download, Upload, Archive,
  Check, X,
  Code, Terminal, Bug, GitMerge, Package, Layers,
  CreditCard, DollarSign, BarChart, TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { AnnotationNode } from '../types/diagram.types';

export const ANNOTATION_ICON_MAP: Record<string, LucideIcon> = {
  Lock, Key, Shield, ShieldCheck, Fingerprint,
  AlertTriangle, Ban, Bell,
  ArrowRight, GitBranch, RefreshCw, Clock, Timer, Repeat,
  Cloud, Server, Wifi, WifiOff, Globe, Building,
  Mail,
  File, FileText, Folder, Download, Upload, Archive,
  Check, X,
  Code, Terminal, Bug, GitMerge, Package, Layers,
  CreditCard, DollarSign, BarChart, TrendingUp,
};

export function AnnotationNodeComponent({ id, data, selected }: NodeProps<AnnotationNode>) {
  const { updateNodeData } = useReactFlow();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = ANNOTATION_ICON_MAP[data.icon];

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft(data.label);
    setEditing(true);
  };

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed) updateNodeData(id, { label: trimmed });
    setEditing(false);
  };

  return (
    <div className={`annotation-node${selected ? ' annotation-node--selected' : ''}`}>
      {Icon && <Icon size={26} strokeWidth={2.5} />}
      {editing ? (
        <input
          ref={inputRef}
          className="annotation-node__input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); commit(); }
            if (e.key === 'Escape') setEditing(false);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="annotation-node__label" onDoubleClick={startEdit}>
          {data.label}
        </span>
      )}
    </div>
  );
}
