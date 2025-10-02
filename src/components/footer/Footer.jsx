/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Send,
  Close,
  CheckCircle,
  Error,
} from "@mui/icons-material";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // 'success', 'error'

  const galleryImages = [
    {
      id: 1,
      src: "https://www.ethanallen.com/on/demandware.static/-/Sites-siteCatalog_US/default/dwde8993b5/instore/rooms/diningroom/effortlesslyelegant_diningroom_room.jpg",
      alt: "Elegant Dining Area",
    },
    {
      id: 2,
      src: "https://www.foodrepublic.com/img/gallery/18-unusual-craft-cocktail-ingredients-you-should-try-at-least-once/l-intro-1689108572.jpg",
      alt: "Craft Cocktails",
    },
    {
      id: 3,
      src: "https://cdn.shopify.com/s/files/1/0775/2974/3667/t/3/assets/latteartbrewguide65-1687892943443.jpg?v=1687892944",
      alt: "Coffee Art",
    },
    {
      id: 4,
      src: "https://www.icmp.ac.uk/sites/default/files/new/how_to_promote_live_events_blog_2022_1.jpg",
      alt: "Live Music Night",
    },
    {
      id: 5,
      src: "https://goodthomas.net/wp-content/uploads/2024/11/host-a-private-party-good-thomas-entertainment-musical-bingo-3171837-1024x684.jpg",
      alt: "Private Event",
    },
    {
      id: 6,
      src: "https://cdn.mos.cms.futurecdn.net/Uwyegm4h4BDuhc93NSuCrG.jpg",
      alt: "Garden Terrace",
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook />,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-500",
    },
    {
      icon: <Instagram />,
      name: "Instagram",
      url: "#",
      color: "hover:text-pink-500",
    },
    {
      icon: <Twitter />,
      name: "Twitter",
      url: "#",
      color: "hover:text-cyan-500",
    },
    {
      icon: <LinkedIn />,
      name: "LinkedIn",
      url: "#",
      color: "hover:text-blue-600",
    },
    {
      icon: <YouTube />,
      name: "YouTube",
      url: "#",
      color: "hover:text-red-500",
    },
  ];

  const quickLinks = [
    { name: "About Us", url: "#" },
    { name: "Our Menu", url: "#" },
    { name: "Services", url: "#" },
    { name: "Events", url: "#" },
    { name: "Gallery", url: "#" },
    { name: "Careers", url: "#" },
  ];

  const contactInfo = [
    { icon: <LocationOn />, text: "123 Luxury Avenue, Kigali Heights, Rwanda" },
    { icon: <Phone />, text: "+250 788 123 456" },
    { icon: <Email />, text: "info@vistabar.rw" },
  ];

  const operatingHours = [
    { day: "Monday - Thursday", hours: "7:00 AM - 11:00 PM" },
    { day: "Friday - Saturday", hours: "7:00 AM - 2:00 AM" },
    { day: "Sunday", hours: "8:00 AM - 10:00 PM" },
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionStatus("success");
        setEmail("");
      } else {
        setSubscriptionStatus("error");
      }
    } catch (error) {
      setSubscriptionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-t border-gray-700">
        {/* Newsletter Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 py-8 xsm:py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xsm:gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center justify-items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-center lg:text-left"
              >
                <h3 className="text-xl xsm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 xsm:mb-4 sm:mb-5">
                  Stay Updated
                </h3>
                <p className="text-amber-100 text-sm xsm:text-base sm:text-lg md:text-xl max-w-2xl">
                  Subscribe to our newsletter for exclusive offers, events, and
                  culinary experiences.
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                onSubmit={handleNewsletterSubmit}
                className="w-full max-w-xs xsm:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg"
              >
                <div className="flex flex-col bg-gray-400 p-2 rounded-2xl sm:flex-row gap-2 xsm:gap-3 sm:gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-3 xsm:px-4 sm:px-6 py-2 xsm:py-3 sm:py-4 rounded-xl backdrop-blur-sm border border-white/20 text-white transition-all duration-300 text-sm xsm:text-base"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-amber-800 hover:bg-amber-50 px-4 xsm:px-6 sm:px-8 py-2 xsm:py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-amber-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm xsm:text-base"
                  >
                    <Send className="text-base xsm:text-lg" />
                    <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                  </button>
                </div>
                <p className="text-amber-200 text-xs xsm:text-sm mt-2 xsm:mt-3 text-center lg:text-left">
                  No spam, unsubscribe at any time
                </p>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-8 xsm:py-10 sm:py-12 md:py-14 lg:py-16 border-b border-gray-700">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-6 xsm:mb-8 sm:mb-10 md:mb-12"
            >
              <h3 className="text-xl xsm:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 xsm:mb-4">
                Our Gallery
              </h3>
              <p className="text-gray-400 text-sm xsm:text-base sm:text-lg max-w-2xl mx-auto">
                Experience the ambiance and excellence through our visual
                journey
              </p>
            </motion.div>

            <div className="grid grid-cols-2 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 xsm:gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-items-center">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full aspect-square rounded-lg xsm:rounded-xl overflow-hidden group cursor-pointer bg-gradient-to-br from-amber-500 to-amber-600 p-0.5 xsm:p-1"
                >
                  <div className="w-full h-full bg-gray-700 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Footer Content */}
        <section className="py-8 xsm:py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-12 gap-6 xsm:gap-8 sm:gap-10 lg:gap-12 xl:gap-16 justify-items-start">
              {/* Brand Column - spans 3 columns on md+ */}
              <div className="md:col-span-3 lg:col-span-4 xl:col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="space-y-3 xsm:space-y-4 sm:space-y-5 md:space-y-6"
                >
                  {/* Logo with SVG */}
                  <div className="flex items-center space-x-2 xsm:space-x-3">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-1 xsm:p-2 rounded-lg xsm:rounded-xl">
                      <svg
                        className="w-6 h-6 xsm:w-7 xsm:h-7 sm:w-8 sm:h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl xsm:text-2xl sm:text-3xl font-bold text-white">VISTA</h3>
                      <p className="text-amber-400 text-xs xsm:text-sm">Bar & Resto</p>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed text-sm xsm:text-base max-w-xs">
                    Experience premium dining, exceptional service, and
                    unforgettable moments at Vista Bar & Resto.
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-2 xsm:space-x-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gray-800 hover:bg-amber-600 p-2 xsm:p-3 rounded-lg xsm:rounded-xl transition-all duration-300 ${social.color} transform hover:scale-110`}
                      >
                        <span className="text-base xsm:text-lg">{social.icon}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Quick Links - spans 2 columns on md+ */}
              <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-base xsm:text-lg sm:text-xl font-bold text-white mb-3 xsm:mb-4 sm:mb-5 md:mb-6">
                    Quick Links
                  </h4>
                  <ul className="space-y-2 xsm:space-y-3">
                    {quickLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <a
                          href={link.url}
                          className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center space-x-2 group text-sm xsm:text-base"
                        >
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span>{link.name}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Contact Info - spans 3 columns on md+ */}
              <div className="md:col-span-3 lg:col-span-3 xl:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-base xsm:text-lg sm:text-xl font-bold text-white mb-3 xsm:mb-4 sm:mb-5 md:mb-6">
                    Contact Info
                  </h4>
                  <div className="space-y-3 xsm:space-y-4">
                    {contactInfo.map((contact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start space-x-2 xsm:space-x-3 text-gray-400"
                      >
                        <div className="text-amber-400 mt-0.5 xsm:mt-1 flex-shrink-0">
                          <span className="text-base xsm:text-lg">{contact.icon}</span>
                        </div>
                        <span className="leading-relaxed text-sm xsm:text-base">{contact.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Hours - spans 2 columns on md+ */}
              <div className="md:col-span-2 lg:col-span-3 xl:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-base xsm:text-lg sm:text-xl font-bold text-white mb-3 xsm:mb-4 sm:mb-5 md:mb-6">
                    Operating Hours
                  </h4>
                  <div className="space-y-2 xsm:space-y-3">
                    {operatingHours.map((schedule, index) => (
                      <motion.div
                        key={schedule.day}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="text-gray-400"
                      >
                        <div className="font-semibold text-amber-400 text-xs xsm:text-sm">
                          {schedule.day}
                        </div>
                        <div className="text-xs xsm:text-sm">{schedule.hours}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Bar */}
        <section className="border-t border-gray-700 py-4 xsm:py-5 sm:py-6">
          <div className="container mx-auto px-3 xsm:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col xsm:flex-row gap-3 xsm:gap-4 items-center justify-between">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-gray-400 text-xs xsm:text-sm text-center xsm:text-left order-2 xsm:order-1"
              >
                © 2024 Vista Bar & Resto. All rights reserved.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-amber-400 text-xs xsm:text-sm text-center xsm:text-right order-1 xsm:order-2"
              >
                Designed by Leon
              </motion.div>
            </div>
          </div>
        </section>
      </footer>

      {/* Newsletter Subscription Modal */}
      <AnimatePresence>
        {subscriptionStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 xsm:p-4 sm:p-6 md:p-8"
            onClick={() => setSubscriptionStatus(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl xsm:rounded-3xl max-w-xs xsm:max-w-sm w-full border border-gray-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 xsm:p-6 sm:p-8 text-center">
                <div
                  className={`w-12 h-12 xsm:w-14 xsm:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 xsm:mb-4 ${
                    subscriptionStatus === "success"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {subscriptionStatus === "success" ? (
                    <CheckCircle className="text-xl xsm:text-2xl sm:text-3xl" />
                  ) : (
                    <Error className="text-xl xsm:text-2xl sm:text-3xl" />
                  )}
                </div>

                <h3 className="text-lg xsm:text-xl sm:text-2xl font-bold text-white mb-2">
                  {subscriptionStatus === "success" ? "Success!" : "Oops!"}
                </h3>

                <p className="text-gray-300 text-sm xsm:text-base mb-4 xsm:mb-5 sm:mb-6">
                  {subscriptionStatus === "success"
                    ? "Thank you for subscribing to our newsletter! You will receive exclusive offers and updates."
                    : "There was an error processing your subscription. Please try again later."}
                </p>

                <button
                  onClick={() => setSubscriptionStatus(null)}
                  className={`w-full py-2 xsm:py-3 rounded-xl font-bold text-white transition-all duration-300 text-sm xsm:text-base ${
                    subscriptionStatus === "success"
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  }`}
                >
                  {subscriptionStatus === "success"
                    ? "Continue Exploring"
                    : "Try Again"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};