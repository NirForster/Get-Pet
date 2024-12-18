const express = require("express");
const { login } = require("../auth/auth.js");

const {
  addUser,
  getUserById,
  getAllUsers,
  deleteUser,
  updateUser,
  getLikedPets,
  getSavedUsers,
  likePet,
  saveSitters,
} = require("../controllers/usersControllers.js");

const router = express.Router();

// add user
router.post("/register", addUser);

// add user
router.post("/login", login);

// get all users
router.get("/all", getAllUsers);

// get user by id
router.get("/:id", getUserById);

// delete user by id
router.delete("/:id", deleteUser);

// update user by id
router.put("/:id/update", updateUser);

// get the user’s liked pets
router.get("/:id/likedPets", getLikedPets);

// get the user’s saved sitters
router.get("/:id/savedSitters", getSavedUsers);

// add a pet to likedPets
router.post("/:id/likePet", likePet);

// add a sitter to savedSitters
router.post("/:id/saveSitters", saveSitters);

module.exports = router;
