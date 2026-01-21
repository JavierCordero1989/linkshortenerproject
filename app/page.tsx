"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, BarChart3, Zap, Shield, Globe, Users } from "lucide-react";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="text-sm">
            <Zap className="w-3 h-3 mr-1" />
            Acortador de Enlaces Rápido y Confiable
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-50 max-w-4xl">
            Acorta, Rastrea y
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Optimiza </span>
            tus Enlaces
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl">
            Convierte enlaces largos en URLs cortas y fáciles de compartir. 
            Monitorea el rendimiento en tiempo real.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 py-6">
              <Link2 className="w-5 h-5 mr-2" />
              Comenzar Gratis
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-4">
            Características Principales
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Todo lo que necesitas para gestionar tus enlaces de manera profesional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Link2 className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-zinc-50">Enlaces Personalizados</CardTitle>
              <CardDescription>
                Crea URLs cortas y memorables con alias personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500">
                Elige el nombre perfecto para tus enlaces y hazlos más fáciles de recordar y compartir.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle className="text-zinc-50">Análisis en Tiempo Real</CardTitle>
              <CardDescription>
                Monitorea clics, ubicaciones y dispositivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500">
                Obtén información detallada sobre quién hace clic en tus enlaces y desde dónde.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-zinc-50">Súper Rápido</CardTitle>
              <CardDescription>
                Redirecciones instantáneas con CDN global
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500">
                Infraestructura optimizada para garantizar las redirecciones más rápidas posibles.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <CardTitle className="text-zinc-50">Seguro y Confiable</CardTitle>
              <CardDescription>
                Protección contra spam y enlaces maliciosos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500">
                Implementamos medidas de seguridad para proteger tus enlaces y a tus usuarios.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-yellow-500" />
              </div>
              <CardTitle className="text-zinc-50">Alcance Global</CardTitle>
              <CardDescription>
                Comparte enlaces en cualquier plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500">
                Perfecto para redes sociales, emails, campañas de marketing y más.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-cyan-500" />
              </div>
              <CardTitle className="text-zinc-50">Gestión de Equipos</CardTitle>
              <CardDescription>
                Colabora con tu equipo en la gestión de enlaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-500">
                Organiza y comparte enlaces con tu equipo de trabajo de manera eficiente.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 mb-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardHeader className="text-center pb-8 pt-12">
            <CardTitle className="text-3xl md:text-4xl text-white mb-4">
              ¿Listo para optimizar tus enlaces?
            </CardTitle>
            <CardDescription className="text-xl text-white/90 max-w-2xl mx-auto">
              Únete a miles de usuarios que ya están acortando y rastreando sus enlaces de manera profesional
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-12">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link2 className="w-5 h-5 mr-2" />
              Crear Cuenta Gratis
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
