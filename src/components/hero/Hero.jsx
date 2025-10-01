/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Phone,
  ArrowRight,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { openLogin } = useAuth();

  // Bar and Pub images data
  const slides = [
    {
      id: 1,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/c7/18/ba/bar.jpg?w=1200&h=-1&s=1",
      title: "The Royal Oak Pub",
      location: "London, UK",
      description:
        "A traditional British pub with over 200 years of history. Famous for our craft beers and cozy atmosphere.",
      fullDescription:
        "The Royal Oak Pub has been serving the community since 1820. We pride ourselves on our selection of 30+ craft beers, traditional British cuisine, and live music every weekend. Our historic building features original oak beams and a charming fireplace.",
      features: [
        "30+ Craft Beers",
        "Live Music",
        "Traditional Food",
        "Historic Building",
      ],
      contact: {
        phone: "+44 20 7946 0958",
        email: "info@royaloaklondon.com",
        address: "123 Pub Street, London W1",
      },
    },
    {
      id: 2,
      image:
        "https://m.dining-out.co.za/ftp/Gallery/10134-15603-32305.jpg",
      title: "Skyline Rooftop Bar",
      location: "New York, USA",
      description:
        "Modern rooftop bar with stunning city views. Perfect for cocktails and social gatherings.",
      fullDescription:
        "Located on the 45th floor, Skyline Rooftop Bar offers breathtaking panoramic views of Manhattan. Our expert mixologists create innovative cocktails using fresh, local ingredients. Open year-round with heated terrace for winter enjoyment.",
      features: [
        "Panoramic Views",
        "Craft Cocktails",
        "Rooftop Terrace",
        "Live DJ",
      ],
      contact: {
        phone: "+1 212-555-7890",
        email: "reservations@skylinebar.com",
        address: "45th Floor, 123 Sky Ave, NYC",
      },
    },
    {
      id: 3,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/73/3b/85/airport-good-brew.jpg?w=900&h=500&s=1",
      title: "Brew Masters Taproom",
      location: "Berlin, Germany",
      description:
        "Industrial-style brewery with house-made beers and international craft selections.",
      fullDescription:
        "Brew Masters combines German brewing tradition with modern craft beer innovation. Our on-site brewery produces 12 unique beers, complemented by 50+ international craft selections. The industrial-chic space features exposed brick and copper brewing tanks.",
      features: [
        "On-site Brewery",
        "50+ Beers",
        "Brewery Tours",
        "Food Pairings",
      ],
      contact: {
        phone: "+49 30 1234567",
        email: "hello@brewmasters.de",
        address: "Brewery Street 45, Berlin",
      },
    },
    {
      id: 4,
      image:
        "https://www.ballantines.com/cdn-cgi/image/format=auto%2Cwidth=2560%2Cheight=2560%2Cfit=cover/https://www.ballantines.com/wp-content/uploads/2022/05/MicrosoftTeams-image-26-scaled.jpg",
      title: "Whiskey & Jazz Lounge",
      location: "Paris, France",
      description:
        "Elegant lounge featuring 200+ whiskey varieties and live jazz performances.",
      fullDescription:
        "Step into an era of sophistication at Whiskey & Jazz Lounge. Our curated collection features rare single malts, premium bourbons, and exclusive blends. Enjoy nightly jazz performances in our intimate, art-deco inspired setting.",
      features: [
        "200+ Whiskeys",
        "Live Jazz",
        "Art Deco Interior",
        "Premium Spirits",
      ],
      contact: {
        phone: "+33 1 42 68 53 01",
        email: "contact@whiskeyjazz.fr",
        address: "Rue de Jazz 78, Paris",
      },
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <section className="w-full relative text-black h-screen overflow-hidden">
        {/* Background Slides */}
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt=''
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
              {/* Left Side - Slide Info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white"
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-4"
                >
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {slides[currentSlide].location}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-xl text-gray-200 mb-6 max-w-2xl"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex flex-wrap gap-4"
                >
                  <SlideInfoModal slide={slides[currentSlide]} />
                  <ContactModal slide={slides[currentSlide]} />
                </motion.div>
              </motion.div>

              {/* Right Side - Navigation and Thumbnails */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-end space-y-6"
              >
                {/* Navigation Arrows */}
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full border border-white/20 transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full border border-white/20 transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-4">
                  {slides.map((slide, index) => (
                    <motion.button
                      key={slide.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToSlide(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentSlide
                          ? "border-white scale-110"
                          : "border-white/30 hover:border-white/60"
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt=''
                        className="w-full h-full object-cover"
                      />
                      {index === currentSlide && (
                        <div className="absolute inset-0 bg-blue-600/20" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Slide Info Modal Component
const SlideInfoModal = ({ slide }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-gradient-to-b from-blue-500 to-indigo-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
      >
        <Info className="h-5 w-5" />
        <span>Read More</span>
        <ArrowRight className="h-4 w-4" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={slide.image}
                  alt=''
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 bg-gradient-to-l from-red-400 to-red-500 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-blue-600 font-medium">
                      {slide.location}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {slide.fullDescription}
                </p>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-blue-500 mb-3">
                    Features & Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {slide.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>📞 {slide.contact.phone}</p>
                    <p>📧 {slide.contact.email}</p>
                    <p>📍 {slide.contact.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Contact Modal Component
const ContactModal = ({ slide }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", formData);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-gradient-to-t from-blue-400 to-violet-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
      >
        <Phone className="h-5 w-5" />
        <span>Contact</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-500">
                      Contact {slide.title}
                    </h2>
                    <p className="text-gray-600">
                      Make a reservation or inquiry
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-tl from-red-400 to-red-600 transition-colors"
                  >
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-black overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Special requests or message..."
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-t from-blue-400 to-indigo-400 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Send Inquiry
                  </motion.button>
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Direct Contact
                  </h4>
                  <p className="text-sm text-gray-600">
                    📞 {slide.contact.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    📧 {slide.contact.email}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Close Icon Component
const CloseIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
