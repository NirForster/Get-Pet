const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const AdoptionRequest = require("../models/adoptionRequestModel");
const Pet = require("../models/petModel");
const User = require("../models/userModel");

const seedDatabase = async () => {
  try {
    console.log("Checking and seeding database...");

    // Check and seed Users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const users = [];
      const phoneNumbers = new Set(); // To ensure uniqueness

      while (phoneNumbers.size < 50) {
        // Generate a valid phone number starting with 05 and having 10 digits
        const randomPhoneNumber = `05${Math.floor(
          10000000 + Math.random() * 90000000
        )}`; // Range: 0500000000 - 0599999999
        phoneNumbers.add(randomPhoneNumber); // Add to the set if unique
      }

      // Convert unique phone numbers to user objects
      for (const phoneNumber of phoneNumbers) {
        users.push({
          name: faker.person.fullName(),
          phoneNumber: phoneNumber,
          password: faker.internet.password(),
          role: faker.helpers.arrayElement(["adopter", "sitter"]),
          likedPets: [],
          savedSitters: [],
        });
      }

      await User.insertMany(users);
      console.log("Users collection seeded.");
    } else {
      console.log("Users collection already populated.");
    }

    // Check and seed Pets
    const petCount = await Pet.countDocuments();
    if (petCount === 0) {
      const pets = [];
      for (let i = 0; i < 50; i++) {
        pets.push({
          name: faker.person.firstName(),
          species: faker.helpers.arrayElement(["dog", "cat", "rabbit"]),
          breed: faker.word.noun(),
          age: faker.number.int({ min: 1, max: 15 }),
          description: faker.lorem.sentence(),
          adoptionCenter: faker.helpers.arrayElement([
            "Tnu LaChayot Lichyot",
            "Tza'ar Ba'alei Chayim",
            "SOS Chayot",
            "Chavat HaChofesh",
            "Chaver Al Arba",
          ]),
          images: [faker.image.url({ category: "cats" })], // Updated method
        });
      }
      await Pet.insertMany(pets);
      console.log("Pets collection seeded.");
    } else {
      console.log("Pets collection already populated.");
    }

    // Check and seed Adoption Requests
    const adoptionRequestCount = await AdoptionRequest.countDocuments();
    if (adoptionRequestCount === 0) {
      const insertedUsers = await User.find();
      const insertedPets = await Pet.find();
      const adoptionRequests = [];
      for (let i = 0; i < 50; i++) {
        adoptionRequests.push({
          adopterId: faker.helpers.arrayElement(insertedUsers)._id,
          petId: faker.helpers.arrayElement(insertedPets)._id,
          status: faker.helpers.arrayElement([
            "pending",
            "approved",
            "rejected",
          ]),
        });
      }
      await AdoptionRequest.insertMany(adoptionRequests);
      console.log("AdoptionRequests collection seeded.");
    } else {
      console.log("AdoptionRequests collection already populated.");
    }

    console.log("Database seed operation complete!");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
};

module.exports = seedDatabase;
