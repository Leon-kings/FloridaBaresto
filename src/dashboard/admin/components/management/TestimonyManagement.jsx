/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
  MoreVert as MoreVertIcon,
  CloudUpload as CloudUploadIcon
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const TestimonyManagement = () => {
  const API_URL = "https://floridabarnode.onrender.com/testimonials";

  const [testimonies, setTestimonies] = useState([]);
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
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch testimonies from API
  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      
      // Transform API data to match our component structure
      const transformedData = response.data.map((testimony, index) => ({
        id: testimony._id || testimony.id || `testimony-${index + 1}`,
        name: testimony.name || "Unknown User",
        role: testimony.role || "Customer",
        content: testimony.content || "No content provided",
        rating: testimony.rating || 5,
        image: testimony.image || getDefaultImage(index),
        status: testimony.status || "published",
        createdAt: testimony.createdAt ? new Date(testimony.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        featured: testimony.featured || false,
        email: testimony.email || ""
      }));

      setTestimonies(transformedData);
    } catch (error) {
      console.error("Error fetching testimonies:", error);
      toast.error("Failed to load testimonies");
      // Fallback to empty array
      setTestimonies([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get default images
  const getDefaultImage = (index) => {
    const defaultImages = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    ];
    return defaultImages[index % defaultImages.length];
  };

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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4 md:p-6 w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {title}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {value}
            </p>
          </div>
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0 ml-2 sm:ml-4`}
          >
            <span className="text-sm sm:text-lg md:text-2xl text-white">{icon}</span>
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
      small: "text-xs sm:text-sm",
      medium: "text-sm sm:text-lg md:text-xl",
      large: "text-lg sm:text-xl md:text-2xl",
    };

    return (
      <div className="flex space-x-0.5 sm:space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            onClick={() => editable && onRatingChange(star)}
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

  // Function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Enhanced Testimony Modal Component with image upload
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
      email: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    React.useEffect(() => {
      if (initialData) {
        setFormData(initialData);
        setImagePreview(initialData.image || "");
      } else {
        setFormData({
          name: "",
          role: "",
          content: "",
          rating: 5,
          image: "",
          featured: false,
          email: "",
        });
        setImagePreview("");
        setImageFile(null);
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

    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
          toast.error('Please select an image file');
          return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error('Image size should be less than 5MB');
          return;
        }

        setImageFile(file);
        
        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        
        // Convert to base64 for submission
        try {
          const base64Image = await fileToBase64(file);
          setFormData(prev => ({
            ...prev,
            image: base64Image
          }));
        } catch (error) {
          console.error('Error converting image to base64:', error);
          toast.error('Error processing image');
        }
      }
    };

    const handleRemoveImage = () => {
      setImageFile(null);
      setImagePreview("");
      setFormData(prev => ({
        ...prev,
        image: ""
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Prepare testimony data object
      const testimonyData = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        content: formData.content.trim(),
        rating: parseInt(formData.rating),
        image: formData.image || getDefaultImage(0),
        email: formData.email.trim(),
        featured: Boolean(formData.featured),
        status: "published"
      };

      // Validate required fields
      if (!testimonyData.name || !testimonyData.email || !testimonyData.role || !testimonyData.content) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(testimonyData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      onSubmit(testimonyData);
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
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl w-full max-w-md sm:max-w-2xl max-h-[95vh] overflow-y-auto m-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <CloseIcon className="text-gray-600 dark:text-gray-300 text-base sm:text-lg" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-black overflow-y-auto"
              >
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    Testimony Information
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Role/Position *
                      </label>
                      <div className="relative">
                        <WorkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                      size="medium"
                    />
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formData.rating} out of 5 stars
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Testimony Content *
                    </label>
                    <div className="relative">
                      <MessageIcon className="absolute left-3 top-3 text-gray-400 text-sm sm:text-base" />
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Share your experience with our service..."
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Profile Image
                    </label>
                    
                    {/* Image Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                      {imagePreview ? (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                            />
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            Image selected: {imageFile?.name}
                          </p>
                          <div className="flex space-x-2 justify-center">
                            <button
                              type="button"
                              onClick={() => document.getElementById('image-upload').click()}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                            >
                              Change Image
                            </button>
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <CloudUploadIcon className="mx-auto text-gray-400 text-2xl sm:text-3xl" />
                          <div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                              Click to upload profile image
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              PNG, JPG, JPEG up to 5MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => document.getElementById('image-upload').click()}
                            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                          >
                            Choose File
                          </button>
                        </div>
                      )}
                      
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>

                    {/* URL Input as fallback */}
                    <div className="mt-3">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Or enter image URL:
                      </label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="https://example.com/profile.jpg"
                      />
                    </div>
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

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg transition-all text-sm ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:from-blue-700 hover:to-blue-800"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : initialData ? "Update Testimony" : "Create Testimony"}
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

  const handleCreateTestimony = async (testimonyData) => {
    setIsSubmitting(true);
    try {
      // Prepare data for API submission in the required format
      const apiData = {
        name: testimonyData.name,
        role: testimonyData.role,
        content: testimonyData.content,
        rating: testimonyData.rating,
        image: testimonyData.image, // This will be base64 string if uploaded from local
        email: testimonyData.email,
        featured: testimonyData.featured,
        status: testimonyData.status
      };

      console.log('Submitting testimony data:', {
        ...apiData,
        image: apiData.image ? `${apiData.image.substring(0, 100)}...` : 'No image'
      });

      const response = await axios.post(API_URL, apiData);

      if (response.status === 201 || response.status === 200) {
        // Refresh the testimonies list
        await fetchTestimonies();
        toast.success(`Testimony from "${testimonyData.name}" created successfully!`);
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating testimony:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        toast.error(`Failed to create testimony: ${error.response.data.message || 'Server error'}`);
      } else {
        toast.error("Failed to create testimony: Network error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTestimonyFields = async (testimonyData) => {
    setIsSubmitting(true);
    try {
      const apiData = {
        name: testimonyData.name,
        role: testimonyData.role,
        content: testimonyData.content,
        rating: testimonyData.rating,
        image: testimonyData.image,
        email: testimonyData.email,
        featured: testimonyData.featured,
        status: testimonyData.status || "published"
      };

      const response = await axios.put(`${API_URL}/${editingTestimony.id}`, apiData);

      if (response.status === 200) {
        await fetchTestimonies();
        toast.success(`Testimony from "${testimonyData.name}" updated successfully!`);
        setIsEditModalOpen(false);
        setEditingTestimony(null);
      }
    } catch (error) {
      console.error("Error updating testimony:", error);
      if (error.response) {
        toast.error(`Failed to update testimony: ${error.response.data.message || 'Server error'}`);
      } else {
        toast.error("Failed to update testimony: Network error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTestimony = async (testimonyId, testimonyName) => {
    if (window.confirm(`Are you sure you want to delete testimony from "${testimonyName}"?`)) {
      try {
        await axios.delete(`${API_URL}/${testimonyId}`);
        await fetchTestimonies();
        toast.success(`Testimony from "${testimonyName}" deleted successfully!`);
      } catch (error) {
        console.error("Error deleting testimony:", error);
        toast.error("Failed to delete testimony");
      }
    }
  };

  // Function to edit testimony status only
  const handleEditTestimonyStatus = async (testimonyId, newStatus) => {
    try {
      const testimony = testimonies.find(t => t.id === testimonyId);
      if (!testimony) {
        toast.error("Testimony not found");
        return;
      }

      const apiData = {
        name: testimony.name,
        role: testimony.role,
        content: testimony.content,
        rating: testimony.rating,
        image: testimony.image,
        email: testimony.email,
        featured: testimony.featured,
        status: newStatus
      };

      await axios.put(`${API_URL}/${testimonyId}`, apiData);
      await fetchTestimonies();
      toast.success(`Testimony status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating testimony status:", error);
      toast.error("Failed to update testimony status");
    }
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
      className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {/* Testimony Header */}
      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <img
              src={testimony.image}
              alt={testimony.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600 flex-shrink-0"
              onError={(e) => {
                e.target.src = getDefaultImage(0);
              }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate text-xs sm:text-sm">
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
          <div className="flex items-center space-x-1 sm:space-x-2">
            {testimony.featured && (
              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
            <span
              className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(
                testimony.status
              )}`}
            >
              {testimony.status}
            </span>
          </div>
        </div>
      </div>

      {/* Testimony Content */}
      <div className="p-3 sm:p-4">
        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-3">
          "{testimony.content}"
        </p>

        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
          Added on {testimony.createdAt}
        </div>

        {/* Mobile Actions Menu */}
        <AnimatePresence>
          {mobileMenuOpen === testimony.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-2 sm:pt-3 space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openEditModal(testimony)}
                  className="flex items-center justify-center space-x-1 bg-blue-600 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg hover:bg-blue-700 transition-colors text-xs"
                >
                  <EditIcon fontSize="small" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDeleteTestimony(testimony.id, testimony.name)}
                  className="flex items-center justify-center space-x-1 bg-red-600 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg hover:bg-red-700 transition-colors text-xs"
                >
                  <DeleteIcon fontSize="small" />
                  <span>Delete</span>
                </button>
              </div>
              
              <select
                value={testimony.status}
                onChange={(e) => handleEditTestimonyStatus(testimony.id, e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-2 py-1.5 sm:py-2 text-xs border-none focus:ring-2 focus:ring-blue-500"
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
              className="flex-1 bg-blue-600 text-white py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs"
            >
              Edit
            </button>
            <select
              value={testimony.status}
              onChange={(e) => handleEditTestimonyStatus(testimony.id, e.target.value)}
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
        className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 mt-4 sm:mt-6 md:mt-8"
      >
        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
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
                className="px-2 sm:px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
              >
                1
              </button>
              {startPage > 2 && <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-2 sm:px-3 py-1 rounded-lg border transition-colors text-xs sm:text-sm ${
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
              {endPage < totalPages - 1 && <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-2 sm:px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm"
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

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Sidebar />
        <div className="flex-1 p-4 sm:p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Loading testimonies...</p>
          </div>
        </div>
      </div>
    );
  }

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
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-3 sm:mb-4 lg:mb-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Testimony Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm md:text-base">
                Manage customer testimonials and reviews
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-sm w-full lg:w-auto"
            >
              <AddIcon className="text-base sm:text-lg" />
              <span>Add New Testimony</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-full sm:max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type="text"
                  placeholder="Search testimonies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap gap-2">
              <FilterIcon className="text-gray-400 hidden sm:block" />
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[100px] sm:min-w-[120px]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[100px] sm:min-w-[120px]"
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
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[100px] sm:min-w-[120px]"
              >
                <option value="all">All</option>
                <option value="featured">Featured</option>
                <option value="notFeatured">Not Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Showing {indexOfFirstTestimony + 1}-
          {Math.min(indexOfLastTestimony, filteredTestimonies.length)} of{" "}
          {filteredTestimonies.length} testimonies
        </div>

        {/* Desktop Testimonies Grid (hidden on mobile) */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
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
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                        onError={(e) => {
                          e.target.src = getDefaultImage(0);
                        }}
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
                        handleEditTestimonyStatus(testimony.id, e.target.value)
                      }
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg px-2 text-xs sm:text-sm border-none focus:ring-2 focus:ring-blue-500"
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
        <div className="lg:hidden space-y-2 sm:space-y-3 md:space-y-4">
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
            className="text-center py-6 sm:py-8 md:py-12"
          >
            <div className="text-3xl sm:text-4xl md:text-6xl mb-2 sm:mb-3 md:mb-4">💬</div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
              No testimonies found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base">
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
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-xs sm:text-sm md:text-base"
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
          onSubmit={handleEditTestimonyFields}
          title="Edit Testimony"
          initialData={editingTestimony}
        />
      </div>
    </div>
  );
};