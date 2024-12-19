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
  getUserByPhoneNumber,
  updateToSitter,
  getAllSitters,
} = require("../controllers/usersControllers.js");

const router = express.Router();

// Authentication routes
router.post("/register", addUser);
router.post("/login", login);

// User retrieval routes
router.get("/all", getAllUsers);
router.get("/sitters", getAllSitters);
router.get("/:id", getUserById);
router.get("/phone/:phoneNumber", getUserByPhoneNumber);

// User update routes
router.put("/:id/update", updateUser);
router.put("/:id/role/sitter", updateToSitter);

// User deletion route
router.delete("/:id", deleteUser);

// User-specific data retrieval routes
router.get("/:id/likedPets", getLikedPets);
router.get("/:id/savedSitters", getSavedUsers);

// User-specific data modification routes
router.post("/:id/likePet", likePet);
router.post("/:id/saveSitters", saveSitters);

module.exports = router;
