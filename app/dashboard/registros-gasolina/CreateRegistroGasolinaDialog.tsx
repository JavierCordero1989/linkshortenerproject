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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Loader2 } from 'lucide-react';
import { createRegistroGasolinaAction } from './actions';
import { useRouter } from 'next/navigation';
import type { EstacionServicio, TipoVehiculo } from '@/db/schema';

interface CreateRegistroGasolinaDialogProps {
  estacionesServicio: EstacionServicio[];
  tiposVehiculo: TipoVehiculo[];
}

export function CreateRegistroGasolinaDialog({
  estacionesServicio,
  tiposVehiculo,
}: CreateRegistroGasolinaDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEstacion, setSelectedEstacion] = useState<string>('');
  const [selectedTipoVehiculo, setSelectedTipoVehiculo] = useState<string>('');
  const [litrosCargados, setLitrosCargados] = useState<string>('');
  const [montoCargado, setMontoCargado] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      idEstacionServicio: Number(selectedEstacion),
      idTipoVehiculo: Number(selectedTipoVehiculo),
      kilometrajeActual: Number(formData.get('kilometrajeActual')),
      litrosCargados: litrosCargados,
      montoCargado: montoCargado,
    };

    const result = await createRegistroGasolinaAction(data);

    if (result.success) {
      setOpen(false);
      router.refresh();
      // Limpiar el formulario
      (e.target as HTMLFormElement).reset();
      setSelectedEstacion('');
      setSelectedTipoVehiculo('');
      setLitrosCargados('');
      setMontoCargado('');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Registro de Gasolina
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Registro de Gasolina</DialogTitle>
          <DialogDescription>
            Agrega un nuevo registro de carga de gasolina.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="idEstacionServicio" className="text-sm font-medium">
                Estación de Servicio <span className="text-red-500">*</span>
              </label>
              <Select
                name="idEstacionServicio"
                value={selectedEstacion}
                onValueChange={setSelectedEstacion}
                required
              >
                <SelectTrigger id="idEstacionServicio">
                  <SelectValue placeholder="Selecciona una estación" />
                </SelectTrigger>
                <SelectContent>
                  {estacionesServicio.map((estacion) => (
                    <SelectItem key={estacion.id} value={estacion.id.toString()}>
                      {estacion.nombre} - {estacion.ubicacion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="idTipoVehiculo" className="text-sm font-medium">
                Tipo de Vehículo <span className="text-red-500">*</span>
              </label>
              <Select
                name="idTipoVehiculo"
                value={selectedTipoVehiculo}
                onValueChange={setSelectedTipoVehiculo}
                required
              >
                <SelectTrigger id="idTipoVehiculo">
                  <SelectValue placeholder="Selecciona un tipo de vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposVehiculo.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id.toString()}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="kilometrajeActual" className="text-sm font-medium">
                Kilometraje Actual <span className="text-red-500">*</span>
              </label>
              <input
                id="kilometrajeActual"
                name="kilometrajeActual"
                type="number"
                placeholder="Ejemplo: 15000"
                required
                min="1"
                step="1"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="litrosCargados" className="text-sm font-medium">
                Litros Cargados <span className="text-red-500">*</span>
              </label>
              <input
                id="litrosCargados"
                name="litrosCargados"
                type="number"
                placeholder="Ejemplo: 45.50"
                required
                min="0.01"
                step="0.01"
                value={litrosCargados}
                onChange={(e) => setLitrosCargados(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="montoCargado" className="text-sm font-medium">
                Monto Cargado <span className="text-red-500">*</span>
              </label>
              <input
                id="montoCargado"
                name="montoCargado"
                type="number"
                placeholder="Ejemplo: 500"
                required
                min="1"
                step="1"
                value={montoCargado}
                onChange={(e) => setMontoCargado(e.target.value)}
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
              Crear Registro
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
