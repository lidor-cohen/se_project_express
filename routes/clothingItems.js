const router = require("express").Router();

const auth = require("../middlewares/auth");
const {
  getAllClothes,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateCreateItem,
  validateItemId,
} = require("../middlewares/validation");

router.get("/", getAllClothes);
router.post("/", auth, validateCreateItem, createNewClothingItem);
router.delete("/:itemId", auth, validateItemId, deleteClothingItem);

router.put("/:itemId/likes", auth, validateItemId, likeItem);
router.delete("/:itemId/likes", auth, validateItemId, dislikeItem);

module.exports = router;
