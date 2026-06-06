import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Offers from "./pages/Offers";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Error404 from "./pages/NotFound"

import { WishlistProvider } from "./Context/WishlistContext";
import { CartProvider } from "./Context/AddtoCart";


const App = () => {
  return (
    // BrowserRouter enables client-side routing throughout the app
    <BrowserRouter>

      {/* WishlistProvider makes wishlist state available to all child components */}
      <WishlistProvider>

        {/* CartProvider makes cart state available to all child components */}
        <CartProvider>

          {/* Full-height flex column keeps the footer pinned to the bottom */}
          <div className="min-h-screen flex flex-col bg-white">

            {/* Global navigation bar — rendered on every page */}
            <Navbar />

            {/* Main content area — pt-16 offsets the fixed navbar height */}
            <main className="flex-1 pt-16">
              <Routes>
                {/* Home page */}
                <Route path="/" element={<Home />} />

                {/* Product listing with filters and search */}
                <Route path="/categories" element={<Categories />} />

                {/* Dynamic product detail page — :id maps to the product ID */}
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* Shopping cart page */}
                <Route path="/cart" element={<Cart />} />

                {/* Deals and offers page */}
                <Route path="/offers" element={<Offers />} />

                {/* About us page */}
                <Route path="/about" element={<About />} />

                {/* Saved / wishlist page */}
                <Route path="/wishlist" element={<Wishlist />} />

                {/* Catch-all route — renders 404 page for unmatched paths */}
                <Route path="*" element={<Error404 />} />
              </Routes>
            </main>

            {/* Global footer — rendered on every page */}
            <Footer />

          </div>
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
};

export default App;