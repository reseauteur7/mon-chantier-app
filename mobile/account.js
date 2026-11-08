import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function ensureUserProfile(user) {
  if (!db || !user?.uid) return;
  await setDoc(doc(db, 'users', user.uid), {
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || null,
    createdAt: serverTimestamp(),
  }, { merge: true });
}
