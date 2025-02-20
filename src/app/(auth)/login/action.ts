"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  console.log("=== LOGIN PROCESS STARTING ===");

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("Attempting login for email:", data.email);

  const { error, data: authData } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    console.error("Login error:", error);
    throw new Error("Email ou mot de passe incorrect");
  }

  console.log("Login successful!");
  console.log("Auth data:", authData);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Current user session:", {
    id: user?.id,
    email: user?.email,
    role: user?.role,
  });

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Adresse email invalide");
  }

  // Basic password validation
  if (!password || password.length < 6) {
    throw new Error("Le mot de passe doit contenir au moins 6 caractères");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login");
}

export async function logout() {
  const supabase = await createClient();

  console.log("=== LOGOUT PROCESS STARTING ===");

  const beforeLogout = await supabase.auth.getUser();
  console.log("User before logout:", {
    id: beforeLogout.data.user?.id,
    email: beforeLogout.data.user?.email,
  });

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    throw new Error("Une erreur est survenue lors de la déconnexion");
  }

  console.log("Signout successful!");

  const afterLogout = await supabase.auth.getUser();
  console.log("User after logout:", afterLogout.data.user);

  // Increase delay to make sure we see the logs
  await new Promise((resolve) => setTimeout(resolve, 2000));

  revalidatePath("/", "layout");
  redirect("/login");
}
