const express = require("express");
const verifyJwtToken = require("../middlewares/authMiddleware");
const {
  newReservation,
  getAuthorReservations,
  getAllReservations,
  getStripePublishableKey,
  createPaymentIntent,
} = require("../controllers/reservationController");

const router = express.Router();

// Configure the stripe payment gateway key
router.get("/config-stripe", getStripePublishableKey);

// Booking of the room
router.post("/book-room", verifyJwtToken, newReservation);

// Get author reservations
router.get("/get-author-reservations", verifyJwtToken, getAuthorReservations);

// Get all reservations
router.get("/get-all-reservations", verifyJwtToken, getAllReservations);

// Create the payment Intent
router.get("/create-payment-intent", verifyJwtToken, createPaymentIntent);

module.exports = router;
