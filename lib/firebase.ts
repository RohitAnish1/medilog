
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBQMlXljQ28pxjDuwk4Ju8mLUoQCPsNGkQ",
//   authDomain: "medi-log.firebaseapp.com",
//   projectId: "medi-log",
//   storageBucket: "medi-log.firebasestorage.app",
//   messagingSenderId: "130960106906",
//   appId: "1:130960106906:web:dc44ecf0d0ce5a8af04623",
//   measurementId: "G-MCKX3TV5J9"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const fetchFlashcards = async () => {
//   const flashcardsCollection = collection(db, "FLASH-DATA"); // Use your actual collection name
//   const snapshot = await getDocs(flashcardsCollection);

//   return snapshot.docs.map((doc) => {
//     const data = doc.data();
//     console.log(data); // Logs the Firestore document data
//     return {
//       id: doc.id,
//       title: data.title || "Untitled",
//       content: data.content || "No content available",
//       category: data.category || "Uncategorized",
//       date: data.date || null
//     };
//   });
// };

// const saveFlashcard = async (title: string, content: string, category: string) => {
//   const flashcardsCollection = collection(db, "FLASH-DATA"); // Firestore collection reference
//   try {
//     const docRef = await addDoc(flashcardsCollection, {
//       title: title || "Untitled",
//       content: content || "No content available",
//       category: category || "Uncategorized",
//       date: new Date().toISOString() // Add today's date
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (error) {
//     console.error("Error adding document: ", error);
//   }
// };

// // Function to test saving a flashcard
// const testSaveFlashcard = async () => {
//   await saveFlashcard("My Title", "My Content", "My Category");
// };

// // Call testSaveFlashcard() to test the functionality
// testSaveFlashcard();

// export { db, fetchFlashcards };
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQMlXljQ28pxjDuwk4Ju8mLUoQCPsNGkQ",
  authDomain: "medi-log.firebaseapp.com",
  projectId: "medi-log",
  storageBucket: "medi-log.firebasestorage.app",
  messagingSenderId: "130960106906",
  appId: "1:130960106906:web:dc44ecf0d0ce5a8af04623",
  measurementId: "G-MCKX3TV5J9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchFlashcards = async () => {
  const flashcardsCollection = collection(db, "FLASH-DATA");
  const snapshot = await getDocs(flashcardsCollection);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    console.log(data); // Logs the Firestore document data
    return {
      id: doc.id,
      title: data.title || "Untitled",
      content: data.content || "No content available",
      category: data.category || "Uncategorized",
      date: data.date || null,
    };
  });
};

const saveFlashcard = async (title: string, content: string, category: string) => {
  const flashcardsCollection = collection(db, "FLASH-DATA");
  try {
    const docRef = await addDoc(flashcardsCollection, {
      title: title || "Untitled",
      content: content || "No content available",
      category: category || "Uncategorized",
      date: new Date().toISOString(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Do not call testSaveFlashcard() here
const testSaveFlashcard = async () => {
  console.log("Testing saveFlashcard...");
  await saveFlashcard("Test Title", "Test Content", "Test Category");
};

// Export only the needed functions
export { db, fetchFlashcards, saveFlashcard, testSaveFlashcard };
