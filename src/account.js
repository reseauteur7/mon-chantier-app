import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function ensureUserProfile(user) {
  if (!db || !user?.uid) return;
  const ref = doc(db, 'users', user.uid);
  const existing = await getDoc(ref);
  const profile = { displayName: user.displayName || '', email: user.email || '', photoURL: user.photoURL || null };
  if (existing.exists()) profile.updatedAt = serverTimestamp();
  else profile.createdAt = serverTimestamp();
  await setDoc(ref, profile, { merge: true });
}

export async function recordTermsAcceptance(user) {
  if (!db || !user?.uid) throw new Error('Profil Firebase indisponible pour enregistrer l’acceptation des CGU.');
  const ref = doc(db, 'users', user.uid);
  const existing = await getDoc(ref);
  const acceptance = { termsAccepted: true, termsVersion: '1.0', termsAcceptedAt: serverTimestamp() };
  if (existing.exists()) await setDoc(ref, { ...acceptance, updatedAt: serverTimestamp() }, { merge: true });
  else await setDoc(ref, { displayName: user.displayName || '', email: user.email || '', photoURL: user.photoURL || null, createdAt: serverTimestamp(), ...acceptance }, { merge: true });
}
