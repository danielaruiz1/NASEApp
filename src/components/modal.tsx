// components/ui/modal.tsx
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
};

export function Modal({ isOpen, onClose, children, title, description }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div 
        className="bg-background rounded-lg border shadow-lg w-full max-w-md"
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
            Confirmar
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}