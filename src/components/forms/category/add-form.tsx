"use client";

import { useState } from "react";
import { createCategory } from "@/app/actions/category";

export function AddCategoryForm() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!file) {
      setError("Veuillez selectionner un fichier");
      setLoading(false);
      return;
    }

    try {
      await createCategory(name, file);
      setSuccess("Catégorie créée avec succès !");
      setName("");
      setFile(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur inconnue s'est produite"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-4 px-9" onSubmit={handleSubmit}>
          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Télécharger un fichier
            </label>

            <div className="mb-8">
              <input
                type="file"
                name="file"
                id="file"
                className="sr-only"
                accept=".svg,.png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                disabled={loading}
              />
              <label
                htmlFor="file"
                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Déposez un fichier ici
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Ou
                  </span>
                  <span className="inline-flex rounded-xl border border-red-200 py-2 px-7 text-base font-medium text-[#07074D] hover:bg-red-500 hover:text-white transition-all duration-300">
                    Parcourir
                  </span>
                </div>
              </label>
            </div>
            {file && (
              <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    {file.name}
                  </span>
                  <button
                    className="text-[#07074D]"
                    onClick={() => setFile(null)}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="mb-5 block text-xl font-semibold text-[#07074D]"
            >
              Nom de la catégorie
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-md border border-[#e0e0e0] py-3 px-4 text-base font-medium text-[#07074D] outline-none focus:border-[#6A64F1] focus:shadow-md"
              placeholder="Restaurants, Assurances, etc."
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="hover:shadow-form w-full rounded-md bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              {loading ? "Création..." : "Ajouter"}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      </div>
    </div>
  );
}
