import { useContext, useEffect, useRef, useState } from 'react';
import { useReactFlow, type NodeProps } from '@xyflow/react';
import { EdgeEditContext } from './EdgeEditContext';
import {
  Fingerprint, KeyRound, ShieldCheck, Cookie,
  FileJson, FileCode, FileSpreadsheet, Hash, Binary, QrCode,
  Webhook, Zap, Mail, Clock, FileBadge2, AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import type { AnnotationNode } from '../types/diagram.types';

/**
 * Domain-specific flow artifacts (not architecture components): protocols,
 * payload formats and signals that travel along connections. Kept deliberately
 * small/secondary in the UI so they read as indicators, not as nodes.
 */
export const ANNOTATION_ICON_MAP: Record<string, LucideIcon> = {
  'JWT': Fingerprint,
  'API Key': KeyRound,
  'OAuth': ShieldCheck,
  'Cookie': Cookie,
  'JSON': FileJson,
  'XML': FileCode,
  'CSV': FileSpreadsheet,
  'Hash': Hash,
  'Binario': Binary,
  'QR': QrCode,
  'Webhook': Webhook,
  'Evento': Zap,
  'Email': Mail,
  'Timestamp': Clock,
  'Certificado': FileBadge2,
  'Error': AlertCircle,
};

/** Short plain-language explanation shown as a tooltip on each annotation icon. */
export const ANNOTATION_DESCRIPTIONS: Record<string, string> = {
  'JWT': 'Token de sesión firmado',
  'API Key': 'Llave de acceso a la API',
  'OAuth': 'Autorización delegada',
  'Cookie': 'Sesión guardada en el navegador',
  'JSON': 'Payload en formato JSON',
  'XML': 'Payload en formato XML',
  'CSV': 'Datos tabulares',
  'Hash': 'Huella / checksum de integridad',
  'Binario': 'Datos en binario',
  'QR': 'Código QR',
  'Webhook': 'Notificación HTTP saliente',
  'Evento': 'Disparador asíncrono',
  'Email': 'Notificación por correo',
  'Timestamp': 'Marca de tiempo',
  'Certificado': 'Certificado / firma digital',
  'Error': 'Indicador de fallo',
};

export function AnnotationNodeComponent({ id, data, selected }: NodeProps<AnnotationNode>) {
  const { updateNodeData } = useReactFlow();
  const { presentationMode } = useContext(EdgeEditContext);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = ANNOTATION_ICON_MAP[data.icon];

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const startEdit = (e: React.MouseEvent) => {
    if (presentationMode) return;
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
      {Icon && <Icon size={15} strokeWidth={2.25} />}
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
