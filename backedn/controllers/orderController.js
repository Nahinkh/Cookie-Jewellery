import Order from "../models/orderModel.js";

export const placeOrders = async (req, res) => {
  try {
    const orderData = req.body;
    if (
      !orderData.name ||
      !orderData.email ||
      !orderData.phone ||
      !orderData.address ||
      !orderData.paymentMethod ||
      orderData.items.length === 0
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    let totalAmount = 0;
    orderData.items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    orderData.amount = totalAmount;
    await Order.create(orderData);
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrders =async (req,res)=>{
  try {
    const orders = await Order.find();
 res.status(200).json({
            success: true,
            orders,
        });
  } catch (error) {
    console.log(error.message)
  }
}


