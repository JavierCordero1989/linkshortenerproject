import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { InactivityDetector } from "./InactivityDetector";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Leer valores de tiempo desde variables de entorno (en milisegundos)
  // Puedes definir en .env: INACTIVITY_TIMEOUT y INACTIVITY_WARNING_TIME
  const inactivityTimeout = process.env.INACTIVITY_TIMEOUT
    ? Number(process.env.INACTIVITY_TIMEOUT)
    : 300000; // 5 minutos por defecto

  const inactivityWarning = process.env.INACTIVITY_WARNING_TIME
    ? Number(process.env.INACTIVITY_WARNING_TIME)
    : 30000; // 30 segundos por defecto

  return (
    <div className="flex min-h-screen">
      <InactivityDetector timeout={inactivityTimeout} warningTime={inactivityWarning} />
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
