import React, { useEffect, useState } from "react";
import add_to_cart_1 from "../assets/add_to_cart.png";
import add_to_cart_2 from "../assets/shopping_bag.png";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { categories } from "../assets/assests";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { searchQuery, setSearchQuery, navigate, cartItems } = useAppContext();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/all-products");
    }
  }, [searchQuery]);

  return (
    <nav className="relative w-full">
      {/* Top Nav */}
      <div className="bg-white h-[70px] flex justify-between items-center md:px-8 px-4 border-b-2 border-pink-500">
        {/* Logo Image */}
        <NavLink to="/" className="flex items-center">
          <img className="w-24 hidden md:block md:w-28" src={logo} alt="Logo" />
        </NavLink>

        {/* Search Bar - Desktop only */}
        <div className="hidden lg:flex items-center border pl-4 gap-2 bg-white border-gray-300 h-10 rounded-full max-w-xs w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#6B7280"
            viewBox="0 0 30 30"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full h-full outline-none text-gray-500 text-sm"
          />
        </div>

        {/* Main Text Logo */}
        <NavLink
          to="/"
          className="lg:text-4xl text-xl font-medium font-heading flex items-center text-pink-500 tracking-widest"
        >
          <p>Cookie</p>
          <p className="ml-1">Jewellery</p>
        </NavLink>

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex items-center gap-6 text-Secondary font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-action border-b-2"
                  : "hover:text-Secondary/70 transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-products"
              className={({ isActive }) =>
                isActive
                  ? "text-action border-b-2"
                  : "hover:text-Secondary/70 transition"
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>

        {/* Cart Icon */}
        <button onClick={() => navigate("/cart")} className="relative ml-4">
          <img
            src={add_to_cart_2}
            alt="cart"
            className="h-8 w-8 cursor-pointer"
          />
          <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs font-semibold">
            {cartItems.length}
          </div>
        </button>

        {/* Hamburger / Close Icon - Mobile */}
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="md:hidden ml-4 p-2 rounded-full bg-white backdrop-blur-sm active:scale-90 transition"
        >
          {open ? (
            <IoMdClose className="text-3xl text-red-500" />
          ) : (
            <RiMenu3Fill className="text-3xl text-Secondary" />
          )}
        </button>
      </div>

      {/* Category Bar - Desktop */}
      <div className="bg-Secondary h-[50px] w-full hidden md:flex justify-center items-center">
        <div className="flex gap-4 text-white uppercase font-semibold tracking-widest">
          <button
            onClick={() => navigate("/all-products")}
            className="text-action font-bold cursor-pointer"
          >
            All Category
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() =>
                navigate(`/all-products/${category.path.toLowerCase()}`)
              }
              className="text-sm cursor-pointer"
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden bg-white w-full px-4 pt-4 pb-6 shadow-md space-y-4">
          {/* Search - Mobile */}
          <div className="flex items-center border px-3 gap-2 border-gray-300 h-10 rounded-full w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#6B7280"
              viewBox="0 0 30 30"
            >
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full h-full outline-none text-gray-500 text-sm"
            />
          </div>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col gap-3 text-Secondary font-medium">
            <li>
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="block hover:text-Secondary/70 transition"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-products"
                onClick={() => setOpen(false)}
                className="block hover:text-Secondary/70 transition"
              >
                Shop
              </NavLink>
            </li>
          </ul>

          {/* Mobile Categories */}
          <div className="pt-4 border-t border-gray-200">
            <p className="uppercase text-xs font-bold text-gray-500 mb-2">
              Categories
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/all-products")}
                className="text-action font-semibold text-left"
              >
                All Category
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() =>
                    navigate(`/all-products/${category.path.toLowerCase()}`)
                  }
                  className="text-sm text-left"
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
