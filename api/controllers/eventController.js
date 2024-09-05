const Event = require("../models/eventModel");

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      message: "Fetched all events",
      events: events,
    });
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  const { name, description, place, price } = req.body;

  // Validate required fields
  if (!name || !description || !place || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Extract image paths from the uploaded files
  const images = req.files.map(
    (file) =>
      req.protocol + "://" + req.get("host") + "/uploads/" + file.filename
  );

  const event = new Event({
    name,
    description,
    place,
    price,
    images, // Store image paths
  });

  try {
    const savedEvent = await event.save();
    res.status(201).json({
      message: "Event created successfully",
      createdEvent: savedEvent,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    next(error);
  }
};
