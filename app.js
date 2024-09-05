const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./config/db");
const helmet = require("helmet"); // Security middleware

const eventRoutes = require("./api/routes/eventRoutes");
const bookingRoutes = require("./api/routes/bookingRoutes");
const userRoute = require("./api/routes/userRoute");

const app = express();

// MongoDB Connection
connectToDatabase();

// Middleware
app.use(helmet()); // Apply security headers using helmet
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS setup
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true, // Allow credentials (if needed)
  maxAge: 3600, // Add this to specify the maximum age of the CORS configuration
};
app.use(cors(corsOptions));

// Serve static files from uploads folder with CORS enabled
app.use(
  "/uploads",
  cors(corsOptions),
  express.static("uploads", {
    setHeaders: (res, path) => {
      res.setHeader("Access-Control-Allow-Origin", corsOptions.origin);
    },
  })
);

// Routes
app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);
app.use("/user", userRoute); // Add the user route

// 404 Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// General error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    error: {},
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
