const express = require("express");

const app = express();
const eventRoutes = require("./api/routes/events");
const bookingRoutes = require("./api/routes/bookings");

app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);

module.exports = app;
