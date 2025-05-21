import React from "react";

const ExploreUs = () => {
  return (
    <div className="min-h-[550px] flex flex-col justify-center items-center mx-2 md:mx-auto p-px bg-gradient-to-r from-amber-600/20 to-yellow-500/30">
      <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 rounded-[15px] ">
        <h2 className="text-2xl md:text-4xl font-medium mt-2 text-Secondary">
          Look gorgeous and dreamy with the most <br /> intriguing jewelry ever.
        </h2>
        <p className="text-slate-500 mt-2 max-w-lg max-md:text-sm">
          Achieve your goals faster with personalized strategies, hands-on
          support, and results that speak for themselves.
        </p>
        <button
          type="button"
          className="bg-action text-white cursor-pointer text-sm px-5 py-2.5 rounded font-medium mt-4 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Shop Now Today
        </button>
      </div>
    </div>
  );
};

export default ExploreUs;
