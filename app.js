const express = require("express");
const morgan = require("morgan");

const app = express();
const eventRoutes = require("./api/routes/events");
const bookingRoutes = require("./api/routes/bookings");

app.use(morgan("dev"));

app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    Error: error.message,
  });
});

module.exports = app;
