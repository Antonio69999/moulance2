"use client";

import * as OutlineIcons from "@heroicons/react/24/outline";
import { logout } from "@/app/(auth)/login/action";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally handle error UI feedback here
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center text-gray-600 hover:text-red-500 py-4 transition-all duration-300 hover:translate-x-1 w-full"
    >
      <OutlineIcons.ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2" />
      Déconnexion
      <span className="ml-auto">›</span>
    </button>
  );
}
