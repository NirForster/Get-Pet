const mongoose = require("mongoose");
const dotenv = require("dotenv");
const seedDatabase = require("../dummyData/seed.js");
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully!");

    // Call seedDatabase
    await seedDatabase();

    mongoose.connection.close(); // Close the connection after seeding
    console.log("Database connection closed.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    mongoose.connection.close();
  }
};

connectDb();
