import React from 'react'
import Hero from '../component/Hero'
import Category from '../component/Category'
import Trending from '../component/Trending'
import ExploreUs from '../component/ExploreUs'
import Featured from '../component/Featured'
import Social from '../component/Social'
import NewArrivals from '../component/NewArrivals'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <div className='w-full'>
      <Helmet>
        <title>Home | Cookie Jewellery</title>
        <meta name="description" content="Welcome to Cookie Jewellery, your one-stop destination for exquisite and trendy jewellery. Explore our latest collections and find the perfect piece to complement your style." />
        <link rel="canonical" href="/" />
      </Helmet>
        <Hero/>
        <Category/>
        <Trending/>
        {/* <ExploreUs/> */}
        <NewArrivals/>
        <Featured/>
        <Social/>
    </div>
  )
}

export default Home