const Booking = require("../models/bookingModel");

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("event");
    res.status(200).json({
      message: "Bookings were fetched successfully",
      bookings: bookings,
    });
  } catch (error) {
    next(error);
  }
};

exports.createBooking = async (req, res, next) => {
  const { event, quantity } = req.body;

  const booking = new Booking({
    event: event,
    quantity: quantity,
  });

  try {
    const savedBooking = await booking.save();
    res.status(201).json({
      message: "Booking was created successfully",
      createdBooking: savedBooking,
    });
  } catch (error) {
    next(error);
  }
};

// Additional methods for fetching, updating, and deleting bookings go here
