'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil, Loader2 } from 'lucide-react';
import { updateEstacionServicioAction } from './actions';
import { useRouter } from 'next/navigation';
import type { EstacionServicio } from '@/db/schema';

interface EditEstacionServicioDialogProps {
  estacionServicio: EstacionServicio;
}

export function EditEstacionServicioDialog({ estacionServicio }: EditEstacionServicioDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      id: estacionServicio.id,
      nombre: formData.get('nombre') as string,
      ubicacion: formData.get('ubicacion') as string,
    };

    const result = await updateEstacionServicioAction(data);

    if (result.success) {
      setOpen(false);
      router.refresh();
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Estación de Servicio</DialogTitle>
          <DialogDescription>
            Modifica los detalles de la estación de servicio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="nombre" className="text-sm font-medium">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ejemplo: Gasolinera Central"
                defaultValue={estacionServicio.nombre}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="ubicacion" className="text-sm font-medium">
                Ubicación <span className="text-red-500">*</span>
              </label>
              <input
                id="ubicacion"
                name="ubicacion"
                type="text"
                placeholder="Ejemplo: Calle Ejemplo 123, Ciudad"
                defaultValue={estacionServicio.ubicacion}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {error && (
              <div className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
