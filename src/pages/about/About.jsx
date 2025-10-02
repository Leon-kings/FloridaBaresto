/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  LocalBar,
  Restaurant,
  Groups,
  Event,
  Star,
  ExpandMore,
  Close,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

export const About = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images
  const galleryImages = [
    {
      id: 1,
      src: "https://headbox-media.imgix.net/spaces/34068/photos/8846c8fb-cec1-4e63-8728-eaf8bd7b9c1c_DSCF0442.jpg?auto=format&ar=3%3A2&fit=crop&q=60&ixlib=react-9.5.4",
      title: "Main Bar Area",
      description: "Our beautifully crafted main bar with premium spirits",
    },
    {
      id: 2,
      src: "https://www.contemporist.com/wp-content/uploads/2017/01/modern-rooftop-terrace-020117-1032-01-800x534.jpg",
      title: "Rooftop Terrace",
      description: "Stunning city views from our rooftop seating area",
    },
    {
      id: 3,
      src: "https://interiordesign.net/wp-content/uploads/2023/09/Interior-Design-3877-Aslin-Beer-Company-Pittsburgh-3877_Aslin_Pittsburgh_Credit_to_Ed_Massery_5.jpg",
      title: "Brewery Section",
      description: "Our on-site microbrewery with craft beer selections",
    },
    {
      id: 4,
      src: "https://www.gotolouisville.com/imager/s3_us-east-1_amazonaws_com/louisville-2019/images/Watch-Hill-Proper-June-6-20223811a_f69c17b56b270deda0220b2ba6b4d051.jpg",
      title: "Whiskey Lounge",
      description: "Exclusive whiskey tasting area with rare collections",
    },
    {
      id: 5,
      src: "https://www.shutterstock.com/image-photo/set-musical-instruments-during-concert-600nw-214194844.jpg",
      title: "Live Music Stage",
      description: "Intimate stage for live performances and events",
    },
    {
      id: 6,
      src: "https://st.hzcdn.com/simgs/pictures/kitchens/contemporary-kitchen-modern-house-architects-img~33014f740d50d81b_14-5192-1-5e439f1.jpg",
      title: "Gourmet Kitchen",
      description: "Professional kitchen serving exquisite cuisine",
    },
  ];

  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-26">
      {/* Hero Section */}
      <section className="relative h-36 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              Our Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200"
            >
              Crafting unforgettable experiences since 2010
            </motion.p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mt-6 p-6 overflow-x-auto">
            {[
              {
                id: "story",
                label: "Our Story",
                icon: <History className="h-5 w-5" />,
              },
              {
                id: "gallery",
                label: "Gallery",
                icon: <LocalBar className="h-5 w-5" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-300"
                    : "border-transparent bg-gradient-to-r from-blue-300 to-indigo-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story Tab */}
        {activeTab === "story" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            {/* Introduction */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="w-full">
                <h2 className="text-4xl font-bold text-blue-400 mb-6">
                  Welcome to The Urban Hops
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Founded in 2010, The Urban Hops began as a humble neighborhood
                  pub with a simple mission: to create a space where community,
                  craftsmanship, and celebration come together. What started as
                  a small local spot has grown into a multi-award-winning
                  destination known for our exceptional drinks, gourmet cuisine,
                  and unforgettable experiences.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Our passion for quality is evident in every detail - from our
                  carefully curated selection of over 200 craft beers and
                  spirits to our locally sourced ingredients and innovative
                  cocktail program. We believe that great moments deserve great
                  drinks, and we're committed to making every visit special.
                </p>
                <div className="flex flex-wrap gap-4">
                  <ReadMoreModal
                    title="Our Founding Story"
                    content={foundingStory}
                  />
                  <ReadMoreModal
                    title="Sustainability Commitment"
                    content={sustainabilityCommitment}
                  />
                </div>
              </div>
              <div className="w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
                  alt=""
                  className="rounded-2xl w-full shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-3 bg-blue-600 text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-bold">14+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <LocalBar className="h-12 w-12 text-blue-600" />,
                  title: "Craft Beverages",
                  description:
                    "200+ carefully selected beers, spirits, and innovative cocktails crafted by our expert mixologists.",
                  stats: "200+ Selections",
                },
                {
                  icon: <Restaurant className="h-12 w-12 text-green-600" />,
                  title: "Gourmet Cuisine",
                  description:
                    "Modern gastropub dishes made with locally sourced ingredients and creative flair.",
                  stats: "Local Ingredients",
                },
                {
                  icon: <Event className="h-12 w-12 text-purple-600" />,
                  title: "Live Entertainment",
                  description:
                    "Weekly live music, comedy nights, and special events in our intimate performance space.",
                  stats: "Weekly Events",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-blue-600 font-semibold">
                    {feature.stats}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    To create unforgettable experiences by bringing people
                    together through exceptional drinks, delicious food, and
                    genuine hospitality. We're committed to supporting our local
                    community and promoting sustainable practices in everything
                    we do.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    To be the leading destination for craft beverage enthusiasts
                    and community gatherings, known for our innovation, quality,
                    and commitment to creating spaces where memories are made.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Gallery
              </h2>
              <p className="text-xl text-gray-600">
                Take a visual journey through our spaces and experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openImageModal(image, index)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={image.src}
                      alt=""
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                      <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold mb-2">
                          {image.title}
                        </h3>
                        <p className="text-gray-200">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImageModal}
                className="absolute -top-4 -right-4 bg-gradient-to-tl from-red-400 to-red-500 p-2 rounded-full z-10"
              >
                <Close className="h-6 w-6" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full hover:bg-white/30 backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full hover:bg-white/30 backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <img
                src={selectedImage.src}
                alt=""
                className="w-full h-full object-contain max-h-[80vh] rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Read More Modal Component
const ReadMoreModal = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-br from-red-600 to-red-500 transition-colors"
                  >
                    <Close className="h-6 w-6" />
                  </button>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="mb-4 whitespace-pre-line">{content}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Content for modals
const foundingStory = `The Urban Hops was born from a shared passion for community and craftsmanship. Founders Sarah and Michael started with a simple vision: create a space where neighbors could become friends over great drinks and good food. What began as a small renovation project in a historic building quickly grew into the vibrant hub we know today.

Our first year was challenging but rewarding. We sourced local ingredients, built relationships with craft breweries, and slowly built our reputation one satisfied customer at a time. The turning point came in 2012 when we won our first award for "Best New Bar," cementing our place in the local scene.

Today, while we've grown and evolved, we've never lost sight of our original mission. We still source locally, support community initiatives, and maintain the warm, welcoming atmosphere that made us fall in love with this business in the first place.`;

const sustainabilityCommitment = `At The Urban Hops, we believe that great businesses should give back to their communities and protect our planet. Our sustainability commitment is woven into every aspect of our operations:

• Local Sourcing: 85% of our ingredients come from within 100 miles, supporting local farmers and reducing food miles
• Waste Reduction: We've implemented comprehensive recycling and composting programs, diverting 90% of our waste from landfills
• Energy Efficiency: Our building features solar panels, LED lighting, and energy-efficient appliances
• Sustainable Suppliers: We partner with breweries and distilleries that share our environmental values
• Community Support: We donate 5% of our profits to local environmental and social initiatives

We're constantly exploring new ways to reduce our environmental impact while maintaining the quality and experience our guests expect.`;
