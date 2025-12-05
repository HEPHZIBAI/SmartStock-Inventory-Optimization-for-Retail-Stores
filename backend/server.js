require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MONGO CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error:", err));

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/chatbot", chatbotRoutes);

// HEALTH CHECK
app.get("/", (req, res) => res.send("SmartStock Backend Running"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);



