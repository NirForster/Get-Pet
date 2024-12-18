const express = require("express");

const {
  addPet,
  getAllPets,
  getPetById,
  deletePet,
} = require("../controllers/petsController.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

// create a pet
router.post("/", addPet);

// get all pets
router.get("/all", getAllPets);

// get a specific pet
router.get("/:id", getPetById);

// remove a pet
router.delete("/:id", verifyToken, deletePet);

module.exports = router;
