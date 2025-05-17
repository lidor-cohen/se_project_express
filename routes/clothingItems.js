const router = require("express").Router();

const auth = require("../middlewares/auth");
const {
  getAllClothes,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateCreateItem, validateId } = require("../middlewares/validation");

router.get("/", getAllClothes);
router.post("/", auth, validateCreateItem, createNewClothingItem);
router.delete("/:itemId", auth, validateId, deleteClothingItem);

router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
