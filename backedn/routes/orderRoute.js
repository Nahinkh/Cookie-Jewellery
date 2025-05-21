import e from 'express';
import express from 'express';
import { getOrders, placeOrders } from '../controllers/orderController.js';


const orderRouter = express.Router();
orderRouter.post('/placeOrder',placeOrders)
orderRouter.get('/orders',getOrders)

export default orderRouter;

