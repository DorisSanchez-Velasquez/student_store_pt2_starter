const express = require("express")
const Order = require("../models/order")
const security = require("../middleware/security")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
   //should call listOrdersFromUser method
   const {user} = res.locals
   const orders = await Order.listOrdersForUser({user})
   return res.status(200).json({orders: orders})
  } catch (err) {
    next(err)
  }
})

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
     //should call createOrder method
     const {user} = res.locals
     const order = await Order.createOrder({user, order: req.body})
     return res.status(201).json({order: order})

    } catch (err) {
      next(err)
    }
  })


module.exports = router