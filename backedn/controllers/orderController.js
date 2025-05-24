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
    console.log("orderData", orderData);
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
    const orders = await Order.find().sort({_id:-1});
 res.status(200).json({
            success: true,
            orders,
        });
  } catch (error) {
    console.log(error.message)
  }
}


// update order status: api/order/update/:id
export const updateOrderStatus = async (req, res) => {
  const{id} = req.params;
    const { orderStatus } = req.body;
    console.log("id, orderStatus", id, orderStatus);
  // const orderStatus = status;  
  try {
    await Order.findByIdAndUpdate(id,{
        orderStatus: orderStatus,
      })
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
    

  } catch (error) {
    console.log(error.message);
  }

}

