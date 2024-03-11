const express = require("express");
const { signup } = require("../controllers/authController");
const router = express.Router();

router.post("/sign-up",signup);

module.exports = router;
