const express = require("express")
const { authenticate } = require("../middleware/auth")
const { createStock, updateStock, getStockById, getAllStock, deleteStock, getUserStock } = require("../controller/stockController")
const router = express.Router()


router.post("/", authenticate, createStock)
router.put("/:id", authenticate, updateStock)
router.get("/:id", authenticate, getStockById)
router.get("/", authenticate, getAllStock)
router.get("/user/total", authenticate, getUserStock)
router.delete("/:id", authenticate, deleteStock)



module.exports= router