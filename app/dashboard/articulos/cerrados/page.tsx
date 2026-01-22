import { getArticulosCerrados } from "@/data/articulos";
import { ArticulosCerradosTable } from "./ArticulosCerradosTable";

export default async function ArticulosCerradosPage() {
  const articulos = await getArticulosCerrados();

  return <ArticulosCerradosTable articulos={articulos} />;
}
