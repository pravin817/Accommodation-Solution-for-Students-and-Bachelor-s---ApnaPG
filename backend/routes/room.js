const express = require("express");
const {
  getAllListing,
  getOneListing,
} = require("../controllers/roomController");

const router = express.Router();

// Common User Routes

// Get the list of all rooms || GET
router.get("/get-all-listings", getAllListing);

// Get the single room || POST
router.post("/room-details", getOneListing);

// Get the listing of rooms based on category || POST
router.post("/get-listing-by-cat", getListingDataByCat);

// Routes for the Room Owner

// Get Room details || POST

module.exports = router;
