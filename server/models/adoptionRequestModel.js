const mongoose = require("mongoose");

const AdoptionRequestSchema = new mongoose.Schema({
  adopterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdoptionRequest", AdoptionRequestSchema);
