const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Pet = require("../models/petModel");
const User = require("../models/userModel");

const dogImages = [
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
  "https://images.unsplash.com/photo-1560807707-8cc77767d783",
  "https://images.unsplash.com/photo-1558788353-f76d92427f16",
  "https://images.unsplash.com/photo-1525253086316-d0c936c814f8",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006",
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
  "https://images.unsplash.com/photo-1571952877529-6d428c36afcd",
  "https://images.unsplash.com/photo-1556784344-24a26a1e925c",
  "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
  "https://images.unsplash.com/photo-1548691720-88b926e62247",
  "https://images.unsplash.com/photo-1583511655936-6c20724e37ad",
  "https://images.unsplash.com/photo-1574169208507-8437617488a7",
  "https://images.unsplash.com/photo-1527779260895-46c7cdbfea88",
  "https://images.unsplash.com/photo-1507143550189-fed454f93097",
  "https://images.unsplash.com/photo-1601758003122-3d5a1f629e38",
  "https://images.unsplash.com/photo-1537151675275-9c0514575a91",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  "https://images.unsplash.com/photo-1525252328099-7439a3e7e1fb",
  "https://images.unsplash.com/photo-1598133894005-a5b253b721c4",
  "https://images.unsplash.com/photo-1521305916504-4a1121188589",
  "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006",
  "https://images.unsplash.com/photo-1583511655936-6c20724e37ad",
];

const catImages = [
  "https://images.unsplash.com/photo-1518176258769-f227c7987df1",
  "https://images.unsplash.com/photo-1592194996306-f77661d3343c",
  "https://images.unsplash.com/photo-1592194996316-1406c7cb4dcf",
  "https://images.unsplash.com/photo-1555685812-4b743f4b8b36",
  "https://images.unsplash.com/photo-1517554558809-9b4971b38f39",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
  "https://images.unsplash.com/photo-1513853157005-4c98fbb4e399",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006",
  "https://images.unsplash.com/photo-1542178432-cc72d92120d9",
  "https://images.unsplash.com/photo-1570131945300-dc07fdd37ef9",
  "https://images.unsplash.com/photo-1535930749574-1399327ce78f",
  "https://images.unsplash.com/photo-1589571894960-20bbe2828f22",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
  "https://images.unsplash.com/photo-1509943651259-65850f28d441",
  "https://images.unsplash.com/photo-1535930749574-1399327ce78f",
  "https://images.unsplash.com/photo-1595433562696-a9b4a1d2d879",
  "https://images.unsplash.com/photo-1555685812-4b743f4b8b36",
  "https://images.unsplash.com/photo-1601758123927-5c9f8296ab9d",
  "https://images.unsplash.com/photo-1575418826865-1d8f9b1f917e",
  "https://images.unsplash.com/photo-1556784824-b5763ba141e2",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
  "https://images.unsplash.com/photo-1525252328099-7439a3e7e1fb",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
  "https://images.unsplash.com/photo-1574169208507-8437617488a7",
  "https://images.unsplash.com/photo-1589571894960-20bbe2828f22",
];

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
      phoneNumbers.forEach((phoneNumber) => {
        users.push({
          profilePicture: faker.image.avatar(),
          name: faker.person.fullName(),
          phoneNumber: phoneNumber,
          password: faker.internet.password(),
          role: faker.helpers.arrayElement(["adopter", "sitter"]),
          likedPets: [],
          savedSitters: [],
        });
      });

      await User.insertMany(users);
      console.log("Users collection seeded.");
    } else {
      console.log("Users collection already populated.");
    }

    // Clear Pets collection before seeding
    await Pet.deleteMany();
    console.log("Pets collection cleared.");

    // Seed Pets
    const pets = [];

    // Add 25 dogs
    for (let i = 0; i < 25; i++) {
      pets.push({
        name: `Dog ${i + 1}`,
        species: "dog",
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
        images: [dogImages[i]],
      });
    }

    // Add 25 cats
    for (let i = 0; i < 25; i++) {
      pets.push({
        name: `Cat ${i + 1}`,
        species: "cat",
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
        images: [catImages[i]],
      });
    }

    await Pet.insertMany(pets);
    console.log("Pets collection seeded.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

module.exports = seedDatabase;
