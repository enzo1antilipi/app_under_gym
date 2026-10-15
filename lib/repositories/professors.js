import { professors as mockProfessors } from "@/data/professors";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase/client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const COLLECTION_NAME = "profesores";

export async function getProfessors() {
  if (!isFirebaseConfigured()) return mockProfessors;

  const snapshot = await getDocs(
    query(collection(getFirebaseDb(), COLLECTION_NAME), orderBy("name")),
  );

  return snapshot.docs.map((professorDocument) => ({
    id: professorDocument.id,
    ...professorDocument.data(),
  }));
}

export async function getProfessorById(id) {
  if (!isFirebaseConfigured()) {
    return mockProfessors.find((professor) => String(professor.id) === String(id));
  }

  const snapshot = await getDoc(doc(getFirebaseDb(), COLLECTION_NAME, String(id)));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function createProfessor(professor) {
  const reference = await addDoc(collection(getFirebaseDb(), COLLECTION_NAME), {
    ...professor,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return reference.id;
}

export async function updateProfessor(id, changes) {
  await updateDoc(doc(getFirebaseDb(), COLLECTION_NAME, String(id)), {
    ...changes,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProfessor(id) {
  await deleteDoc(doc(getFirebaseDb(), COLLECTION_NAME, String(id)));
}
