const express = require("express")
const router = express.Router()
const { getAllAnimals, getAnimal, updateAnimal, deleteAnimal, createAnimal } = require("../controller/AnimalController")
const { authenticate } = require("../middleware/auth")
const upload = require("../utils/imageStorage")


router.post("/", authenticate,upload.single('image'),createAnimal)
router.get("/", authenticate,  getAllAnimals)
router.get("/:id",authenticate,  getAnimal)
router.put("/:id", authenticate, upload.single('image'),  updateAnimal)
router.delete("/:id", authenticate,  deleteAnimal)

module.exports= router