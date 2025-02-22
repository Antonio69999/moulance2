import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout pageTitle="Ajouter une catégorie" showSidebar={true}>
      {children}
    </DashboardLayout>
  );
}
