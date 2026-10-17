
const mongoose = require("mongoose");

async function connectToDB() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB database");
}

module.exports = connectToDB;
