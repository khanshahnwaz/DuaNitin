import { saveBookingToFirebase } from "@/lib/firebaseBooking";

export async function POST(req) {
  try {
    const body = await req.json();

    // Example: Save in database (or Firebase, etc.)
    // await db.collection("bookings").insertOne(body);
  saveBookingToFirebase(body);
    console.log("Booking Confirmed:", body);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
