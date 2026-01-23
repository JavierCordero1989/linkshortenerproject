import { getAllTiposVehiculo } from "@/data/tiposVehiculo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";
import { EditTipoVehiculoDialog } from "./EditTipoVehiculoDialog";
import { DeleteTipoVehiculoDialog } from "./DeleteTipoVehiculoDialog";
import { CreateTipoVehiculoDialog } from "./CreateTipoVehiculoDialog";

export default async function TiposVehiculoPage() {
  const tiposVehiculo = await getAllTiposVehiculo();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Tipos de Vehículo</h1>
          <p className="text-zinc-400">Gestiona los tipos de vehículo disponibles</p>
        </div>
        <CreateTipoVehiculoDialog />
      </div>

      {tiposVehiculo.length === 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Car className="w-12 h-12 text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-center">
              No hay tipos de vehículo registrados.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tiposVehiculo.map((tipoVehiculo) => (
            <Card key={tipoVehiculo.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-zinc-50 mb-2">
                      {tipoVehiculo.nombre}
                    </CardTitle>
                    <CardDescription className="text-sm text-zinc-500">
                      Creado: {new Date(tipoVehiculo.fechaCreacion).toLocaleDateString('es-ES')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <EditTipoVehiculoDialog tipoVehiculo={tipoVehiculo} />
                    <DeleteTipoVehiculoDialog 
                      tipoVehiculoId={tipoVehiculo.id} 
                      tipoVehiculoNombre={tipoVehiculo.nombre} 
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
