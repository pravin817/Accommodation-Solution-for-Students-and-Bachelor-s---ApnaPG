require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Room = require("../models/room.model");

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

    // if (!payload.birthDate) {
    //   throw new Error("please provide the birth date");
    // }

    // Hashed the password before storing to the database
    const hashedPasword = await bcrypt.hash(payload.password, saltRounds);

    const userObj = {
      name: {
        firstName: payload.name.firstName,
        lastName: payload.name.lastName,
      },
      emailId: payload.emailId,
      mobileNo: payload.mobileNo,
      // birthDate: payload.birthDate,
      password: hashedPasword,
    };

    const user = await User(userObj).save();

    if (user) {
      res.status(201).json({
        message: "User created successfully",
        success: 1,
        user,
      });
    } else {
      throw new Error("Failed to signup the user. Please try again later.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to signup the user. Please try again later.",
      success: 0,
      error,
    });
  }
};

// login user
const login = async (req, res) => {
  const payload = req.body;
  const email = payload.email;
  const password = payload.password;

  console.log("login : ", payload);

  // define the finding criteria
  const findCriteria = {
    emailId: email,
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

      // Hide the password from the user details
      updatedUser.password = undefined;
      res.status(200).json({
        message: "User logged in successfully",
        success: 1,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user_details: updatedUser,
      });
    } else if (!isMatched) {
      res.status(401).json({
        message: "Invalid credentials",
        success: 0,
      });
    } else {
      res.send("Not Allowed!!!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to login the user. Please try again later.",
      success: 0,
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
      success: 0,
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
        success: 0,
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

// post route
const postUser = async (req, res) => {
  res.send(req.user);
};

// Logout the user
const logOutUser = async (req, res) => {
  const userId = req.user;
  console.log(userId);
  try {
    const userDetails = await User.updateOne(
      {
        _id: userId,
      },
      {
        $unset: {
          accessToken: "",
          refreshToken: "",
        },
      }
    );
    res.send("User logout successfully");
  } catch (error) {
    console.log("User logout Error :-> ", error);
    res.status(500).json({
      message: "Failed to logout the user. Please try again later.",
      success: false,
      error,
    });
  }
};

// Get the user Details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user;
    const findCriteria = {
      _id: new mongoose.Types.ObjectId(userId),
    };

    const userDetails = await User.findById(findCriteria);

    // return the list of the rooms that are hosted by the user (Room Owner)
    const roomsData = await Room.find({
      author: userId,
    });

    res.status(200).json({
      message: "User details found successfully",
      success: true,
      user_details: userDetails,
      room_data: roomsData,
    });
  } catch (error) {
    console.log("Error while getting the user details :-> ", error);
  }
};

// Upload the user profile Image
const uploadProfileImage = async (req, res) => {
  try {
    console.log(req.body);
    const profileImg = req.body.profileImg;
    const userId = req.user;

    if (!profileImg) {
      return res.status(400).send({
        message: "Please provide the profile image",
        success: false,
      });
    }

    // define the finding criteria
    const findCriteria = { _id: new mongoose.Types.ObjectId(userId) };

    let userDetails = await User.findOneAndUpdate(
      findCriteria,
      {
        profileImg: profileImg,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      message: "User profile Image updated successfully",
      success: true,
      profileImg: userDetails.profileImg,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating the user profile Image",
      success: false,
      error,
    });
  }
};

// Update the user profile Inorder to become the host
const userToHost = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user;
    const role = req.body.role;

    if (!role) {
      return res.status(400).send({
        message: "Please provide the role",
        success: false,
      });
    }
    const findCriteria = {
      _id: new mongoose.Types.ObjectId(userId),
    };

    const updatedUserDetails = await User.findOneAndUpdate(
      findCriteria,
      { role: role },
      { new: true }
    );

    const id = {
      author: updatedUserDetails._id,
    };

    const updateNewRoomAuthor = await Room(id).save();

    res.status(200).send({
      message: "User role updated successfully",
      success: true,
      room: updateNewRoomAuthor,
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating the user role",
      success: false,
      error,
    });
  }
};

// Update the user profile details
const userProfileDetails = async (req, res) => {
  const userId = req.user;
  const payload = req.body;

  const {
    valueName: [profileDetailsName],
    value: [profileDetailsValue],
    fieldName,
  } = payload;

  const findCriteria = {
    _id: new mongoose.Types.ObjectId(userId),
  };

  try {
    const userDetails = await User.findById(findCriteria).limit(1);

    const userProfile = userDetails.profileDetails.profile;

    if (typeof userProfile === "object") {
      // If the field name is present in the user profile details
      if (fieldName in userProfile) {
        // Update the value of the required field
        userProfile[fieldName].name = profileDetailsName;
        userProfile[fieldName].value = profileDetailsValue;

        // save the updated user profile details
        await userDetails.save();
      } else {
        console.log("Field not found");
      }
    } else {
      console.log("User profile is not object type");
    }

    res.status(200).json({
      message: "User profile details updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error while updating the user profile details :-> ", error);
    res.status(500).json({
      message: "Error while updating the user profile details",
      success: false,
      error,
    });
  }
};

// Update the user profile details about
const userProfileAbout = async (req, res) => {
  try {
    const userId = req.user;
    const payload = req.body;

    const { profileDetailsAbout, fieldName } = payload;

    const findCriteria = {
      _id: new mongoose.Types.ObjectId(userId),
    };

    // find the user
    const userDetails = await User.findById(findCriteria).limit(1);

    // extract the user profile details
    const userProfile = userDetails?.profileDetails;

    if (typeof userProfile === "object") {
      // If the field name is present in the user profile details
      if (fieldName in userProfile) {
        // Update the value of the required field
        userProfile[fieldName] = profileDetailsAbout;
        // save the updated user profile details
        await userDetails.save();

        console.log("User profile details updated successfully");
      } else {
        console.log("Field not found");
      }
    } else {
      console.log("User profile is not object type");
    }

    res.status(200).json({
      message: "User profile details updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(
      "Error while updating the user profile details about:-> ",
      error
    );
    res.status(500).send({
      message: "Error while updating the user profile details about",
      success: false,
      error,
    });
  }
};

module.exports = {
  signup,
  login,
  logOutUser,
  refreshToken,
  checkEmail,
  postUser,
  getUserDetails,
  uploadProfileImage,
  userToHost,
  userProfileDetails,
  userProfileAbout,
};
