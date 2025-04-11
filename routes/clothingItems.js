const router = require("express").Router();

const {
  getAllClothes,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getAllClothes);
router.post("/", createNewClothingItem);
router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
