import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase/client";
import { collection, getDocs, limit, query } from "firebase/firestore";

export async function getFirebaseConnectionStatus() {
  if (!isFirebaseConfigured()) {
    return {
      connected: false,
      message: "Falta configurar el archivo .env.local.",
    };
  }

  try {
    await getDocs(query(collection(getFirebaseDb(), "profesores"), limit(1)));

    return {
      connected: true,
      message: "Conexión con la base de datos activa.",
    };
  } catch (error) {
    const reason =
      error?.code === "permission-denied"
        ? "Firestore respondió, pero las reglas no permiten leer profesores."
        : "No se pudo establecer conexión con Firestore.";

    return {
      connected: false,
      message: reason,
    };
  }
}
