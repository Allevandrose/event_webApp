const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllBookings);
router.post("/", bookingController.createBooking);
// Add routes for fetching, updating, and deleting bookings

module.exports = router;
