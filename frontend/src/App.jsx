import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./component/Navbar"
import Home from "./pages/Home"
import Footer from "./component/Footer"
import AllProduct from "./pages/AllProduct"
import ProductCategory from "./component/ProductCategory"
import ProductDetails from "./component/ProductDetails"
import Cart from "./pages/Cart"
import OrderSummery from "./pages/orderSummery"
import SuccessPage from "./pages/SuccessPage"
import AdminLogin from "./pages/admin/AdminLogin"
import { useAppContext } from "./context/AppContext"
import AdminLayout from "./component/AdminLayout"
import AddProduct from "./pages/admin/AddProduct"
import ProductList from "./pages/admin/ProductList"
import Orders from "./pages/admin/Orders"
import UpdateProduct from "./pages/admin/UpdateProduct"
import AOS from "aos"
import "aos/dist/aos.css";
import { useEffect } from "react"






function App() {
  const { isAdmin } = useAppContext();
  const isAdminPath = window.location.pathname.includes("/admin")
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

   useEffect(() => {
    AOS.refresh();
    window.scrollTo(0, 0); // optional: scroll to top on route change
  }, [location]);

  return (
    <>

    <div className=" font-Poppins">
    {
      isAdminPath ? null : <Navbar />
    }
     <Routes>
     
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<AllProduct />} />
      <Route path="/all-products/:category" element={<ProductCategory />} />
      <Route path="/all-products/:category/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<OrderSummery/>} />
      <Route path="/success" element={<SuccessPage/>} />
      <Route path="/admin" element={isAdmin?<AdminLayout/> :<AdminLogin/>} >
        <Route index element={isAdmin?<AddProduct/>:null} />
        <Route path="/admin/product-list" element={<ProductList/>} />
        <Route path="/admin/product-list/:id" element={<UpdateProduct/>} />
        <Route path="/admin/orders" element={<Orders/>} />
      </Route>
    </Routes>
    {
      isAdminPath ? null : <Footer />
    } 
    </div>
     
    </>
  )
}

export default App
