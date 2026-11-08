import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

function listingCollection() {
  if (!db) throw new Error('Firebase MON CHANTIER n’est pas configuré.');
  return collection(db, 'listings');
}

export async function getPublishedListings(category = 'all') {
  const filters = [where('status', '==', 'published'), orderBy('createdAt', 'desc')];
  if (category !== 'all') filters.unshift(where('category', '==', category));
  const snapshot = await getDocs(query(listingCollection(), ...filters));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function publishListing(user, input) {
  if (!user?.uid) throw new Error('Connectez-vous pour publier.');
  const data = {
    ownerId: user.uid,
    category: input.category,
    title: input.title.trim(),
    description: input.description.trim(),
    location: input.location.trim(),
    price: (input.price || '').trim(),
    status: 'published',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (!data.title || !data.description || !data.location) {
    throw new Error('Titre, description et localisation sont obligatoires.');
  }
  const result = await addDoc(listingCollection(), data);
  return result.id;
}


export async function getMyListings(ownerId) {
  if (!ownerId) throw new Error('Connectez-vous pour voir vos annonces.');
  const snapshot = await getDocs(query(listingCollection(), where('ownerId', '==', ownerId), orderBy('createdAt', 'desc')));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateMyListing(id, ownerId, input) {
  if (!id || !ownerId) throw new Error('Annonce ou utilisateur manquant.');
  const data = {
    category: input.category,
    title: (input.title || '').trim(),
    description: (input.description || '').trim(),
    location: (input.location || '').trim(),
    price: (input.price || '').trim(),
    updatedAt: serverTimestamp(),
  };
  if (!data.title || !data.description || !data.location) throw new Error('Titre, description et localisation sont obligatoires.');
  await updateDoc(doc(listingCollection(), id), data);
}

export async function removeMyListing(id) {
  if (!id) throw new Error('Annonce manquante.');
  await deleteDoc(doc(listingCollection(), id));
}
