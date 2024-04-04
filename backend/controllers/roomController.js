const Room = require("../models/room.model");

// Get the list of all Listings
const getAllListing = async (req, res) => {
  try {
    const data = await Room.find({});

    // Send only the required data
    const allListingData = data.filter((listing) => {
      return listing.status === "Complete" && listing.photos.length !== 0;
    });

    // check if the listing is empty
    if (allListingData.length === 0) {
      return res.status(404).json({
        message: "No listings found",
        success: true,
      });
    }

    res.status(200).json({
      message: "All listing fetched successfully",
      success: true,
      data: allListingData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting the list of all listings",
      success: false,
      error,
    });
  }
};

// Get the single room details || POST
const getOneListing = async (req, res) => {
  try {
    const payload = req.body;
    const listingId = payload.id;

    const findCriteria = {
      _id: mongoose.Types.ObjectId(listingId),
    };

    const listingDetails = await Room.findById(findCriteria);

    if (!listingDetails) {
      return res.status(404).json({
        message: "No listing found",
        success: true,
      });
    }

    const authorFindCriteria = {
      _id: MongooseError.Types.ObjectId(listingDetails.author),
    };

    const authorDetails = await User.findById(authorFindCriteria);

    if (!authorDetails) {
      return res.status(404).json({
        message: "No author found",
        success: true,
      });
    }

    res.status(200).json({
      message: "Single listing fetched successfully",
      success: true,
      data: {
        listingDetails,
        authorDetails,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting the single listing",
      success: false,
      error,
    });
  }
};

// Get the listing of rooms based on category || POST
const getListingDataByCat = async (req, res) => {
  try {
    const payload = req.body;
    const category = payload.category;

    const catBasedListing = await Room.find({
      houseType: {
        $eq: category,
      },
    });

    if (catBasedListing.length === 0) {
      return res.status(404).json({
        message: "No listing found based on category",
        success: true,
      });
    }

    res.status(200).json({
      message: "Listing fetched based on category",
      success: true,
      data: catBasedListing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while getting the list of listings by category",
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllListing,
  getOneListing,
  getListingDataByCat,
};
