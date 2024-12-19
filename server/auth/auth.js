const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

dotenv.config();

const { BCRYPT_SECRET_KEY, SALT_NUM, JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res
        .status(400)
        .send({ message: "Missing phoneNumber or password" });
    }

    const user = await userModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = await generateToken({ userId: user._id, role: user.role });

    return res.status(200).send({ token, user });
  } catch (error) {
    console.error(`Error during login: ${error}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

// Hash a password with the secret key and salt
const makeHashedPassword = async (password) => {
  try {
    const combinedKey = password + BCRYPT_SECRET_KEY;
    const hashedPassword = await bcrypt.hash(combinedKey, Number(SALT_NUM));
    return hashedPassword;
  } catch (error) {
    console.error(`Error hashing password: ${error}`);
    throw new Error("Could not hash password");
  }
};

// Compare a plain password with a hashed password stored in DB
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const combinedKey = plainPassword + BCRYPT_SECRET_KEY;
    const isMatch = await bcrypt.compare(combinedKey, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error(`Error comparing password: ${error}`);
    throw new Error("Password comparison failed");
  }
};

// Generate a JWT token for a user
const generateToken = (payload) => {
  // payload typically includes user ID, role, etc.
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" }); // token valid for 7 days
};

module.exports = {
  makeHashedPassword,
  comparePassword,
  generateToken,
  login,
};
