const cities = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Delhi",
  "Kolkata",
  "Pune",
  "Coimbatore",
  "Madurai",
  "Trichy"
];

const mongoose = require("mongoose");
const Sale = require("../models/Sale");

mongoose.connect("mongodb://localhost:27017/smartstock");

async function updateCities() {
  const sales = await Sale.find();

  for (let i = 0; i < sales.length; i++) {
    sales[i].city = cities[i % cities.length];
    sales[i].storeId = "S00" + ((i % 5) + 1); // S001 – S005
    await sales[i].save();
  }

  console.log("✅ City & Store data updated safely");
  mongoose.disconnect();
}

updateCities();
