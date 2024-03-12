const express = require("express");
const {
  signup,
  login,
  refreshToken,
  checkEmail,
  postUser,
  logOutUser,
  getUserDetails,
} = require("../controllers/authController");
const verifyJwtToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/sign-up", signup);
router.post("/log-in", login);
router.post("/refresh-token", refreshToken);
router.post("/check-email", checkEmail);
router.post("/post", verifyJwtToken, postUser);
router.post("/logout", verifyJwtToken, logOutUser);
router.post("/profile-details", verifyJwtToken, getUserDetails);
module.exports = router;
