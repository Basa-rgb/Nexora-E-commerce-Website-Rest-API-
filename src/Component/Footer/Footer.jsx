import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { ShieldCheck, ChevronRight } from "lucide-react";
import {
  CircleHelp,
  Truck,
  RefreshCcw,
  Wallet,
  Package,
  Headphones,
  BadgeCheck,


} from "lucide-react";
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from "lucide-react";
import paypal from "../../assets/paypal.jpg";
import esewa from "../../assets/esewa.jpg";
import khalti from "../../assets/khalti.jpg"
import { LucideAArrowDown } from 'lucide-react';

// Data Array for QucikLinks
const quickLinks = [
  "Home",
  "Shop",
  "Categories",
  "New Arrivals",
  "Best Sellers",
  "Deals",
  "Contact Us",
];

// Data array of the Support Links
const supportLinks = [
  { name: "FAQ", icon: CircleHelp },
  { name: "Shipping Info", icon: Truck },
  { name: "Return Policy", icon: RefreshCcw },
  { name: "Refund Policy", icon: Wallet },
  { name: "Order Tracking", icon: Package },
  { name: "Help Center", icon: Headphones },
];

// Data Array of Company

const companyLinks = [
  "About Us",
  "Careers",
  "Blog",
  "Privacy Policy",
  "Terms & Condition"
]

const ContactUS = [
  { name: "nexora@gmail.com", icon: MailIcon },
  { name: "+9749328435", icon: PhoneIcon },
  { name: "Kathmandu ,Nepal", icon: MapPinIcon },
  { name: "Mon - Sat: 10:00 AM - 6:00 PM", icon: ClockIcon },

];

// Array Data of Features

const features = [
  {
    icon: BadgeCheck,
    title: "Premium Quality",
    subtitle: "Top quality products",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "Across Nepal",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    subtitle: "7-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "We're here to help",
  },
];

