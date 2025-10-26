import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "@/lib/firebaseConfig"; // adjust path if needed

export async function POST(req) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body?.email || !body?.name) {
      return new Response(
        JSON.stringify({ message: "Missing fields" }),
        { status: 400 }
      );
    }

    const db = getFirestore(app);

    // Save to Firestore in "leads" collection
    const docRef = await addDoc(collection(db, "leads"), {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      answers: body.answers || {},
      receivedAt: serverTimestamp(),
    });

    console.log("[✅ Lead saved in Firestore]", {
      id: docRef.id,
      name: body.name,
      email: body.email,
    });

    return new Response(
      JSON.stringify({ ok: true, message: "Lead received", id: docRef.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error saving lead:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
