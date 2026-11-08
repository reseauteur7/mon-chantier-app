import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function reportListing({ listingId, reporterId, reason, details = "" }) {
  if (!db) throw new Error("Firebase n'est pas configuré.");
  if (!listingId || !reporterId) throw new Error("Connectez-vous pour signaler une annonce.");
  const allowed = ["fraud","inappropriate","spam","unsafe","other"];
  if (!allowed.includes(reason)) throw new Error("Choisissez un motif de signalement.");
  const cleanDetails = details.trim().slice(0, 500);
  await addDoc(collection(db, "reports"), { listingId, reporterId, reason, details: cleanDetails, status: "open", createdAt: serverTimestamp() });
}
