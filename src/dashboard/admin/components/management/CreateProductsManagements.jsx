/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  WineBar,
  LocalBar,
  LocalCafe,
  Restaurant,
  Add as AddIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Save as SaveIcon,
  CheckCircle,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const CreateProductsManagements = () => {
  const [formData, setFormData] = useState({
    // Category structure
    category: "",
    subCategory: "",
    subSubCategory: "",

    // Product fields
    id: "",
    name: "",
    description: "",
    price: "",
    type: "single",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const fileInputRef = useRef(null);

  // API base URL
  const API_URL = "https://floridabarnode.onrender.com/products";

  // Complete category structure based on your object
  const categories = {
    drinks: {
      title: "DRINKS",
      icon: "LocalBar",
      subCategories: {
        beers: {
          title: "BEER",
          subSubCategories: {
            blarirwa: { title: "BLARIRWA" },
            skol: { title: "SKOL" },
            other: { title: "OTHERS" },
          },
        },
        liquors: {
          title: "LIQUOR",
          subSubCategories: {},
        },
        wines: {
          title: "WINE",
          subSubCategories: {},
        },
        soft: {
          title: "SOFT",
          subSubCategories: {},
        },
      },
    },
    coffee: {
      title: "COFFEE",
      icon: "local_cafe",
      subCategories: {},
    },
    cocktail: {
      title: "COCKTAIL",
      icon: "wine_bar",
      subCategories: {},
    },
    food: {
      title: "FOOD",
      icon: "restaurant",
      subCategories: {},
    },
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset dependent fields when parent changes
      ...(name === "category" && { subCategory: "", subSubCategory: "" }),
      ...(name === "subCategory" && { subSubCategory: "" }),
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      category: "",
      subCategory: "",
      subSubCategory: "",
      id: "",
      name: "",
      description: "",
      price: "",
      type: "single",
      image: null,
    });
    setImagePreview(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.category ||
      !formData.name ||
      !formData.price ||
      !formData.image
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData to handle file upload
      const submitData = new FormData();

      // Append all product data matching your object structure
      submitData.append("id", formData.id || Date.now().toString());
      submitData.append("name", formData.name);
      submitData.append("description", formData.description || "");
      submitData.append("price", formData.price);
      submitData.append("type", formData.type);
      submitData.append("category", formData.category);
      submitData.append("subCategory", formData.subCategory || "");
      submitData.append("subSubCategory", formData.subSubCategory || "");
      submitData.append("image", formData.image);

      // Send to API using axios
      const response = await axios.post(API_URL, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success modal
      setSubmissionResult({
        success: true,
        message: "Product created successfully!",
        data: response.data,
      });
      setShowSuccessModal(true);

      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error creating product:", error);

      // Show error modal
      setSubmissionResult({
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to create product. Please try again.",
        error: error.message,
      });
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Get current category options
  const getSubCategories = () => {
    if (!formData.category) return [];
    return Object.keys(categories[formData.category]?.subCategories || {});
  };

  const getSubSubCategories = () => {
    if (!formData.subCategory) return [];
    return Object.keys(
      categories[formData.category]?.subCategories[formData.subCategory]
        ?.subSubCategories || {}
    );
  };

  // Get icon component based on category
  const getCategoryIcon = (category) => {
    const icons = {
      drinks: <LocalBar className="h-6 w-6" />,
      coffee: <LocalCafe className="h-6 w-6" />,
      cocktail: <WineBar className="h-6 w-6" />,
      food: <Restaurant className="h-6 w-6" />,
    };
    return icons[category] || <LocalBar className="h-6 w-6" />;
  };

  // Success Modal Component
  const SuccessModal = () => (
    <AnimatePresence>
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 text-center"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Success!
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {submissionResult?.message}
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Product Details:
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Name:</strong> {submissionResult?.data?.name}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Category:</strong>{" "}
                {categories[submissionResult?.data?.category]?.title}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Price:</strong> RWF {submissionResult?.data?.price}
              </p>
              {submissionResult?.data?.subCategory && (
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>Sub Category:</strong>{" "}
                  {
                    categories[submissionResult?.data?.category]?.subCategories[
                      submissionResult?.data?.subCategory
                    ]?.title
                  }
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  resetForm();
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Another
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Error Modal Component
  const ErrorModal = () => (
    <AnimatePresence>
      {showErrorModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 text-center"
          >
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <ErrorIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Submission Failed
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {submissionResult?.message}
            </p>

            {submissionResult?.error && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-6">
                <p className="text-xs text-red-700 dark:text-red-300">
                  Error: {submissionResult.error}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => setShowErrorModal(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  // Optionally retry submission here
                }}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="w-full min-h-screen mt-4 mb-1 rounded-2xl flex bg-gray-50 dark:bg-gray-900 py-8">
        <Sidebar />
        <div className="w-full">
          <ToastContainer />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <LocalBar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Add New Product
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Create products for drinks, coffee, cocktails, or food
                categories
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Main Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Main Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categories).map((cat) => (
                        <option key={cat} value={cat}>
                          {categories[cat].title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sub Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sub Category
                    </label>
                    <select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleInputChange}
                      disabled={
                        !formData.category || getSubCategories().length === 0
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                    >
                      <option value="">Select Sub Category</option>
                      {getSubCategories().map((subCat) => (
                        <option key={subCat} value={subCat}>
                          {
                            categories[formData.category]?.subCategories[subCat]
                              ?.title
                          }
                        </option>
                      ))}
                    </select>
                    {formData.category && getSubCategories().length === 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        No subcategories available
                      </p>
                    )}
                  </div>

                  {/* Sub Sub Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sub Sub Category
                    </label>
                    <select
                      name="subSubCategory"
                      value={formData.subSubCategory}
                      onChange={handleInputChange}
                      disabled={
                        !formData.subCategory ||
                        getSubSubCategories().length === 0
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                    >
                      <option value="">Select Sub Sub Category</option>
                      {getSubSubCategories().map((subSubCat) => (
                        <option key={subSubCat} value={subSubCat}>
                          {
                            categories[formData.category]?.subCategories[
                              formData.subCategory
                            ]?.subSubCategories[subSubCat]?.title
                          }
                        </option>
                      ))}
                    </select>
                    {formData.subCategory &&
                      getSubSubCategories().length === 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          No sub-subcategories available
                        </p>
                      )}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Product Image *
                  </label>
                  <div className="flex flex-col items-center space-y-4">
                    <div
                      onClick={triggerFileInput}
                      className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Click to upload image
                          </p>
                        </div>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      PNG, JPG, JPEG up to 5MB. Recommended: 500x500px
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ID Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Product ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter product ID"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Leave empty to auto-generate
                    </p>
                  </div>

                  {/* Type Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Product Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="single">Single</option>
                      <option value="bottle">Bottle</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter product description"
                  />
                </div>

                {/* Price Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price (RWF) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter price"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                  >
                    <CloseIcon className="mr-2 h-5 w-5" />
                    Reset Form
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <SaveIcon className="mr-2 h-5 w-5" />
                        Create Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Category Reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Available Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {Object.entries(categories).map(([key, category]) => (
                  <div
                    key={key}
                    className="bg-white dark:bg-gray-800 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded">
                        {getCategoryIcon(key)}
                      </div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-200">
                        {category.title}
                      </h4>
                    </div>
                    {Object.keys(category.subCategories).length > 0 && (
                      <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        {Object.entries(category.subCategories).map(
                          ([subKey, subCat]) => (
                            <li key={subKey}>
                              • {subCat.title}
                              {Object.keys(subCat.subSubCategories).length >
                                0 && (
                                <ul className="ml-3 mt-1 space-y-1">
                                  {Object.entries(subCat.subSubCategories).map(
                                    ([subSubKey, subSubCat]) => (
                                      <li key={subSubKey}>
                                        › {subSubCat.title}
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          {/* Modals */}
          <SuccessModal />
          <ErrorModal />
        </div>
      </div>
    </>
  );
};
