const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker"); // For faker@5.x. If using @faker-js/faker, import accordingly.
const Pet = require("../models/petModel.js");
const dotenv = require("dotenv");
const { options } = require("../routes/userRoutes.js");

dotenv.config();

// Arrays of possible values
const speciesList = ["cat", "dog", "bird", "rabbit", "hamster"];
const adoptionCenters = [
  "Tnu LaChayot Lichyot",
  "Tza'ar Ba'alei Chayim",
  "SOS Chayot",
  "Chavat HaChofesh",
  "Chaver Al Arba",
];

// Breed arrays per species
const catBreeds = [
  "Tabby",
  "Siamese",
  "Persian",
  "Maine Coon",
  "British Shorthair",
  "Ragdoll",
  "Bengal",
  "Sphynx",
  "Scottish Fold",
];
const dogBreeds = [
  "Labrador",
  "German Shepherd",
  "Golden Retriever",
  "Bulldog",
  "Poodle",
  "Beagle",
  "French Bulldog",
  "Husky",
  "Boxer",
];
const birdBreeds = [
  "Parrot",
  "Budgerigar",
  "Cockatiel",
  "Canary",
  "Finch",
  "African Grey",
  "Lovebird",
  "Macaw",
  "Cockatoo",
];
const rabbitBreeds = [
  "Netherland Dwarf",
  "Holland Lop",
  "Mini Lop",
  "Lionhead",
  "Flemish Giant",
  "Rex",
  "Angora",
  "Chinchilla",
  "Polish",
];
const hamsterBreeds = [
  "Syrian",
  "Dwarf Campbell",
  "Dwarf Winter White",
  "Chinese",
  "Roborovski",
  "Russian Dwarf",
  "Teddy Bear",
  "Golden",
  "Black Bear",
];

// Helper function to pick a random element from an array
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate a LoremFlickr URL
const urlLoremFlickr = ({
  width = 250,
  height = 350,
  category = "animals",
}) => {
  const baseUrl = "https://loremflickr.com";
  return `${baseUrl}/${width}/${height}/${category}`;
};

const generatePetData = (species) => {
  let breedOptions;
  let category;

  // Match species to breeds and image category
  switch (species) {
    case "cat":
      breedOptions = catBreeds;
      category = "cat";
      break;
    case "dog":
      breedOptions = dogBreeds;
      category = "dog";
      break;
    case "bird":
      breedOptions = birdBreeds;
      category = "bird";
      break;
    case "rabbit":
      breedOptions = rabbitBreeds;
      category = "rabbit";
      break;
    case "hamster":
      breedOptions = hamsterBreeds;
      category = "hamster";
      break;
    default:
      breedOptions = [];
      category = "animals"; // Fallback category
  }

  return {
    name: faker.animal.petName(), // Generates a pet name
    species,
    breed: randomElement(breedOptions),
    age: Math.floor(Math.random() * 15) + 1, // Age between 1 and 15
    description: faker.lorem.sentence(),
    adoptionCenter: randomElement(adoptionCenters),
    images: [urlLoremFlickr({ category })], // Generates a species-specific image URL
  };
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to MongoDB");

    // Clear existing pets
    await Pet.deleteMany({});
    console.log("Cleared existing pets");

    const petsToInsert = [];

    // For each species, insert 50 pets
    for (const species of speciesList) {
      for (let i = 0; i < 50; i++) {
        const petData = generatePetData(species);
        petsToInsert.push(petData);
      }
    }

    await Pet.insertMany(petsToInsert);
    console.log(
      `Inserted ${speciesList.length * 50} pets (${speciesList.join(", ")})`
    );

    mongoose.connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
