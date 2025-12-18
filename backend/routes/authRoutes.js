const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * LOGIN
 * Admin → email + password
 * Manager → email + password + storeId
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password, role, storeId } = req.body;

    // find user
    const user = await User.findOne({ email: username, role });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // simple password check (no hashing for now)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // manager must match store
    if (role === "manager" && user.storeId !== storeId) {
      return res.status(401).json({ message: "Invalid Store ID" });
    }

    res.json({
      message: "Login successful",
      role: user.role,
      storeId: user.storeId || null,
      storeName: user.storeName || null
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
