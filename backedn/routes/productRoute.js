import express from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct, updateStock } from '../controllers/productController.js';
import { uploadFiles } from '../config/multerConfig.js';
import authAdmin from '../middlewares/authAdmin.js';

const productRouter = express.Router();

productRouter.post('/add',uploadFiles.array(['images']),authAdmin,addProduct);
productRouter.get('/getAll', getAllProducts);
productRouter.put('/update/:id',uploadFiles.array(['images']),authAdmin,updateProduct);
productRouter.patch('/updateStock',authAdmin,updateStock);
productRouter.delete('/delete/:id',authAdmin, deleteProduct)

export default productRouter;