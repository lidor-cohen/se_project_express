const {
  InternalServerError,
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require("../utils/errors/index");
const ClothingItem = require("../models/clothingItem");

// Get all clothing items
const getAllClothes = (req, res, next) =>
  ClothingItem.find({})
    .then((result) => res.send(result))
    .catch(() => {
      next(new InternalServerError());
    });

// Create a new clothing item
const createNewClothingItem = (req, res, next) => {
  const data = req.body;
  data.owner = req.user._id;

  return ClothingItem.create(data)
    .then((result) => res.status(201).send(result))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError")
        next(new BadRequestError("Invalid data passed."));
      else next(new InternalServerError());
    });
};

// Delete a clothing item by id
const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findOne({ _id: itemId })
    .orFail()
    .then((result) => {
      if (req.user._id !== result.owner.toString())
        return Promise.reject(new Error("User is not the owner of the item!"));

      return Promise.resolve();
    })
    .then(() => ClothingItem.findByIdAndDelete(itemId))
    .then((result) =>
      res.send({
        message: "Item deleted successfully!",
        item: result,
      })
    )
    .catch((err) => {
      if (err.name === "CastError")
        next(new BadRequestError("ID format is invalid"));
      else if (err.name === "DocumentNotFoundError")
        next(
          new NotFoundError(`Clothing item with the id '${itemId}' not found`)
        );
      else if (err.message.includes("owner"))
        next(new ForbiddenError(err.message));
      else next(new InternalServerError());
    });
};

// Like an item
const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((result) => res.send({ message: "Like added", item: result }))
    .catch((err) => {
      if (err.name === "CastError")
        next(new BadRequestError("ID format is invalid"));
      else if (err.name === "DocumentNotFoundError")
        next(
          new NotFoundError(`Clothing item with the id '${itemId}' not found`)
        );
      else next(new InternalServerError());
    });
};

// Dislikes an item
const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((result) => res.send({ message: "Like removed", item: result }))
    .catch((err) => {
      if (err.name === "CastError")
        next(new BadRequestError("ID format is invalid"));
      else if (err.name === "DocumentNotFoundError")
        next(
          new NotFoundError(`Clothing item with the id '${itemId}' not found`)
        );
      else next(new InternalServerError());
    });
};

module.exports = {
  getAllClothes,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
