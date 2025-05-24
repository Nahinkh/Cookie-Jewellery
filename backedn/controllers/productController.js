import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/productModel.js';

// Add a new product post request:api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files
        console.log(productData);

        let imageUrls = await Promise.all(
            images.map(async (img)=>{
                let result = await cloudinary.uploader.upload(img.path,{
                    resource_type:'image',
                })
                return result.secure_url
            })
        )

        await Product.create({
            ...productData,
            image: imageUrls,
        });
        res.status(200).json({
            success: true,
            message: 'Product added successfully',
        });

      
    } catch (error) {
        console.log(error.message);
    }
}

// Get all products get request:api/product/getAll
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error.message);
    }
}

// Update single product get request:api/product/update/:id
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let productData = JSON.parse(req.body.productData);
        const images = req.files
        if(images.length>0){
            let urls = await Promise.all(
                images.map(async (img)=>{
                    let result = await cloudinary.uploader.upload(img.path,{
                        resource_type:'image',
                    })
                    return result.secure_url
                })
            )

            productData.image = urls;
        }else{
            // If no new images are uploaded, keep the existing images
            const existingProductImages = await Product.findById(id);
            productData.image = existingProductImages.image;

        }
        await Product.findByIdAndUpdate(id, {
            ...productData,
        });
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
        });
        // let imageUrls = await Promise.all(
        //     images.map(async (img)=>{
        //         let result = await cloudinary.uploader.upload(img.path,{
        //             resource_type:'image',
        //         })
        //         return result.secure_url
        //     })
        // )

        // await Product.findByIdAndUpdate(id, {
        //     ...productData,
        //     image: imageUrls,
        // });
        // res.status(200).json({
        //     success: true,
        //     message: 'Product updated successfully',
        // });

      
    } catch (error) {
        console.log(error.message);
    }
}


// Change product in stock status: /api/product/updateStock
export const updateStock = async (req, res) => {
        try {
            const { id, inStock } = req.body;
            await Product.findByIdAndUpdate(id,{
                inStock: inStock,
            })
            res.status(200).json({
                success: true,
                message: 'Product stock updated successfully',
            });
        } catch (error) {
            console.log(error.message);
        }

}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
    }
}