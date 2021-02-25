import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUsersOrders,
  deleteOrder,
  getUsersOrdersById,
  getOrders,
} from '../controllers/orderController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders)
router.route('/myorders').get(protect, getUsersOrders)
router.route('/:id/:userid/:isadmin').delete(protect, deleteOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/admin/:id').get(protect, isAdmin, getUsersOrdersById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/delivered').put(protect, isAdmin, updateOrderToDelivered)

export default router
