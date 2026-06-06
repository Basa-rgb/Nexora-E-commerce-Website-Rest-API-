import { Heart } from "lucide-react";
import { useWishlist } from "../../Context/WishlistContext";

const ProductCard = ({ item }) => {
  // Access wishlist array and toggle function from wishlist context
  const { wishlist, toggleWishlist } = useWishlist();

  // Check if the current product is already saved in the wishlist
  const isSaved = wishlist.some(
    (p) => p.id === item.id
  );

  return (
    <div className="relative border p-4 rounded-lg shadow-md hover:shadow-xl transition">

      {/* Wishlist toggle button — heart fills red when item is saved */}
      <button
        onClick={() => toggleWishlist(item)}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow"
      >
        <Heart
          size={20}
          className={
            isSaved
              ? "fill-red-500 text-red-500"   // saved state
              : "text-gray-500"               // unsaved state
          }
        />
      </button>

      {/* Product thumbnail image */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full object-contain"
      />

      {/* Product title */}
      <h3 className="font-bold mt-2">
        {item.title}
      </h3>

      {/* Product price */}
      <p className="font-semibold">
        ${item.price}
      </p>

    </div>
  );
};

export default ProductCard;