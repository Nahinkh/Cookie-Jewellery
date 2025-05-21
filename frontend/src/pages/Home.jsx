import React from 'react'
import Hero from '../component/Hero'
import Category from '../component/Category'
import Trending from '../component/Trending'
import ExploreUs from '../component/ExploreUs'
import Featured from '../component/Featured'
import Social from '../component/Social'
import NewArrivals from '../component/NewArrivals'

const Home = () => {
  return (
    <div className='w-full'>
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