const Footer = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 p-6 gap-10 bg-[#080F1B]'>
      {/* section -1 */}
      <div className="space-y-8">
        {/* Logo & Description */}
        <div>
          <h1 className="text-4xl  font-bold text-white">
            <span className="text-blue-500">N</span>exora
          </h1>

          <p className="mt-3 text-gray-400 leading-relaxed max-w-xs">
            Modern shopping experience for fashion, tech, and lifestyle essentials.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex gap-3">
            <span className="p-3 rounded-full border border-slate-700 text-gray-300 hover:text-blue-400 hover:border-blue-500 transition-all duration-300 cursor-pointer">
              <FaFacebook size={18} />
            </span>

            <span className="p-3 rounded-full border border-slate-700 text-gray-300 hover:text-blue-400 hover:border-blue-500 transition-all duration-300 cursor-pointer">
              <FaTwitter size={18} />
            </span>

            <span className="p-3 rounded-full border border-slate-700 text-gray-300 hover:text-blue-400 hover:border-blue-500 transition-all duration-300 cursor-pointer">
              <FaInstagram size={18} />
            </span>

            <span className="p-3 rounded-full border border-slate-700 text-gray-300 hover:text-blue-400 hover:border-blue-500 transition-all duration-300 cursor-pointer">
              <FaYoutube size={18} />
            </span>
          </div>
        </div>

        {/* Payments */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            We Accept
          </h3>

          <div className="flex items-center gap-3">
            <a
              href="https://www.paypal.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-lg p-2 hover:scale-105 transition-transform"
            >
              <img
                src={paypal}
                className="object-contain h-8 w-14"
                alt="PayPal"
              />
            </a>

            <a
              href="https://esewa.com.np"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-lg p-2 hover:scale-105 transition-transform"
            >
              <img
                src={esewa}
                className="object-contain h-8 w-14"
                alt="eSewa"
              />
            </a>

            <a
              href="https://khaltibyime.khalti.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-lg p-2 hover:scale-105 transition-transform"
            >
              <img
                src={khalti}
                className="object-contain h-8 w-14"
                alt="Khalti"
              />
            </a>
          </div>
        </div>

        {/* Trust & Security */}
        <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/40 cursor-pointer">
          <h3 className="text-lg font-semibold text-white mb-4">
            Trust & Security
          </h3>

          <div className="flex items-start gap-4">
            <div className="text-blue-500">
              <ShieldCheck size={38} />
            </div>

            <div>
              <h4 className="text-white font-medium">
                100% Secure Payment
              </h4>

              <p className="text-sm text-gray-400 mt-1">
                Your payment information is protected with advanced security
                encryption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section -2 */}

      {/* Quick Links */}

      <div>
        <h3 className='text-white font-bold uppercase'>Quick Links</h3>
        <div className="w-10 h-[2px] bg-blue-500 my-3"></div>
        <ul className='space-y-5'>
          {quickLinks.map((link) => (
            <li key={link}
              className='flex  items-center gap-2 text-white text-lg hover:text-blue-400 cursor-pointer transition'>
              <ChevronRight size={22} />
              {link}
            </li>
          ))}
        </ul>

        {/* End of Section 2  Customer Support */}
      </div>


      {/* Section -3 */}

      <div>
        <h3 className='text-lg text-white uppercase'>Customer Support</h3>
        <div className='w-10 h-[2px] my-3 bg-blue-500'></div>
        <ul className='space-y-7'>
          {supportLinks.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className='flex items-center gap-4 text-white text-lg hover:text-blue-400 cursor-pointer transition'>
                <Icon size={22} color='#2563eb' />
                <span>{item.name}</span>
              </li>
            )
          })}
        </ul>
        {/* End of Section -3 */}
      </div>

      {/* Section -4 Company */}

      <div>
        <h3 className='text-lg text-white uppercase'>Company</h3>
        <div className='w-10 h-[2px] my-3 bg-blue-500'></div>
        <ul className='space-y-5'>
          {companyLinks.map((item) => (
            <li key={item}
              className='flex  items-center gap-2 text-white text-lg hover:text-blue-400 cursor-pointer transition'>
              <ChevronRight size={22} />
              {item}
            </li>
          ))}
        </ul>
        {/* End of section 4 */}
      </div>


      {/* Section -5 Newsletter + Contact Part */}

      <div>
        {/* Newsletter part */}
        <div>
          <h3 className='text-lg text-white uppercase'>Newsletter</h3>
          <div className='w-10 h-[2px] bg-blue-500 my-3'></div>
          <p className='text-lg text-white mb-3'>Get updates on new drops and exclusive offers.</p>
          <div className=' flex  border border-purple-600  rounded-md overflow-hidden'>
            <input type="text" placeholder='Enter Your email' className='outline-none w-full flex-1 py-2 px-3 placeholder:text-gray-500 placeholder:text-sm  text-white' />
            <button className='bg-purple-600 px-6 cursor-pointer'>Subscribe</button>
          </div>
          {/* End of Newsletter */}
        </div>

        {/* Contact Us Section */}
        <div className='py-10'>
          <h3 className='text-lg text-white uppercase'> Contact Us</h3>
          <div className='w-10 h-[2px] bg-blue-600 my-3'></div>
          <ul className='space-y-5'>
            {ContactUS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name} className='flex items-center gap-4 text-white text-lg hover:text-blue-400 cursor-pointer transition'>
                  <Icon size={22} color='#2563eb' />
                  <span>{item.name}</span>
                </li>
              )
            })}
          </ul>
          {/* End of Section -5 */}
        </div>
      </div>

      {/* First horizontal Border  */}
      <hr className="col-span-full border-0 h-[1px] bg-gray-600 my-4" />

      {/* Starting of features sectiom */}
      <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`flex items-center gap-4 px-6 py-6 ${index !== features.length - 1
                ? "lg:border-r border-slate-700"
                : ""
                }`}
            >
              <Icon size={40} className="text-blue-700 shrink-0" />

              <div>
                <h3 className="text-white text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
        {/* End of Feature section */}
      </div>
      {/* second border start */}
      <hr className="col-span-full border-0 h-[1px] bg-gray-600 my-4" />


      {/* start of  policy terms and site map */}
      <div className='col-span-full flex  flex-col  md:flex-row justify-center items-center  gap-6'>

        <p className='text-white '>
          &copy; 2026 Nexora. All rights reserved.
        </p>


        <div className='flex flex-col md:flex-row items-center gap-4'>
          <a href="#" className='text-gray-600 hover:text-white transition'>  Privacy Policy</a>
          <span className='text-gray-600 hidden md:block'>|</span>

          <a href="#" className='text-gray-600 hover:text-white transition'>Terms & Condition</a>
          <span className='text-gray-600 hidden md:block'>|</span>

          <a href="#" className='text-gray-600 hover:text-white transition'>Sitemap</a>

        </div>
        {/* /End of policy terms and site map */}
      </div>

      <div />

    </div>
  )
}

export default Footer
