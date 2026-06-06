import React, { useState } from 'react'
import About_banner from "../assets/banner_Of_Hero.jpg";
// import banner2 from "../assets/Banner_2 for about.jpg";
import {
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaHeadset,

} from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";


const About = () => {

  // Data for "Why Choose Us" section — each item has an icon, title, and description
  const whyChooseUs = [
    {
      icon: FaTruck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep.",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Payments",
      description: "Safe and protected transactions every time.",
    },
    {
      icon: FaStar,
      title: "Quality Products",
      description: "Carefully selected products with guaranteed quality.",
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Friendly customer support whenever you need help.",
    },
  ];

  // Data for the Testimonials section — customer reviews with name, rating, and avatar
  const testimonials = [
    {
      name: "Sarah Johnson",
      review:
        "Amazing product quality and fast delivery. The entire shopping experience was smooth and hassle-free.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Brown",
      review:
        "Excellent customer support and secure checkout process. Highly recommended.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Emma Wilson",
      review:
        "The products matched the description perfectly. I'll definitely shop here again.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  // Data for the FAQ section — question and answer pairs
  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Most orders are delivered within 3-7 business days, depending on your location.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, debit cards, and other secure payment options available at checkout.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes, eligible products can be returned within our return period. Please check our return policy for details.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, all transactions are encrypted and processed through secure payment gateways.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our support team through email, phone, or the contact form on our website.",
    },
  ];

  // Tracks which FAQ item is currently expanded; null means all are collapsed
  const [activeIndex, setActiveIndex] = useState(null)

  // Toggles a FAQ open or closes it if it's already active
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen py-6">

      {/* ───────────────────────────────────────────
          Hero / About Intro Section
          Left: text description | Right: banner image
      ─────────────────────────────────────────── */}
      <div className='flex flex-col px-6 lg:flex-row justify-between items-center max-w-7xl mx-auto gap-12 '>

        {/* Paragraph Section */}
        <div className='lg:w-1/2'>
          <h1 className='text-2xl md:text-4xl text-blue-600 mb-3 font-semibold'>About Us </h1>
          <p className='text-justify leading-relaxed '>At Nexora, we believe online shopping should be simple, secure, and enjoyable. Our mission is to bring customers high-quality products at competitive prices while providing a seamless shopping experience. From carefully selected collections to fast delivery and reliable customer support, every part of our store is designed with our customers in mind. Whether you're looking for the latest trends or everyday essentials, Nexora is committed to helping you shop with confidence.
          </p>
        </div>

        {/* Banner Image Section */}
        <div className='lg:w-1/2 '>
          <img src={About_banner} alt="banner" className='w-full object-contain rounded-2xl ' />
        </div>
      </div>

      {/* ───────────────────────────────────────────
          Statistics Section
          Displays key business numbers with dark gradient background
      ─────────────────────────────────────────── */}
      <div className='flex justify-center items-center mb-3  text-2xl lg:text-4xl font-semibold '>
        <h1> Statistics Of <span className='text-blue-600 font-bold'>N</span>exora</h1>
      </div>

      <div className='bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 flex flex-col lg:flex-row  justify-evenly items-center text-white py-6 '>

        {/* Stat: Products Sold */}
        <div className='text-2xl flex flex-col items-center gap-2'>
          <p className='text-4xl md:text-5xl font-bold flex items-center'>
            10000+
          </p>
          <h2 className=' text-base md:text-lg font-medium'>Products Sold</h2>
        </div>

        {/* Stat: Happy Customers */}
        <div className='text-2xl flex flex-col items-center gap-2'>
          <p className='text-4xl md:text-5xl font-bold'>5,000+</p>
          <h2 className=' text-base md:text-lg font-medium'>Happy Customers</h2>
        </div>

        {/* Stat: Products Available */}
        <div className='text-2xl flex flex-col items-center gap-2'>
          <p className='text-4xl md:text-5xl font-bold'>500+</p>
          <h2 className=' text-base md:text-lg font-medium'>Products Available</h2>
        </div>

        {/* Stat: Customer Satisfaction */}
        <div className='text-2xl flex flex-col items-center gap-2'>
          <p className='text-4xl md:text-5xl font-bold'>99%</p>
          <h2 className=' text-base md:text-lg font-medium'>
            Customer Satisfaction</h2>
        </div>

      </div>

      {/* ───────────────────────────────────────────
          Why Choose Us Section
          Renders feature cards from whyChooseUs array
      ─────────────────────────────────────────── */}
      <section className='max-w-7xl mx-auto py-20 px-4'>
        <div className='flex items-center justify-center  py-10'>
          <h1 className=' text-2xl md:text-4xl font-semibold'>Why Choose Us</h1>
        </div>

        {/* Grid of feature cards — 1 col on mobile, 2 on md, 4 on lg */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-3 '>
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon; // Dynamically render the React Icon component
            return (
              <div key={index} className='flex flex-col flex-wrap  items-center  border-gray-400 shadow-2xl  rounded-2xl h-full p-4 cursor-pointer hover:translate-y-1.5 transition transform'>

                {/* Icon container with blue tinted circle background */}
                <div className='w-16 h-16 bg-blue-600/10 rounded-full mb-4 flex items-center justify-center text-blue-600'>
                  <Icon size={40} />
                </div>

                {/* Card title and description */}
                <div className='flex flex-col items-center py-4'>
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='text-gray-500 text-center leading-relaxed mt-2'>{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

      </section>

      {/* ───────────────────────────────────────────
          Testimonials Section
          Customer review cards with avatar, name, star rating, and review text
      ─────────────────────────────────────────── */}
      <section>
        <div className='flex justify-center items-center mb-4'>
          <h1 className='text-2xl md:text-4xl font-semibold'>Testimonials</h1>
        </div>

        <div className='flex flex-col md:flex-row justify-center items-center p-4 max-w-7xl mx-auto gap-8 py-10'>
          {testimonials.map((item, index) => {
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg hover: hover:translate-y-1.5 transition transform transition-all duration-300">

                {/* Avatar, name, and star rating */}
                <div className='flex flex-col justify-center items-center gap-3'>
                  <img src={item.image} alt="img" className='object-contain w-16 h-16 rounded-full' />
                  <h1>{item.name}</h1>

                  {/* Render stars dynamically based on rating value */}
                  <div className='flex'>
                    {[...Array(item.rating)].map((_, index) => (
                      <FaStar key={index} className='fill-yellow-400' />
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <p className='text-center leading-relaxed mt-2 '>{item.review}</p>
              </div>
            )
          })}
        </div>

      </section>

      
      {/* ───────────────────────────────────────────
          Banner 2 — currently commented out
          Uncomment and import banner2 asset to re-enable
      ─────────────────────────────────────────── */}

      {/* <section>
        <div className=' '>
          <img src={banner2} alt="" className='' />
        </div>
      </section> */}


      {/* ───────────────────────────────────────────
          FAQ + Contact Form Section
          Two-column layout: Contact form (left) | FAQ accordion (right)
      ─────────────────────────────────────────── */}
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-16 py-10'>

        {/* Left: Contact / Help Form */}
        <div className='px-7'>
          <h1 className="text-3xl font-semibold mb-6">
            Need Help? We're Here for You
          </h1>
          <form className="space-y-4">
            <div>

              {/* Name and Phone fields — side by side on md+ screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 ">
                <div>
                  <label className="block mb-3 text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className=" py-2 px-6 rounded-2xl border border-gray-300
                     bg-white outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block mb-3 text-gray-600">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="py-2  px-6 rounded-2xl border border-gray-300
                        bg-white outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className='mt-2'>
                <label className="block mb-3 text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="py-2 px-6 rounded-2xl border border-gray-300
                   bg-white outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Message textarea */}
              <div className='mt-2'>
                <label htmlFor="message" className='block mb-3 text-gray-600'>Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell us about your project"
                  className="w-full px-6 py-5 rounded-2xl border border-gray-300
                     bg-white resize-none outline-none focus:ring-2
                     focus:ring-yellow-400"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600
                     px-4 py-2 rounded-2xl font-semibold text-lg
                     transition duration-300 cursor-pointer mt-2"
              >
                Submit
              </button>

            </div>
          </form>
        </div>

        {/* Right: FAQ Accordion */}
        <div className='px-4'>
          <h1 className="text-3xl font-semibold mb-6">
            Frequently Asked Questions
          </h1>

          <div className='space-y-4 '>
            {faqs.map((faq, index) => (
              <div key={index}
                className="border border-gray-700 rounded-xl overflow-hidden">

                {/* FAQ toggle button — clicking expands or collapses the answer */}
                <button onClick={() => toggleFAQ(index)}
                  className='w-full flex justify-between items-center p-5 text-left cursor-pointer'>
                  <h3 className="font-medium text-lg  ">
                    {faq.question}
                  </h3>

                  {/* Show ChevronUp when open, ChevronDown when closed */}
                  {activeIndex === index ?
                    (
                      <ChevronUp className='cursor-pointer' />
                    ) : (
                      <ChevronDown className='cursor-pointer' />
                    )
                  }
                </button>

                {/* Answer — only renders when this FAQ index is active */}
                {activeIndex === index && (
                  <div className="px-5 pb-5 text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </section>

    </div>
  )
}

export default About