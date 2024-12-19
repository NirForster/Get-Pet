const User = require("../models/userModel");
const Pet = require("../models/petModel");
const { makeHashedPassword, generateToken } = require("../auth/auth.js");

const usersController = {
  //  Add a user (Sign up)
  addUser: async (req, res) => {
    try {
      const { name, phoneNumber, password } = req.body;
      console.log(phoneNumber);

      if (!name || !phoneNumber || !password) {
        return res
          .status(401)
          .send({ message: "Bad request. Missing fields." });
      }

      // If you want to hash the password before saving:
      const hashedPassword = await makeHashedPassword(password);
      let newUser = await User.create({
        name,
        phoneNumber,
        password: hashedPassword,
      });

      const token = await generateToken({ phoneNumber });
      console.log(token);

      // Construct the response object with only the desired fields
      const userResponse = {
        name: newUser.name,
        profilePicture: newUser.profilePicture,
        role: newUser.role,
      };

      res.status(201).json({
        message: "Sign up successful!",
        token: token,
        user: userResponse,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all sitters
  getAllSitters: async (req, res) => {
    try {
      const sitters = await User.find({ role: "sitter" });
      res.status(200).json(sitters);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate({
        path: "likedPets",
        select: "-__v -createdAt -updatedAt",
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get user by PhoneNumber
  getUserByPhoneNumber: async (req, res) => {
    try {
      const { phoneNumber } = req.params;
      console.log(phoneNumber);

      const user = await User.findOne({ phoneNumber: phoneNumber });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete user by ID
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted", user: deletedUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update user by ID
  // This will allow updating fields like name, role, password, etc.
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      );

      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateToSitter: async (req, res) => {
    try {
      const { userId } = req.params;
      const { location, availabilityFrom, availabilityTo, hourlyRate } =
        req.body;

      // Generate a random ranking between 1 and 5
      const randomRanking = Math.floor(Math.random() * 5) + 1;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          role: "sitter",
          sitterDetails: {
            location,
            availability: { from: availabilityFrom, to: availabilityTo },
            hourlyRate,
            ranking: randomRanking, // Set the generated ranking
          },
        },
        { new: true, runValidators: true } // Ensure validators are applied
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json({
        message: "User updated to sitter successfully.",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user to sitter:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  // Get the user’s liked pets
  // Assumes likedPets is an array of Pet _id references
  getLikedPets: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user and populate the likedPets field
      const user = await User.findById(id).populate({
        path: "likedPets",
        select: "-__v -createdAt -updatedAt", // Exclude unwanted fields
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user.likedPets); // Return the populated likedPets
    } catch (error) {
      console.error("Error fetching liked pets:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Get the user’s saved sitters
  // Assumes savedSitters is an array of User _id references
  // These users should have role = "sitter"
  getSavedUsers: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate("savedSitters");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user.savedSitters);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Add a pet to the user’s likedPets array
  likePet: async (req, res) => {
    try {
      const { id: userId } = req.params; // Get userId from route parameters
      const { petId } = req.body; // Get petId from request body

      // Check if the pet exists
      const pet = await Pet.findById(petId);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }

      // Update the user's likedPets
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            likedPets: {
              petId,
              status: "pending", // Default status when liking a pet
            },
          },
        },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(201).json({
        message: "Pet liked successfully",
        likedPet: { petId, status: "pending" },
        user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a sitter to the user’s savedSitters array
  saveSitters: async (req, res) => {
    try {
      const { id } = req.params; // user ID
      const { sitterId } = req.body; // sitter ID to save

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const sitter = await User.findById(sitterId);
      if (!sitter || sitter.role !== "sitter") {
        return res
          .status(404)
          .json({ message: "Sitter not found or not a sitter" });
      }

      // Check if sitter already saved
      if (user.savedSitters.includes(sitterId)) {
        return res.status(400).json({ message: "Sitter already saved" });
      }

      user.savedSitters.push(sitterId);
      await user.save();
      res.status(200).json({ message: "Sitter saved successfully", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = usersController;
