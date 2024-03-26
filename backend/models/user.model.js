const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        default: "",
        required: [true, "First Name is required"],
      },
      lastName: {
        type: String,
        default: "",
        required: [true, "Last Name is required"],
      },
    },
    emailId: {
      type: String,
      default: "",
      required: [true, "Email is required"],
      unique: true,
    },
    mobileNo: {
      type: String,
      default: "",
      required: [true, "Mobile Number is required"],
      unique: true,
    },
    // birthDate: {
    //   type: String,
    //   default: "0000/00/00",
    // },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "visitors",
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
