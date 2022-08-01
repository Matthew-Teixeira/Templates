const router = require("express").Router();
const {
  getAllUsers,
  getOneUser,
  loginUser,
  registerUser,
  deleteUser,
} = require("../../controllers/userControllers");
const protected = require("../../middleware/authMiddleware");

router.get("/", protected, getAllUsers);
router.get("/:id", protected, getOneUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.delete("/remove/:id", protected, deleteUser);

module.exports = router;

