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
import { login, signup } from "@/app/(auth)/login/action";

export function LoginForm() {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-rose-500">Connexion</CardTitle>
          <CardDescription>
            Entrer votre nom d'utilisateur ci-dessous
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
              <input type="hidden" name="redirectTo" />
              <Button
                type="submit"
                formAction={login}
                className="w-full bg-rose-500 hover:bg-rose-100 hover:text-rose-500 text-white text-lg"
              >
                Let's go
              </Button>
              <Button
                type="button"
                formAction={signup}
                variant="outline"
                className="w-full"
              >
                Sign up
              </Button>

              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="text-sm text-red-500"></p>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous n'avez pas de compte ?{" "}
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
