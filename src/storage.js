import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const storageConfigured = Boolean(url && anonKey);
const client = storageConfigured ? createClient(url, anonKey) : null;

/**
 * Uploads a listing photo to the project's public listing-images bucket.
 * The bucket must exist and have policies restricting uploads to authenticated users.
 * Never put a Supabase service-role key in this browser module.
 */
export async function uploadListingPhoto(file, userId) {
  if (!client) throw new Error("Le stockage photo n’est pas configuré.");
  if (!userId) throw new Error("Connectez-vous avant d’ajouter une photo.");
  if (!file || !file.type?.startsWith("image/")) throw new Error("Choisissez une image.");
  if (file.size > 8 * 1024 * 1024) throw new Error("La photo doit faire 8 Mo maximum.");
  const extension = file.name?.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from("listing-images").upload(path, file, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = client.storage.from("listing-images").getPublicUrl(path);
  return { path, url: data.publicUrl };
}
