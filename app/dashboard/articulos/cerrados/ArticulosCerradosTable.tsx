"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";
import type { Articulo } from "@/db/schema";

type SortField = "nombreArticulo" | "fechaRegistro" | "fechaCierre" | "totalDias";
type SortDirection = "asc" | "desc";

interface Props {
  articulos: Articulo[];
}

export function ArticulosCerradosTable({ articulos }: Props) {
  const [sortField, setSortField] = useState<SortField>("fechaRegistro");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedArticulos = useMemo(() => {
    let filtered = articulos;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = articulos.filter((articulo) =>
        articulo.nombreArticulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    const sorted = [...filtered].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Convertir fechas a timestamps para comparación
      if (sortField === "fechaRegistro" || sortField === "fechaCierre") {
        aValue = aValue ? new Date(aValue).getTime() : 0;
        bValue = bValue ? new Date(bValue).getTime() : 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [articulos, searchTerm, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-2 opacity-50" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-2" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-2" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 mb-2">Artículos Cerrados</h1>
          <p className="text-zinc-400">Artículos con fecha de cierre</p>
        </div>
        <Badge variant="outline" className="text-green-500 border-green-500">
          {filteredAndSortedArticulos.length} cerrado{filteredAndSortedArticulos.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {articulos.length === 0 ? (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileCheck className="w-12 h-12 text-zinc-600 mb-4" />
            <p className="text-zinc-400 text-center">
              No hay artículos cerrados.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Campo de búsqueda */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por nombre de artículo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>

          {filteredAndSortedArticulos.length === 0 ? (
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="w-12 h-12 text-zinc-600 mb-4" />
                <p className="text-zinc-400 text-center">
                  No se encontraron artículos que coincidan con "{searchTerm}"
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-zinc-800">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-zinc-800">
                    <th
                      className="text-left py-4 px-4 text-zinc-400 font-semibold cursor-pointer hover:text-zinc-300 transition-colors"
                      onClick={() => handleSort("nombreArticulo")}
                    >
                      <div className="flex items-center">
                        Nombre Artículo
                        <SortIcon field="nombreArticulo" />
                      </div>
                    </th>
                    <th
                      className="text-left py-4 px-4 text-zinc-400 font-semibold cursor-pointer hover:text-zinc-300 transition-colors"
                      onClick={() => handleSort("fechaRegistro")}
                    >
                      <div className="flex items-center">
                        Fecha Registro
                        <SortIcon field="fechaRegistro" />
                      </div>
                    </th>
                    <th
                      className="text-left py-4 px-4 text-zinc-400 font-semibold cursor-pointer hover:text-zinc-300 transition-colors"
                      onClick={() => handleSort("fechaCierre")}
                    >
                      <div className="flex items-center">
                        Fecha Cierre
                        <SortIcon field="fechaCierre" />
                      </div>
                    </th>
                    <th
                      className="text-left py-4 px-4 text-zinc-400 font-semibold cursor-pointer hover:text-zinc-300 transition-colors"
                      onClick={() => handleSort("totalDias")}
                    >
                      <div className="flex items-center">
                        Total Días
                        <SortIcon field="totalDias" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedArticulos.map((articulo) => (
                    <tr
                      key={articulo.id}
                      className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors"
                    >
                      <td className="py-4 px-4 text-zinc-50 font-medium">{articulo.nombreArticulo}</td>
                      <td className="py-4 px-4 text-zinc-300">
                        {articulo.fechaRegistro
                          ? new Date(articulo.fechaRegistro).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            })
                          : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-zinc-300">
                        {articulo.fechaCierre
                          ? new Date(articulo.fechaCierre).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            })
                          : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-zinc-300">{articulo.totalDias}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
