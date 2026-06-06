import React, { useEffect, useState } from "react";
import { data, Navigate, useParams ,useNavigate} from "react-router-dom";
import { Star, StarHalf } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useCart } from "../Context/AddtoCart";
import "swiper/css";
import "swiper/css/navigation";

const ProductDetails = () => {
  // Get the product ID from the URL params (e.g. /products/42)
  const { id } = useParams();

  // Access the addToCart function from the cart context
  const { addToCart } = useCart();

  const navigate = useNavigate();

  // Holds the full product object fetched from the API
  const [item, setItem] = useState(null);

  // Tracks which image is currently shown in the main viewer
  const [mainImage, setMainImage] = useState("");

  // FETCH PRODUCT — re-runs whenever the URL id changes
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        // Set the thumbnail as the default main image on load
        setMainImage(data.thumbnail);
      });
  }, [id]);

  // Show a loading indicator while the product data is being fetched
  if (!item) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // Renders filled stars and an optional half star based on the rating value
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return (
      <div className="flex text-yellow-500">
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}

        {/* Render half star if the decimal part is 0.5 or above */}
        {hasHalf && <StarHalf size={16} fill="currentColor" />}
      </div>
    );
  };

  // Calculate the final price after applying the discount percentage
  const discountedPrice =
    item.price - (item.price * item.discountPercentage) / 100;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 grid lg:grid-cols-2 gap-10">

        {/* ── LEFT SIDE: Image Gallery ── */}
        <div className="flex gap-4">

          {/* THUMBNAILS — clicking sets the selected image as the main viewer */}
          <div className="flex flex-col gap-3">
            {item.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition
                ${mainImage === img
                    ? "border-green-500"        // active thumbnail highlighted in green
                    : "border-gray-300 hover:border-green-400"
                  }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE — displays the currently selected thumbnail */}
          <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center p-4">
            <img
              src={mainImage}
              alt={item.title}
              className="w-full h-[400px] object-contain"
            />
          </div>
        </div>

        {/* ── RIGHT SIDE: Product Info ── */}
        <div className="flex flex-col gap-4">

          {/* Product title */}
          <h1 className="text-3xl font-bold text-gray-800 font-serif">
            {item.title}
          </h1>

          {/* Brand store link — only renders if the product has a brand */}
          {item.brand && (
            <p className="text-blue-600 cursor-pointer hover:underline">
              Visit the {item.brand} Store
            </p>
          )}

          {/* RATING — star icons + numeric rating value */}
          <div className="flex items-center gap-2">
            {renderStars(item.rating)}
            <span className="text-gray-600">({item.rating})</span>
          </div>

          {/* "Nexora's Choice" badge — skewed pill style similar to Amazon's Choice */}
          <div className="group">
            <span className="inline-block bg-black text-white text-sm px-4 py-1 skew-x-[-20deg] hover:scale-105 transition cursor-pointer">
              <span className="inline-block skew-x-[20deg] ">Nexora's</span>
            </span>

            <span className="inline-block bg-orange-500 text-white text-sm px-4 py-1 skew-x-[-20deg] ml-1 hover:scale-105 transition cursor-pointer">
              <span className="inline-block skew-x-[20deg]">Choice</span>
            </span>
          </div>

          {/* Product description */}
          <p className="text-gray-600 leading-relaxed">{item.description}</p>

          {/* PRICE — shows discounted price; original price and % OFF are commented out */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-600">
              ${discountedPrice.toFixed(2)}
            </p>
{/* 
            <p className="text-gray-400 line-through"> ${item.price}</p>

            <span className="text-red-500 font-medium italic">
              {item.discountPercentage}% OFF
            </span> */}
          </div>

          {/* ACTION BUTTONS — Add to Cart and Buy Now */}
          <div className="flex gap-4 mt-4">
            {/* Add to Cart — calls addToCart and stops event bubbling */}
            <button onClick={(e)=>{
              addToCart(item)
              e.stopPropagation();
            }} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-4 rounded-md text-white font-semibold font-sans cursor-pointer hover:scale-105 transition-all">
              Add to Cart
            </button>

            {/* Buy Now button */}
            <button className="bg-gradient-to-r from-orange-500 to-red-600 py-2 px-3 rounded-md text-white font-semibold font-sans cursor-pointer hover:scale-105 transition-all">
              Buy Now
            </button>
          </div>

          {/* EMI / cashback promotional text */}
          <div className="text-sm text-gray-600 leading-6 font-semibold ">
            <p>Save extra with No Cost EMI</p>
            <p>
              Get 100% off instantly on eligible cards
              <span className="line-through text-lg text-red-500 ml-1">
                {discountedPrice.toFixed(2)}
              </span>
              .
            </p>
          </div>

          {/* ── Additional Product Information ── */}

          {/* Brand */}
          <div className="max-w-md flex items-center gap-6">
            <p className="font-semibold text-gray-700 w-24">Brand</p>
            <p className="text-gray-600">{item.brand || "--"}</p>
          </div>

          {/* Category */}
          <div className="max-w-md flex  items-center gap-6">
            <p className="font-semibold text-gray-700 w-24">Category</p>
            <p className="text-gray-600">{item.category}</p>
          </div>

          {/* Tags — mapped from the tags array */}
          <div className="max-w-md flex items-center gap-6">
            <p className="font-semibold text-gray-700 w-24">Tag</p>
            {item.tags.map((tag, i) => (
              <p key={i} className="text-gray-600">
                {tag}
              </p>
            ))}
          </div>

          {/* Stock count */}
          <div className="max-w-md flex  items-center gap-6">
            <p className="font-semibold text-gray-700 w-24">Stock</p>
            <p className="text-gray-600">{item.stock}</p>
          </div>

        </div>
      </div>

      {/* ── Customer Reviews Section ── */}
      <div className="p-6 flex justify-center items-center mt-8">
        <h2 className="text-3xl font-serif">Customer Reviews</h2>
      </div>

      {/* Swiper carousel — auto-plays through reviews with navigation arrows */}
      <div className="p-6  max-w-3xl mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          speed={600}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          {item?.reviews?.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col justify-center items-center  bg-violet-200 rounded-lg gap-4 shadow-md">

                {/* Review header: reviewer name (left) and formatted date (right) */}
                <div className="flex justify-between w-full p-6">
                  <h1 className="text-lg font-semibold font-serif">
                    {review.reviewerName}
                  </h1>
                  <h3 className="text-lg text-gray-600 ">
                    {new Date(review.date).toLocaleDateString()}
                  </h3>
                </div>

                {/* Review comment — displayed in italics and centered */}
                <div className="flex justify-center items-center p-4 text-center">
                  <p className="italic text-2xl">"{review.comment}"</p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

export default ProductDetails;