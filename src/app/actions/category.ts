"use server";

import { createClient } from "@/utils/supabase/server";

export async function createCategory(name: string, file: File) {
  try {
    const supabase = await createClient();

    // Create a unique filename to avoid conflicts
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const filePath = `img/categoriesLogo/${timestamp}-${cleanFileName}`;

    // Convert File to ArrayBuffer for Supabase storage
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const { data: user, error } = await supabase.auth.getUser();
    console.log("User Info:", user, error);

    // Upload the file to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("categoriesIcons")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("categoriesIcons").getPublicUrl(filePath);

    console.log("File uploaded successfully:", {
      path: filePath,
      publicUrl: publicUrl,
    });

    // Insert into Category table
    const { data: categoryData, error: insertError } = await supabase
      .from("Category")
      .insert({
        name: name,
        logoPath: publicUrl,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw insertError;
    }

    console.log("Category created:", categoryData);
    return { success: true, data: categoryData };
  } catch (error) {
    console.error("Server action error:", error);
    throw error;
  }
}
