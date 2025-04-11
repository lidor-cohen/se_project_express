const {
  getAllClothes,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const router = require("express").Router();

router.get("/", getAllClothes);
router.post("/", createNewClothingItem);
router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
