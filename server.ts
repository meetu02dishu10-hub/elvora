import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "ELVORA Haute Gastronomie" });
});

// Privé Sommelier Concierge API
app.post("/api/concierge", async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are Vincent, the ultra-luxurious, erudite, and discreet Privé Sommelier & Concierge for ELVORA, an elite Michelin-partnered private dining concierge service in Mumbai. Respond in an elegant, composed, and knowledgeable tone (maximum 2-3 sentences). Guide the guest on courses from our 6 grand houses: Maison Ember (French), The Saffron Room (Royal Awadhi), Atelier 27 (Modern European), Noir Kitchen (Experimental Gastronomy), Verde Table (Plant-Based), and The Bombay Atelier (Coastal). Available coupon codes: WELCOME250 (₹250 off), TWO20 (20% off), PRIVE15 (15% off).

Guest query: "${message}"`
              }
            ]
          }
        ]
      });

      return res.json({ reply: response.text });
    } catch (err: any) {
      console.warn("Gemini API call failed, using graceful sommelier engine:", err.message);
    }
  }

  // Graceful rule-based sommelier knowledge engine
  const lower = (message || "").toLowerCase();
  let reply = "Understood. I have relayed your bespoke note to the Executive Chef. The kitchen is preparing with strict discretion and temperature custody.";
  let suggestedAction: any = undefined;

  if (lower.includes("date") || lower.includes("romantic")) {
    reply = "For an unforgettable evening, I propose opening with the Brittany Lobster Thermidor from Maison Ember, paired with crisp dry notes, concluding with our molten Belgian Chocolate Fondant. Shall I stage this for your table?";
    suggestedAction = { label: "Add Date Night Course", dishName: "Lobster Thermidor", price: 2100, restaurant: "Maison Ember" };
  } else if (lower.includes("veg") || lower.includes("plant")) {
    reply = "Our finest vegetarian expression tonight is the Truffle Mushroom Risotto from Noir Kitchen, paired with artisanal Paneer Khazana in golden cardamom gravy from The Saffron Room. Both are ready for immediate firing.";
    suggestedAction = { label: "Add Truffle Risotto", dishName: "Truffle Mushroom Risotto", price: 920, restaurant: "Noir Kitchen" };
  } else if (lower.includes("offer") || lower.includes("coupon") || lower.includes("voucher") || lower.includes("privilege")) {
    reply = "You hold Black Card privileges. Use voucher code WELCOME250 for a ₹250 deduction, TWO20 for 20% off pairings, or PRIVE15 for 15% off your entire banquet.";
  } else if (lower.includes("drink") || lower.includes("wine") || lower.includes("pairing") || lower.includes("cocktail")) {
    reply = "For prime cuts such as the A5 Wagyu Steak, our Signature Elvora Tonic with smoked cinchona bark and citrus oils provides exemplary clarity and contrast.";
    suggestedAction = { label: "Add Signature Tonic", dishName: "Signature Elvora Tonic", price: 390, restaurant: "Elvora Cellar" };
  } else if (lower.includes("biryani") || lower.includes("awadhi") || lower.includes("indian")) {
    reply = "The Saffron Chicken Biryani dum-cooked in sealed earthenware with genuine Kashmiri saffron is our crowning jewel from The Bombay Atelier tonight.";
    suggestedAction = { label: "Add Saffron Biryani", dishName: "Saffron Chicken Biryani", price: 780, restaurant: "The Bombay Atelier" };
  }

  return res.json({ reply, suggestedAction });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ELVORA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
