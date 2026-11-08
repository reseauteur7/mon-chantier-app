import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function ensureUserProfile(user) {
  if (!db || !user?.uid) return;
  const ref = doc(db, 'users', user.uid);
  const existing = await getDoc(ref);
  const profile = {
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || null,
  };
  if (existing.exists()) profile.updatedAt = serverTimestamp();
  else profile.createdAt = serverTimestamp();
  await setDoc(ref, profile, { merge: true });
}
