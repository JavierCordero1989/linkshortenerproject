import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, ExternalLink } from "lucide-react";
import { CreateLinkDialog } from "../CreateLinkDialog";
import { EditLinkDialog } from "../EditLinkDialog";
import { DeleteLinkDialog } from "../DeleteLinkDialog";

export default async function LinksPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }
  
  const userLinks = await getLinksByUserId(userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Mis Enlaces</h1>
          <p className="text-zinc-400">Gestiona y monitorea todos tus enlaces acortados</p>
        </div>
        <CreateLinkDialog />
      </div>

      {userLinks.length === 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Link2 className="w-12 h-12 text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-center">
              Aún no tienes enlaces acortados. ¡Crea tu primer enlace!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {userLinks.map((link) => (
            <Card key={link.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-zinc-50 mb-2">
                      {link.title || "Sin título"}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mb-2">
                      <Link2 className="w-4 h-4" />
                      <code className="text-sm">{link.shortCode}</code>
                    </CardDescription>
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 truncate"
                    >
                      {link.originalUrl}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <EditLinkDialog link={link} />
                    <DeleteLinkDialog 
                      linkId={link.id} 
                      linkTitle={link.title}
                      shortCode={link.shortCode}
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
