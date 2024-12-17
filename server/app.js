const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

require("./config/connectDb");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Welcome to the get-pet server api",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
