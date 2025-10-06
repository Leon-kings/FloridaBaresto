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
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon,
  Restaurant as RestaurantIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronLeft,
  ChevronRight,
  MoreVert as MoreVertIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);

  // Booking form data
  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  });

  // Services data
  const servicesData = {
    dinner: { title: "Dinner Reservation", duration: "2 hours", price: 0 },
    lunch: { title: "Lunch Reservation", duration: "1.5 hours", price: 0 },
    breakfast: { title: "Breakfast Reservation", duration: "1 hour", price: 0 },
    event: { title: "Special Event", duration: "3 hours", price: 0 },
    private: { title: "Private Dining", duration: "2.5 hours", price: 0 }
  };

  // Available booking times
  const bookingTimes = {
    dinner: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
    lunch: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"],
    breakfast: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"],
    event: ["17:00", "18:00", "19:00"],
    private: ["17:30", "19:30", "20:00"]
  };

  // Axios instance with base configuration
  const api = axios.create({
    baseURL: 'https://floridabarnode.onrender.com'
  });

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bookings');
      
      console.log('API Response:', response.data);
      
      // Handle the specific response format
      const data = response.data.data;
      
      let bookingsArray = [];
      
      if (data && data.data && Array.isArray(data.data.bookings)) {
        bookingsArray = data.data.bookings;
      } else if (Array.isArray(data)) {
        bookingsArray = data;
      } else if (data && typeof data === 'object') {
        if (Array.isArray(data.bookings)) {
          bookingsArray = data.bookings;
        } else if (Array.isArray(data.data)) {
          bookingsArray = data.data;
        } else {
          bookingsArray = [data];
        }
      }
      
      console.log('Processed bookings:', bookingsArray);
      setBookings(bookingsArray);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load bookings';
      setError(errorMessage);
      setBookings([]);
      toast.error(`Failed to load bookings: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs xs:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {title}
            </p>
            <p className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {value}
            </p>
          </div>
          <div
            className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0 ml-2 xs:ml-4`}
          >
            <span className="text-base xs:text-lg sm:text-2xl text-white">{icon}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Booking Modal Component
  const BookingModal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    initialData,
  }) => {
    const [formData, setFormData] = useState({
      service: "",
      date: "",
      time: "",
      guests: 2,
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
      status: "confirmed"
    });

    React.useEffect(() => {
      if (initialData) {
        // Transform API data to form format
        setFormData({
          service: initialData.service || "",
          date: initialData.date || "",
          time: initialData.time || "",
          guests: initialData.guests || 2,
          name: initialData.name || "",
          email: initialData.email || "",
          phone: initialData.phone || "",
          specialRequests: initialData.specialRequests || "",
          status: initialData.status || "confirmed"
        });
        setBookingStep(1);
      } else {
        setFormData({
          service: "",
          date: "",
          time: "",
          guests: 2,
          name: "",
          email: "",
          phone: "",
          specialRequests: "",
          status: "confirmed"
        });
        setBookingStep(1);
      }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'guests' ? parseInt(value) : value
      }));
    };

    const handleBookingSubmit = async (e) => {
      e.preventDefault();
      
      if (bookingStep < 3) {
        setBookingStep(bookingStep + 1);
        return;
      }

      // Transform form data to API format
      const bookingData = {
        ...formData,
        bookingId: initialData?.bookingId || `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: initialData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      try {
        let response;
        if (initialData) {
          // Update existing booking
          response = await api.put(`/bookings/${initialData._id}`, bookingData);
        } else {
          // Create new booking
          response = await api.post('/bookings', bookingData);
        }
        
        const savedBooking = response.data;
        onSubmit(savedBooking);
        toast.success(`Booking ${initialData ? 'updated' : 'created'} successfully!`);
        setBookingStep(1);
      } catch (err) {
        console.error('Error saving booking:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to save booking';
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 xs:p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto m-1 xs:m-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 xs:p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h2>
                <button
                  onClick={() => {
                    onClose();
                    setBookingStep(1);
                  }}
                  className="p-1 xs:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <CloseIcon className="text-gray-600 dark:text-gray-300 text-base xs:text-lg sm:text-xl" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleBookingSubmit} className="p-3 xs:p-4 sm:p-6 space-y-4 xs:space-y-6">
                {bookingStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 xs:space-y-6"
                  >
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                        Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm xs:text-base"
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

                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm xs:text-base"
                          required
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                          Time
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm xs:text-base"
                          required
                        >
                          <option value="">Select time</option>
                          {formData.service &&
                            bookingTimes[formData.service]?.map(
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
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                        Number of Guests
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm xs:text-base"
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </div>

                    {initialData && (
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm xs:text-base"
                          required
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="seated">Seated</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="no-show">No Show</option>
                        </select>
                      </div>
                    )}
                  </motion.div>
                )}

                {bookingStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 xs:space-y-6"
                  >
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                          <PersonIcon className="inline mr-1 xs:mr-2 text-sm" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm xs:text-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                          <EmailIcon className="inline mr-1 xs:mr-2 text-sm" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm xs:text-base"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                        <PhoneIcon className="inline mr-1 xs:mr-2 text-sm" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 text-sm xs:text-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                        Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg xs:rounded-xl px-3 xs:px-4 py-2 xs:py-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none text-sm xs:text-base"
                        placeholder="Any special requirements or preferences..."
                      />
                    </div>
                  </motion.div>
                )}

                {bookingStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 xs:space-y-6"
                  >
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl xs:rounded-2xl p-4 xs:p-6 border border-gray-300 dark:border-gray-600">
                      <h4 className="text-lg xs:text-xl font-bold text-blue-600 dark:text-blue-400 mb-3 xs:mb-4">
                        Booking Summary
                      </h4>
                      <div className="space-y-2 xs:space-y-3 text-sm xs:text-base">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Service:</span>
                          <span className="text-gray-900 dark:text-white font-semibold">
                            {servicesData[formData.service]?.title}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">
                            Date & Time:
                          </span>
                          <span className="text-gray-900 dark:text-white font-semibold">
                            {formData.date} at {formData.time}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Guests:</span>
                          <span className="text-gray-900 dark:text-white font-semibold">
                            {formData.guests} people
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Contact:</span>
                          <span className="text-gray-900 dark:text-white font-semibold">
                            {formData.name}
                          </span>
                        </div>
                        {formData.specialRequests && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Special Requests:</span>
                            <span className="text-gray-900 dark:text-white font-semibold text-right max-w-[120px] xs:max-w-[200px] text-xs xs:text-sm">
                              {formData.specialRequests}
                            </span>
                          </div>
                        )}
                        {initialData && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              formData.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              formData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              formData.status === 'seated' ? 'bg-blue-100 text-blue-800' :
                              formData.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                              formData.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {formData.status}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl xs:rounded-2xl p-3 xs:p-4">
                      <p className="text-blue-600 dark:text-blue-400 text-xs xs:text-sm text-center">
                        {initialData ? 
                          "Update the booking details as needed." : 
                          "The table will be reserved for 15 minutes. Please ensure guests arrive on time."
                        }
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 pt-4 xs:pt-6">
                  {bookingStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setBookingStep(bookingStep - 1)}
                      className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-gray-500/25 text-sm xs:text-base"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 xs:py-4 rounded-lg xs:rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-sm xs:text-base"
                  >
                    {bookingStep === 3 ? 
                      (initialData ? "Update Booking" : "Confirm Booking") : 
                      "Continue"
                    }
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
  const filteredBookings = React.useMemo(() => {
    if (!Array.isArray(bookings)) return [];
    
    return bookings.filter((booking) => {
      if (!booking) return false;
      
      const matchesSearch =
        booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone?.includes(searchTerm) ||
        booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus =
        filterStatus === "all" || booking.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, filterStatus]);

  // Pagination logic
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const handleCreateBooking = (bookingData) => {
    setBookings(prev => [bookingData, ...prev]);
    setIsCreateModalOpen(false);
    setBookingStep(1);
    fetchBookings(); // Refresh data from API
  };

  const handleEditBooking = (bookingData) => {
    setBookings(prev => prev.map(booking => 
      booking._id === bookingData._id ? bookingData : booking
    ));
    setIsEditModalOpen(false);
    setEditingBooking(null);
    setBookingStep(1);
    fetchBookings(); // Refresh data from API
  };

  // Function to edit booking status
  const handleEditStatus = async (bookingId, newStatus) => {
    try {
      // Find the booking to get current data
      const bookingToUpdate = bookings.find(booking => booking._id === bookingId);
      
      if (!bookingToUpdate) {
        toast.error("Booking not found");
        return;
      }

      // Prepare data for API - only update the status
      const bookingData = {
        ...bookingToUpdate,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };

      const response = await api.put(`/bookings/${bookingId}`, bookingData);

      // Update local state
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId
          ? {
              ...booking,
              status: newStatus,
              updatedAt: new Date().toISOString()
            }
          : booking
      );

      setBookings(updatedBookings);
      toast.success(`Booking status changed to ${newStatus} successfully!`);
    } catch (err) {
      console.error('Error updating booking status:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update booking status';
      toast.error(errorMessage);
    }
  };

  const handleDeleteBooking = async (bookingId, customerName) => {
    if (window.confirm(`Are you sure you want to delete booking for "${customerName}"?`)) {
      try {
        await api.delete(`/bookings/${bookingId}`);
        setBookings(prev => prev.filter(booking => booking._id !== bookingId));
        toast.success(`Booking for "${customerName}" deleted successfully!`);
      } catch (err) {
        console.error('Error deleting booking:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to delete booking';
        toast.error(errorMessage);
        // Re-fetch bookings to ensure consistency
        fetchBookings();
      }
    }
  };

  const openEditModal = (booking) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  // Calculate statistics safely
  const totalBookings = Array.isArray(bookings) ? bookings.length : 0;
  const confirmedBookings = Array.isArray(bookings)
    ? bookings.filter(booking => booking.status === 'confirmed').length
    : 0;
  const pendingBookings = Array.isArray(bookings)
    ? bookings.filter(booking => booking.status === 'pending').length
    : 0;
  const todayBookings = Array.isArray(bookings)
    ? bookings.filter(booking => booking.date === new Date().toISOString().split('T')[0]).length
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
        className="flex flex-col xs:flex-row justify-between items-center space-y-3 xs:space-y-0 mt-4 xs:mt-6 sm:mt-8"
      >
        <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
          Showing {indexOfFirstBooking + 1}-
          {Math.min(indexOfLastBooking, filteredBookings.length)} of{" "}
          {filteredBookings.length} bookings
        </div>

        <div className="flex items-center space-x-1 xs:space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 xs:p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 text-xs xs:text-sm"
          >
            <ChevronLeft fontSize="small" />
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-2 xs:px-3 py-1 xs:py-2 rounded-lg border transition-all duration-300 text-xs xs:text-sm ${
                currentPage === number
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1 xs:p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 text-xs xs:text-sm"
          >
            <ChevronRight fontSize="small" />
          </button>
        </div>
      </motion.div>
    );
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'seated': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'no-show': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Get service icon
  const getServiceIcon = (service) => {
    switch (service) {
      case 'dinner': return '🍽️';
      case 'lunch': return '🥗';
      case 'breakfast': return '☕';
      case 'event': return '🎉';
      case 'private': return '👑';
      default: return '📅';
    }
  };

  // Status Dropdown Component for quick status updates
  const StatusDropdown = ({ booking }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const statusOptions = [
      { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      { value: "confirmed", label: "Confirmed", color: "bg-green-100 text-green-800" },
      { value: "seated", label: "Seated", color: "bg-blue-100 text-blue-800" },
      { value: "completed", label: "Completed", color: "bg-gray-100 text-gray-800" },
      { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
      { value: "no-show", label: "No Show", color: "bg-orange-100 text-orange-800" },
    ];

    const currentStatus = statusOptions.find(opt => opt.value === booking.status);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)} hover:opacity-80 transition-opacity`}
        >
          <span className="capitalize">{booking.status || 'pending'}</span>
          <ExpandMoreIcon className="h-3 w-3 ml-1" />
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-1 w-28 xs:w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
            >
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleEditStatus(booking._id, option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2 xs:px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                    booking.status === option.value ? "bg-gray-100 dark:bg-gray-700" : ""
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

  // Mobile Booking Card Component
  const MobileBookingCard = ({ booking }) => {
    const [showStatusOptions, setShowStatusOptions] = useState(false);

    const statusOptions = [
      { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      { value: "confirmed", label: "Confirmed", color: "bg-green-100 text-green-800" },
      { value: "seated", label: "Seated", color: "bg-blue-100 text-blue-800" },
      { value: "completed", label: "Completed", color: "bg-gray-100 text-gray-800" },
      { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
      { value: "no-show", label: "No Show", color: "bg-orange-100 text-orange-800" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 xs:p-4 mb-3"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-base xs:text-lg">{getServiceIcon(booking.service)}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm xs:text-base">
                {servicesData[booking.service]?.title || 'Booking'}
              </h3>
            </div>
            <p className="text-gray-900 dark:text-white font-medium truncate text-sm xs:text-base">
              {booking.name || 'N/A'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 truncate text-xs xs:text-sm">
              {booking.phone || 'No phone'}
            </p>
            {booking.email && (
              <p className="text-gray-500 dark:text-gray-400 truncate text-xs xs:text-sm">
                {booking.email}
              </p>
            )}
          </div>
          <button
            onClick={() =>
              setMobileMenuOpen(
                mobileMenuOpen === booking._id ? null : booking._id
              )
            }
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <MoreVertIcon fontSize="small" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Date & Time</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {booking.date} at {booking.time}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {booking.guests} people
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <button
              onClick={() => setShowStatusOptions(!showStatusOptions)}
              className={`px-2 py-1 inline-flex items-center text-xs leading-4 font-semibold rounded-full ${getStatusColor(booking.status)} hover:opacity-80 transition-opacity`}
            >
              <span className="capitalize">{booking.status || 'pending'}</span>
              <ExpandMoreIcon className="h-3 w-3 ml-1" />
            </button>
            
            <AnimatePresence>
              {showStatusOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 w-24 xs:w-28 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
                >
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        handleEditStatus(booking._id, option.value);
                        setShowStatusOptions(false);
                      }}
                      className={`w-full text-left px-2 xs:px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                        booking.status === option.value ? "bg-gray-100 dark:bg-gray-700" : ""
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
            {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>

        {booking.specialRequests && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Special Requests</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
              {booking.specialRequests}
            </p>
          </div>
        )}

        {/* Mobile Actions Menu */}
        <AnimatePresence>
          {mobileMenuOpen === booking._id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openEditModal(booking)}
                  className="flex items-center justify-center space-x-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-3 rounded text-xs hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <EditIcon fontSize="small" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking._id, booking.name)}
                  className="flex items-center justify-center space-x-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-3 rounded text-xs hover:shadow-red-500/25 transition-all duration-300"
                >
                  <DeleteIcon fontSize="small" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions (always visible) */}
        {mobileMenuOpen !== booking._id && (
          <div className="flex space-x-2">
            <button
              onClick={() => openEditModal(booking)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded text-xs hover:shadow-blue-500/25 transition-all duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteBooking(booking._id, booking.name)}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 rounded text-xs hover:shadow-red-500/25 transition-all duration-300"
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
        <div className="flex-1 p-4 xs:p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 xs:h-12 w-10 xs:w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-3 xs:mt-4 text-gray-600 dark:text-gray-400 text-sm xs:text-base">Loading bookings...</p>
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
      <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 overflow-auto">
        <ToastContainer />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 xs:mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-3 xs:mb-4 lg:mb-0">
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Bookings Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 xs:mt-2 text-xs xs:text-sm sm:text-base">
                Manage restaurant reservations and customer bookings
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 xs:px-4 sm:px-6 py-2 xs:py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 text-xs xs:text-sm sm:text-base w-full lg:w-auto"
            >
              <AddIcon className="text-base xs:text-lg" />
              <span>Create New Booking</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 mb-4 xs:mb-6 sm:mb-8">
          <StatCard
            title="Total Bookings"
            value={totalBookings}
            icon={<ReceiptIcon />}
            color="blue"
          />
          <StatCard
            title="Today's Bookings"
            value={todayBookings}
            icon={<ScheduleIcon />}
            color="green"
          />
          <StatCard
            title="Pending Bookings"
            value={pendingBookings}
            icon={<AccessTimeIcon />}
            color="yellow"
          />
          <StatCard
            title="Confirmed Bookings"
            value={confirmedBookings}
            icon={<CheckCircleIcon />}
            color="purple"
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-3 xs:mb-4 sm:mb-6">
          <div className="flex flex-col space-y-3 xs:space-y-0 xs:flex-row xs:items-center xs:justify-between">
            <div className="flex-1 max-w-full xs:max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base xs:text-lg" />
                <input
                  type="text"
                  placeholder="Search bookings by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 text-xs xs:text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 flex-wrap gap-2">
              <FilterIcon className="text-gray-400 hidden xs:block" />
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 xs:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 xs:px-3 py-2 text-xs xs:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[120px] xs:min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="seated">Seated</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List - Responsive for all screen sizes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
          {/* Results Count */}
          <div className="p-3 xs:p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstBooking + 1}-
              {Math.min(indexOfLastBooking, filteredBookings.length)} of{" "}
              {filteredBookings.length} bookings
            </div>
          </div>

          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden lg:block w-full overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-3 xs:px-4 py-2 xs:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-3 xs:px-4 py-2 xs:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-3 xs:px-4 py-2 xs:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-3 xs:px-4 py-2 xs:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-3 xs:px-4 py-2 xs:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-3 xs:px-4 py-2 xs:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 xs:px-4 py-2 xs:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-3 xs:px-4 py-2 xs:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentBookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id || `booking-${index}-${Date.now()}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-3 xs:px-4 py-3 xs:py-4">
                      <div className="text-xs xs:text-sm font-medium text-gray-900 dark:text-white">
                        {booking.bookingId || `BK-${index + 1}`}
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 py-3 xs:py-4">
                      <div className="text-xs xs:text-sm font-medium text-gray-900 dark:text-white">
                        {booking.name || 'N/A'}
                      </div>
                      <div className="text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                        {booking.phone || 'No phone'}
                      </div>
                      {booking.email && (
                        <div className="text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                          {booking.email}
                        </div>
                      )}
                    </td>
                    <td className="px-3 xs:px-4 py-3 xs:py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-base xs:text-lg">{getServiceIcon(booking.service)}</span>
                        <div>
                          <div className="text-xs xs:text-sm font-medium text-gray-900 dark:text-white">
                            {servicesData[booking.service]?.title || 'Booking'}
                          </div>
                          {booking.specialRequests && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px] xs:max-w-[200px]">
                              {booking.specialRequests}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 py-3 xs:py-4">
                      <div className="text-xs xs:text-sm text-gray-900 dark:text-white">
                        {booking.date}
                      </div>
                      <div className="text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                        {booking.time}
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 py-3 xs:py-4">
                      <div className="flex items-center space-x-2">
                        <GroupIcon fontSize="small" className="text-gray-400" />
                        <span className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white">
                          {booking.guests}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 xs:px-4 py-3 xs:py-4">
                      <StatusDropdown booking={booking} />
                    </td>
                    <td className="px-3 xs:px-4 py-3 xs:py-4 text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                      {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-3 xs:px-4 py-3 xs:py-4 text-xs xs:text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(booking)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <EditIcon fontSize="small" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking._id, booking.name)}
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
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <MobileBookingCard key={booking._id} booking={booking} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 xs:py-12"
                >
                  <div className="text-3xl xs:text-4xl mb-3 xs:mb-4">📅</div>
                  <h3 className="text-base xs:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No bookings found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 xs:mb-6 text-sm xs:text-base">
                    {searchTerm || filterStatus !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by creating your first booking"}
                  </p>
                  {!searchTerm && filterStatus === "all" && (
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 xs:px-6 py-2 xs:py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 text-sm xs:text-base"
                    >
                      Create Your First Booking
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Empty State for Desktop */}
          {filteredBookings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 xs:py-12 hidden lg:block"
            >
              <div className="text-3xl xs:text-4xl mb-3 xs:mb-4">📅</div>
              <h3 className="text-base xs:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 xs:mb-6 text-sm xs:text-base">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first booking"}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 xs:px-6 py-2 xs:py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 text-sm xs:text-base"
                >
                  Create Your First Booking
                </button>
              )}
            </motion.div>
          )}

          {/* Pagination Controls */}
          <div className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 border-t border-gray-200 dark:border-gray-700">
            <PaginationControls />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 xs:mt-6 p-3 xs:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center">
              <div className="text-red-600 dark:text-red-400 mr-2 xs:mr-3">⚠️</div>
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-300">
                  Error loading bookings
                </h4>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  {error}
                </p>
                <button
                  onClick={fetchBookings}
                  className="mt-2 text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded hover:shadow-red-500/25 transition-all duration-300"
                >
                  Retry
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modals */}
        <BookingModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setBookingStep(1);
          }}
          onSubmit={handleCreateBooking}
          title="Create New Booking"
        />

        <BookingModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingBooking(null);
            setBookingStep(1);
          }}
          onSubmit={handleEditBooking}
          title="Edit Booking"
          initialData={editingBooking}
        />
      </div>
    </div>
  );
};