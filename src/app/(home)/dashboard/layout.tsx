import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout pageTitle="Tableau de bord" showSidebar={true}>
      {children}
    </DashboardLayout>
  );
}
