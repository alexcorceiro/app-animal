const express = require("express")
const { register, login, updateUser, getProfile, updatePassword, deleteUser } = require("../controller/usercontroller")
const { authenticate } = require("../middleware/auth")
const router = express.Router()

router.post('/register', register)
router.post("/login", login)
router.put("/update", authenticate, updateUser)
router.get("/profile", authenticate, getProfile)
router.put("/password", authenticate, updatePassword)
router.delete("/deleteuser", authenticate, deleteUser)


module.exports = router