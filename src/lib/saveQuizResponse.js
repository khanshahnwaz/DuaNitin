import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "./firebaseConfig";

/**
 * Save quiz response to Firestore
 * @param {Object} data - The quiz response object
 * @param {string} data.name - User's name
 * @param {string} data.email - User's email
 * @param {string} [data.phone] - Optional phone number
 * @param {Object} data.answers - Key/value pairs of quiz answers
 * @returns {Promise<string>} - Document ID of the saved response
 */
export const saveQuizResponseToFirebase = async (data) => {
  try {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "quiz_responses"), {
      ...data,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Quiz response saved to Firestore:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving quiz response:", error);
    throw new Error("Failed to save quiz response");
  }
};
