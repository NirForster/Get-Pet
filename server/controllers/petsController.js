const Pet = require("../models/petModel");

const petsController = {
  // Add a new pet
  addPet: async (req, res) => {
    try {
      const { name, species, breed, age, description, adoptionCenter, images } =
        req.body;

      // Validate required fields
      if (!name || !species) {
        return res
          .status(400)
          .json({ message: "Name and species are required." });
      }

      // Create a new Pet instance
      const newPet = new Pet({
        name,
        species,
        breed,
        age,
        description,
        adoptionCenter,
        images,
      });

      // Save the pet to the database
      const savedPet = await newPet.save();

      // Return the saved pet data
      res.status(201).json(savedPet);
    } catch (error) {
      console.error("Error adding pet:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  // Get all pets
  getAllPets: async (req, res) => {
    try {
      // Extract page and limit from query parameters, with default values
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 1;
      const skip = (page - 1) * limit;

      // Fetch the total count of documents
      const totalPets = await Pet.countDocuments();

      // Retrieve the pets with pagination

      const pets = await Pet.find().skip(skip).limit(limit).exec();

      // Calculate total pages
      const totalPages = Math.ceil(totalPets / limit);

      // Add position (index) to each pet document
      const petsWithIndex = pets.map((pet, index) => ({
        ...pet.toObject(), // Convert Mongoose document to plain object
        position: skip + index + 1, // Calculate the position
      }));

      // Respond with paginated data and metadata
      res.status(200).json({
        data: petsWithIndex,
        meta: {
          totalPets,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      });
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get a pet by ID
  getPetById: async (req, res) => {
    try {
      const { id } = req.params;
      const pet = await Pet.findById(id);

      if (!pet) {
        return res.status(404).json({ message: "Pet not found." });
      }

      res.status(200).json(pet);
    } catch (error) {
      console.error("Error fetching pet by ID:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  // Delete a pet by ID
  deletePet: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPet = await Pet.findByIdAndDelete(id);

      if (!deletedPet) {
        return res.status(404).json({ message: "Pet not found." });
      }

      res.status(200).json({ message: "Pet deleted successfully." });
    } catch (error) {
      console.error("Error deleting pet:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};

module.exports = petsController;
