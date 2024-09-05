const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const upload = require("../middleware/multerConfig"); // Path to your Multer configuration

// Upload a maximum of 5 images
router.post("/", upload.array("images", 5), eventController.createEvent);

router.get("/", eventController.getAllEvents);
// Add routes for fetching, updating, and deleting events

module.exports = router;
