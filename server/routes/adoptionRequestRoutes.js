const express = require("express");

const {
  addUser,
  getUserById,
  getUserById,
  deleteUser,
  updateUser,
  getLikedPets,
  getSavedUsers,
  likePet,
  saveSitters,
} = require("../controllers/usersControllers.js");

const router = express.Router();

// add user
router.post("/", addUser);

// get all users
router.get("/all", getAllUsers);

// get user by id
router.get("/:id", getUserById);

// delete user by id
router.delete("/:id", deleteUser);

// updete user by id
router.put("/:id", updateUser);

// get the user’s liked pets
router.get("/:id/likedPets", getLikedPets);

// get the user’s saved sitters
router.get("/:id/savedSitters", getSavedUsers);

// add a pet to likedPets
router.get("/:id/likePet", likePet);

// add a sitter to savedSitters
router.get("/:id/saveSitters", saveSitters);
