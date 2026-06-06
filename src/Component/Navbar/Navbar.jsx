import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Heart, X, Menu } from "lucide-react";
import { IoCartOutline } from "react-icons/io5";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useWishlist } from "../../Context/WishlistContext";
import { useCart } from "../../Context/AddtoCart";
import Cart from "../../pages/Cart";

const Navbar = () => {
  // Get wishlist items from context
  const { wishlist } = useWishlist();

  // Get cart items from context
  const { cart } = useCart();

  // React Router navigation
  const navigate = useNavigate();

  // Search input state
  const [query, setQuery] = useState("");

  // Handle product search
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/categories?search=${query.trim()}`);
    }
  };

  // Navigation links data
  const NavLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Offers", path: "/offers" },
    { name: "About", path: "/about" },
  ];

  // Mobile menu open/close state
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full mx-auto bg-white shadow-md fixed left-0 mb-0 top-0 z-50">
      <div className="max-w-7xl mx-auto flex px-6 py-4 items-center justify-center">

        {/* ================= Logo ================= */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide cursor-pointer">
            <Link to="/">
              <span className="text-indigo-600">N</span>exora
            </Link>
          </h1>
        </div>

        {/* ================= Desktop Navigation ================= */}
        <div className="hidden lg:flex flex-1 justify-center gap-8 text-[18px]">
          {NavLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "relative text-indigo-600 font-semibold transition"
                  : "relative group hover:text-indigo-400 transition"
              }
            >
              <span>{item.name}</span>

              {/* Hover underline effect */}
              <span className="absolute -bottom-1 left-0 h-[3px] bg-indigo-500 w-0 group-hover:w-1/2 transition-all" />
            </NavLink>
          ))}
        </div>

        {/* ================= Search Bar ================= */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center border border-gray-400 rounded-md focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products...."
              value={query}
              onChange={(e) => setQuery(e.target.value)}

              // Search when Enter key is pressed
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="outline-none bg-transparent px-4 py-1.5 w-44"
            />

            {/* Search Icon */}
            <Search
              size={24}
              className="text-gray-500 mr-3 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>

        {/* ================= Desktop Icons ================= */}
        <div className="hidden lg:flex items-center gap-8">

          {/* Wishlist */}
          <div
            onClick={() => navigate("/wishlist")}
            className="group flex flex-col items-center cursor-pointer hover:scale-105 transition relative"
          >
            <div className="relative">
              <Heart size={36} />

              {/* Wishlist Count Badge */}
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>

            <span className="text-sm font-medium">Wishlist</span>
          </div>

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="group flex flex-col items-center cursor-pointer hover:scale-105 transition relative"
          >
            <div className="relative cursor-pointer">
              <IoCartOutline size={36} />

              {/* Cart Count Badge */}
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>

            <span className="text-sm font-medium">Cart</span>
          </div>

          {/* Clerk Authentication */}
          <div>
            <SignedOut>
              {/* Sign In Button shown when logged out */}
              <SignInButton className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md cursor-pointer transition" />
            </SignedOut>

            <SignedIn>
              {/* User Profile shown when logged in */}
              <UserButton />
            </SignedIn>
          </div>
        </div>

        {/* ================= Mobile Menu Toggle ================= */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden cursor-pointer"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ================= Mobile Overlay ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ================= Mobile Sidebar ================= */}
      <div
        className={`fixed top-16 right-0 w-[260px] h-screen bg-white shadow-xl p-6 transform transition-all duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 font-semibold">

          {/* Mobile Navigation Links */}
          {NavLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="py-2"
            >
              {item.name}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="border-t pt-4" />

          {/* Mobile Wishlist */}
          <div
            onClick={() => {
              navigate("/wishlist");
              setOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer py-2"
          >
            <div className="relative">
              <Heart size={28} />

              {/* Wishlist Count */}
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>

            <span>Wishlist ({wishlist.length})</span>
          </div>

          {/* Mobile Cart */}
          <div
            onClick={() => {
              navigate("/cart");
              setOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer py-2"
          >
            <div className="relative">
              <IoCartOutline size={28} />

              {/* Cart Count */}
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>

            <span>Cart ({cart.length})</span>
          </div>

          {/* Mobile Authentication */}
          <div className="pt-4">
            <SignedOut>
              {/* Sign In Button */}
              <SignInButton className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full" />
            </SignedOut>

            <SignedIn>
              {/* User Profile */}
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;