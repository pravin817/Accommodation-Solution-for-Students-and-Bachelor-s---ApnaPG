const express = require("express");
const { signup, login, refreshToken, checkEmail } = require("../controllers/authController");
const router = express.Router();

router.post("/sign-up",signup);
router.post("/log-in",login);
router.post("/refresh-token",refreshToken);
router.post("/check-email",checkEmail)

module.exports = router;
