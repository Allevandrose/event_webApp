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

router.patch("/", (req, res, next) => {
  res.status(200).json({
    Message: "Handling a PATCH request for Events",
  });
});

router.delete("/", (req, res, next) => {
  res.status(200).json({
    Message: "Handling a DELETE request for Events",
  });
});

module.exports = router;
