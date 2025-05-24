import  { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import Loader from "../component/Loader";

const orderSummery = () => {
  const {
    navigate,
    cartTotalAmount,
    cartItems,
    setCartItems,
    axios,
    isLoading,
    setIsLoading,
    getShippingFee,
    shippingZone,
  totalAmount
  } = useAppContext();
  console.log(getShippingFee());
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => {

    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
      paymentMethod: paymentMethod,
    }));
  };
  console.log(shippingZone)
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (getShippingFee()===0){
         toast.error("Please select a shipping zone");
        return navigate("/cart")
      }
      setIsLoading(true);

      if (
        !address.name ||
        !address.mobile ||
        !address.email ||
        !address.address
      ) {
        toast.error("Please fill all the fields");
        return;
      } else if (!paymentMethod) {
        toast.error("Please select a payment method");
        return;
      } else {
        setAddress({
          ...address,
          paymentMethod: paymentMethod,
        });
      }

      const orderData = {
        name: address.name,
        phone: address.mobile,
        email: address.email,
        address: address.address,
        paymentMethod: paymentMethod,
        shippingZone: shippingZone,
        totalAmount: totalAmount,      
        items: cartItems.map((item) => ({
          productId: item._id,
          productName: item.productName,
          quantity: item.quantity,
          price: item.offerPrice,
          selectedSizes: item.selectedSizes ,
          selectedColors: item.selectedColors,
          
        })),
      };

      const { data } = await axios.post("/api/order/placeOrder", orderData);
      if (data.success) {
        toast.success(data.message);
        navigate("/success");
        setCartItems([]);
        localStorage.removeItem("cartItems");
        setAddress({
          name: "",
          mobile: "",
          email: "",
          address: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="flex flex-col md:flex-row items-center  w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center text-sm mt-16 mb-10 lg:px-16 mx-auto"
        >
          <h1 className=" text-3xl font-semibold ">Shipping Address</h1>
          <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[600px] mt-8">
            <div className="w-full">
              <label className="text-black/70" htmlFor="name">
                Your Name
              </label>
              <input
                onChange={handleChange}
                name="name"
                className="h-12 p-2 mt-2 w-full border border-pink-500/30 rounded outline-none focus:border-pink-300"
                type="text"
                required
                placeholder="John Doe"
              />
            </div>
            <div className="w-full">
              <label className="text-black/70" htmlFor="name">
                Your Mobile Number
              </label>
              <input
                onChange={handleChange}
                name="mobile"
                className="h-12 p-2 mt-2 w-full border border-pink-500/30 rounded outline-none focus:border-pink-300"
                type="number"
                required
                placeholder="(+880) 1234-567890"
              />
            </div>
          </div>
          <div className="mt-6 w-[350px] md:w-[600px]">
            <label className="text-black/70" htmlFor="email">
              Your Email
            </label>
            <input
              className="h-12 p-2 mt-2 border w-full border-pink-500/30 rounded outline-none  focus:border-pink-300"
              type="email"
              onChange={handleChange}
              name="email"
              required
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mt-6 w-[350px] md:w-[600px]">
            <label className="text-black/70" htmlFor="email">
              Full Address
            </label>
            <input
              onChange={handleChange}
              name="address"
              className="h-12 p-2 mt-2 border w-full border-pink-500/30 rounded outline-none  focus:border-pink-300"
              type="text"
              required
              placeholder="Street Address, City, State, Zip Code"
            />
          </div>
          <button
            type="submit"
            className="mt-5 bg-action text-white h-12 w-56 px-4 rounded active:scale-95 transition"
          >
            {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
          </button>
        </form>
          <div className="max-w-[360px] w-full bg-gray-50 border border-gray-200 p-6 rounded-md shadow-sm mt-10 md:mt-0 md:ml-8">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
        
          <div className="text-gray-700 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>BDT {Math.round(cartTotalAmount())}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span className="text-blue-600">BDT {getShippingFee()}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold text-base">
              <span>Total:</span>
              <span>BDT {totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orderSummery;
