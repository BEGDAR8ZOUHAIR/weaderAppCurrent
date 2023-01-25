const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name"],
    },
    cin: {
      type: String,
      required: [true, "Please enter your cin"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phoneNumber"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);
