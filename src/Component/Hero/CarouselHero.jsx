import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import api from "../../API/api";
import Autoplay from "embla-carousel-autoplay";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import DarkVeil from "../DarkVeil/DarkVeil";

const CarouselHero = () => {
  // Store products fetched from API
  const [product, setProduct] = useState([]);

  // Initialize Embla Carousel with loop and autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  // Scroll carousel to previous slide
  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  // Scroll carousel to next slide
  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  useEffect(() => {
    // Function to fetch products from API
    const fetchproducts = async () => {
      try {
        const res = await api.get("/products?limit=194");

        // Store products in state
        setProduct(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchproducts();
  }, []);

  return (
    <section className="relative isolate h-screen overflow-hidden pt-24">

      {/* Hero Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400">

        {/* Optional animated background effect */}
        {/* 
        <DarkVeil
          hueShift={20}
          noiseIntensity={0.03}
          scanlineIntensity={0.05}
          speed={0.5}
          scanlineFrequency={1.5}
          warpAmount={0.1}
        /> 
        */}
      </div>

      {/* Show loading screen while products are being fetched */}
      {!product.length ? (
        <div className="h-screen text-center text-white flex flex-col items-center justify-center">

          {/* Animated loading dots */}
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>

          {/* Loading text */}
          <p className="text-3xl font-bold">LOADING ...</p>
        </div>
      ) : (
        // Carousel container
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">

            {/* Display products from index 91 to 98 */}
            {product.slice(91, 99).map((item) => (
              <div
                key={item.id}
                className="min-w-full h-[calc(100vh-6rem)] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 px-4 sm:px-8 lg:px-24 py-8 lg:py-0"
              >
                {/* Left Side Content */}
                <div className="text-white max-w-xl pt-4 text-center lg:text-left">

                  {/* Product Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
                    {item.title}
                  </h1>

                  {/* Product Description */}
                  <p className="mt-4 text-gray-300 text-sm sm:text-base lg:text-lg">
                    {item.description}
                  </p>
                </div>

                {/* Right Side Product Image */}
                <div className="bg-gray-300 rounded-full p-6 shadow-2xl shadow-red-700">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-[230px] h-[230px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Previous Slide Button */}
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 
            bg-white/80 hover:bg-white transition
            text-black rounded-full z-10 p-2 cursor-pointer"
          >
            <IoArrowBack size={30} />
          </button>

          {/* Next Slide Button */}
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 
            bg-white/80 hover:bg-white transition
            text-black rounded-full z-10 p-2 cursor-pointer"
          >
            <IoArrowForward size={30} />
          </button>
        </div>
      )}
    </section>
  );
};

export default CarouselHero;