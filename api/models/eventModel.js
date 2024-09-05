const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    place: {
      type: String,
      required: [true, "Event place is required"],
    },
    price: {
      type: Number,
      required: [true, "Event price is required"],
    },
    images: {
      type: [String], // Array of image paths
      validate: [arrayLimit, "You can upload a maximum of 5 images"],
    },
  },
  { versionKey: false } // Disabling `__v` field
);

// Validator function to limit the number of images to 5
function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model("Event", eventSchema);
