const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Welcome to the get-pet server api",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
