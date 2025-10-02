/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Message as MessageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const TestimonyManagement = () => {
  // Sample initial data
  const initialTestimonies = [
    {
      id: 1,
      name: "Robert Martinez",
      role: "Classic Car Collector",
      content:
        "AutoElite's classic car division is phenomenal. They have experts who truly understand vintage vehicles and maintain them to the highest standards.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-15",
      featured: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Business Executive",
      content:
        "The luxury car service exceeded my expectations. Professional staff and exceptional vehicle maintenance. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-14",
      featured: true,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Car Enthusiast",
      content:
        "Impressive collection of sports cars. The test drive experience was unforgettable. Will definitely return for my next purchase.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-13",
      featured: false,
    },
    {
      id: 4,
      name: "Emily Williams",
      role: "Luxury Car Owner",
      content:
        "Outstanding customer service. They handled my custom modifications perfectly and delivered ahead of schedule.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-12",
      featured: true,
    },
    {
      id: 5,
      name: "David Thompson",
      role: "Fleet Manager",
      content:
        "We've purchased 15 vehicles from AutoElite for our corporate fleet. Reliable service and excellent pricing.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "draft",
      createdAt: "2024-01-11",
      featured: false,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      role: "First-time Buyer",
      content:
        "The team made my first car buying experience smooth and enjoyable. Great guidance throughout the process.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-10",
      featured: false,
    },
    {
      id: 7,
      name: "James Wilson",
      role: "Performance Car Expert",
      content:
        "Their knowledge of high-performance vehicles is unmatched. Found exactly what I was looking for.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-09",
      featured: true,
    },
    {
      id: 8,
      name: "Maria Garcia",
      role: "Family Car Shopper",
      content:
        "Perfect family vehicle with great safety features. The financing options made it affordable for us.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "archived",
      createdAt: "2024-01-08",
      featured: false,
    },
    {
      id: 9,
      name: "Thomas Brown",
      role: "Car Collector",
      content:
        "Added three rare models to my collection through AutoElite. Their sourcing capability is impressive.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-07",
      featured: true,
    },
    {
      id: 10,
      name: "Jennifer Lee",
      role: "Luxury SUV Owner",
      content:
        "Exceptional after-sales service. The maintenance package is comprehensive and reasonably priced.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-06",
      featured: false,
    },
    {
      id: 11,
      name: "Christopher Davis",
      role: "Sports Car Enthusiast",
      content:
        "Dream car acquired! The entire process from selection to delivery was handled professionally.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "draft",
      createdAt: "2024-01-05",
      featured: false,
    },
    {
      id: 12,
      name: "Amanda White",
      role: "Electric Vehicle Advocate",
      content:
        "Great selection of EVs and knowledgeable staff about charging infrastructure and government incentives.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      status: "published",
      createdAt: "2024-01-04",
      featured: true,
    },
  ];

  const [testimonies, setTestimonies] = useState(initialTestimonies);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTestimony, setEditingTestimony] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [filterFeatured, setFilterFeatured] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

  // Enhanced Stat Card Component with responsive design
  const StatCard = ({ title, value, icon, color }) => {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      yellow: "from-yellow-500 to-yellow-600",
      red: "from-red-500 to-red-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {title}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {value}
            </p>
          </div>
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0 ml-4`}
          >
            <span className="text-lg sm:text-2xl text-white">{icon}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Enhanced Star Rating Component with responsive design
  const StarRating = ({
    rating,
    onRatingChange,
    editable = false,
    size = "medium",
  }) => {
    const sizeClasses = {
      small: "text-sm sm:text-lg",
      medium: "text-lg sm:text-2xl",
      large: "text-xl sm:text-3xl",
    };

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
          
            onClick={() => editable && onRatingChange(star)}
            disabled={!editable}
            className={`${sizeClasses[size]} ${
              editable
                ? "cursor-pointer hover:scale-110 transition-transform"
                : "cursor-default"
            } ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          >
            {star <= rating ? <StarIcon fontSize="inherit" /> : <StarBorderIcon fontSize="inherit" />}
          </div>
        ))}
      </div>
    );
  };

  // Enhanced Testimony Modal Component with responsive design
  const TestimonyModal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    initialData,
  }) => {
    const [formData, setFormData] = useState({
      name: "",
      role: "",
      content: "",
      rating: 5,
      image: "",
      featured: false,
    });

    React.useEffect(() => {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          name: "",
          role: "",
          content: "",
          rating: 5,
          image: "",
          featured: false,
        });
      }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const handleRatingChange = (rating) => {
      setFormData((prev) => ({
        ...prev,
        rating,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto m-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <CloseIcon className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-black overflow-y-auto"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Testimony Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Role/Position *
                      </label>
                      <div className="relative">
                        <WorkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Car Enthusiast"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Rating *
                    </label>
                    <StarRating
                      rating={formData.rating}
                      onRatingChange={handleRatingChange}
                      editable={true}
                      size="large"
                    />
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formData.rating} out of 5 stars
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Testimony Content *
                    </label>
                    <div className="relative">
                      <MessageIcon className="absolute left-3 top-3 text-gray-400 text-lg" />
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Share your experience with our service..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Profile Image URL
                      </label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="https://example.com/profile.jpg"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mark as Featured
                      </label>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image Preview
                      </label>
                      <div className="flex items-center space-x-4">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        <div className="hidden text-red-500 text-sm">
                          Unable to load image. Please check the URL.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
                  >
                    {initialData ? "Update Testimony" : "Create Testimony"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Filter testimonies based on search and filters
  const filteredTestimonies = testimonies.filter((testimony) => {
    const matchesSearch =
      testimony.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimony.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimony.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || testimony.status === filterStatus;
    const matchesRating =
      filterRating === "all" || testimony.rating === parseInt(filterRating);
    const matchesFeatured =
      filterFeatured === "all" ||
      (filterFeatured === "featured" && testimony.featured) ||
      (filterFeatured === "notFeatured" && !testimony.featured);
    return matchesSearch && matchesStatus && matchesRating && matchesFeatured;
  });

  // Pagination logic
  const indexOfLastTestimony = currentPage * itemsPerPage;
  const indexOfFirstTestimony = indexOfLastTestimony - itemsPerPage;
  const currentTestimonies = filteredTestimonies.slice(
    indexOfFirstTestimony,
    indexOfLastTestimony
  );
  const totalPages = Math.ceil(filteredTestimonies.length / itemsPerPage);

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterRating, filterFeatured]);

  const handleCreateTestimony = (testimonyData) => {
    const newTestimony = {
      ...testimonyData,
      id: Date.now(),
      status: "published",
      createdAt: new Date().toISOString().split("T")[0],
      rating: parseInt(testimonyData.rating),
    };
    setTestimonies((prev) => [newTestimony, ...prev]);
    toast.success(
      `Testimony from "${testimonyData.name}" created successfully!`
    );
    setIsCreateModalOpen(false);
  };

  const handleEditTestimony = (testimonyData) => {
    setTestimonies((prev) =>
      prev.map((testimony) =>
        testimony.id === editingTestimony.id
          ? {
              ...testimonyData,
              id: testimony.id,
              rating: parseInt(testimonyData.rating),
            }
          : testimony
      )
    );
    toast.success(
      `Testimony from "${testimonyData.name}" updated successfully!`
    );
    setIsEditModalOpen(false);
    setEditingTestimony(null);
  };

  const handleDeleteTestimony = (testimonyId, testimonyName) => {
    if (
      window.confirm(
        `Are you sure you want to delete testimony from "${testimonyName}"?`
      )
    ) {
      setTestimonies((prev) =>
        prev.filter((testimony) => testimony.id !== testimonyId)
      );
      toast.success(`Testimony from "${testimonyName}" deleted successfully!`);
    }
  };

  const handleStatusChange = (testimonyId, newStatus) => {
    setTestimonies((prev) =>
      prev.map((testimony) =>
        testimony.id === testimonyId
          ? { ...testimony, status: newStatus }
          : testimony
      )
    );
    toast.success(`Testimony status updated to ${newStatus}`);
  };

  const toggleFeatured = (testimonyId) => {
    setTestimonies((prev) =>
      prev.map((testimony) =>
        testimony.id === testimonyId
          ? { ...testimony, featured: !testimony.featured }
          : testimony
      )
    );
  };

  const openEditModal = (testimony) => {
    setEditingTestimony(testimony);
    setIsEditModalOpen(true);
  };

  // Calculate average rating
  const averageRating =
    testimonies.length > 0
      ? (
          testimonies.reduce((sum, testimony) => sum + testimony.rating, 0) /
          testimonies.length
        ).toFixed(1)
      : 0;

  // Mobile-friendly testimony card component
  const MobileTestimonyCard = ({ testimony }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {/* Testimony Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <img
              src={testimony.image}
              alt={testimony.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                {testimony.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {testimony.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(mobileMenuOpen === testimony.id ? null : testimony.id)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
          >
            <MoreVertIcon fontSize="small" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <StarRating rating={testimony.rating} size="small" />
          <div className="flex items-center space-x-2">
            {testimony.featured && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                testimony.status
              )}`}
            >
              {testimony.status}
            </span>
          </div>
        </div>
      </div>

      {/* Testimony Content */}
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3">
          "{testimony.content}"
        </p>

        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Added on {testimony.createdAt}
        </div>

        {/* Mobile Actions Menu */}
        <AnimatePresence>
          {mobileMenuOpen === testimony.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openEditModal(testimony)}
                  className="flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-xs"
                >
                  <EditIcon fontSize="small" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDeleteTestimony(testimony.id, testimony.name)}
                  className="flex items-center justify-center space-x-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors text-xs"
                >
                  <DeleteIcon fontSize="small" />
                  <span>Delete</span>
                </button>
              </div>
              
              <select
                value={testimony.status}
                onChange={(e) => handleStatusChange(testimony.id, e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-2 py-2 text-xs border-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="published">Publish</option>
                <option value="draft">Draft</option>
                <option value="archived">Archive</option>
              </select>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always visible quick actions */}
        {mobileMenuOpen !== testimony.id && (
          <div className="flex space-x-2">
            <button
              onClick={() => openEditModal(testimony)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs"
            >
              Edit
            </button>
            <select
              value={testimony.status}
              onChange={(e) => handleStatusChange(testimony.id, e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-2 text-xs border-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="published">Publish</option>
              <option value="draft">Draft</option>
              <option value="archived">Archive</option>
            </select>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Enhanced Pagination Controls with responsive design
  const PaginationControls = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxPagesToShow = window.innerWidth < 640 ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mt-6 sm:mt-8"
      >
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {indexOfFirstTestimony + 1}-
          {Math.min(indexOfLastTestimony, filteredTestimonies.length)} of{" "}
          {filteredTestimonies.length} testimonies
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                1
              </button>
              {startPage > 2 && <span className="px-1 sm:px-2 text-sm">...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg border transition-colors text-sm ${
                currentPage === number
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-1 sm:px-2 text-sm">...</span>}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </motion.div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "archived":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
        <ToastContainer />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Testimony Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage customer testimonials and reviews
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-sm sm:text-base w-full lg:w-auto"
            >
              <AddIcon className="text-lg" />
              <span>Add New Testimony</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Testimonies"
            value={testimonies.length}
            icon={<MessageIcon />}
            color="blue"
          />
          <StatCard
            title="Average Rating"
            value={averageRating}
            icon={<StarIcon />}
            color="yellow"
          />
          <StatCard
            title="Featured"
            value={testimonies.filter((t) => t.featured).length}
            icon="⭐"
            color="orange"
          />
          <StatCard
            title="Published"
            value={testimonies.filter((t) => t.status === "published").length}
            icon="✅"
            color="green"
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-full sm:max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search testimonies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap gap-2">
              <FilterIcon className="text-gray-400 hidden sm:block" />
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[120px]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[120px]"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <select
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[120px]"
              >
                <option value="all">All</option>
                <option value="featured">Featured</option>
                <option value="notFeatured">Not Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Showing {indexOfFirstTestimony + 1}-
          {Math.min(indexOfLastTestimony, filteredTestimonies.length)} of{" "}
          {filteredTestimonies.length} testimonies
        </div>

        {/* Desktop Testimonies Grid (hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence>
            {currentTestimonies.map((testimony, index) => (
              <motion.div
                key={testimony.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Testimony Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimony.image}
                        alt={testimony.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {testimony.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimony.role}
                        </p>
                      </div>
                    </div>
                    {testimony.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <StarRating rating={testimony.rating} />
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        testimony.status
                      )}`}
                    >
                      {testimony.status}
                    </span>
                  </div>
                </div>

                {/* Testimony Content */}
                <div className="p-4 sm:p-6">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{testimony.content}"
                  </p>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Added on {testimony.createdAt}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openEditModal(testimony)}
                      className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <EditIcon fontSize="small" />
                      <span>Edit</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleDeleteTestimony(testimony.id, testimony.name)
                      }
                      className="flex items-center justify-center bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <DeleteIcon fontSize="small" />
                    </motion.button>

                    <select
                      value={testimony.status}
                      onChange={(e) =>
                        handleStatusChange(testimony.id, e.target.value)
                      }
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-2 text-sm border-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="published">Publish</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archive</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Testimonies List (shown on mobile) */}
        <div className="lg:hidden space-y-3 sm:space-y-4">
          <AnimatePresence>
            {currentTestimonies.map((testimony, index) => (
              <MobileTestimonyCard 
                key={testimony.id} 
                testimony={testimony} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTestimonies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12"
          >
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">💬</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No testimonies found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              {searchTerm ||
              filterStatus !== "all" ||
              filterRating !== "all" ||
              filterFeatured !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first testimony"}
            </p>
            {!searchTerm &&
              filterStatus === "all" &&
              filterRating === "all" &&
              filterFeatured === "all" && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
                >
                  Add Your First Testimony
                </button>
              )}
          </motion.div>
        )}

        {/* Pagination Controls */}
        <PaginationControls />

        {/* Modals */}
        <TestimonyModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTestimony}
          title="Create New Testimony"
        />

        <TestimonyModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTestimony(null);
          }}
          onSubmit={handleEditTestimony}
          title="Edit Testimony"
          initialData={editingTestimony}
        />
      </div>
    </div>
  );
};