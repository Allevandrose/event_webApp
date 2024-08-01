const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    Message: "Bookings were Fetched",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    Message: "Booking was created",
  });
});

router.get("/:bookingId", (req, res, next) => {
  const id = req.params.bookingId;
  res.status(200).json({
    Message: "Booking retrieved",
    id: id,
  });
});

router.post("/:bookingId", (req, res, next) => {
  const id = req.params.bookingId;
  res.status(200).json({
    message: "Booking Created",
    id: id,
  });
});

router.patch("/:bookingId", (req, res, next) => {
  const id = req.params.bookingId;
  res.status(200).json({
    message: "Booking updated",
    id: id,
  });
});

router.delete("/:bookingId", (req, res, next) => {
  const id = req.params.bookingId;
  res.status(200).json({
    message: "Booking deleted",
    id: id,
  });
});

module.exports = router;
