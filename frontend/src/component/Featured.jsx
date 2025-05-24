import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
import { Swiper, SwiperSlide } from 'swiper/react'

const Featured = () => {
  const {products,navigate} = useAppContext()
  const featuredOnly = products.filter((product) => product.isFeatured === true)
  return (
    <div className="px-14 sm:px-8 md:px-10 lg:px-14 mb-10 mt-24 flex flex-col items-center justify-center w-full" data-aos="fade-up">
  {/* Header */}
  <div className="flex flex-col justify-center items-end w-max">
    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-action font-semibold">
      Featured Now
    </h1>
    <div className="w-24 sm:w-36 h-0.5 rounded-2xl bg-Secondary mt-1" />
  </div>

  {/* Product Grid */}
  <div className="mt-10 w-full">
    <Swiper 
    spaceBetween={20}
    slidesPerView={1.2}
    breakpoints={{
      640: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 3.2,
      },
      1024: {
        slidesPerView: 4.2,
      },
    }}
    >
      {featuredOnly.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductCard
            product={product}
            onClick={() => {
              navigate(`/product/${product._id}`)
              scrollTo(0, 0)
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Button */}
  <button
    onClick={() => {
      navigate('/all-products')
      scrollTo(0, 0)
    }}
    type="button"
    className="bg-action text-white cursor-pointer text-sm px-5 py-2.5 rounded font-medium mt-14 hover:scale-105 active:scale-95 transition duration-300"
  >
    View All Jewelry
  </button>
</div>

  )
}

export default Featured