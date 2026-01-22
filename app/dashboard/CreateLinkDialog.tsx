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
import { Plus, Loader2 } from 'lucide-react';
import { createLinkAction } from './actions';
import { useRouter } from 'next/navigation';

export function CreateLinkDialog() {
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
      originalUrl: formData.get('originalUrl') as string,
      shortCode: formData.get('shortCode') as string,
      title: formData.get('title') as string || undefined,
    };

    const result = await createLinkAction(data);

    if (result.success) {
      setOpen(false);
      (e.target as HTMLFormElement).reset();
      router.refresh();
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Crear Enlace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Enlace</DialogTitle>
          <DialogDescription>
            Ingresa los detalles de tu enlace acortado. El código corto debe ser único.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="originalUrl" className="text-sm font-medium">
                URL Original <span className="text-red-500">*</span>
              </label>
              <input
                id="originalUrl"
                name="originalUrl"
                type="url"
                placeholder="https://ejemplo.com/tu-enlace-muy-largo"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="shortCode" className="text-sm font-medium">
                Código Corto <span className="text-red-500">*</span>
              </label>
              <input
                id="shortCode"
                name="shortCode"
                type="text"
                placeholder="mi-enlace"
                required
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9-_]+"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                Solo letras, números, guiones y guiones bajos (3-20 caracteres)
              </p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Título (opcional)
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Mi enlace increíble"
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
              Crear Enlace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
