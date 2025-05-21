import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-6 bg-Secondary">
      <div className="flex items-center justify-center  gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div className="flex flex-col items-center">
          <div className="">
            <h1 className="text-3xl font-semibold font-heading text-action tracking-widest">
              Cookie Jewellery
            </h1>
          </div>
          <div className="flex gap-3 mt-3">
            <NavLink to='/'>
              Home
            </NavLink>
            <NavLink to='/all-products'>
              Shop
            </NavLink>
            <NavLink>
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © Cookie Jewellery All Right Reserved. Developed by WebNix Tech
      </p>
    </div>
  );
};

export default Footer;
