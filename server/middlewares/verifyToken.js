const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = decoded; // attach decoded payload (e.g. userId) to request
      next();
    });
  } catch (error) {
    console.error(`Error verifying token: ${error}`);
    res.status(500).json({ error: "Server error verifying token" });
  }
};

module.exports = verifyToken;
