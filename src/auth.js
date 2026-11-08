import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

function requireAuth() {
  if (!auth) throw new Error("Firebase n’est pas configuré. Ajoutez les variables VITE_FIREBASE_* dans .env.local.");
  return auth;
}
export function observeUser(callback) {
  return onAuthStateChanged(requireAuth(), callback);
}
export async function registerEmail(email, password, displayName = "") {
  const credential = await createUserWithEmailAndPassword(requireAuth(), email.trim(), password);
  if (displayName.trim()) await updateProfile(credential.user, { displayName: displayName.trim() });
  return credential.user;
}
export async function loginEmail(email, password) {
  return (await signInWithEmailAndPassword(requireAuth(), email.trim(), password)).user;
}
export async function logout() {
  await signOut(requireAuth());
}

export async function resetPassword(email) {
  const value = email.trim();
  if (!value) throw new Error('Saisissez votre adresse email pour recevoir le lien de réinitialisation.');
  await sendPasswordResetEmail(requireAuth(), value);
}

export async function loginGoogle() {
  return (await signInWithPopup(requireAuth(), googleProvider)).user;
}
