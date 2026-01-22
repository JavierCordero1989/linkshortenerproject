import { getAllContactos } from "@/data/contactos";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone } from "lucide-react";
import { EditContactoDialog } from "./EditContactoDialog";
import { DeleteContactoDialog } from "./DeleteContactoDialog";
import { CreateContactoDialog } from "./CreateContactoDialog";

export default async function ContactosPage() {
  const contactos = await getAllContactos();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Contactos</h1>
          <p className="text-zinc-400">Gestiona tu lista de contactos</p>
        </div>
        <CreateContactoDialog />
      </div>

      {contactos.length === 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-center">
              No hay contactos registrados.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contactos.map((contacto) => (
            <Card key={contacto.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-zinc-50 mb-2">
                      {contacto.nombre}
                    </CardTitle>
                    {contacto.numeroTelefono && (
                      <CardDescription className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{contacto.numeroTelefono}</span>
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <EditContactoDialog contacto={contacto} />
                    <DeleteContactoDialog 
                      contactoId={contacto.id} 
                      contactoNombre={contacto.nombre} 
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
