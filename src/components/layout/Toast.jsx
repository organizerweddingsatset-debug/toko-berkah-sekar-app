import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#2A9D8F" />,
    warning: <AlertCircle size={18} color="#E76F51" />,
    info: <Info size={18} color="#457B9D" />
  };

  return (
    <div 
      className="animate-slide-up"
      style={{
        position: 'absolute',
        bottom: '80px',
        left: '16px',
        right: '16px',
        zIndex: 50,
        backgroundColor: '#1E2926',
        color: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <div>{icons[toast.type] || icons.success}</div>
      <span style={{ fontSize: '13px', fontWeight: '500', flex: 1, lineHeight: 1.3 }}>
        {toast.message}
      </span>
    </div>
  );
};
