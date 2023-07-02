const express = require("express")
const { authenticate } = require("../middleware/auth")
const { createAnimalforSale, getAllAnimalForSale, getAnimalForSale, updateAnimalForSale, deleteAnimalForSale } = require("../controller/AnimalForSaleController")
const router = express.Router()


router.post('/', authenticate, createAnimalforSale)
router.get('/', authenticate, getAllAnimalForSale)
router.get("/:id", authenticate, getAnimalForSale)
router.put("/:id", authenticate, updateAnimalForSale)
router.delete("/:id", authenticate, deleteAnimalForSale)

module.exports= router