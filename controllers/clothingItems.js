const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");

// Get all clothing items
const getAllClothes = (req, res) => {
  if (!req.user?._id)
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to access resource!" });

  return ClothingItem.find({})
    .then((result) => res.send(result))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Create a new clothing item
const createNewClothingItem = (req, res) => {
  const data = req.body;

  if (!req.user?._id)
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to create resource!" });

  data.owner = req.user._id;

  return ClothingItem.create(data)
    .then((result) => res.status(201).send(result))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "ValidationError")
        return res.status(BAD_REQUEST).send({ message: "Invalid data passed" });

      if (err.name === "CastError")
        return res
          .status(BAD_REQUEST)
          .send({ message: "ID format is invalid" });

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Delete a clothing item by id
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  if (!req.user?._id)
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to delete resource!" });

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((result) =>
      res.send({ message: "Item deleted successfully!", item: result })
    )
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "CastError")
        return res
          .status(BAD_REQUEST)
          .send({ message: "ID format is invalid" });

      if (err.name === "DocumentNotFoundError")
        return res
          .status(NOT_FOUND)
          .send({ message: `Clothing item with the id '${itemId}' not found` });

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Like an item
const likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!req.user?._id)
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to like item!" });

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((result) => res.send({ message: "Like added", item: result }))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.name === "CastError")
        return res
          .status(BAD_REQUEST)
          .send({ message: "ID format is invalid" });

      if (err.name === "DocumentNotFoundError")
        return res
          .status(NOT_FOUND)
          .send({ message: `Clothing item with the id '${itemId}' not found` });

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// Dislikes an item
const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!req.user?._id)
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized to dislike item!" });

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((result) => res.send({ message: "Like removed", item: result }))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );

      if (err.name === "CastError")
        return res
          .status(BAD_REQUEST)
          .send({ message: "ID format is invalid" });

      if (err.name === "DocumentNotFoundError")
        return res
          .status(NOT_FOUND)
          .send({ message: `Clothing item with the id '${itemId}' not found` });

      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getAllClothes,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
