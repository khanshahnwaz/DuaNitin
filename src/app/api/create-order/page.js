// --- Razorpay Order Creation API Endpoint (Node.js/Express Example) ---
// NOTE: This code MUST be run on a secure backend server, NOT in the browser.

const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Configuration (MUST be replaced with environment variables in production)
const RAZORPAY_KEY_ID = "rzp_test_RXf2GhDbpubKA8"; // Your public key ID
const RAZORPAY_KEY_SECRET = "CzfmdvB6E9PGTdh6F34wCBgS"; // <<< YOUR SECRET KEY GOES HERE

// Initialize Razorpay instance
const instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

// Middleware
app.use(cors()); // Configure CORS for your frontend domain in production
app.use(express.json()); // To parse JSON request bodies

// --- API Endpoint: POST /api/create-order ---
app.post('/api/create-order', async (req, res) => {
    // 1. Input Validation
    const { amount, currency } = req.body;

    if (!amount || !currency) {
        return res.status(400).json({ error: "Missing amount or currency." });
    }

    // 2. Prepare Order Options
    const options = {
        amount: amount, // Amount in paise (e.g., 48910 for 489.10 INR)
        currency: currency,
        receipt: `receipt_${Date.now()}`,
        // Add metadata if needed for tracking
        // notes: { booking_time: '...' }
    };

    try {
        // 3. Create Order via Razorpay API (SECURE STEP using Secret Key)
        const order = await instance.orders.create(options);
        
        // 4. Send back essential data to the frontend
        res.status(200).json({
            order_id: order.id,
            currency: order.currency,
            amount: order.amount,
            key_id: RAZORPAY_KEY_ID,
        });

    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        res.status(500).json({ error: "Could not create Razorpay order." });
    }
});

// --- API Endpoint: POST /api/verify-payment (MANDATORY for security) ---
app.post('/api/verify-payment', (req, res) => {
    const { order_id, payment_id, signature } = req.body;
    
    // Create the signature string
    const shasum = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
    shasum.update(`${order_id}|${payment_id}`);
    const digest = shasum.digest('hex');

    // Compare generated signature with the signature received from Razorpay
    if (digest === signature) {
        // Payment is verified and secure. Fulfill the booking.
        res.json({ status: 'success', message: 'Payment verified and transaction complete.' });
    } else {
        // Payment is not verified. Reject the booking.
        res.status(400).json({ status: 'failure', message: 'Invalid signature verification.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
