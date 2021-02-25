import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

// @desc        Create new order
// @route       POST /api/orders
// @access      Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('אין מוצרים בהזמנה')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    const user = await User.findById(order.user)

    user.hasOrders = true

    await user.save()

    res.status(201).json(createdOrder)
  }
})

// @desc        Get order by ID
// @route       GET /api/orders/:id
// @access      Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('ההזמנה לא נמצאה')
  }
})

// @desc        Update order to paid
// @route       PUT /api/orders/:id/pay
// @access      Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    const user = await User.findById(order.user)

    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    user.hasPaidOrders = true

    await user.save()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('ההזמנה לא נמצאה')
  }
})

// @desc        Update order to delivered
// @route       PUT /api/orders/:id/delivered
// @access      Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('ההזמנה לא נמצאה')
  }
})

// @desc        Delete order
// @route       DELETE /api/orders/:id/:userid/:isadmin
// @access      Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    if (order.user === req.params.userid || req.params.isadmin) {
      const user = await User.findById(order.user)

      await order.remove()

      res.send('ההזמנה בוטלה בהצלחה')

      const orders = await Order.find({ user: user._id })

      if (orders.length === 0) {
        user.hasOrders = false

        await user.save()
      }
    } else {
      res.status(404)
      throw new Error('אין הרשאה')
    }
  } else {
    res.status(404)
    throw new Error('ההזמנה לא נמצאה')
  }
})

// @desc        Get logged in user orders
// @route       GET /api/orders/myorders
// @access      Private
const getUsersOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  res.json(orders)
})

// @desc        Get users orders by ID
// @route       GET /api/orders/admin/:id
// @access      Private/Admin
const getUsersOrdersById = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id })

  res.json(orders)
})

// @desc        Get all orders
// @route       GET /api/orders
// @access      Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')

  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUsersOrders,
  deleteOrder,
  getUsersOrdersById,
  getOrders,
}
