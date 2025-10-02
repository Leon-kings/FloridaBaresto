/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Category as CategoryIcon,
  CheckCircle as ActiveIcon,
  Error as ExpiredIcon,
  Pending as PendingIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { Sidebar } from '../sidebar/Sidebar';
import axios from 'axios';

// Models (unchanged)
class Subscription {
  constructor(data = {}) {
    this.id = data.id || Date.now();
    this.email = data.email || '';
    this.source = data.source || 'website_footer';
    this.status = data.status || 'active';
    this.createdAt = data.createdAt || new Date().toISOString().split('T')[0];
    this.subscriptionType = data.subscriptionType || 'newsletter';
  }

  validate() {
    const errors = {};
    if (!this.email.trim()) errors.email = 'Email is required';
    if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email is required';
    return errors;
  }
}

// Mock API Service (unchanged)
class SubscriptionService {
  static mockSubscriptions = [
    new Subscription({
      id: 1,
      email: 'john.smith@example.com',
      source: 'website_footer',
      status: 'active',
      createdAt: '2024-01-15',
      subscriptionType: 'newsletter'
    }),
    // ... rest of mock data unchanged
  ];

  static async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async getSubscriptions(page = 1, limit = 10) {
    await this.delay(500);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSubscriptions = this.mockSubscriptions.slice(startIndex, endIndex);
    
    return { 
      data: paginatedSubscriptions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(this.mockSubscriptions.length / limit),
        totalItems: this.mockSubscriptions.length,
        hasNext: endIndex < this.mockSubscriptions.length,
        hasPrev: page > 1
      }
    };
  }

  static async createSubscription(subscriptionData) {
    await this.delay(500);
    
    try {
      const response = await axios.post(
        "https://api.example.com/newsletter/subscribe",
        {
          email: subscriptionData.email,
          source: subscriptionData.source,
        }
      );
      
      const newSubscription = new Subscription({
        ...subscriptionData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0]
      });
      
      this.mockSubscriptions.unshift(newSubscription);
      return { data: newSubscription };
    } catch (error) {
      throw new Error('Failed to create subscription via API');
    }
  }

  static async updateSubscription(id, subscriptionData) {
    await this.delay(500);
    const index = this.mockSubscriptions.findIndex(sub => sub.id === id);
    if (index !== -1) {
      this.mockSubscriptions[index] = { ...this.mockSubscriptions[index], ...subscriptionData };
      return { data: this.mockSubscriptions[index] };
    }
    throw new Error('Subscription not found');
  }

  static async deleteSubscription(id) {
    await this.delay(300);
    const index = this.mockSubscriptions.findIndex(sub => sub.id === id);
    if (index !== -1) {
      this.mockSubscriptions.splice(index, 1);
      return { data: { message: 'Subscription deleted successfully' } };
    }
    throw new Error('Subscription not found');
  }
}

