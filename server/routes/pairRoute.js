const express = require('express')
const { authenticate } = require('../middleware/auth')
const { createPair, getAllPairs, getPairById, updatePair, deletePair, getPairCount} = require('../controller/PairController')
const router = express.Router()

router.post("/",authenticate, createPair)
router.get("/", authenticate, getAllPairs)
router.get('/:id', authenticate, getPairById)
router.put('/:id', authenticate, updatePair)
router.delete("/:id", authenticate, deletePair)

router.get("/countpair", getPairCount)


module.exports= router