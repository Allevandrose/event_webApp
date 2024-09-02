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

  const event = new Event({
    name: name,
    description: description,
    place: place,
    price: price,
  });

  try {
    const savedEvent = await event.save();
    res.status(201).json({
      message: "Event created successfully",
      createdEvent: savedEvent,
    });
  } catch (error) {
    next(error);
  }
};

// Additional methods for fetching, updating, and deleting events go here