export const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

  // Enhanced Stat Card Component with responsive design
  const StatCard = ({ title, value, icon, color, subtitle }) => {
    const colorClasses = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
          <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0 ml-4`}>
            <span className="text-lg sm:text-2xl text-white">{icon}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Enhanced Subscription Modal Component with responsive design
  const SubscriptionModal = ({ isOpen, onClose, onSubmit, title, initialData }) => {
    const [formData, setFormData] = useState(new Subscription());
    const [errors, setErrors] = useState({});

    useEffect(() => {
      if (initialData) {
        setFormData(new Subscription(initialData));
      } else {
        setFormData(new Subscription());
      }
      setErrors({});
    }, [initialData, isOpen]);

    const sourceOptions = [
      { value: 'website_footer', label: 'Website Footer' },
      { value: 'website_popup', label: 'Website Popup' },
      { value: 'landing_page', label: 'Landing Page' },
      { value: 'checkout_page', label: 'Checkout Page' },
      { value: 'other', label: 'Other' }
    ];

    const statusOptions = [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'inactive', label: 'Inactive' }
    ];

    const subscriptionTypeOptions = [
      { value: 'newsletter', label: 'Newsletter' },
      { value: 'promotional', label: 'Promotional' },
      { value: 'transactional', label: 'Transactional' }
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const validateForm = () => {
      const validationErrors = formData.validate();
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          await onSubmit(formData);
        } catch (error) {
          toast.error('Failed to save subscription');
        }
      }
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto m-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <CloseIcon className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Source *
                    </label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {sourceOptions.map(source => (
                        <option key={source.value} value={source.value}>{source.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Subscription Type
                    </label>
                    <select
                      name="subscriptionType"
                      value={formData.subscriptionType}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {subscriptionTypeOptions.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
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
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    {initialData ? <SaveIcon className="text-lg" /> : <AddIcon className="text-lg" />}
                    <span>{initialData ? 'Update' : 'Subscribe'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Load subscriptions with pagination (unchanged)
  const loadSubscriptions = async (page = 1) => {
    setLoading(true);
    try {
      const response = await SubscriptionService.getSubscriptions(page, itemsPerPage);
      setSubscriptions(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to load subscriptions');
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create subscription (unchanged)
  const createSubscription = async (subscriptionData) => {
    try {
      const response = await SubscriptionService.createSubscription(subscriptionData);
      await loadSubscriptions(1);
      toast.success('Subscription created successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to create subscription');
      throw error;
    }
  };

  // Update subscription (unchanged)
  const updateSubscription = async (id, subscriptionData) => {
    try {
      const response = await SubscriptionService.updateSubscription(id, subscriptionData);
      await loadSubscriptions(currentPage);
      toast.success('Subscription updated successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to update subscription');
      throw error;
    }
  };

  // Delete subscription (unchanged)
  const deleteSubscription = async (id) => {
    try {
      await SubscriptionService.deleteSubscription(id);
      if (subscriptions.length === 1 && currentPage > 1) {
        await loadSubscriptions(currentPage - 1);
      } else {
        await loadSubscriptions(currentPage);
      }
      toast.success('Subscription deleted successfully');
    } catch (error) {
      toast.error('Failed to delete subscription');
      throw error;
    }
  };

  const handleStatusChange = async (subscriptionId, newStatus) => {
    try {
      await SubscriptionService.updateSubscription(subscriptionId, { status: newStatus });
      await loadSubscriptions(currentPage);
      toast.success(`Subscription status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openEditModal = (subscription) => {
    setEditingSubscription(subscription);
    setIsEditModalOpen(true);
  };

  // Filter subscriptions based on search and filters (unchanged)
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = 
      subscription.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || subscription.status === filterStatus;
    const matchesSource = filterSource === 'all' || subscription.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  // Calculate statistics (unchanged)
  const totalSubscriptions = pagination.totalItems;
  const activeSubscriptions = SubscriptionService.mockSubscriptions.filter(sub => sub.status === 'active').length;
  const pendingSubscriptions = SubscriptionService.mockSubscriptions.filter(sub => sub.status === 'pending').length;

  useEffect(() => {
    loadSubscriptions(currentPage);
  }, [currentPage]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <ActiveIcon fontSize="small" />;
      case 'inactive': return <ExpiredIcon fontSize="small" />;
      case 'pending': return <PendingIcon fontSize="small" />;
      default: return <ActiveIcon fontSize="small" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Mobile-friendly table row component
  const MobileSubscriptionRow = ({ subscription }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-3"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {subscription.email}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(subscription.status)}`}>
              {subscription.status}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {subscription.source.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(mobileMenuOpen === subscription.id ? null : subscription.id)}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <MoreVertIcon fontSize="small" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-medium">Type:</span> {subscription.subscriptionType}
        </div>
        <div>
          <span className="font-medium">Date:</span> {formatDate(subscription.createdAt)}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen === subscription.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex space-x-2">
              <select
                value={subscription.status}
                onChange={(e) => handleStatusChange(subscription.id, e.target.value)}
                className={`flex-1 text-xs px-2 py-1 rounded border-none focus:ring-1 focus:ring-blue-500 ${getStatusColor(subscription.status)}`}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={() => openEditModal(subscription)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete subscription for "${subscription.email}"?`)) {
                    deleteSubscription(subscription.id);
                  }
                }}
                className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Enhanced Pagination Controls with responsive design
  const PaginationControls = () => {
    if (pagination.totalPages <= 1) return null;

    const pageNumbers = [];
    const maxPagesToShow = window.innerWidth < 640 ? 3 : 5;
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1);

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
          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, pagination.totalItems)} of {pagination.totalItems}
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={!pagination.hasPrev}
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

          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg border transition-colors text-sm ${
                pagination.currentPage === number
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < pagination.totalPages && (
            <>
              {endPage < pagination.totalPages - 1 && <span className="px-1 sm:px-2 text-sm">...</span>}
              <button
                onClick={() => setCurrentPage(pagination.totalPages)}
                className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                {pagination.totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
            disabled={!pagination.hasNext}
            className="p-1 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </motion.div>
    );
  };

  const sourceOptions = [
    { value: 'website_footer', label: 'Website Footer' },
    { value: 'website_popup', label: 'Website Popup' },
    { value: 'landing_page', label: 'Landing Page' },
    { value: 'checkout_page', label: 'Checkout Page' },
    { value: 'other', label: 'Other' }
  ];

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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Newsletter Subscriptions</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage newsletter subscriptions and email preferences
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-sm sm:text-base w-full lg:w-auto"
            >
              <AddIcon className="text-lg" />
              <span>Add Subscription</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Subscriptions"
            value={totalSubscriptions}
            icon="📊"
            color="blue"
            subtitle="All newsletter subscriptions"
          />
          <StatCard
            title="Active Subscriptions"
            value={activeSubscriptions}
            icon="✅"
            color="green"
            subtitle="Currently active"
          />
          <StatCard
            title="Pending Subscriptions"
            value={pendingSubscriptions}
            icon="⏳"
            color="yellow"
            subtitle="Awaiting confirmation"
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
                  placeholder="Search by email address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <FilterIcon className="text-gray-400 hidden sm:block" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Sources</option>
                {sourceOptions.map(source => (
                  <option key={source.value} value={source.value}>{source.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, pagination.totalItems)} of {pagination.totalItems} subscriptions
          {searchTerm && ` (${filteredSubscriptions.length} filtered)`}
        </div>

        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subscribed
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      </td>
                    </tr>
                  ) : filteredSubscriptions.map((subscription, index) => (
                    <motion.tr
                      key={subscription.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {subscription.email}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {subscription.source.replace(/_/g, ' ')}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {subscription.subscriptionType}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <select
                          value={subscription.status}
                          onChange={(e) => handleStatusChange(subscription.id, e.target.value)}
                          className={`text-sm px-2 py-1 rounded-full border-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(subscription.status)}`}
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(subscription.createdAt)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openEditModal(subscription)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <EditIcon fontSize="small" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete subscription for "${subscription.email}"?`)) {
                                deleteSubscription(subscription.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <DeleteIcon fontSize="small" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards (shown on mobile) */}
        <div className="lg:hidden">
          <AnimatePresence>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              filteredSubscriptions.map((subscription, index) => (
                <MobileSubscriptionRow 
                  key={subscription.id} 
                  subscription={subscription} 
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!loading && filteredSubscriptions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12"
          >
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📧</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No subscriptions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              {searchTerm || filterStatus !== 'all' || filterSource !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first subscription'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && filterSource === 'all' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
              >
                Add Your First Subscription
              </button>
            )}
          </motion.div>
        )}

        {/* Pagination Controls */}
        <PaginationControls />

        {/* Modals */}
        <SubscriptionModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={createSubscription}
          title="Add New Subscription"
        />

        <SubscriptionModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingSubscription(null);
          }}
          onSubmit={(data) => updateSubscription(editingSubscription.id, data)}
          title="Edit Subscription"
          initialData={editingSubscription}
        />
      </div>
    </div>
  );
};