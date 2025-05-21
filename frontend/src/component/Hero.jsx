import React from "react";
import CarouselBanner from "./CarouselBanner";

const Hero = () => {
  return (
    <div className="md:grid grid-cols-3 h-[540px]"  >
      <div className=" bg-action/50 mb-10 col-span-2" data-aos="fade-up-right" >
        <CarouselBanner />
      </div>
      <div className="w-full h-full hidden md:block" data-aos="fade-up-left">
        <div>
          <img
            className="h-[290px] w-full"
            src="https://plus.unsplash.com/premium_photo-1678554875441-b286d1b6174a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div>
          <img
            className="h-[290px] w-full"
            src="https://plus.unsplash.com/premium_photo-1740020261456-73e43eaa1442?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
