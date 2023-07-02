const express  = require("express")
const { authenticate } = require("../middleware/auth")
const { createEvent, getAllEvent, getEvent, updateEvent, deleteEvent } = require("../controller/EventController")
const router = express.Router()

router.post("/", authenticate, createEvent)
router.get("/", authenticate, getAllEvent)
router.get("/:id", authenticate, getEvent)
router.put("/:id", authenticate, updateEvent)
router.delete("/:id", authenticate, deleteEvent)

module.exports= router