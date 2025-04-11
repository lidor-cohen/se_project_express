const {
  getAllClothes,
  createNewClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");
const router = require("express").Router();

router.get("/", getAllClothes);
router.post("/", createNewClothingItem);
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
