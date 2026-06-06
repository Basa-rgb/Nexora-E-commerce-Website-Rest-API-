import React, { useEffect, useState } from "react";
import { ShieldCheck, Award, RefreshCw, Headphones } from "lucide-react";
import laptop from "../assets/laptop.png";
import gift from "../assets/gift.png";
import discountTag from "../assets/discount_tag.png";
import freeDelivery from "../assets/delivery.png";
import Banner1 from "../assets/b10.jpg";
import Banner2 from "../assets/b16.jpg";
import Banner3 from "../assets/b18.jpg";


const Offers = () => {

  // Countdown timer state — starts at 8h 45m 32s for the Flash Sale card
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 45,
    seconds: 32,
  });

  // Ticks the countdown every second; clears interval on unmount
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    // Cleanup: stop the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Data for each offer card — controls title, colors, image, button, and special content type
  const offersData = [
    {
      title: "Top Deals",
      subtitle: "Up to",
      discount: "60% OFF",
      image: laptop,
      btn: "Shop Now",
      bg: "bg-orange-50",
      text: "text-orange-500",
      btnColor: "bg-black",
    },
    {
      title: "FLASH SALE",
      subtitle: "Limited Time Only!",
      timer: true,           // renders the live countdown timer
      btn: "Shop Flash Deals",
      bg: "bg-red-50",
      text: "text-red-500",
      btnColor: "bg-red-500",
    },
    {
      title: "Clearance Sale",
      subtitle: "Up to",
      discount: "70% OFF",
      btn: "Shop Clearance",
      bg: "bg-purple-50",
      text: "text-purple-500",
      btnColor: "bg-purple-500",
    },
    {
      title: "Extra 10% OFF",
      subtitle: "Use Code",
      coupon: "SAVE10",      // renders the dashed coupon box with copy button
      image: discountTag,
      btn: "Copy Code",
      bg: "bg-green-50",
      text: "text-green-600",
      btnColor: "bg-green-500",
    },
    {
      title: "Buy 2 Get 1",
      subtitle: "Bundle Offer",
      discount: "FREE",
      image: gift,
      btn: "Shop Bundles",
      bg: "bg-yellow-50",
      text: "text-orange-500",
      btnColor: "bg-orange-500",
    },
    {
      title: "FREE SHIPPING",
      subtitle: "Orders Above ₹999",
      image: freeDelivery,
      btn: "Shop Now",
      bg: "bg-blue-50",
      text: "text-blue-600",
      btnColor: "bg-blue-500",
    },
  ];

  // Data for the trust/reassurance feature strip below the offer cards
  const trustFeatures = [
    {
      id: 1,
      icon: Award,
      title: "100% Original Products",
      subtitle: "Sourced Directly",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Secure Payments",
      subtitle: "100% Safe & Secure",
    },
    {
      id: 3,
      icon: RefreshCw,
      title: "Easy Returns",
      subtitle: "Within 7 Days",
    },
    {
      id: 4,
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "We're Here to Help",
    },
  ];

  // Copies the coupon code to the clipboard and alerts the user
  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    alert("Coupon copied!");
  };

  // Data for the promotional banner images shown at the bottom of the page
  const BannerImg = [
    {
      image: Banner1,
      title: "Shop the Latest Deals",
      description: "Find quality products at unbeatable prices",
      button: "Collection",
    },
    {
      image: Banner2,
      title: "New Arrivals",
      description: "Fresh collection updated daily",
      button: "Shop Now",
    },
    {
      image: Banner3,
      title: "Big Discount Sale",
      description: "Save more on your favorite items",
      button: "Explore"
    }
  ];

  return (
    <div className="py-12 px-4">

      {/* ── Page Heading ── */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold">Best Offers</h1>
        <p className="text-gray-500 mt-2">
          Save more with exclusive deals and discounts
        </p>
      </section>

      {/* ── Offer Cards Grid ── */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {offersData.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-xl p-5 h-84 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <div>
              <h2 className="font-bold text-lg">
                {item.title}
              </h2>

              {item.subtitle && (
                <p className="text-sm text-gray-600 mt-1">
                  {item.subtitle}
                </p>
              )}

              {/* Conditional content area:
                  - timer: live countdown for Flash Sale
                  - coupon: dashed box showing the coupon code
                  - discount: large bold discount percentage/text */}
              {item.timer ? (
                <div className="flex justify-center gap-2 mt-5">
                  {/* Hours block */}
                  <div className="bg-white rounded-lg p-2 text-center w-14">
                    <h3 className="font-bold text-xl">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </h3>
                    <p className="text-[10px]">HRS</p>
                  </div>

                  {/* Minutes block */}
                  <div className="bg-white rounded-lg p-2 text-center w-14">
                    <h3 className="font-bold text-xl">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </h3>
                    <p className="text-[10px]">MIN</p>
                  </div>

                  {/* Seconds block */}
                  <div className="bg-white rounded-lg p-2 text-center w-14">
                    <h3 className="font-bold text-xl">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </h3>
                    <p className="text-[10px]">SEC</p>
                  </div>
                </div>
              ) : item.coupon ? (
                // Dashed coupon code box
                <div className="mt-5">
                  <div className="bg-white border-2 border-dashed border-green-500 rounded-lg p-3 text-center">
                    <span className="font-bold text-lg">
                      {item.coupon}
                    </span>
                  </div>
                </div>
              ) : (
                // Large discount label (e.g. "60% OFF", "FREE")
                item.discount && (
                  <h3
                    className={`text-4xl font-extrabold mt-4 ${item.text}`}
                  >
                    {item.discount}
                  </h3>
                )
              )}
            </div>

            <div className="flex flex-col items-center">
              {/* Optional product/promo image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-32 object-contain mb-4"
                />
              )}

              {/* CTA button — triggers copyCoupon if the card has a coupon code */}
              <button
                onClick={() =>
                  item.coupon
                    ? copyCoupon(item.coupon)
                    : null
                }
                className={`${item.btnColor} text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition cursor-pointer`}
              >
                {item.btn}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ── Trust Features Strip ── */}
      <section className="bg-amber-100 py-8 px-6 mt-10">
        <div className=" flex  lg:flex-row flex-wrap justify-between lg:items-center items-start">
          {trustFeatures.map((item, index) => {
            const Icon = item.icon; // Dynamically render the Lucide icon component
            return (
              <div key={index} className="flex  items-center gap-4 p-4 rounded-xl" >
                {/* Icon in blue */}
                <div className="text-blue-600">
                  <Icon size={40} />
                </div>
                {/* Feature title and subtitle */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Promotional Banner Images ── */}
      <section className="py-10">
        <div className="flex flex-wrap justify-center gap-4">
          {BannerImg.map((item, index) => (
            <div
              key={index}
              className="relative w-full sm:w-[48%] lg:w-[32%] h-60"
            >
              {/* Banner background image */}
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />

              {/* Dark overlay for text readability */}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-md"></div>

              {/* Centered text and CTA button over the banner image */}
              {/* Text */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="text-sm mt-2">{item.description}</p>
                <a className="px-4 py-2   border border-gray-300 mt-3 rounded-md font-semibold hover:bg-black hover:text-white hover:scale-105 transition duration-300 cursor-pointer">{item.button}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Offers;