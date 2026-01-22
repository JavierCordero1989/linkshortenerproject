'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { cerrarArticuloAction } from './actions';
import { useRouter } from 'next/navigation';

type CerrarArticuloDialogProps = {
  articuloId: number;
  nombreArticulo: string;
};

export function CerrarArticuloDialog({ articuloId, nombreArticulo }: CerrarArticuloDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCerrar = async () => {
    setIsLoading(true);
    setError(null);

    const result = await cerrarArticuloAction({ id: articuloId });

    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Cerrar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cerrar artículo?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas cerrar el artículo <span className="font-semibold text-zinc-50">"{nombreArticulo}"</span>?
            <br /><br />
            Esta acción registrará la fecha de cierre actual y calculará automáticamente el total de días transcurridos desde su registro.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <div className="flex items-start gap-3 rounded-lg bg-red-500/10 border border-red-500/50 p-4">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-500">Error al cerrar artículo</p>
              <p className="text-sm text-red-400 mt-1">{error}</p>
            </div>
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancelar
          </AlertDialogCancel>
          <Button onClick={handleCerrar} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sí, cerrar artículo
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
