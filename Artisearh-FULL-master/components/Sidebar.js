import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Home,
  User,
  Settings,
  FileLock,
  LogOut,
  LogIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SideBar = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLinkClick = (e, item) => {
    if (item.name === "Cerrar Sesión") {
      e.preventDefault();
      localStorage.removeItem("token");
      router.push(item.path);
    }
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const navItems = token
    ? [
        { name: "Inicio", path: "/", icon: <Home size={20} /> },
        { name: "Perfil", path: "/profile", icon: <User size={20} /> },
        { name: "Contratos", path: "/contratos", icon: <FileLock size={20} /> },
        { name: "Ajustes", path: "/settings", icon: <Settings size={20} /> },
        { name: "Cerrar Sesión", path: "/login", icon: <LogOut size={20} /> },
      ]
    : [
        { name: "Inicio", path: "/", icon: <Home size={20} /> },
        { name: "Iniciar Sesión", path: "/login", icon: <LogIn size={20} /> },
      ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 min-h-screen p-4 shadow-xl transition-all duration-300 ${
        collapsed ? "w-20" : "sm:w-1/3 xl:w-1/6"
      }`}
    >
      {/* Botón de colapsar */}
      <button
        onClick={toggleSidebar}
        className="mb-6 text-gray-600 hover:text-orange-500"
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>

      {/* Logo o texto */}
      <div className="mb-10 flex justify-center">
        {collapsed ? (
          <img
            src="/ARTISEARCH.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <h1 className="text-3xl font-bold text-orange-500">ArtiSearch</h1>
        )}
      </div>

      <nav>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={(e) => handleLinkClick(e, item)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-md ${
                  router.pathname === item.path
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
