import express from 'express';
import { adminLogin, adminLogout, isAdminAuth } from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';


const adminRoute = express.Router();

adminRoute.post('/login',adminLogin);
adminRoute.get('/auth',authAdmin,isAdminAuth);
adminRoute.get('/logout',adminLogout);

export default adminRoute;