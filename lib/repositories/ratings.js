import { ratings as mockRatings } from "@/data/ratings";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase/client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const COLLECTION_NAME = "ratings";

export async function getRatings() {
  if (!isFirebaseConfigured()) return mockRatings;

  const snapshot = await getDocs(
    query(collection(getFirebaseDb(), COLLECTION_NAME), orderBy("createdAt", "desc")),
  );

  return snapshot.docs.map((ratingDocument) => ({
    id: ratingDocument.id,
    ...ratingDocument.data(),
  }));
}

export async function createRating(rating) {
  const reference = await addDoc(collection(getFirebaseDb(), COLLECTION_NAME), {
    ...rating,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return reference.id;
}

export async function updateRatingStatus(id, status) {
  await updateDoc(doc(getFirebaseDb(), COLLECTION_NAME, String(id)), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteRating(id) {
  await deleteDoc(doc(getFirebaseDb(), COLLECTION_NAME, String(id)));
}
