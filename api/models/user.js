const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures that each email is unique
      lowercase: true, // Converts email to lowercase
      trim: true, // Removes leading and trailing spaces
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for the password
    },
  },
  { versionKey: false }
); // Removes the __v field

module.exports = mongoose.model("User", userSchema);
