import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    address:{type:String, required:true},
    paymentMethod:{type:String, required:true},
    orderStatus:{type:String, default:"pending"},
    amount:{type:Number, required:true},
    items:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
            productName:{type:String, required:true},
            quantity:{type:Number, required:true},
            price:{type:Number, required:true},
        }
    ],
    

},{timestamps:true});

const Order = mongoose.model("Order", orderSchema);
export default Order;