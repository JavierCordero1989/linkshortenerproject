import { getAllEstacionesServicio } from "@/data/estacionesServicio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { EditEstacionServicioDialog } from "./EditEstacionServicioDialog";
import { DeleteEstacionServicioDialog } from "./DeleteEstacionServicioDialog";
import { CreateEstacionServicioDialog } from "./CreateEstacionServicioDialog";

export default async function EstacionesServicioPage() {
  const estacionesServicio = await getAllEstacionesServicio();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Estaciones de Servicio</h1>
          <p className="text-zinc-400">Gestiona las estaciones de servicio disponibles</p>
        </div>
        <CreateEstacionServicioDialog />
      </div>

      {estacionesServicio.length === 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="w-12 h-12 text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-center">
              No hay estaciones de servicio registradas.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {estacionesServicio.map((estacionServicio) => (
            <Card key={estacionServicio.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-zinc-50 mb-2">
                      {estacionServicio.nombre}
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-400 mb-1">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {estacionServicio.ubicacion}
                    </CardDescription>
                    <CardDescription className="text-sm text-zinc-500">
                      Creado: {new Date(estacionServicio.fechaCreacion).toLocaleDateString('es-ES')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <EditEstacionServicioDialog estacionServicio={estacionServicio} />
                    <DeleteEstacionServicioDialog 
                      estacionServicioId={estacionServicio.id} 
                      estacionServicioNombre={estacionServicio.nombre} 
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
