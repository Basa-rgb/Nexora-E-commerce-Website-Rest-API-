import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "../../Context/WishlistContext";
import { useCart } from "../../Context/AddtoCart";
import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

// Skeleton card shown while products are loading
const SkeletonCard = () => (
  <div className="relative border p-4 rounded-lg shadow-md animate-pulse">
    {/* Wishlist button placeholder */}
    <div className="absolute top-3 right-3 w-10 h-10 bg-gray-200 rounded-full" />

    {/* Product image placeholder */}
    <div className="w-full h-48 bg-gray-200 rounded-md mb-3" />

    {/* Product title placeholder */}
    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />

    {/* Price placeholder */}
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-1" />

    {/* Discount placeholder */}
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />

    {/* Button placeholder */}
    <div className="h-10 bg-gray-200 rounded-xl w-full" />
  </div>
);

const Featured = ({ products: propProducts }) => {
  // State for fetched products
  const [products, setProducts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  // React Router navigation
  const navigate = useNavigate();

  // Wishlist context
  const { wishlist, toggleWishlist } = useWishlist();

  // Cart context
  const { addToCart } = useCart();

  useEffect(() => {
    // Skip fetching if products are passed as props
    if (propProducts) return;

    setLoading(true);

    // Fetch products from API
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle products randomly
        const shuffled = [...data.products].sort(() => 0.5 - Math.random());

        // Select first 12 products
        setProducts(shuffled.slice(0, 12));

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [propProducts]);

  // Use prop products if available, otherwise use fetched products
  const displayProducts = propProducts ?? products;

  // Loading condition:
  // 1. API request loading
  // 2. Parent component passed empty products array
  const isLoading = loading || (propProducts && propProducts.length === 0);

  // Number of skeleton cards
  const skeletonCount = propProducts ? 6 : 12;

  return (
    <section className="py-8 px-2 bg-white">

      {/* Heading shown only on standalone Featured section */}
      {!propProducts && (
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wider mb-6">
            Featured Product
          </h1>

          <p className="max-w-lg text-md leading-relaxed text-center">
            Discover top featured products, selected for quality and trends.
          </p>
        </div>
      )}

      {/* Product Grid */}
      <div
        className={`grid gap-6 mt-6 p-4 ${
          propProducts
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {isLoading
          ? // Show skeleton cards while loading
            [...Array(skeletonCount)].map((_, i) => <SkeletonCard key={i} />)

          : // Show actual products
            displayProducts.map((product) => (
              <div
                key={product.id}

                // Navigate to product details page
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: product })
                }

                className="relative border border-gray-400 p-4 rounded-lg shadow-2xl hover:shadow-xl cursor-pointer hover:scale-105 transition-all"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    // Prevent card click navigation
                    e.stopPropagation();

                    // Add/remove from wishlist
                    toggleWishlist(product);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md cursor-pointer"
                >
                  <Heart
                    size={36}
                    className={
                      wishlist.some((item) => item.id === product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }
                  />
                </button>

                {/* Product Image */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                  className="w-full object-contain"
                />

                {/* Product Title */}
                <h3 className="font-bold text-lg">{product.title}</h3>

                {/* Show discounted price if discount exists */}
                {product.discountPercentage > 0 ? (
                  <>
                    {/* Final discounted price */}
                    <p className="font-bold text-black">
                      $
                      {(
                        product.price -
                        (product.price * product.discountPercentage) / 100
                      ).toFixed(2)}
                    </p>

                    {/* Discount percentage + original price */}
                    <div className="flex gap-2">
                      <span className="text-red-500">
                        <span className="text-black text-sm font-bold">
                          Discount:{" "}
                        </span>
                        {product.discountPercentage}%
                      </span>

                      <p className="font-semibold line-through text-black">
                        ${product.price}
                      </p>
                    </div>
                  </>
                ) : (
                  // Show normal price if no discount
                  <p className="font-bold text-black">${product.price}</p>
                )}

                {/* Add To Cart Button */}
                <button
                  onClick={(e) => {
                    // Prevent navigation when button clicked
                    e.stopPropagation();

                    // Add product to cart
                    addToCart(product);
                  }}
                  className="group relative mt-4 w-full h-[40px] rounded-xl bg-black flex items-center justify-center overflow-hidden shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  {/* Cart Icon Animation */}
                  <span className="absolute left-[-50px] w-[30px] h-[30px] flex items-center justify-center transition-all duration-500 group-hover:translate-x-[58px] text-white text-2xl">
                    <IoCartOutline />
                  </span>

                  {/* Button Text */}
                  <span className="text-[1.04em] font-semibold text-white transition-all duration-500 group-hover:translate-x-[10px]">
                    Add to Cart
                  </span>
                </button>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Featured;