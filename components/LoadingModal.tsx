'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

export function LoadingModal() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Mostrar loading al cambiar de página
    setIsLoading(true);
    
    // Ocultar loading después de un breve momento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Dialog open={isLoading}>
      <DialogContent className="flex items-center justify-center border-none bg-transparent shadow-none">
        <DialogTitle className="sr-only">Cargando</DialogTitle>
        <div className="flex flex-col items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <Loader2 className="w-12 h-12 animate-spin text-zinc-50" />
          <p className="text-zinc-400 text-sm">Cargando...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
