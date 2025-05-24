import e from 'express';
import express from 'express';
import { getOrders, placeOrders, updateOrderStatus } from '../controllers/orderController.js';
import  authAdmin  from '../middlewares/authAdmin.js';


const orderRouter = express.Router();
orderRouter.post('/placeOrder',placeOrders)
orderRouter.get('/orders',authAdmin,getOrders);
orderRouter.patch('/update/:id',authAdmin,updateOrderStatus);

export default orderRouter;

