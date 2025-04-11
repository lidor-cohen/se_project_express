const { getUsers, getUserById, createUser } = require("../controllers/users");
const router = require("express").Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);

module.exports = router;
