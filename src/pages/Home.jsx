import React from 'react'

import CarouselHero from '../Component/Hero/CarouselHero'
import Featured from '../Component/FeaturedProduct/Featured'

const Home = () => {
  return (
    <div>

      {/* Hero carousel banner — displayed at the top of the home page */}
      <CarouselHero />

      {/* Featured products grid — shown below the hero section */}
      <Featured />

    </div>
  )
}

export default Home