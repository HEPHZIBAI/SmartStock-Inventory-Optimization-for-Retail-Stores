const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "manager"]
  },
  storeId: String,
  storeName: String
});

module.exports = mongoose.model("User", userSchema);
