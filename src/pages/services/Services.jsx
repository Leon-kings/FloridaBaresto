/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LocalBar,
  LocalCafe,
  Restaurant,
  WineBar,
  Event,
  DeliveryDining,
  MusicNote,
  Wifi,
  Park,
  Groups,
  SportsBar,
  EmojiEvents,
  Star,
  CheckCircle,
  ArrowForward,
  CalendarToday,
  Schedule,
  People,
  Place,
  Close,
  Person,
  Phone,
  Email,
  MenuBook,
} from "@mui/icons-material";

export const Services = () => {
  const [activeService, setActiveService] = useState("dining");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const servicesData = {
    dining: {
      title: "Fine Dining Experience",
      icon: <Restaurant className="text-2xl xsm:text-3xl" />,
      description:
        "Indulge in an exquisite culinary journey with our master chefs crafting unforgettable dining experiences in an elegant, intimate setting.",
      features: [
        "Gourmet cuisine by award-winning chefs",
        "Extensive wine and cocktail selection",
        "Intimate and romantic ambiance",
        "Professional tableside service",
        "Seasonal and locally sourced ingredients",
        "Customized tasting menus",
      ],
      image: "https://duongsrestaurant.com/wp-content/uploads/2019/07/for-gourmets.jpg",
      priceRange: "Premium Experience",
      timing: "6:00 PM - 11:00 PM",
      capacity: "Up to 50 guests",
      duration: "2-3 hours",
    },
    bar: {
      title: "Premium Bar & Lounge",
      icon: <LocalBar className="text-2xl xsm:text-3xl" />,
      description:
        "Unwind in sophistication with our premium selection of spirits, craft cocktails, and vibrant social atmosphere.",
      features: [
        "Expert mixologists crafting signature cocktails",
        "Premium whiskey and scotch collection",
        "Local craft beers and imported selections",
        "Weekly wine tasting events",
        "Happy hour specials (4PM-7PM)",
        "VIP lounge seating available",
      ],
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/a7/b8/fe/gaste-plaudern-entspannt.jpg?w=900&h=500&s=1",
      priceRange: "Elevated Social",
      timing: "4:00 PM - 2:00 AM",
      capacity: "Up to 100 guests",
      duration: "Flexible",
    },
    coffee: {
      title: "Artisan Coffee House",
      icon: <LocalCafe className="text-2xl xsm:text-3xl" />,
      description:
        "Start your day with perfection. Our specialty coffee and artisanal breakfast offerings redefine your morning ritual.",
      features: [
        "Single-origin specialty coffee beans",
        "Freshly baked artisanal pastries",
        "Gourmet breakfast and brunch menu",
        "Co-working friendly environment",
        "Barista training workshops",
        "Takeaway and subscription options",
      ],
      image: "https://commonwealthjoe.com/cdn/shop/articles/Commonwealth_Joe_Coffee_Roasters_Washington_DC_VA_MD_Photographer_Angelika_Johns_Photography-8608_900x500_crop_center.jpg?v=1657031366",
      priceRange: "Artisan Quality",
      timing: "6:00 AM - 6:00 PM",
      capacity: "40 seats",
      duration: "Flexible",
    },
    events: {
      title: "Private Events & Catering",
      icon: <Event className="text-2xl xsm:text-3xl" />,
      description:
        "Create unforgettable memories with our comprehensive event planning and bespoke catering services for every occasion.",
      features: [
        "Wedding receptions and ceremonies",
        "Corporate events and product launches",
        "Birthday and anniversary celebrations",
        "Customized catering menus",
        "Professional event coordination",
        "Audio-visual equipment provided",
      ],
      image: "https://img1.wsimg.com/isteam/ip/411665c1-9037-419e-921e-ba1a19bc1a1f/DSC00314.jpg/:/cr=t:0.18%25,l:0%25,w:100%25,h:99.64%25",
      priceRange: "Tailored Packages",
      timing: "Flexible scheduling",
      capacity: "20-200 guests",
      duration: "Custom",
    },
    delivery: {
      title: "Gourmet Delivery",
      icon: <DeliveryDining className="text-2xl xsm:text-3xl" />,
      description:
        "Experience restaurant-quality cuisine in the comfort of your home or office with our premium delivery service.",
      features: [
        "Online ordering with real-time tracking",
        "Express delivery within 45 minutes",
        "Contactless pickup options",
        "Corporate catering programs",
        "Special dietary accommodations",
        "Temperature-controlled packaging",
      ],
      image: "https://delidoor.com.au/cdn/shop/articles/Gourmet_Meal_Delivery.jpg?v=1684375429&width=3840",
      priceRange: "Restaurant Quality",
      timing: "11:00 AM - 10:00 PM",
      capacity: "Unlimited",
      duration: "45min delivery",
    },
    entertainment: {
      title: "Live Entertainment",
      icon: <MusicNote className="text-2xl xsm:text-3xl" />,
      description:
        "Immerse yourself in vibrant nights filled with live music, performances, and unforgettable entertainment experiences.",
      features: [
        "Live jazz and blues performances",
        "Local and international artist showcases",
        "Weekend DJ parties and dance nights",
        "Karaoke and open mic evenings",
        "Comedy shows and theater performances",
        "Private event entertainment booking",
      ],
      image: "https://www.icmp.ac.uk/sites/default/files/new/Images/Blog/best-live-music-performance.jpg",
      priceRange: "Entertainment Plus",
      timing: "8:00 PM - 1:00 AM",
      capacity: "Up to 150 guests",
      duration: "3-4 hours",
    },
  };

  const amenities = [
    {
      icon: <Wifi />,
      name: "High-Speed WiFi",
      description: "Complimentary gigabit-speed internet access throughout",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Park />,
      name: "Garden Terrace",
      description: "Beautiful outdoor seating with panoramic city views",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Groups />,
      name: "Private Salons",
      description: "Exclusive private rooms for intimate gatherings",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <SportsBar />,
      name: "Sports Pavilion",
      description: "Ultra HD screens for live sports and events",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <EmojiEvents />,
      name: "Loyalty Rewards",
      description: "Exclusive benefits and rewards for regular guests",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: <MenuBook />,
      name: "Digital Menu",
      description: "Interactive digital menus with detailed descriptions",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Sommelier Wine Tasting",
      date: "2025-12-15",
      time: "7:00 PM",
      description:
        "An exclusive evening exploring rare vintages and perfect pairings with our master sommelier. Experience wines from boutique vineyards around the world.",
      price: "45,000 RWF",
      image:
        "https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/gvncjxbl/de0c47ab-cc85-4161-94d3-1456ab6a6754.jpg",
      type: "premium",
      seats: 25,
    },
    {
      id: 2,
      title: "Jazz & Cocktails Night",
      date: "2025-12-20",
      time: "8:30 PM",
      description:
        "Smooth jazz melodies meet craft cocktails in this sophisticated evening of music and mixology. Featuring local jazz ensembles.",
      price: "30,000 RWF",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/d9/1c/89/reserve-your-table-for.jpg?w=900&h=-1&s=1",
      type: "entertainment",
      seats: 80,
    },
    {
      id: 3,
      title: "Mixology Masterclass",
      date: "2024-02-25",
      time: "6:00 PM",
      description:
        "Learn the art of cocktail crafting from our expert mixologists. Hands-on experience with premium spirits and techniques.",
      price: "55,000 RWF",
      image:
        "https://assets.anantara.com/image/upload/q_auto,f_auto,c_limit,w_1045/media/minor/anantara/images/anantara-new-york-palace-budapest/experiences/mixology/anantara_new_york_palace_budapest_hotel_mixology_masterclass_experience_944x510.jpg",
      type: "workshop",
      seats: 15,
    },
    {
      id: 4,
      title: "Sunday Champagne Brunch",
      date: "2025-12-28",
      time: "11:00 AM",
      description:
        "Luxurious brunch buffet with unlimited champagne, live cooking stations, and decadent dessert selections.",
      price: "35,000 RWF",
      image:
        "https://1.image.cdn.tablecheck.com/unsafe/full-fit-in/smart/https%3A%2F%2Fcdn1.tablecheck.com%2Fimages%2F633d3f19dc22ea0025ad2a80%2Fimages%2Flg%2F1713526b.jpg%3F1664958234",
      type: "dining",
      seats: 60,
    },
  ];

  const bookingTimes = {
    dining: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
    bar: ["16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    coffee: [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ],
    events: ["10:00", "14:00", "18:00", "19:00"],
    delivery: [
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
    ],
    entertainment: ["20:00", "20:30", "21:00", "21:30"],
  };

  const handleBookingOpen = (service = "") => {
    setBookingData((prev) => ({ ...prev, service: service || activeService }));
    setIsBookingOpen(true);
    setBookingStep(1);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      // Handle final submission
      console.log("Booking submitted:", bookingData);
      setIsBookingOpen(false);
      setBookingStep(1);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br rounded-2xl mt-2 from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Enhanced Hero Section */}
        <section className="relative p-4 bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-900 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
          </div>
          <div className="relative z-10 container mx-auto px-3 xsm:px-4 sm:px-6 h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl xsm:text-5xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight"
              >
                Premium Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg xsm:text-xl sm:text-2xl md:text-3xl text-amber-100 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Elevate Your Experience with Our Exclusive Offerings
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 sm:mt-8 flex flex-col xsm:flex-row gap-3 xsm:gap-4 justify-center items-center"
              >
                <button
                  onClick={() => handleBookingOpen()}
                  className="bg-white text-amber-800 hover:bg-amber-50 px-6 xsm:px-8 py-3 xsm:py-4 rounded-xl font-bold text-sm xsm:text-base sm:text-lg transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-amber-200/50"
                >
                  Book Now
                </button>
              </motion.div>
            </motion.div>
          </div>

        </section>

        {/* Enhanced Services Navigation */}
        <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
            <div className="grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 xsm:gap-3 sm:gap-4 justify-items-center">
              {Object.keys(servicesData).map((serviceKey) => (
                <motion.button
                  key={serviceKey}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveService(serviceKey)}
                  className={`w-full max-w-[140px] xsm:max-w-[150px] p-3 xsm:p-4 rounded-2xl transition-all duration-300 shadow-2xl ${
                    activeService === serviceKey
                      ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-500/25"
                      : "bg-gradient-to-br from-gray-700/80 to-gray-800/80 text-gray-300 hover:from-gray-600 hover:to-gray-700 backdrop-blur-sm border border-gray-600/50"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2 xsm:space-y-3">
                    <div
                      className={`p-2 xsm:p-3 rounded-xl ${
                        activeService === serviceKey
                          ? "bg-white/20"
                          : "bg-gray-600/30"
                      }`}
                    >
                      {servicesData[serviceKey].icon}
                    </div>
                    <span className="text-xs xsm:text-sm font-semibold text-center leading-tight">
                      {servicesData[serviceKey].title.split(" ")[0]}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Active Service Details */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center justify-items-center"
              >
                {/* Content Section */}
                <div className="w-full max-w-2xl space-y-6 sm:space-y-8 order-2 lg:order-1">
          

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl sm:text-2xl font-semibold text-amber-400">
                      Premium Features
                    </h3>
                    <div className="grid grid-cols-1 xsm:grid-cols-2 gap-3">
                      {servicesData[activeService].features.map(
                        (feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-3 border border-gray-700"
                          >
                            <CheckCircle className="text-amber-400 flex-shrink-0 text-lg" />
                            <span className="text-gray-300 text-sm xsm:text-base">
                              {feature}
                            </span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                  >
                    <button
                      onClick={() => handleBookingOpen(activeService)}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-amber-500/25 flex items-center justify-center space-x-2"
                    >
                      <CalendarToday className="text-lg" />
                      <span>Book This Service</span>
                    </button>
                  </motion.div>
                </div>

                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full max-w-2xl order-1 lg:order-2"
                >
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-2 shadow-2xl">
                      <img
                        src={servicesData[activeService].image}
                        alt=""
                        className="w-full h-64 xsm:h-72 sm:h-80 md:h-96 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg shadow-xl">
                        <Star className="inline mr-2" />
                        Premium Service
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Enhanced Upcoming Events */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl xsm:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                Exclusive Events
              </h2>
              <p className="text-lg xsm:text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                Curated experiences designed to create unforgettable memories
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-sm bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 hover:border-amber-500 transition-all duration-500 group cursor-pointer shadow-2xl hover:shadow-amber-500/10"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative h-48 xsm:h-52 sm:h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {event.price}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                      {event.seats} seats left
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center space-x-2 text-amber-400 text-xs sm:text-sm mb-3">
                      <CalendarToday className="text-xs" />
                      <span>{event.date}</span>
                      <Schedule className="text-xs ml-2" />
                      <span>{event.time}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 text-sm font-semibold">
                        Book Your Spot
                      </span>
                      <ArrowForward className="text-amber-400 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Amenities Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl xsm:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                Premium Amenities
              </h2>
              <p className="text-lg xsm:text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                Every detail crafted for your comfort and enjoyment
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
              {amenities.map((amenity, index) => (
                <motion.div
                  key={amenity.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-sm bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700 hover:border-amber-500 transition-all duration-500 group hover:scale-105 shadow-2xl hover:shadow-amber-500/5"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-4 bg-gradient-to-r ${amenity.color} rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                    >
                      {amenity.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">
                        {amenity.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Booking Modal */}
        <AnimatePresence>
          {isBookingOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 xsm:p-4 sm:p-6"
              onClick={() => setIsBookingOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {bookingStep === 1 && "Select Date & Time"}
                      {bookingStep === 2 && "Your Information"}
                      {bookingStep === 3 && "Confirm Booking"}
                    </h3>
                    <button
                      onClick={() => setIsBookingOpen(false)}
                      className="bg-gradient-to-b from-red-400 to-red-500  p-2 rounded-xl transition-all duration-300"
                    >
                      <Close />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step <= bookingStep
                              ? "bg-amber-500 text-white"
                              : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${(bookingStep / 3) * 100}%` }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      />
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    {bookingStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-gray-300 mb-3 font-semibold">
                            Service
                          </label>
                          <select
                            value={bookingData.service}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                service: e.target.value,
                              })
                            }
                            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                            required
                          >
                            <option value="">Select a service</option>
                            {Object.keys(servicesData).map((key) => (
                              <option key={key} value={key}>
                                {servicesData[key].title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 mb-3 font-semibold">
                              Date
                            </label>
                            <input
                              type="date"
                              value={bookingData.date}
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  date: e.target.value,
                                })
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                              required
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-3 font-semibold">
                              Time
                            </label>
                            <select
                              value={bookingData.time}
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  time: e.target.value,
                                })
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                              required
                            >
                              <option value="">Select time</option>
                              {bookingData.service &&
                                bookingTimes[bookingData.service]?.map(
                                  (time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-3 font-semibold">
                            Number of Guests
                          </label>
                          <select
                            value={bookingData.guests}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                guests: parseInt(e.target.value),
                              })
                            }
                            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                            required
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "guest" : "guests"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 mb-3 font-semibold">
                              <Person className="inline mr-2" />
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={bookingData.name}
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-3 font-semibold">
                              <Email className="inline mr-2" />
                              Email
                            </label>
                            <input
                              type="email"
                              value={bookingData.email}
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  email: e.target.value,
                                })
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-3 font-semibold">
                            <Phone className="inline mr-2" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={bookingData.phone}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-3 font-semibold">
                            Special Requests
                          </label>
                          <textarea
                            value={bookingData.specialRequests}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                specialRequests: e.target.value,
                              })
                            }
                            rows="3"
                            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 resize-none"
                            placeholder="Any special requirements or preferences..."
                          />
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-6 border border-gray-600">
                          <h4 className="text-xl font-bold text-amber-400 mb-4">
                            Booking Summary
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Service:</span>
                              <span className="text-white font-semibold">
                                {servicesData[bookingData.service]?.title}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">
                                Date & Time:
                              </span>
                              <span className="text-white font-semibold">
                                {bookingData.date} at {bookingData.time}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Guests:</span>
                              <span className="text-white font-semibold">
                                {bookingData.guests} people
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Contact:</span>
                              <span className="text-white font-semibold">
                                {bookingData.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                          <p className="text-amber-400 text-sm text-center">
                            Your table will be reserved for 15 minutes. Please
                            arrive on time.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                      {bookingStep > 1 && (
                        <button
                          type="button"
                          onClick={() => setBookingStep(bookingStep - 1)}
                          className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white py-4 rounded-xl font-semibold transition-all duration-300"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
                      >
                        {bookingStep === 3 ? "Confirm Booking" : "Continue"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Detail Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 xsm:p-4 sm:p-6"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 sm:h-80">
                  <img
                    src={selectedEvent.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-xl hover:bg-black/70 transition-all backdrop-blur-sm"
                  >
                    <Close />
                  </button>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-0">
                      {selectedEvent.title}
                    </h3>
                    <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-xl font-semibold text-sm sm:text-base">
                      {selectedEvent.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3 text-amber-400 bg-gray-700/50 rounded-xl p-3">
                      <CalendarToday />
                      <div>
                        <div className="text-xs text-gray-400">Date</div>
                        <div className="font-semibold">
                          {selectedEvent.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-amber-400 bg-gray-700/50 rounded-xl p-3">
                      <Schedule />
                      <div>
                        <div className="text-xs text-gray-400">Time</div>
                        <div className="font-semibold">
                          {selectedEvent.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-amber-400 bg-gray-700/50 rounded-xl p-3">
                      <Place />
                      <div>
                        <div className="text-xs text-gray-400">Venue</div>
                        <div className="font-semibold">Vista Bar & Resto</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-amber-400 bg-gray-700/50 rounded-xl p-3">
                      <People />
                      <div>
                        <div className="text-xs text-gray-400">
                          Availability
                        </div>
                        <div className="font-semibold">
                          {selectedEvent.seats} seats left
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    {selectedEvent.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <h4 className="text-xl font-semibold text-amber-400">
                      Event Highlights:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Premium experience with expert hosts",
                        "Exclusive access to special selections",
                        "Networking with like-minded guests",
                        "Commemorative gift package",
                        "Professional photography service",
                        "Complimentary valet parking",
                      ].map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="text-amber-400 text-sm flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        setSelectedEvent(null);
                        handleBookingOpen("events");
                      }}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
                    >
                      Book This Event
                    </button>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="flex-1 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white py-4 rounded-xl font-semibold transition-all duration-300"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
