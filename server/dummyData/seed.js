const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv");

dotenv.config();

// Define the Pet Schema
const petSchema = new mongoose.Schema({
  name: String,
  type: String, // e.g., Dog, Cat, Bird
  age: Number,
  breed: String,
  owner: {
    name: String,
    phone: String,
    email: String,
  },
});

const Pet = mongoose.model("Pet", petSchema);

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB");

    // Clear the database
    await Pet.deleteMany({});
    console.log("Existing data cleared");

    // Generate 20 fake pets
    const pets = [];
    for (let i = 0; i < 20; i++) {
      pets.push({
        name: faker.animal.dog(),
        type: faker.helpers.arrayElement(["Dog", "Cat", "Bird", "Rabbit"]),
        age: faker.number.int({ min: 1, max: 15 }),
        breed: faker.animal.dog(), // Replace for other animal breeds if needed
        owner: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          email: faker.internet.email(),
        },
      });
    }

    // Insert into MongoDB
    await Pet.insertMany(pets);
    console.log("20 pets successfully seeded into the database");

    // Close the connection
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
