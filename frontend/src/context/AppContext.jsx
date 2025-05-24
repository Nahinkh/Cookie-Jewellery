import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000"|| import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shippingZone, setShippingZone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("api/admin/auth");
      if (data.success) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const addToCart = (product, selectedColors, selectedSizes) => {
    if (!selectedColors.length || !selectedSizes.length) {
      toast.error("Please select at least one color and one size");
      return;
    }
    const existIngProduct = cartItems.find((item) => item._id === product._id);
    if (existIngProduct) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === product._id
            ? {
                ...existIngProduct,
                quantity: existIngProduct.quantity + 1,
                selectedColors: selectedColors,
                selectedSizes: selectedSizes,
              }
            : cartItem
        )
      );
      toast.success("Product quantity increased and updated", {
        style: {
          background: "#f6339a",
          color: "#fff",
        },
      });
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, selectedColors: selectedColors, selectedSizes: selectedSizes },
      ]);
      toast.success("Product added to cart", {
        style: {
          background: "#f6339a",
          color: "#fff",
        },
      });
    }
  };

  //   Remove item from cart
  const removeFromCart = (product) => {
    const existIngProduct = cartItems.find((item) => item._id === product._id);
    if (existIngProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item._id !== product._id));
      toast.error("Product removed from cart", {
        style: {
          background: "#f6339a",
          color: "#fff",
        },
      });
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === product._id
            ? { ...existIngProduct, quantity: existIngProduct.quantity - 1 }
            : cartItem
        )
      );
      toast.error("Product quantity decreased", {
        style: {
          background: "#f6339a",
          color: "#fff",
        },
      });
    }
  };

  //  Clear cart

  const clearCart = () => {
    setCartItems([]);
    toast.error("Cart cleared", {
      style: {
        background: "#f6339a",
        color: "#fff",
      },
    });
  };
  //  Calculate the total amount of the cart
  const getShippingFee = () =>
    shippingZone === "inside Dhaka"
      ? 80
      : shippingZone === "outside Dhaka"
      ? 120
      : 0;

  // cart Total
  const cartTotalAmount = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.offerPrice * item.quantity,
      0
    );
  };
  const totalAmount = Math.round(cartTotalAmount() + getShippingFee());

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/orders");
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/getAll");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchAdmin();
  }, []);

  //   Store the cart items in local storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  const value = {
    // Define your context values here
    products,
    setProducts,
    navigate,
    searchQuery,
    setSearchQuery,
    addToCart,
    removeFromCart,
    clearCart,
    cartItems,
    cartTotalAmount,
    isAdmin,
    setIsAdmin,
    axios,
    fetchProducts,
    isLoading,
    setIsLoading,
    setCartItems,
    orders,
    fetchOrders,
    shippingZone,
    setShippingZone,
    getShippingFee,
    totalAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
