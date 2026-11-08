import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
export async function reportListing({listingId,reporterId,reason,details=''}) {
 if(!db) throw new Error('Firebase MON CHANTIER n’est pas configuré.');
 if(!listingId||!reporterId) throw new Error('Connectez-vous pour signaler une annonce.');
 if(!['fraud','inappropriate','spam','unsafe','other'].includes(reason)) throw new Error('Motif de signalement invalide.');
 await addDoc(collection(db,'reports'),{listingId,reporterId,reason,details:details.trim().slice(0,500),status:'open',createdAt:serverTimestamp()});
}
