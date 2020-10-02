const express = require("express");
const router = express.Router();
const Favorite = require("../model/Favorites");
const auth = require("../middleware/auth");

//Read user favorites
router.get("/favorites/readUserFavorites/", auth, async (req, res) => {
  try {
    const favorite = await Favorite.find({ owner: req.user._id });
    //console.log(favorite);

    if (!favorite) {
      return res.status(204).send({ message: "No user Favorites !" });
    }
    res.status(200).send(favorite);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Update favorites (toggle) by authenticated user
router.patch("/favorites/toggleFavorites/:id", auth, async (req, res) => {
  //   const updates = Object.keys(req.body);
  //   const allowUpdates = ["productId"];
  //   const isValid = updates.every((update) => allowUpdates.includes(update));

  //   if (!isValid) {
  //     return res.status(400).send({ error: "No such property to update" });
  //   }

  try {
    const favoriteIndex = await Favorite.findOne({
      productId: req.params.id,
      user: req.user._id,
    });
    console.log("index");
    console.log(favoriteIndex);

    if (favoriteIndex != null) {
      const favorite = await Favorite.findOneAndDelete({
        productId: req.params.id,
        user: req.user._id,
      });
      res.status(200).send({ favorite: favorite, isFavorite: "false" });
      console.log("deleted");
    } else {
      const favorite = new Favorite({
        productId: req.params.id,
        user: req.user._id,
      });
      await favorite.save();
      console.log("added");
      res.status(200).send({ favorite: favorite, isFavorite: "true" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
