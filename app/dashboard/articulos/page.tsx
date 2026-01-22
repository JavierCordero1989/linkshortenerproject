import { getArticulosPendientes } from "@/data/articulos";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar } from "lucide-react";
import { CreateArticuloDialog } from "./CreateArticuloDialog";
import { CerrarArticuloDialog } from "./CerrarArticuloDialog";

export default async function ArticulosPendientesPage() {
  const articulos = await getArticulosPendientes();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Artículos Pendientes</h1>
          <p className="text-zinc-400">Artículos sin fecha de cierre</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            {articulos.length} pendiente{articulos.length !== 1 ? 's' : ''}
          </Badge>
          <CreateArticuloDialog />
        </div>
      </div>

      {articulos.length === 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-center">
              No hay artículos pendientes.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {articulos.map((articulo) => (
            <Card key={articulo.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-zinc-50 mb-2">
                      {articulo.nombreArticulo}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Registrado: {articulo.fechaRegistro ? new Date(articulo.fechaRegistro).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'N/A'}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <CerrarArticuloDialog 
                      articuloId={articulo.id} 
                      nombreArticulo={articulo.nombreArticulo}
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
