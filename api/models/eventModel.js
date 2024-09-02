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
  },
  { versionKey: false }
); // This removes the __v field

module.exports = mongoose.model("Event", eventSchema);
