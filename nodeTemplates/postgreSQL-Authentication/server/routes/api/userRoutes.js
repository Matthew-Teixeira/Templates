const router = require("express").Router();
const {
  getAllUsers,
  loginUser,
  registerUser,
  deleteUser,
} = require("../../controllers/userControllers");

router.get("/", getAllUsers)
router.post("/login", loginUser);
router.post("/register", registerUser);
router.delete("/remove/:id", deleteUser);

module.exports = router;
