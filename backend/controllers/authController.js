require("dotenv").config();
const User = require("../models/user.model");

// Signup the user
const signup = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    if (!payload.name) {
      throw new Error("please provide the user name");
    }

    if (!payload.emailId) {
      throw new Error("please provide the email");
    }

    if (!payload.mobileNo) {
      throw new Error("please provide the mobile number");
    }

    if (!payload.birthDate) {
      throw new Error("please provide the birth date");
    }

    if (!payload.password) {
      throw new Error("please provide the password");
    }

    const userObj = {
      name: {
        firstName: payload.name.firstName,
        lastName: payload.name.lastName,
      },
      emailId: payload.emailId,
      mobileNo: payload.mobileNo,
      birthDate: payload.birthDate,
      password: payload.password,
    };

    const user = await User(userObj).save();

    if (user) {
      res.status(201).json({
        message: "User signed up successfully",
        success: true,
        user,
      });
    } else {
      throw new Error("Failed to signup the user. Please try again later.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to signup the user. Please try again later.",
      success: false,
      error,
    });
  }
};

module.exports = {
  signup,
};
