"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { login } from "@/app/(auth)/login/action";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      await login(formData);
      // If we get here, the login was successful
    } catch (err) {
      setError(err instanceof Error ? err.message : "La connexion a échoué");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-rose-500">Connexion</CardTitle>
          <CardDescription>Entrer votre email ci-dessous</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline decoration-rose-400"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-100 hover:text-rose-500 text-white text-lg"
              >
                {isLoading ? "Chargement..." : "Let's go"}{" "}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous n&apos;avez pas de compte ?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 decoration-rose-400"
              >
                Inscription
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
