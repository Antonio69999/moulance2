import { Metadata } from "next";
import { AddCategoryForm } from "@/components/forms/category/add-form";

export const metadata: Metadata = {
  title: "Add Categories",
  description: "Add categories page",
};

export default function AddCategories() {
  return (
    <main>
      <AddCategoryForm />
    </main>
  );
}
