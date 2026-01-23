import { getAllRegistrosGasolina } from "@/data/registrosGasolina";
import { getAllEstacionesServicio } from "@/data/estacionesServicio";
import { getAllTiposVehiculo } from "@/data/tiposVehiculo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Fuel } from "lucide-react";
import { CreateRegistroGasolinaDialog } from "./CreateRegistroGasolinaDialog";

export default async function RegistrosGasolinaPage() {
  const [registros, estacionesServicio, tiposVehiculo] = await Promise.all([
    getAllRegistrosGasolina(),
    getAllEstacionesServicio(),
    getAllTiposVehiculo(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Registros de Gasolina</h1>
          <p className="text-zinc-400">Gestiona los registros de carga de gasolina</p>
        </div>
        <CreateRegistroGasolinaDialog 
          estacionesServicio={estacionesServicio}
          tiposVehiculo={tiposVehiculo}
        />
      </div>

      {registros.length === 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Fuel className="w-12 h-12 text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-center">
              No hay registros de gasolina.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {registros.map((registro) => (
            <Card key={registro.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <CardTitle className="text-zinc-50 mb-1">
                        {registro.estacionServicio.nombre}
                      </CardTitle>
                      <CardDescription className="text-sm text-zinc-400">
                        {registro.estacionServicio.ubicacion}
                      </CardDescription>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-zinc-500 block">Tipo de Vehículo</span>
                        <span className="text-zinc-300">{registro.tipoVehiculo.nombre}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Kilometraje</span>
                        <span className="text-zinc-300">{registro.kilometrajeActual.toLocaleString('es-ES')} km</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Litros Cargados</span>
                        <span className="text-zinc-300">{registro.litrosCargados} L</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Monto Cargado</span>
                        <span className="text-zinc-300">₡{registro.montoCargado}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Precio por Litro</span>
                        <span className="text-zinc-300">₡{registro.precioPorLitro}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Fecha de Carga</span>
                        <span className="text-zinc-300">
                          {new Date(registro.fechaCarga).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
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
