const router = require("express").Router();
const {getUsers, registerUser, loginUser}  = require("../../controllers/userController");
const protected = require("../../middleware/authMiddleware")

router.get("/", protected, getUsers);
router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router;