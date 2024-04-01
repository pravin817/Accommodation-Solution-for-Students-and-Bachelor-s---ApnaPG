const express = require("express");
const {
  signup,
  login,
  refreshToken,
  checkEmail,
  postUser,
  logOutUser,
  getUserDetails,
  uploadProfileImage,
  userToHost,
  userProfileDetails,
  userProfileAbout,
} = require("../controllers/authController");
const verifyJwtToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/sign-up", signup);
router.post("/log-in", login);
router.post("/logout", verifyJwtToken, logOutUser);
router.post("/get-user-details", verifyJwtToken, getUserDetails);
router.post("/post", verifyJwtToken, postUser);
router.post("/uploadImage", verifyJwtToken, uploadProfileImage);
router.post("/become-a-host", verifyJwtToken, userToHost);

router.post("/refresh-token", refreshToken);
router.post("/check-email", checkEmail);
router.post("/profile-details", verifyJwtToken, userProfileDetails);
router.post("/profile-details-about", verifyJwtToken, userProfileAbout);
module.exports = router;
