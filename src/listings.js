import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const listings = () => {
  if (!db) throw new Error("Firebase n'est pas configuré. Renseignez .env.local.");
  return collection(db, "listings");
};

export async function fetchPublishedListings({ category = "all", search = "" } = {}) {
  const constraints = [where("status", "==", "published"), orderBy("createdAt", "desc")];
  if (category !== "all") constraints.unshift(where("category", "==", category));
  const snapshot = await getDocs(query(listings(), ...constraints));
  const normalized = search.trim().toLocaleLowerCase("fr");
  return snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .filter((item) => !normalized || [item.title, item.location, item.description, item.category].join(" ").toLocaleLowerCase("fr").includes(normalized));
}

export async function createListing({ ownerId, category, title, description, location, price = "" }) {
  if (!ownerId) throw new Error("Connectez-vous pour publier une annonce.");
  const clean = {
    ownerId,
    category,
    title: title.trim(),
    description: description.trim(),
    location: location.trim(),
    price: price.trim(),
    status: "published",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (!clean.title || !clean.description || !clean.location) throw new Error("Titre, description et localisation sont obligatoires.");
  const result = await addDoc(listings(), clean);
  return result.id;
}

export async function fetchMyListings(ownerId) {
  if (!ownerId) throw new Error("Connectez-vous pour voir vos annonces.");
  const snapshot = await getDocs(query(listings(), where("ownerId", "==", ownerId), orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function updateListing(id, ownerId, changes) {
  if (!id || !ownerId) throw new Error("Annonce ou utilisateur manquant.");
  const allowed = ["category", "title", "description", "location", "price", "status"];
  const update = Object.fromEntries(Object.entries(changes).filter(([key]) => allowed.includes(key)));
  update.updatedAt = serverTimestamp();
  await updateDoc(doc(listings(), id), update);
}

export async function deleteListing(id) {
  if (!id) throw new Error("Annonce manquante.");
  await deleteDoc(doc(listings(), id));
}
