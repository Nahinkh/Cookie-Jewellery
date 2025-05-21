
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
const Social = () => {
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col items-center bg-gray-50  justify-around text-sm py-20  w-full mb-2 "
    >
      <h2 className="md:text-4xl text-2xl font-semibold text-action font-heading">
     Timeless Beauty in Every Piece.
      </h2>
      <p className="mt-4 text-Secondary">
        Jewels of Distinction, Worn with Confidence
      </p>
      <div className="gap-4 mt-8 ">
        <h1 className="text-3xl font-medium text-Secondary">Follow Us On</h1>
        <div className="flex justify-center items-center gap-4 mt-4">
        
          <a 
          href="https://www.facebook.com/Cookie.Jewellery7"
          target="_blank"
          rel="noopener noreferrer"
          type="button" className="w-max bg-blue-600 text-white rounded cursor-pointer p-2 hover:scale-105 duration-200">
            <FaFacebook className="w-10 h-10 "/>
          </a>
          <a 
          
          href="https://www.instagram.com/cookiejewellery_?igsh=MTZsb2hmejNoaHp0eA=="
          target="_blank"
          
          type="button" className="w-max cursor-pointer bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:scale-105 duration-200 p-2 rounded-lg">
            <IoLogoInstagram className="w-10 h-10 text"/>
          </a>
          <a
            href="https://www.tiktok.com/@cookiejewellery._?_t=ZS-8wW8rQXVEud&_r=1"
            target="_blank"
  rel="noopener noreferrer"
          type="button" className="w-max cursor-pointer bg-Secondary text-white hover:scale-105 duration-200 p-2 rounded-lg">
            <FaTiktok className="w-10 h-10"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
