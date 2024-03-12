require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user.model");

const saltRounds = 10;

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

    // Hashed the password before storing to the database
    const hashedPasword = await bcrypt.hash(payload.password, saltRounds);

    const userObj = {
      name: {
        firstName: payload.name.firstName,
        lastName: payload.name.lastName,
      },
      emailId: payload.emailId,
      mobileNo: payload.mobileNo,
      birthDate: payload.birthDate,
      password: hashedPasword,
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

// login user
const login = async (req, res) => {
  const payload = req.body;
  // console.log("login : ", payload);

  // get the username(emailId) and password
  const { emailId, password } = payload;

  // define the finding criteria
  const findCriteria = {
    emailId,
  };

  // get the userDetails
  const userDetails = await User.find(findCriteria).limit(1).exec();

  try {
    const isMatched = await bcrypt.compare(password, userDetails[0].password);

    if (isMatched) {
      // generate the access token
      const accessToken = jwt.sign(
        {
          _id: userDetails[0]._id,
          role: userDetails[0].role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // generate the refresh token
      const refreshToken = jwt.sign(
        {
          _id: userDetails[0]._id,
          role: userDetails[0].role,
        },
        process.env.REFRESH_TOKEN_SECRET
      );

      // update the user with the accessToken and refreshToken
      const updatedUser = await User.findOneAndUpdate(findCriteria, {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      res.status(200).json({
        message: "User logged in successfully",
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: updatedUser,
      });
    } else if (!isMatched) {
      res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    } else {
      res.send("Not Allowed!!!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to login the user. Please try again later.",
      success: false,
      error,
    });
  }
};

// generate the refresh token
const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  // console.log(refreshToken);

  if (!refreshToken) {
    res.status(404).json({
      message: "Please log In",
      success: false,
    });
  } else {
    // verify the refreshtoken
    try {
      let decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      console.log(decoded);

      // Get the userId
      const userId = decoded._id;

      const findCriteria = {
        _id: new mongoose.Types.ObjectId(userId),
      };

      const userDetails = await User.findById(findCriteria);
      // console.log(userDetails.refreshToken, userDetails, "LINE 161");
      if (userDetails.refreshToken !== refreshToken) {
        return res.sendStatus(403);
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error) {
            return res.sendStatus(401);
          }

          const accessToken = jwt.sign(
            {
              _id: userDetails._id,
              role: userDetails.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1hr" }
          );
          console.log(accessToken, "AccessToken");
          res.json({ accessToken: accessToken });
        }
      );
    } catch (error) {
      res.status(401).json({
        message: "Invalid refresh token",
        success: false,
        error,
      });
    }
  }
};

// check email is already registered or not
const checkEmail = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    const findCriteria = {
      emailId: payload.email,
    };

    const isEmailExist = await User.find(findCriteria);

    // console.log(isEmailExist);
    // console.log(typeof isEmailExist);

    if (isEmailExist.length !== 0) {
      res.status(200).json({
        message: "user Exist",
        success: true,
      });
    } else {
      res.status(200).json({
        message: "User Email not exist",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while searching for the user",
      success: false,
      error,
    });
  }
};

module.exports = {
  signup,
  login,
  refreshToken,
  checkEmail,
};
