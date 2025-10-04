/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  LocalBar,
  LocalCafe,
  WineBar,
  Restaurant,
  Category as CategoryIcon,
  Fastfood as FastfoodIcon,
  Liquor as LiquorIcon,
  Coffee as CoffeeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ChevronLeft,
  ChevronRight,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Receipt as ReceiptIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const ProductsManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

  // Axios instance with base configuration
  const api = axios.create({
    baseURL: 'https://floridabarnode.onrender.com'
  });

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      
      console.log('API Response:', response.data);
      
      // Handle the specific response format
      const data = response.data;
      
      let ordersArray = [];
      
      if (data && data.data && Array.isArray(data.data.orders)) {
        ordersArray = data.data.orders;
      } else if (Array.isArray(data)) {
        ordersArray = data;
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.orders)) {
          ordersArray = data.orders;
        } else if (Array.isArray(data.data)) {
          ordersArray = data.data;
        } else {
          ordersArray = [data];
        }
      }
      
      console.log('Processed orders:', ordersArray);
      setOrders(ordersArray);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load orders';
      setError(errorMessage);
      setOrders([]);
      toast.error(`Failed to load orders: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Enhanced Stat Card Component
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

  // Order Modal Component
  const OrderModal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    initialData,
  }) => {
    const [formData, setFormData] = useState({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      items: [],
      totalAmount: "",
      status: "pending",
      notes: ""
    });

    const [currentItem, setCurrentItem] = useState({
      productName: "",
      quantity: 1,
      price: "",
      total: 0
    });

    React.useEffect(() => {
      if (initialData) {
        // Transform API data to form format
        setFormData({
          customerName: initialData.customerInfo?.name || "",
          customerPhone: initialData.customerInfo?.phone || "",
          customerEmail: initialData.customerInfo?.email || "",
          items: initialData.cartItems?.map(item => ({
            id: item._id || item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.totalPrice || item.price * item.quantity
          })) || [],
          totalAmount: initialData.orderDetails?.totalAmount?.toString() || initialData.summary?.total?.toString() || "",
          status: initialData.orderDetails?.status || "pending",
          notes: initialData.customerInfo?.notes || ""
        });
      } else {
        setFormData({
          customerName: "",
          customerPhone: "",
          customerEmail: "",
          items: [],
          totalAmount: "",
          status: "pending",
          notes: ""
        });
      }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleItemChange = (e) => {
      const { name, value } = e.target;
      setCurrentItem(prev => {
        const updated = {
          ...prev,
          [name]: value
        };
        
        // Calculate total if quantity or price changes
        if (name === 'quantity' || name === 'price') {
          const quantity = name === 'quantity' ? parseInt(value) || 0 : prev.quantity;
          const price = name === 'price' ? parseFloat(value) || 0 : prev.price;
          updated.total = quantity * price;
        }
        
        return updated;
      });
    };

    const addItem = () => {
      if (currentItem.productName && currentItem.quantity > 0 && currentItem.price > 0) {
        setFormData(prev => ({
          ...prev,
          items: [...prev.items, { ...currentItem, id: Date.now() }]
        }));
        
        // Reset current item
        setCurrentItem({
          productName: "",
          quantity: 1,
          price: "",
          total: 0
        });
      }
    };

    const removeItem = (itemId) => {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== itemId)
      }));
    };

    const calculateTotal = () => {
      return formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Transform form data to API format
      const orderData = {
        orderDetails: {
          orderId: initialData?.orderDetails?.orderId || `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          totalAmount: calculateTotal(),
          status: formData.status,
          paymentMethod: "mobile_money",
          paymentStatus: formData.status === "completed" ? "completed" : "pending",
          timestamp: initialData?.orderDetails?.timestamp || new Date().toISOString()
        },
        customerInfo: {
          name: formData.customerName,
          phone: formData.customerPhone,
          email: formData.customerEmail,
          location: "onsite",
          notes: formData.notes
        },
        summary: {
          subtotal: calculateTotal(),
          tax: 0,
          serviceCharge: 0,
          deliveryFee: 0,
          discount: 0,
          total: calculateTotal(),
          itemCount: formData.items.length
        },
        cartItems: formData.items.map(item => ({
          id: item.id.toString(),
          name: item.productName,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.total,
          type: "drink",
          description: ""
        }))
      };

      try {
        let response;
        if (initialData) {
          // Update existing order
          response = await api.put(`/orders/${initialData._id}`, orderData);
        } else {
          // Create new order
          response = await api.post('/orders', orderData);
        }
        
        const savedOrder = response.data;
        onSubmit(savedOrder);
        toast.success(`Order ${initialData ? 'updated' : 'created'} successfully!`);
      } catch (err) {
        console.error('Error saving order:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to save order';
        toast.error(errorMessage);
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto m-2"
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
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-black overflow-y-auto">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Customer Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Customer Name *
                      </label>
                      <div className="relative">
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter customer name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                          type="tel"
                          name="customerPhone"
                          value={formData.customerPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                          type="email"
                          name="customerEmail"
                          value={formData.customerEmail}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Order Items
                    </h3>

                    {/* Add Item Form */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Product Name
                          </label>
                          <input
                            type="text"
                            name="productName"
                            value={currentItem.productName}
                            onChange={handleItemChange}
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                            placeholder="Product name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            value={currentItem.quantity}
                            onChange={handleItemChange}
                            min="1"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={currentItem.price}
                            onChange={handleItemChange}
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                            placeholder="0.00"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={addItem}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Add Item
                          </button>
                        </div>
                      </div>
                      {currentItem.total > 0 && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Item Total: {formatPrice(currentItem.total)}
                        </div>
                      )}
                    </div>

                    {/* Items List */}
                    {formData.items.length > 0 ? (
                      <div className="space-y-2">
                        {formData.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg border">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {item.productName}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {item.quantity} x {formatPrice(item.price)} = {formatPrice(item.total)}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <DeleteIcon fontSize="small" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No items added yet
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  {formData.items.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Order Total:
                        </span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {formatPrice(calculateTotal())}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Any special instructions or notes..."
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    {initialData ? "Update Order" : "Create Order"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Safe filtering that handles non-array cases
  const filteredOrders = React.useMemo(() => {
    if (!Array.isArray(orders)) return [];
    
    return orders.filter((order) => {
      if (!order) return false;
      
      const matchesSearch =
        order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo?.phone?.includes(searchTerm) ||
        order.customerInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderDetails?.orderId?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus =
        filterStatus === "all" || order.orderDetails?.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, filterStatus]);

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const handleCreateOrder = (orderData) => {
    setOrders(prev => [orderData, ...prev]);
    setIsCreateModalOpen(false);
    fetchOrders(); // Refresh data from API
  };

  const handleEditOrder = (orderData) => {
    setOrders(prev => prev.map(order => 
      order._id === orderData._id ? orderData : order
    ));
    setIsEditModalOpen(false);
    setEditingOrder(null);
    fetchOrders(); // Refresh data from API
  };

  // Function to edit order status
  const handleEditStatus = async (orderId, newStatus) => {
    try {
      // Find the order to get current data
      const orderToUpdate = orders.find(order => order._id === orderId);
      
      if (!orderToUpdate) {
        toast.error("Order not found");
        return;
      }

      // Prepare data for API - only update the status
      const orderData = {
        orderDetails: {
          ...orderToUpdate.orderDetails,
          status: newStatus
        },
        customerInfo: orderToUpdate.customerInfo,
        summary: orderToUpdate.summary,
        cartItems: orderToUpdate.cartItems
      };

      const response = await api.put(`/orders/${orderId}`, orderData);

      // Update local state
      const updatedOrders = orders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              orderDetails: {
                ...order.orderDetails,
                status: newStatus
              }
            }
          : order
      );

      setOrders(updatedOrders);
      toast.success(`Order status changed to ${newStatus} successfully!`);
    } catch (err) {
      console.error('Error updating order status:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update order status';
      toast.error(errorMessage);
    }
  };

  const handleDeleteOrder = async (orderId, customerName) => {
    if (window.confirm(`Are you sure you want to delete order for "${customerName}"?`)) {
      try {
        await api.delete(`/orders/${orderId}`);
        setOrders(prev => prev.filter(order => order._id !== orderId));
        toast.success(`Order for "${customerName}" deleted successfully!`);
      } catch (err) {
        console.error('Error deleting order:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to delete order';
        toast.error(errorMessage);
        // Re-fetch orders to ensure consistency
        fetchOrders();
      }
    }
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  // Calculate statistics safely
  const totalOrders = Array.isArray(orders) ? orders.length : 0;
  const totalRevenue = Array.isArray(orders) 
    ? orders.reduce((sum, order) => sum + (order.orderDetails?.totalAmount || order.summary?.total || 0), 0)
    : 0;
  const pendingOrders = Array.isArray(orders)
    ? orders.filter(order => order.orderDetails?.status === 'pending').length
    : 0;
  const completedOrders = Array.isArray(orders)
    ? orders.filter(order => order.orderDetails?.status === 'completed').length
    : 0;

  // Enhanced Pagination Controls
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
          Showing {indexOfFirstOrder + 1}-
          {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <ChevronLeft fontSize="small" />
          </button>

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

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <ChevronRight fontSize="small" />
          </button>
        </div>
      </motion.div>
    );
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF'
    }).format(price);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'ready': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Status Dropdown Component for quick status updates
  const StatusDropdown = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const statusOptions = [
      { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
      { value: "preparing", label: "Preparing", color: "bg-orange-100 text-orange-800" },
      { value: "ready", label: "Ready", color: "bg-purple-100 text-purple-800" },
      { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
      { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
    ];

    const currentStatus = statusOptions.find(opt => opt.value === order.orderDetails?.status);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderDetails?.status)} hover:opacity-80 transition-opacity`}
        >
          <span className="capitalize">{order.orderDetails?.status || 'pending'}</span>
          <ExpandMoreIcon className="h-3 w-3 ml-1" />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
            >
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleEditStatus(order._id, option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                    order.orderDetails?.status === option.value ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                >
                  <span className={`px-2 py-1 rounded-full text-xs ${option.color}`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Mobile Order Card Component
  const MobileOrderCard = ({ order }) => {
    const [showStatusOptions, setShowStatusOptions] = useState(false);

    const statusOptions = [
      { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
      { value: "preparing", label: "Preparing", color: "bg-orange-100 text-orange-800" },
      { value: "ready", label: "Ready", color: "bg-purple-100 text-purple-800" },
      { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
      { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-3"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <ReceiptIcon className="h-4 w-4 text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                {order.orderDetails?.orderId || 'N/A'}
              </h3>
            </div>
            <p className="text-gray-900 dark:text-white font-medium truncate">
              {order.customerInfo?.name || 'N/A'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 truncate text-xs">
              {order.customerInfo?.phone || 'No phone'}
            </p>
            {order.customerInfo?.email && (
              <p className="text-gray-500 dark:text-gray-400 truncate text-xs">
                {order.customerInfo.email}
              </p>
            )}
          </div>
          <button
            onClick={() =>
              setMobileMenuOpen(
                mobileMenuOpen === order._id ? null : order._id
              )
            }
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <MoreVertIcon fontSize="small" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Items</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {order.cartItems?.length || 0} items
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatPrice(order.orderDetails?.totalAmount || order.summary?.total || 0)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <button
              onClick={() => setShowStatusOptions(!showStatusOptions)}
              className={`px-2 py-1 inline-flex items-center text-xs leading-4 font-semibold rounded-full ${getStatusColor(order.orderDetails?.status)} hover:opacity-80 transition-opacity`}
            >
              <span className="capitalize">{order.orderDetails?.status || 'pending'}</span>
              <ExpandMoreIcon className="h-3 w-3 ml-1" />
            </button>
            
            <AnimatePresence>
              {showStatusOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 w-28 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
                >
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        handleEditStatus(order._id, option.value);
                        setShowStatusOptions(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                        order.orderDetails?.status === option.value ? "bg-gray-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      <span className={`px-2 py-1 rounded-full text-xs ${option.color}`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {order.orderDetails?.timestamp ? new Date(order.orderDetails.timestamp).toLocaleDateString() : 
             order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>

        {/* Mobile Actions Menu */}
        <AnimatePresence>
          {mobileMenuOpen === order._id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openEditModal(order)}
                  className="flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700 transition-colors"
                >
                  <EditIcon fontSize="small" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteOrder(order._id, order.customerInfo?.name)}
                  className="flex items-center justify-center space-x-1 bg-red-600 text-white py-2 px-3 rounded text-xs hover:bg-red-700 transition-colors"
                >
                  <DeleteIcon fontSize="small" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions (always visible) */}
        {mobileMenuOpen !== order._id && (
          <div className="flex space-x-2">
            <button
              onClick={() => openEditModal(order)}
              className="flex-1 bg-blue-600 text-white py-1 rounded text-xs hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteOrder(order._id, order.customerInfo?.name)}
              className="flex-1 bg-red-600 text-white py-1 rounded text-xs hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Sidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading orders...</p>
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
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Orders Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage customer orders and track order status
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-sm sm:text-base w-full lg:w-auto"
            >
              <AddIcon className="text-lg" />
              <span>Create New Order</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={<ReceiptIcon />}
            color="blue"
          />
          <StatCard
            title="Total Revenue"
            value={formatPrice(totalRevenue)}
            icon="💰"
            color="green"
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            icon="⏳"
            color="yellow"
          />
          <StatCard
            title="Completed Orders"
            value={completedOrders}
            icon="✅"
            color="purple"
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
                  placeholder="Search orders by customer, phone, or email..."
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
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List - Responsive for all screen sizes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          {/* Results Count */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstOrder + 1}-
              {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </div>
          </div>

          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden lg:block w-full overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentOrders.map((order, index) => (
                  <motion.tr
                    key={order._id || `order-${index}-${Date.now()}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.orderDetails?.orderId || `ORD-${index + 1}`}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.customerInfo?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.customerInfo?.phone || 'No phone'}
                      </div>
                      {order.customerInfo?.email && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {order.customerInfo.email}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {order.cartItems?.length || 0} items
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.cartItems?.slice(0, 2).map(item => item.name).join(', ')}
                        {order.cartItems?.length > 2 && ` +${order.cartItems.length - 2} more`}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatPrice(order.orderDetails?.totalAmount || order.summary?.total || 0)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusDropdown order={order} />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {order.orderDetails?.timestamp ? new Date(order.orderDetails.timestamp).toLocaleDateString() : 
                       order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(order)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <EditIcon fontSize="small" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id, order.customerInfo?.name)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet View (shown on screens smaller than lg) */}
          <div className="lg:hidden">
            <AnimatePresence>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <MobileOrderCard key={order._id} order={order} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No orders found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm || filterStatus !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by creating your first order"}
                  </p>
                  {!searchTerm && filterStatus === "all" && (
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      Create Your First Order
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Empty State for Desktop */}
          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 hidden lg:block"
            >
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first order"}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Create Your First Order
                </button>
              )}
            </motion.div>
          )}

          {/* Pagination Controls */}
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <PaginationControls />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center">
              <div className="text-red-600 dark:text-red-400 mr-3">⚠️</div>
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-300">
                  Error loading orders
                </h4>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  {error}
                </p>
                <button
                  onClick={fetchOrders}
                  className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modals */}
        <OrderModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateOrder}
          title="Create New Order"
        />

        <OrderModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingOrder(null);
          }}
          onSubmit={handleEditOrder}
          title="Edit Order"
          initialData={editingOrder}
        />
      </div>
    </div>
  );
};