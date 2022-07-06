const express = require("express")
const Store = require("../models/store")
const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const products = await Store.listProducts(req.body)
    res.status(200).json({products})
  } catch (err) {
    next(err)
  }
})
module.exports = router
