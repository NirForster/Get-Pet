const mongoose = require("mongoose");
const dotenv = require("dotenv");
const seedDatabase = require("../dummyData/seed.js");
dotenv.config();

const connectDb = async (seed = false) => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB successfully!");

    if (seed) {
      await seedDatabase();
      console.log("Database seeded successfully.");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  } finally {
    // Ensures the connection is closed properly if needed.
    if (seed) {
      mongoose.connection.close();
      console.log("Database connection closed after seeding.");
    }
  }
};

module.exports = connectDb;
