const mongoose = require("mongoose");
// const missingDoggieImage = require("../dummyData/missing-dog.svg");

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    species: { type: String, required: true },

    breed: { type: String },

    age: { type: Number }, // age in years or months

    description: { type: String },

    adoptionCenter: {
      type: String,
      enum: [
        "Tnu LaChayot Lichyot",
        "Tza'ar Ba'alei Chayim",
        "SOS Chayot",
        "Chavat HaChofesh",
        "Chaver Al Arba",
      ],
    },

    images: {
      type: [String],
      // default: [missingDoggieImage],
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;
