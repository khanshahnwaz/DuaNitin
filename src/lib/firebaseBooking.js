import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig"; // your firebase app instance

export const saveBookingToFirebase = async (details) => {
    // console.log("details ",details)
  const db = getFirestore(app);
  await addDoc(collection(db, "bookings"), details);
};
