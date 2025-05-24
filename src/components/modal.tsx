
'use client';

import { ReactNode } from 'react';
import { Button } from './ui/button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
};

export function Modal({ isOpen, onClose, children, title, description, size = `md` }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl', 
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
         onClick={onClose}>
      <div 
        className={`bg-background rounded-lg border shadow-lg w-full ${sizeClasses[size]} mx-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-4">
          {title && <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <div className="py-2">
            {children}
          </div>
        </div>
        <div className="flex flex-row-reverse items-center gap-2 p-4 border-t">
          <Button size="sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}