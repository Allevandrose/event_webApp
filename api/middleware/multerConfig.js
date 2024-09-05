const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads directory exists
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Directory to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG files are allowed"), false);
  }
};

// Initialize Multer with options
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB per image
  },
  fileFilter: fileFilter,
});

module.exports = upload;
