const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    Message: "Handling a GET request for Events",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    Message: "Handling a POST request for Events",
  });
});

router.get("/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  if (id === "special") {
    res.status(200).json({
      message: "This is a special Event",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You Got an event ID",
      id: id,
    });
  }
});

router.patch("/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  res.status(200).json({
    Message: "Event Updated Successfully!!",
    id: id,
  });
});

router.delete("/:eventId", (req, res, next) => {
  const id = req.params.eventId;
  res.status(200).json({
    Message: "Event Deleted successfully!!!",
    id: id,
  });
});

module.exports = router;
