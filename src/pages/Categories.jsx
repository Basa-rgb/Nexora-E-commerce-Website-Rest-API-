import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../API/api";
import Featured from "../Component/FeaturedProduct/Featured";
import { Star } from "lucide-react";

const Categories = () => {
  const [apiCategories, setApiCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");

  const [price, setPrice] = useState(50000);
  const [rating, setRating] = useState("");
  const [isStock, setIsstock] = useState(false);

  const [products, setProducts] = useState([]);

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // SEARCH — read query from URL (?search=laptop)
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const visibleCategories = showAll
    ? apiCategories
    : apiCategories.slice(0, 17);

  // FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/products/categories");
        setApiCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const endpoint = appliedCategory
          ? `/products/category/${appliedCategory}`
          : "/products?limit=194";

        const res = await api.get(endpoint);

        let data = res.data.products;
        if (!data) {
          setLoading(false);
          return;
        }

        // SEARCH FILTER
        if (searchQuery) {
          data = data.filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // PRICE FILTER
        data = data.filter((p) => p.price <= price);

        // RATING FILTER
        if (rating) {
          data = data.filter((p) => p.rating >= Number(rating));
        }

        // STOCK FILTER
        if (isStock) {
          data = data.filter((p) => p.stock > 0);
        }

        setProducts(data);
        setCurrentPage(1);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [appliedCategory, price, rating, isStock, searchQuery]); // added searchQuery

  // APPLY FILTER
  const applyFilters = () => {
    setAppliedCategory(selectedCategory);
  };

  // CLEAR FILTER
  const clearFilters = () => {
    setSelectedCategory("");
    setAppliedCategory("");
    setPrice(50000);
    setRating("");
    setIsstock(false);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 6;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-8">

        {/* SEARCH HEADING — show when coming from navbar search */}
        {searchQuery && (
          <p className="text-gray-600 mb-4 text-sm">
            Showing results for{" "}
            <span className="font-semibold text-black">"{searchQuery}"</span>
            {" "}— {products.length} products found
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-6">

          {/* FILTERS */}
          <aside className="w-full lg:w-1/4 border p-4 rounded-lg shadow-lg h-fit">

            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* CATEGORIES */}
            <div className="flex flex-col gap-2">
              {visibleCategories.map((cate) => (
                <label key={cate.slug} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectedCategory === cate.slug}
                    onChange={() => setSelectedCategory(cate.slug)}
                    className="w-5 h-5 mr-1 cursor-pointer"
                  />
                  {cate.name}
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-500 mt-2 text-sm cursor-pointer"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>

            {/* PRICE */}
            <div className="mt-4">
              <h3 className="font-medium mb-1">Price</h3>
              <input
                type="range"
                min={0}
                max={50000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm">${price}</p>
            </div>

            {/* RATING */}
            <div className="mt-4">
              <h3>Rating</h3>
              {[4, 3, 2].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="radio"
                    name="rating"
                    value={r}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <div className="flex">
                    {[...Array(r)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span>& Up</span>
                </label>
              ))}
            </div>

            {/* STOCK */}
            <div className="mt-4">
              <label>
                <input
                  type="checkbox"
                  checked={isStock}
                  onChange={() => setIsstock(!isStock)}
                  className="w-5 h-5 mr-2 cursor-pointer"
                />
                In Stock Only
              </label>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={applyFilters}
                className="bg-blue-600 text-white px-4 py-2 w-full rounded cursor-pointer"
              >
                Apply
              </button>
              <button
                onClick={clearFilters}
                className="bg-black text-white px-4 py-2 w-full rounded cursor-pointer"
              >
                Clear
              </button>
            </div>
          </aside>

          {/* PRODUCTS + PAGINATION */}
          <main className="w-full lg:w-3/4 flex flex-col">

            {/* Product count info */}
            <p className="text-sm text-gray-500 mb-2">
              Showing {paginatedProducts.length} of {products.length} products
            </p>

            {/* No results message */}
            {!loading && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-xl font-semibold">No products found</p>
                {searchQuery && (
                  <p className="text-sm mt-1">
                    Try a different search term or clear your filters
                  </p>
                )}
              </div>
            )}

            {/* Products Grid */}
            <Featured products={paginatedProducts} loading={loading} />

            {/* PAGINATION — hide while loading */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">

                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition cursor-pointer"
                >
                  ← Prev
                </button>

                {getPageNumbers()[0] > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-2 rounded border text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
                    >
                      1
                    </button>
                    {getPageNumbers()[0] > 2 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                  </>
                )}

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded border text-sm font-medium transition cursor-pointer ${
                      currentPage === page
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                  <>
                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-2 rounded border text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition cursor-pointer"
                >
                  Next →
                </button>

              </div>
            )}
          </main>

        </div>
      </section>
    </div>
  );
};

export default Categories;