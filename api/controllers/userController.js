const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.signup = [
  // Validate and sanitize fields
  body("firstname").trim().notEmpty().withMessage("First name is required"),
  body("lastname").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Process the request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return validation errors to the client
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    // Check if email already exists
    User.findOne({ email: email })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(409).json({ message: "Email already in use" });
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          // Create new user
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstname,
            lastname,
            email,
            password: hashedPassword,
          });

          user
            .save()
            .then((result) => {
              res.status(201).json({
                message: "User created successfully!",
                user: result,
              });
            })
            .catch((err) => {
              res.status(500).json({ error: err });
            });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
];

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed: User not found",
        });
      }

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        if (result) {
          // If password matches, authentication is successful
          return res.status(200).json({
            message: "Authentication successful",
          });
        } else {
          // If password doesn't match, authentication fails
          return res.status(401).json({
            message: "Authentication failed: Incorrect password",
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
