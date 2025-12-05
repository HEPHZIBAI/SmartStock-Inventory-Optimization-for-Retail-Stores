const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const Product = require("../models/Product");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    const products = await Product.find();
    const inventoryText = products
      .map(p => `${p.name} → qty: ${p.quantity}`)
      .join("\n");

    const reply = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are SmartStock Inventory Assistant." },
        { role: "user", content: `Inventory:\n${inventoryText}\n\nQuestion: ${message}` }
      ]
    });

    res.json({ reply: reply.choices[0].message.content });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
