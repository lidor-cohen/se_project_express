const ClothingItem = require("../models/clothingItem");

// Get all clothing items
const getAllClothes = (req, res) => {
  ClothingItem.find({})
    .orFail()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
};

// Create a new clothing item
const createNewClothingItem = (req, res) => {
  const data = req.body;
  data.owner = "67f82cbf3ab95914b0041f9a";

  ClothingItem.create(data)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

// Delete a clothing item by id
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

module.exports = { getAllClothes, createNewClothingItem, deleteClothingItem };
