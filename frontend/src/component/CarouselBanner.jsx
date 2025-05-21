import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import image_banner_1 from '../assets/forBanner_1.jpg'
import image_banner_2 from '../assets/forBanner_2.jpg' 

// import required modules
import {  Navigation,Autoplay  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const CarouselBanner = () => {

    const images =[
        {
            image:"https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title:"Redefining Grace, One Gem at a Time.",
            subtitle:"Discover the beauty of our handcrafted jewellery."

        },
        {
            image:"https://images.unsplash.com/photo-1586878341523-7acb55eb8c12?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title:"Elegance in Every Detail.",
                subtitle:"Explore our exquisite collection of jewellery."
        },
        {
            image:"https://images.unsplash.com/photo-1620656798579-1984d9e87df7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title:"Not Just Jewellery. A Statement.",
                subtitle:"Unleash your inner sparkle with our unique designs."
        }
        ,
      {  image:"https://plus.unsplash.com/premium_photo-1681276170683-706111cf496e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title:"Jewellery that Speaks to the Soul.",
                subtitle:"Crafted with love, worn with pride."}
    ]
  return (
    <div className="w-full overflow-hidden shadow-lg">
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div className={` h-[580px]`} style={{backgroundImage: `url(${img.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="flex justify-center items-center h-full bg-black/50">
              <div className="text-center text-white">
              <h1 className="text-3xl font-stretch-90% text-white font-heading">{img.title}</h1>
              <p className='font-normal tracking-widest mt-0.5 '>{img.subtitle}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  )
}

export default CarouselBanner