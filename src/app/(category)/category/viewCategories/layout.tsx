import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout pageTitle="Voir les cateogries" showSidebar={true}>
      {children}
    </DashboardLayout>
  );
}
