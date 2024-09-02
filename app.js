const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./config/db");

const eventRoutes = require("./api/routes/eventRoutes");
const bookingRoutes = require("./api/routes/bookingRoutes");

const app = express();

// MongoDB Connection
connectToDatabase();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS setup
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};
app.use(cors(corsOptions));

// Routes
app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);

// Error handling for 404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// General error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    Error: error.message,
  });
});

module.exports = app;
