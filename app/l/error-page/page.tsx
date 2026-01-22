import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home, Clock } from 'lucide-react';

export default async function ErrorPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ type?: string; code?: string }> 
}) {
  const params = await searchParams;
  const type = params.type;
  const code = params.code || 'desconocido';
  
  const isExpired = type === 'expired';
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            {isExpired ? (
              <Clock className="h-6 w-6 text-destructive" />
            ) : (
              <AlertCircle className="h-6 w-6 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isExpired ? 'Enlace Expirado' : 'Enlace No Encontrado'}
          </CardTitle>
          <CardDescription>
            {isExpired 
              ? `El enlace "${code}" ha expirado y ya no está disponible.`
              : `El enlace "${code}" no existe o fue eliminado.`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Ir al Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al Inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
