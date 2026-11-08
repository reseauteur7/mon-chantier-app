import { collection, doc, getDocs, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function fetchFavoriteIds(uid) {
  if (!db || !uid) return [];
  const snapshot = await getDocs(collection(db, 'users', uid, 'favorites'));
  return snapshot.docs.map(item => item.id);
}

export async function toggleFavorite(uid, listingId, isFavorite) {
  if (!db || !uid || !listingId) throw new Error('Connectez-vous pour gérer vos favoris.');
  const ref = doc(db, 'users', uid, 'favorites', listingId);
  if (isFavorite) await deleteDoc(ref);
  else await setDoc(ref, { listingId, createdAt: serverTimestamp() });
}
