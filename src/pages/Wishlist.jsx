import React, { useState } from "react";
import { useWishlist } from "../Context/WishlistContext";
import { X, Bookmark, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Noproduct from "../assets/Noproduct.png";
import { useCart } from "../Context/AddtoCart";
/* ===================== WISHLIST COMPONENT START ===================== */
const Wishlist = () => {
  const { wishlist, toggleWishlist ,removeFromWishlist  } = useWishlist();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const { addToCart  } = useCart();

  return (
    <div className="mt-14 min-h-screen mb-9">
      {/* ===================== HEADER SECTION ===================== */}
      <div className=" flex flex-col justify-center items-center gap-6 mb-6 py-6">
        <h1 className="text-3xl font-bold tracking-wide leading-2">
          My Wishlist
        </h1>
        <p className=" flex gap-2">
          <span>
            <Bookmark />
          </span>
          Saved product for future
        </p>
      </div>

      {/* ===================== WISHLIST GRID SECTION ===================== */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {/* ===================== EMPTY STATE ===================== */}
          {wishlist.length == 0 ? (
            <div className="col-span-full flex flex-col justify-center items-center min-h-[70vh]">
              <img
                src={Noproduct}
                alt="Empty Wishlist"
                className="w-[400px] max-w-full object-contain"
              />
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`, { state: item })}
                className="flex flex-col gap-3 shadow-2xl border border-gray-300 rounded-md p-4 cursor-pointer hover:scale-105 transition"
              >
                {/* ===================== PRODUCT IMAGE ===================== */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-80 object-contain"
                />

                {/* ===================== PRODUCT DETAILS ===================== */}
                <div>
                  <h1 className="text-lg font-semibold flex justify-start items-center">
                    {item.title}
                  </h1>
                  <p className="text-md">${item.price}</p>
                </div>

                {/* ===================== ACTION BUTTONS ===================== */}
                <div className="flex justify-between">
                  {/* ADD TO CART BUTTON */}

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(item)
                    }}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-4 rounded-md text-white font-semibold font-sans cursor-pointer hover:scale-105 transition-all">
                    Add to Cart
                  </button>

                  {/* REMOVE BUTTON */}

                  <button className="bg-gradient-to-r from-orange-500 to-red-600 py-2 px-3 rounded-md text-white font-semibold font-sans cursor-pointer hover:scale-105 transition-all" onClick={(e)=>{
                     e.stopPropagation();
                    removeFromWishlist(item.id)}}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

/* ===================== WISHLIST COMPONENT END ===================== */

export default Wishlist;
