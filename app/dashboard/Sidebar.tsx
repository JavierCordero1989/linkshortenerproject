"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, List, ChevronLeft, ChevronRight, Users, FileText, Car, MapPin, Fuel } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems = [
    {
      title: "Acortador",
      icon: Link2,
      items: [
        {
          title: "Listar enlaces acortados",
          href: "/dashboard/links",
          icon: List,
        },
      ],
    },
    {
      title: "Contactos",
      icon: Users,
      items: [
        {
          title: "Lista",
          href: "/dashboard/contactos",
          icon: List,
        },
      ],
    },
    {
      title: "Artículos",
      icon: FileText,
      items: [
        {
          title: "Pendientes",
          href: "/dashboard/articulos",
          icon: List,
        },
        {
          title: "Cerrados",
          href: "/dashboard/articulos/cerrados",
          icon: List,
        },
      ],
    },
    {
      title: "Tipos de Vehículo",
      icon: Car,
      items: [
        {
          title: "Lista",
          href: "/dashboard/tipos-vehiculo",
          icon: List,
        },
      ],
    },
    {
      title: "Estaciones de Servicio",
      icon: MapPin,
      items: [
        {
          title: "Lista",
          href: "/dashboard/estaciones-servicio",
          icon: List,
        },
      ],
    },
    {
      title: "Registros de Gasolina",
      icon: Fuel,
      items: [
        {
          title: "Listado",
          href: "/dashboard/registros-gasolina",
          icon: List,
        },
      ],
    },
  ];

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuTitle)
        ? prev.filter((title) => title !== menuTitle)
        : [...prev, menuTitle]
    );
  };

  return (
    <aside 
      className={cn(
        "border-r border-zinc-800 bg-zinc-950 p-4 transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-zinc-400" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-zinc-400" />
        )}
      </Button>

      <div className="mb-8 mt-2">
        <Link 
          href="/dashboard"
          className={cn(
            "font-semibold text-zinc-50 hover:text-zinc-200 transition-colors cursor-pointer block",
            isCollapsed ? "text-center text-sm" : "text-lg"
          )}
          title={isCollapsed ? "Dashboard" : undefined}
        >
          {isCollapsed ? "D" : "Dashboard"}
        </Link>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((menu) => {
          const isExpanded = expandedMenus.includes(menu.title);
          return (
            <div key={menu.title}>
              <button
                onClick={() => toggleMenu(menu.title)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium text-zinc-400 w-full hover:text-zinc-50 transition-colors rounded-md p-2",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? menu.title : undefined}
              >
                <menu.icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{menu.title}</span>
                    <ChevronRight 
                      className={cn(
                        "w-3 h-3 transition-transform duration-200 ease-in-out",
                        isExpanded && "transform rotate-90"
                      )}
                    />
                  </>
                )}
              </button>
              {!isCollapsed && isExpanded && (
                <ul className="ml-6 space-y-1 mt-1">
                  {menu.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-zinc-800 text-zinc-50"
                              : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
                          )}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
