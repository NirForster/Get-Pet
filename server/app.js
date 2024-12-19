const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");

dotenv.config();

const connectDb = require("./config/connectDb");

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Welcome to the get-pet server api",
  });
});

app.use("/users", userRoutes);
app.use("/pets", petRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
