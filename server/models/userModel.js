const mongoose = require("mongoose");

const phoneRegExp = /^(?:\\+972|0)(?:[23489]\\d{7}|5\\d{8})$/;

const validatePhoneNumber = function (phoneNumber) {
  return phoneRegExp.test(phoneNumber);
};

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "Phone Number Is Required"],
      validate: {
        validator: validatePhoneNumber,
        message: "Please fill a valid phone number.",
      },
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["adopter", "sitter"],
      default: "adopter",
    },

    profilePicture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
    },

    // Array of Pets the user has liked along with adoption status
    likedPets: [
      {
        petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],

    // Array of Sitters the user has saved (if needed)
    savedSitters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // referencing other users with role = "sitter"
      },
    ],

    // Fields specific to sitters
    sitterDetails: {
      location: {
        type: String,
        enum: ["Central District", "Southern District", "Northern District"],
      },
      availability: {
        from: { type: String, match: /^[0-2][0-9]{3}$/ }, // 4 digits, e.g., "0800"
        to: { type: String, match: /^[0-2][0-9]{3}$/ }, // 4 digits, e.g., "1800"
      },
      hourlyRate: { type: Number, min: 0 },
      ranking: { type: Number, min: 1, max: 5 }, // 1 to 5 ranking
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
