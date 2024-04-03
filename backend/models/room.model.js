const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    author: {
      type: String,
    },
    status: {
      type: String,
      default: "In Progress",
    },
    houseType: {
      type: String,
    },
    privacyType: {
      type: String,
    },
    location: {
      addressLineOne: {
        type: String,
      },
      addressLineTwo: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },

    floorPlan: {
      guests: {
        type: Number,
      },
      bedrooms: {
        type: Number,
      },
      beds: {
        type: Number,
      },
      bathRoomsNumber: {
        type: Number,
      },
    },

    amenities: {
      type: Array,
    },

    photos: {
      type: Array,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    highlight: {
      type: String,
    },
    visiblity: {
      type: String,
    },
    guestType: {
      type: String,
    },
    basePrice: {
      type: Number,
    },
    priceAfterTaxes: {
      type: Number,
    },
    authorEarnedPrice: {
      type: Number,
    },
    security: {
      type: Array,
    },
    ratings: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
