const mongoose = require("mongoose");
// const missingDoggieImage = require("../dummyData/missing-dog.svg");

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    species: { type: String, required: true },

    breed: { type: String },

    age: { type: Number }, // age in years or months

    description: { type: String },

    images: {
      type: [String],
      // default: [missingDoggieImage],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
