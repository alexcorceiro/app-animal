const express = require("express")
const { createBirth, getAllBirth, getBirthById, updateBirth, deleteBirth, getTotalBabies } = require("../controller/BirthController")
const router = express.Router()

router.post("/", createBirth)
router.get("/", getAllBirth)
router.get("/:id", getBirthById)
router.get("/totalbirths", getTotalBabies)
router.put("/:id", updateBirth)
router.delete("/:id", deleteBirth)

module.exports = router