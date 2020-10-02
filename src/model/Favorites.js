const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    productId: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;
