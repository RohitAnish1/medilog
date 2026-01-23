import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const fetchUserFlashcards = async (userId: string) => {
  const flashcardsCollection = collection(db, `users/${userId}/flashcards`)
  const snapshot = await getDocs(flashcardsCollection)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      title: data.title || "Untitled",
      content: data.content || "No content available",
      category: data.category || "Uncategorized",
      date: data.date || null,
    }
  })
}

export const saveUserFlashcard = async (
  userId: string,
  title: string,
  content: string,
  category: string
) => {
  const flashcardsCollection = collection(db, `users/${userId}/flashcards`)
  try {
    await addDoc(flashcardsCollection, {
      title: title || "Untitled",
      content: content || "No content available",
      category: category || "Uncategorized",
      date: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}



// Export only the needed functions
export { db, auth, googleProvider};
