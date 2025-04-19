const router = require("express").Router();

const auth = require("../middlewares/auth");
const {
  getAllClothes,
  createNewClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getAllClothes);
router.post("/", auth, createNewClothingItem);
router.delete("/:itemId", auth, deleteClothingItem);

router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
