import React, { useState } from "react";
import { useCart } from "../Context/AddtoCart";
import noProductImg from "../assets/Noproduct.png";
import { MdLock, MdEmail, MdPhone } from "react-icons/md";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import Feature from "../Component/FeaturedProduct/Featured";
import {
  ShieldCheck,
  RefreshCcw,
  Headphones,
  AlertCircleIcon,
  Truck,
  BadgeCheck,
  Heart,
} from "lucide-react";
import paypal from "../assets/paypal.jpg";
import esewa from "../assets/esewa.jpg";
import khalti from "../assets/khalti.jpg";
import { useWishlist } from "../Context/WishlistContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // ── CONTEXT & NAVIGATION ──
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // ── COUPON STATE ──
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Validates the entered coupon code; applies 10% discount if "SAVE10"
  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon code.");
    }
  };

  // ── PRICE CALCULATIONS ──

  // Subtotal: sum of (discounted unit price × qty) for all cart items
  const subtotal = cart.reduce((total, item) => {
    const qty = item.qty || 1;
    const discount = (item.price * item.discountPercentage) / 100;
    return total + (item.price - discount) * qty;
  }, 0);

  // Total savings from product-level discounts across all items
  const totalDiscount = cart.reduce((total, item) => {
    const qty = item.qty || 1;
    const discount = (item.price * item.discountPercentage) / 100;
    return total + discount * qty;
  }, 0);

  // Additional 10% off subtotal if a valid coupon is applied
  const couponDiscount = couponApplied ? subtotal * 0.1 : 0;

  // Shipping: 5% of subtotal, capped at $3; free if cart is empty
  let shipping = 0;
  if (cart.length > 0) {
    shipping = subtotal * 0.05;
    if (shipping > 3) shipping = 3;
  }

  // ── DELIVERY DATE ESTIMATE ──
  const today = new Date();
  const minDelivery = new Date();
  minDelivery.setDate(today.getDate() + 3);
  const maxDelivery = new Date();
  maxDelivery.setDate(today.getDate() + 7);

  // Formats a Date object to "Mon DD" string (e.g. "Jun 10")
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  // ── TAX CALCULATION ──
  // Tax rate is tiered based on subtotal value
  let taxRate = 0;
  if (subtotal <= 50) taxRate = 0.05;
  else if (subtotal <= 200) taxRate = 0.08;
  else taxRate = 0.12;

  const tax = subtotal * taxRate;

  // Grand total: subtotal minus coupon discount, plus shipping and tax
  const Total = subtotal - couponDiscount + shipping + tax;

  // Returns true if the item's availability status is "In Stock" (case-insensitive)
  const isStock = (status) => status?.toLowerCase() === "in stock";

  return (
    <div className="min-h-screen p-3 sm:p-6 mt-14">

      {/* ── TWO COLUMN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-4">

          {/* ── Header + Trust Badges ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4">
            <h1 className="text-xl sm:text-2xl font-bold whitespace-nowrap">
              Shopping Cart{" "}
              <span className="text-gray-400 text-base sm:text-lg">({cart.length})</span>
            </h1>

            {/* Trust badges — wrap on small screens */}
            <div className="flex flex-wrap gap-3 sm:gap-5 justify-start sm:justify-center">

              {/* Badge: Secure Checkout */}
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="text-green-600 shrink-0" size={20} />
                <div>
                  <p className="font-medium text-xs sm:text-sm leading-tight">Secure checkout</p>
                  <p className="text-xs text-gray-500 leading-tight">SSL encrypted</p>
                </div>
              </div>

              {/* Badge: Free Returns */}
              <div className="flex items-center gap-1.5">
                <RefreshCcw className="text-blue-600 shrink-0" size={20} />
                <div>
                  <p className="font-medium text-xs sm:text-sm leading-tight">Free returns</p>
                  <p className="text-xs text-gray-500 leading-tight">Easy 30-day return</p>
                </div>
              </div>

              {/* Badge: 24/7 Support */}
              <div className="flex items-center gap-1.5">
                <Headphones className="text-orange-600 shrink-0" size={20} />
                <div>
                  <p className="font-medium text-xs sm:text-sm leading-tight">24/7 support</p>
                  <p className="text-xs text-gray-500 leading-tight">We're here to help</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── PRODUCT LIST / EMPTY STATE ── */}
          {/* Shows empty state image when cart has no items */}
          {cart.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
              <img
                src={noProductImg}
                alt="No Product"
                className="object-contain max-w-full w-[280px] sm:w-[400px]"
              />
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 p-3 sm:p-4 rounded-lg shadow-sm"
                >
                  {/* ── Top row: product image + info ── */}
                  <div className="flex gap-3 sm:gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold leading-snug line-clamp-2">
                        {item.title}
                      </h2>

                      {/* Availability status — green for in stock, red otherwise */}
                      <p
                        className={`text-sm mt-0.5 ${
                          isStock(item.availabilityStatus)
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item?.availabilityStatus}
                      </p>

                      {/* Wishlist toggle + Remove item actions */}
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm">
                        {/* Heart icon fills red if item is already in wishlist */}
                        <span
                          onClick={() => toggleWishlist(item)}
                          className="cursor-pointer"
                        >
                          <Heart
                            size={20}
                            fill={
                              wishlist.some((p) => p.id === item.id)
                                ? "red"
                                : "none"
                            }
                            color={
                              wishlist.some((p) => p.id === item.id)
                                ? "red"
                                : "currentColor"
                            }
                          />
                        </span>
                        <p className="text-gray-600">Save for later</p>

                        {/* Vertical divider between actions */}
                        <div className="w-px h-4 bg-gray-400" />

                        {/* Remove item from cart */}
                        <span
                          onClick={() => removeFromCart(item.id)}
                          className="cursor-pointer text-red-500"
                        >
                          <FaTrashAlt size={17} />
                        </span>
                        <p className="text-gray-600">Remove</p>
                      </div>
                    </div>
                  </div>

                  {/* ── Bottom row: unit price + qty controls + discounted total ── */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">

                    {/* Unit price display */}
                    <div className="text-sm">
                      <span className="font-medium">${item.price}</span>
                      <p className="text-gray-500 text-xs">Unit price</p>
                    </div>

                    {/* Quantity increment / decrement controls */}
                    <div className="flex items-center gap-2 border px-2 py-1 rounded-md">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={12} />
                      </button>
                      <p className="text-base font-semibold w-6 text-center">
                        {item.qty || 1}
                      </p>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    {/* Item total after applying product-level discount */}
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">
                        $
                        {(
                          (item.price -
                            (item.price * item.discountPercentage) / 100) *
                          (item.qty || 1)
                        ).toFixed(2)}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        With discount
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* ── END LEFT COLUMN ── */}

        {/* ── RIGHT COLUMN (Order Summary) ── */}
        {/* Sticky on large screens so it stays visible while scrolling the product list */}
        <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
          <div className="w-full rounded-lg p-4 sm:p-6 shadow-2xl border border-gray-200 flex flex-col">

            <div className="flex justify-center mb-3">
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>

            {/* Subtotal line — shows item count and running total */}
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-sm sm:text-base">
                Subtotal ({cart.length} item{cart.length !== 1 ? "s" : ""})
              </h3>
              <p className="font-medium">${subtotal.toFixed(2)}</p>
            </div>

            {/* Coupon input with inline Apply button */}
            <div className="flex items-center border border-gray-400 rounded-md focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition overflow-hidden mb-1">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 outline-none bg-transparent px-3 py-2 text-sm min-w-0"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 hover:bg-blue-700 transition cursor-pointer text-sm shrink-0"
              >
                Apply
              </button>
            </div>

            {/* Coupon success / error feedback messages */}
            {couponApplied && (
              <p className="text-green-500 text-xs mb-2">Coupon applied! 10% off.</p>
            )}
            {couponError && (
              <p className="text-red-500 text-xs mb-2">{couponError}</p>
            )}

            {/* Product-level discount total */}
            <div className="flex justify-between py-1 text-sm sm:text-base">
              <h3>Discount</h3>
              <p className="text-red-500">-${totalDiscount.toFixed(2)}</p>
            </div>

            {/* Coupon discount line — only visible when coupon is successfully applied */}
            {couponApplied && (
              <div className="flex justify-between py-1 text-sm sm:text-base">
                <h3>Coupon (SAVE10)</h3>
                <p className="text-red-500">-${couponDiscount.toFixed(2)}</p>
              </div>
            )}

            {/* Shipping cost */}
            <div className="flex justify-between py-1 text-sm sm:text-base">
              <h3>Shipping</h3>
              <p className="text-green-500">${shipping.toFixed(2)}</p>
            </div>

            {/* Estimated delivery date range */}
            <p className="text-xs text-gray-500 pb-1">
              Estimated delivery: {formatDate(minDelivery)} – {formatDate(maxDelivery)}
            </p>

            {/* Taxes with info icon */}
            <div className="flex justify-between items-center py-1 text-sm sm:text-base">
              <div className="flex items-center gap-1.5">
                <h3>Taxes</h3>
                <AlertCircleIcon size={16} className="text-gray-500" />
              </div>
              <p className="text-green-500">${tax.toFixed(2)}</p>
            </div>

            <hr className="border-gray-300 my-2" />

            {/* Grand total */}
            <div className="flex justify-between font-semibold text-base py-1">
              <h3>Total</h3>
              <p>${Total.toFixed(2)}</p>
            </div>

            {/* Fast delivery promotional note */}
            <div className="flex gap-2 py-2 text-green-500 text-sm">
              <Truck size={18} className="shrink-0" />
              <p>Fast and quick delivery!</p>
            </div>

            {/* Checkout button — animated lock icon slides in on hover */}
            <button className="group relative mt-2 w-full h-[44px] rounded-xl bg-black flex items-center justify-center overflow-hidden shadow-md transition-transform active:scale-95 cursor-pointer">
              <span className="absolute left-[-50px] w-[30px] h-[30px] flex items-center justify-center transition-all duration-500 group-hover:translate-x-[58px] text-white">
                <MdLock size={22} />
              </span>
              <span className="text-sm sm:text-base font-semibold text-white transition-all duration-500 group-hover:translate-x-[10px]">
                Proceed to Checkout
              </span>
            </button>

            {/* Continue Shopping — navigates back to home */}
            <button
              onClick={() => navigate("/")}
              className="mt-3 w-full h-[44px] rounded-xl bg-transparent border font-semibold hover:scale-105 transition-transform cursor-pointer text-sm sm:text-base"
            >
              Continue Shopping
            </button>

            <div className="flex justify-center items-center py-3">
              <p className="text-sm text-gray-500">Or check out with</p>
            </div>

            {/* Payment gateway logos — PayPal, eSewa, Khalti */}
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              <a href="https://www.paypal.com" target="_blank" rel="noreferrer">
                <img
                  src={paypal}
                  className="object-contain h-14 sm:h-20 w-20 sm:w-24 rounded"
                  alt="PayPal"
                />
              </a>
              <a href="https://esewa.com.np" target="_blank" rel="noreferrer">
                <img
                  src={esewa}
                  className="object-contain h-14 sm:h-20 w-20 sm:w-24 rounded"
                  alt="eSewa"
                />
              </a>
              <a href="https://khaltibyime.khalti.com" target="_blank" rel="noreferrer">
                <img
                  src={khalti}
                  className="object-contain h-14 sm:h-20 w-20 sm:w-24 rounded"
                  alt="Khalti"
                />
              </a>
            </div>

            {/* Secure checkout reassurance badge */}
            <div className="flex items-center gap-3 py-3">
              <ShieldCheck size={32} className="text-green-500 shrink-0" />
              <div>
                <p className="text-sm sm:text-base font-bold">100% secure checkout</p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Your information is safe with us.
                </p>
              </div>
            </div>

            {/* Security icons grid: SSL, Returns, Secure Payment, Privacy */}
            <div className="grid grid-cols-4 gap-1 py-2">
              <div className="flex flex-col items-center text-center">
                <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-1" />
                <p className="text-xs font-semibold uppercase leading-tight">SSL</p>
                <p className="text-xs text-gray-500 leading-tight">Encrypted</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-1" />
                <p className="text-xs font-semibold uppercase leading-tight">30-days</p>
                <p className="text-xs text-gray-500 leading-tight">Returns</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <MdLock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-1" />
                <p className="text-xs font-semibold uppercase leading-tight">Secure</p>
                <p className="text-xs text-gray-500 leading-tight">Payment</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-1" />
                <p className="text-xs font-semibold uppercase leading-tight">Privacy</p>
                <p className="text-xs text-gray-500 leading-tight">Protected</p>
              </div>
            </div>

            <hr className="border-gray-200 my-2" />

            {/* Help section — contact email and phone */}
            <div className="border rounded-2xl p-3 sm:p-4 mt-auto">
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">Need help?</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                Our customer support is here for you.
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 mb-2">
                <MdEmail className="text-blue-600 text-base sm:text-lg shrink-0" />
                <span>nexora@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <MdPhone className="text-green-600 text-base sm:text-lg shrink-0" />
                <span>+01 421 766</span>
              </div>
            </div>

          </div>
        </div>
        {/* ── END RIGHT COLUMN ── */}

      </div>

      {/* Featured products section rendered below the cart */}
      <Feature />

    </div>
  );
};

export default Cart;