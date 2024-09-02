const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event", // Reference to the Event model
      required: [true, "Event reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Booking quantity is required"],
      min: [1, "Quantity must be at least 1"], // Minimum quantity
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
); // This removes the __v field

module.exports = mongoose.model("Booking", bookingSchema);
