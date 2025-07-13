// ============================================================================
// FIREBASE CONFIGURATION - Database & Cloud Storage Setup
// ============================================================================
// This file contains Firebase configuration and utility functions for MediLog
// Currently commented out but ready for production use with Firestore database
// Handles flashcard storage, retrieval, and other data operations

// Firebase SDK imports for app initialization and Firestore database
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// ============================================================================
// FIREBASE PROJECT CONFIGURATION - Connection Settings
// ============================================================================
// Configuration object containing all Firebase project credentials
// These settings connect the app to the specific Firebase project
// const firebaseConfig = {
//   apiKey: "AIzaSyBQMlXljQ28pxjDuwk4Ju8mLUoQCPsNGkQ",           // API key for authentication
//   authDomain: "medi-log.firebaseapp.com",                      // Authentication domain
//   projectId: "medi-log",                                       // Unique project identifier
//   storageBucket: "medi-log.firebasestorage.app",              // Cloud storage bucket
//   messagingSenderId: "130960106906",                          // FCM sender ID for notifications
//   appId: "1:130960106906:web:dc44ecf0d0ce5a8af04623",         // App identifier
//   measurementId: "G-MCKX3TV5J9"                               // Google Analytics measurement ID
// };

// ============================================================================
// FIREBASE INITIALIZATION - App and Database Setup
// ============================================================================
// Initialize Firebase app with configuration and get Firestore database instance
// const app = initializeApp(firebaseConfig);                    // Initialize Firebase app
// const db = getFirestore(app);                                 // Get Firestore database reference

// ============================================================================
// FLASHCARD RETRIEVAL FUNCTION - Fetch All Flashcards from Database
// ============================================================================
// Retrieves all flashcard data from the Firestore "FLASH-DATA" collection
// Returns formatted array of flashcard objects with consistent structure
// const fetchFlashcards = async () => {
//   const flashcardsCollection = collection(db, "FLASH-DATA");   // Reference to flashcards collection
//   const snapshot = await getDocs(flashcardsCollection);       // Get all documents in collection

//   // Transform Firestore documents into structured flashcard objects
//   return snapshot.docs.map((doc) => {
//     const data = doc.data();                                   // Extract document data
//     console.log(data);                                         // Log data for debugging
//     return {
//       id: doc.id,                                              // Document ID from Firestore
//       title: data.title || "Untitled",                        // Flashcard title with fallback
//       content: data.content || "No content available",        // Flashcard content with fallback
//       category: data.category || "Uncategorized",             // Category classification
//       date: data.date || null                                 // Creation/modification date
//     };
//   });
// };

// ============================================================================
// FLASHCARD SAVE FUNCTION - Add New Flashcard to Database
// ============================================================================
// Saves a new flashcard to Firestore with title, content, and category
// Automatically adds timestamp and handles error cases gracefully
// const saveFlashcard = async (title: string, content: string, category: string) => {
//   const flashcardsCollection = collection(db, "FLASH-DATA");  // Firestore collection reference
//   try {
//     // Add new document to collection with provided data plus timestamp
//     const docRef = await addDoc(flashcardsCollection, {
//       title: title || "Untitled",                             // Ensure title is never empty
//       content: content || "No content available",             // Ensure content is never empty
//       category: category || "Uncategorized",                  // Ensure category is always set
//       date: new Date().toISOString()                          // Add current timestamp in ISO format
//     });
//     console.log("Document written with ID: ", docRef.id);     // Log success with document ID
//   } catch (error) {
//     console.error("Error adding document: ", error);          // Log any errors that occur
//   }
// };

// ============================================================================
// TEST FUNCTION - Development/Testing Utility
// ============================================================================
// Function to test saving a flashcard with sample data
// Useful for development and testing Firebase connectivity
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
    await addDoc(flashcardsCollection, {
      title: title || "Untitled",
      content: content || "No content available",
      category: category || "Uncategorized",
      date: new Date().toISOString(),
    });
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
