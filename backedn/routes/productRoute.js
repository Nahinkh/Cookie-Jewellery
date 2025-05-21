import express from 'express';
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/productController.js';
import { uploadFiles } from '../config/multerConfig.js';

const productRouter = express.Router();

productRouter.post('/add',uploadFiles.array(['images']),addProduct),
productRouter.get('/getAll', getAllProducts);
productRouter.put('/update/:id',uploadFiles.array(['images']),updateProduct);
productRouter.delete('/delete/:id', deleteProduct)

export default productRouter;