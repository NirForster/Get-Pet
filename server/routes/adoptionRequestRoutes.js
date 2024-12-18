const express = require("express");

const {
  createAdoptionRequest,
  getAllRequests,
  getRequestById,
  updateStatus,
  deleteRequest,
} = require("../controllers/adoptionRequestsController.js");

const router = express.Router();

// create a request
router.post("/", createAdoptionRequest);

// get all requests
router.get("/all", getAllRequests);

// get a single request
router.get("/:id", getRequestById);

// update status (approve or reject)
router.put("/:id", updateStatus);

// Delete (Cancel) Request
router.delete("/:id", deleteRequest);

module.exports = router;
