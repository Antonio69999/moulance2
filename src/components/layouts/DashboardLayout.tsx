"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as OutlineIcons from "@heroicons/react/24/outline";
import { LogoutButton } from "@/components/buttons/logout-button";
import { createClient } from "@/utils/supabase/client";

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  showSidebar?: boolean;
}

export function DashboardLayout({
  children,
  pageTitle = "Tableau de Bord",
  showSidebar = true,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
      }
    };

    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.replace("/login");
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div
        className={`overlay fixed inset-0 bg-pink-400/50 z-40 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
        } transition-opacity duration-300`}
        onClick={toggleSidebar}
      ></div>

      <header className="fixed w-full bg-white text-red-500 z-50 shadow-lg animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
          <button
            className="mobile-menu-button p-2 lg:hidden"
            onClick={toggleSidebar}
          >
            <OutlineIcons.Bars3Icon />
          </button>
          <div className="text-xl font-bold text-red-500">{pageTitle}</div>
          <div className="flex items-center space-x-2">
            <OutlineIcons.MagnifyingGlassIcon className="h-6 w-6 cursor-pointer hover:text-red-400 transition-transform duration-300 hover:scale-110 hidden md:block" />
            <OutlineIcons.BellIcon className="h-6 w-6 cursor-pointer hover:text-red-400 transition-transform duration-300 hover:scale-110 hidden md:block" />
            <OutlineIcons.UserCircleIcon className="h-10 w-10 cursor-pointer hover:text-red-400 transition-transform duration-300 hover:scale-110" />
          </div>
        </div>
      </header>

      <div className="pt-16 max-w-7xl mx-auto flex">
        {showSidebar && (
          <aside
            className={`sidebar fixed lg:static w-[240px] bg-white h-[calc(100vh-4rem)] lg:h-auto transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4`}
          >
            <div className="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-red-500 py-4 transition-all duration-300 hover:translate-x-1"
              >
                <OutlineIcons.HomeIcon className="h-5 w-5 mr-2" />
                Menu
                <span className="ml-auto">›</span>
              </Link>
              <Link
                href="/expense/add"
                className="flex items-center text-gray-600 hover:text-red-500 py-4 transition-all duration-300 hover:translate-x-1"
              >
                <OutlineIcons.PlusIcon className="h-5 w-5 mr-2" />
                Ajouter une dépense
                <span className="ml-auto">›</span>
              </Link>
              <Link
                href="/expense/view"
                className="flex items-center text-gray-600 hover:text-red-500 py-4 transition-all duration-300 hover:translate-x-1"
              >
                <OutlineIcons.CreditCardIcon className="h-5 w-5 mr-2" />
                Mes dépenses
                <span className="ml-auto">›</span>
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Link
                href="#"
                className="flex items-center text-gray-600 hover:text-red-500 py-4 transition-all duration-300 hover:translate-x-1"
              >
                <OutlineIcons.UserCircleIcon className="h-5 w-5 mr-2" />
                Profile
                <span className="ml-auto">›</span>
              </Link>
              <Link
                href="#"
                className="flex items-center text-gray-600 hover:text-red-500 py-4 transition-all duration-300 hover:translate-x-1"
              >
                <OutlineIcons.Cog6ToothIcon className="h-5 w-5 mr-2" />
                Options
                <span className="ml-auto">›</span>
              </Link>
              <LogoutButton />
            </div>
          </aside>
        )}
        <main className={`flex-1 p-4 ${!showSidebar ? "w-full" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
