/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  ShoppingCart as CartIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon2,
  Close as CloseIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Apartment as ApartmentIcon,
  MoreVert as MoreVertIcon,
  AdminPanelSettings as AdminIcon,
  ManageAccounts as ManagerIcon,
  Person as UserIcon,
  SwapVert as SwapVertIcon,
  VerifiedUser,
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

// User Management Component
export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchById, setSearchById] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);
  const [successModal, setSuccessModal] = useState({
    open: false,
    message: "",
  });
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const usersPerPage = 10;

  // API base URL
  const API_URL = "https://floridabarnode.onrender.com/users";

  // Initial register data structure
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "user"
  });

  // Fetch users using Axios
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      const data = response.data.data.users;

      // Transform API data to match our registerData structure with status from API
      const transformedUsers = data.map((user) => {
        return {
          id: user.id,
          _id: user._id,
          name: user.name || "",
          email: user.email || "",
          password: "********", // Masked password
          confirmPassword: "********", // Masked confirm password
          status: user.status || "user", // Get status from API
          joinDate: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : new Date().toLocaleDateString(),
          lastLogin: new Date(
            Date.now() - Math.floor(Math.random() * 1000000000)
          ).toLocaleDateString(),
          createdAt: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : new Date().toLocaleDateString(),
        };
      });

      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      showError("Failed to fetch users");
      setIsLoading(false);
    }
  };

  // Function to edit user status only
  const handleEditUserStatus = async (userId, newStatus) => {
    try {
      // Find the user to get current data
      const userToUpdate = users.find(user => 
        user.id === userId || user._id === userId
      );
      
      if (!userToUpdate) {
        showError("User not found");
        return;
      }

      // Prepare data for API - only update the status
      const userData = {
        name: userToUpdate.name,
        email: userToUpdate.email,
        status: newStatus,
      };

      const response = await axios.put(`${API_URL}/${userId}`, userData);

      // Update local state
      const updatedUsers = users.map((user) =>
        user.id === userId || user._id === userId
          ? {
              ...user,
              status: newStatus,
            }
          : user
      );

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      showSuccess(`User status changed to ${newStatus} successfully!`);
    } catch (error) {
      console.error("Error updating user status:", error);
      showError("Failed to update user status");
    }
  };

  // Function to edit other user fields (name, email, etc.)
  const handleEditUserFields = async (updatedUser) => {
    try {
      // Prepare data for API - update name, email, and status
      const userData = {
        name: updatedUser.name,
        email: updatedUser.email,
        status: updatedUser.status,
      };

      // Use _id for MongoDB or id for other databases
      const userId = updatedUser._id || updatedUser.id;
      const response = await axios.put(`${API_URL}/${userId}`, userData);

      const updatedUserData = response.data;

      // Update local state
      const updatedUsers = users.map((user) =>
        user._id === updatedUserData._id || user.id === updatedUserData.id
          ? {
              ...updatedUserData,
              password: user.password, // Keep masked password
              confirmPassword: user.confirmPassword, // Keep masked confirm password
              joinDate: user.joinDate,
              lastLogin: user.lastLogin,
              createdAt: user.createdAt,
            }
          : user
      );

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      showSuccess("User updated successfully!");
      closeModals();
    } catch (error) {
      console.error("Error updating user:", error);
      showError("Failed to update user");
    }
  };

  // Quick status change function (alias for handleEditUserStatus for backward compatibility)
  const handleQuickStatusChange = handleEditUserStatus;

  // Search user by ID only and open view modal
  const handleSearchById = async () => {
    if (searchById.trim() === "") {
      setFilteredUsers(users);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/${searchById.trim()}`);
      const user = response.data;

      if (user) {
        const transformedUser = {
          id: user.id,
          _id: user._id,
          name: user.name || "",
          email: user.email || "",
          password: "********",
          confirmPassword: "********",
          status: user.status || "user",
          joinDate: new Date().toLocaleDateString(),
          lastLogin: new Date().toLocaleDateString(),
          createdAt: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : new Date().toLocaleDateString(),
        };

        // Set the found user and open view modal
        setSelectedUser(transformedUser);
        setIsViewModalOpen(true);
        setSearchById(""); // Clear search input
        showSuccess(`User with ID ${searchById} found`);
      } else {
        showError(`No user found with ID ${searchById}`);
      }
    } catch (error) {
      console.error("Error searching user by ID:", error);
      showError(`No user found with ID ${searchById}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear search and show all users
  const handleClearSearch = () => {
    setSearchById("");
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  // Handle Enter key in search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchById();
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open user view modal
  const openViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // Open user edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Open add user modal
  const openAddModal = () => {
    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      status: "user"
    });
    setIsAddModalOpen(true);
  };

  // Close modals
  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedUser(null);
  };

  // Show success modal
  const showSuccess = (message) => {
    setSuccessModal({ open: true, message });
  };

  // Show error modal
  const showError = (message) => {
    setErrorModal({ open: true, message });
  };

  // Close success modal
  const closeSuccessModal = () => {
    setSuccessModal({ open: false, message: "" });
  };

  // Close error modal
  const closeErrorModal = () => {
    setErrorModal({ open: false, message: "" });
  };

  // Handle user deletion with Axios
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/${userId}`);
        const updatedUsers = users.filter(
          (user) => user.id !== userId && user._id !== userId
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        showSuccess("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        showError("Failed to delete user");
      }
    }
  };

  // Add new user
  const handleAddUser = async () => {
    try {
      // Validate passwords match
      if (registerData.password !== registerData.confirmPassword) {
        showError("Passwords do not match");
        return;
      }

      // Validate required fields
      if (!registerData.name || !registerData.email || !registerData.password) {
        showError("Please fill in all required fields");
        return;
      }

      const userData = {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        status: registerData.status,
      };

      const response = await axios.post(API_URL, userData);

      const addedUser = response.data;

      const transformedUser = {
        id: addedUser.id,
        _id: addedUser._id,
        name: addedUser.name,
        email: addedUser.email,
        password: "********",
        confirmPassword: "********",
        status: addedUser.status || "user",
        joinDate: new Date().toLocaleDateString(),
        lastLogin: new Date().toLocaleDateString(),
        createdAt: new Date().toLocaleDateString(),
      };

      const updatedUsers = [...users, transformedUser];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      showSuccess("User added successfully!");
      closeModals();
    } catch (error) {
      console.error("Error adding user:", error);
      showError("Failed to add user");
    }
  };

  // Handle input change for add user form
  const handleAddUserInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "admin":
        return {
          icon: <AdminIcon className="h-4 w-4" />,
          color:
            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        };
      case "manager":
        return {
          icon: <ManagerIcon className="h-4 w-4" />,
          color:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
      case "user":
        return {
          icon: <UserIcon className="h-4 w-4" />,
          color:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        };
      default:
        return {
          icon: <UserIcon className="h-4 w-4" />,
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        };
    }
  };

  // Status dropdown component for desktop
  const StatusDropdown = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const statusOptions = [
      { value: "user", label: "User", color: "bg-green-100 text-green-800" },
      { value: "manager", label: "Manager", color: "bg-blue-100 text-blue-800" },
      { value: "admin", label: "Admin", color: "bg-purple-100 text-purple-800" },
    ];

    const currentStatus = statusOptions.find(opt => opt.value === user.status);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-2 py-1 inline-flex items-center bg-gradient-to-r from-indigo-400 to-blue-600 text-xs leading-5 font-semibold rounded-full ${currentStatus?.color} hover:opacity-80 transition-opacity`}
        >
          <VerifiedUser className="h-3 w-3 mr-1" />
          <span className="capitalize">{user.status}</span>
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
                    handleEditUserStatus(user.id || user._id, option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs bg-gradient-to-r from-blue-400 to-violet-400 first:rounded-t-lg last:rounded-b-lg ${
                    user.status === option.value ? "bg-gradient-to-r from-blue-300 to-indigo-400" : ""
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

  // Mobile User Card Component
  const MobileUserCard = ({ user }) => {
    const statusInfo = getStatusInfo(user.status);
    const [showStatusOptions, setShowStatusOptions] = useState(false);

    const statusOptions = [
      { value: "user", label: "User", color: "bg-green-100 text-green-800" },
      { value: "manager", label: "Manager", color: "bg-blue-100 text-blue-800" },
      { value: "admin", label: "Admin", color: "bg-purple-100 text-purple-800" },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-3"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
              <PersonIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                {user.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 truncate text-xs">
                {user.email}
              </p>
              <p className="text-gray-500 dark:text-gray-400 truncate text-xs">
                ID: {user.id || user._id}
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              setMobileMenuOpen(
                mobileMenuOpen === (user.id || user._id)
                  ? null
                  : user.id || user._id
              )
            }
            className="p-1 bg-gradient-to-b from-blue-400 to-indigo-300"
          >
            <MoreVertIcon fontSize="small" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <button
              onClick={() => setShowStatusOptions(!showStatusOptions)}
              className={`px-2 py-1 inline-flex bg-gradient-to-b from-blue-300 to-violet-400 items-center text-xs leading-4 font-semibold rounded-full ${statusInfo.color} hover:opacity-80 transition-opacity`}
            >
              {statusInfo.icon}
              <span className="ml-1 capitalize">{user.status}</span>
              <SwapVertIcon className="h-3 w-3 ml-1" />
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
                        handleEditUserStatus(user.id || user._id, option.value);
                        setShowStatusOptions(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                        user.status === option.value ? "bg-gradient-to-b from-blue-300 to-indigo-400" : "bg-gradient-to-l from-gray-400 to-gray-700"
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
            {user.joinDate}
          </span>
        </div>

        {/* Mobile Actions Menu */}
        <AnimatePresence>
          {mobileMenuOpen === (user.id || user._id) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openEditModal(user)}
                  className="flex items-center justify-center space-x-1 bg-gradient-to-br from-blue-500 to-indigo-400 py-2 px-3 rounded text-xs hover:bg-blue-700 transition-colors"
                >
                  <EditIcon fontSize="small" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => openViewModal(user)}
                  className="flex items-center justify-center space-x-1 bg-gradient-to-r from-green-300 to-green-400 py-2 px-3 rounded text-xs hover:bg-green-700 transition-colors"
                >
                  <PersonIcon fontSize="small" />
                  <span>View</span>
                </button>
              </div>
              <button
                onClick={() => handleDeleteUser(user.id || user._id)}
                className="w-full flex items-center justify-center space-x-1 bg-gradient-to-r from-red-400 to-red-600 py-2 px-3 rounded text-xs transition-colors"
              >
                <DeleteIcon fontSize="small" />
                <span>Delete</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions (always visible) */}
        {mobileMenuOpen !== (user.id || user._id) && (
          <div className="flex space-x-2">
            <button
              onClick={() => openViewModal(user)}
              className="flex-1 bg-gradient-to-r from-blue-400 to-indigo-400 py-1 rounded text-xs transition-colors"
            >
              View
            </button>
            <button
              onClick={() => openEditModal(user)}
              className="flex-1 bg-gradient-to-l from-green-400 to-green-600 py-1 rounded text-xs transition-colors"
            >
              Edit
            </button>
          </div>
        )}
      </motion.div>
    );
  };

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
        className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 mt-4 sm:mt-6"
      >
        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastUser, filteredUsers.length)}
          </span>{" "}
          of <span className="font-medium">{filteredUsers.length}</span> users
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 sm:p-2 rounded-md bg-gradient-to-b from-blue-300 to-indigo-400 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
          >
            <ChevronLeftIcon2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className="px-2 py-1 sm:px-3 sm:py-1 rounded-md  transition-colors text-xs sm:text-sm"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="px-1 text-xs sm:text-sm">...</span>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md transition-colors text-xs sm:text-sm ${
                currentPage === number
                  ? "bg-indigo-600 text-white"
                  : ""
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-1 text-xs sm:text-sm">...</span>
              )}
              <button
                onClick={() => paginate(totalPages)}
                className="px-2 py-1 sm:px-3 sm:py-1 rounded-md  transition-colors text-xs sm:text-sm"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-2 rounded-md bg-gradient-to-b from-blue-300 to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
          >
            <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Sidebar />

      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
        <ToastContainer />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                User Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                Manage and monitor user accounts
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
              <button
                onClick={openAddModal}
                className="bg-gradient-to-b from-green-300 to-green-400 px-4 py-2 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
              >
                <AddIcon className="mr-2 h-4 w-4" />
                Add User
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="grid grid-cols-1 gap-4">
            {/* Search by ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search by User ID
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter user ID..."
                  className="flex-1 pl-3 pr-4 py-2 text-sm border rounded-lg focus:ring-2 text-gray-900 dark:text-white"
                  value={searchById}
                  onChange={(e) => setSearchById(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={handleSearchById}
                  className="bg-gradient-to-b from-blue-300 to-indigo-400 px-4 py-2 rounded-lg transition-colors flex items-center justify-center text-sm whitespace-nowrap"
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Clear Search Button */}
          {searchById && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleClearSearch}
                className="bg-gradient-to-b from-red-300 to-red-400 text-sm flex items-center"
              >
                <CloseIcon className="h-4 w-4 mr-1" />
                Clear Search
              </button>
            </div>
          )}
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 bg-gradient-to-t from-gray-200 to-gray-300 text-white rounded-2xl">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                      NAME
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                      EMAIL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                      JOIN DATE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => {
                      return (
                        <tr
                          key={user.id || user._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {user.id || user._id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <StatusDropdown user={user} className='bg-gradient-to-r from-blue-400 to-indigo-300'/>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.createdAt}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openEditModal(user)}
                                className="bg-gradient-to-b from-blue-500 to-indigo-400 p-1"
                                title="Edit user"
                              >
                                <EditIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </button>
                              <button
                                onClick={() => openViewModal(user)}
                                className="bg-gradient-to-b from-blue-300 to-indigo-400 p-1"
                                title="View details"
                              >
                                <PersonIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteUser(user.id || user._id)
                                }
                                className="bg-gradient-to-b from-red-300 to-red-400 p-1"
                                title="Delete user"
                              >
                                <DeleteIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Users List (shown on mobile) */}
            <div className="lg:hidden">
              <AnimatePresence>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <MobileUserCard key={user.id || user._id} user={user} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-black py-8"
                  >
                    <div className="text-4xl mb-2">👥</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      No users found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Try adjusting your search criteria
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {filteredUsers.length > usersPerPage && <PaginationControls />}
          </>
        )}

        {/* User View Modal */}
        <AnimatePresence>
          {isViewModalOpen && selectedUser && (
            <UserViewModal
              user={selectedUser}
              onClose={closeModals}
              onEdit={() => {
                setIsViewModalOpen(false);
                setIsEditModalOpen(true);
              }}
              getStatusInfo={getStatusInfo}
            />
          )}
        </AnimatePresence>

        {/* User Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && selectedUser && (
            <UserEditModal
              user={selectedUser}
              onClose={closeModals}
              onSave={handleEditUserFields}
              getStatusInfo={getStatusInfo}
            />
          )}
        </AnimatePresence>

        {/* Add User Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <AddUserModal
              registerData={registerData}
              onClose={closeModals}
              onSave={handleAddUser}
              onInputChange={handleAddUserInputChange}
            />
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {successModal.open && (
            <SuccessModal
              message={successModal.message}
              onClose={closeSuccessModal}
            />
          )}
        </AnimatePresence>

        {/* Error Modal */}
        <AnimatePresence>
          {errorModal.open && (
            <ErrorModal
              message={errorModal.message}
              onClose={closeErrorModal}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// User View Modal Component
const UserViewModal = ({ user, onClose, onEdit, getStatusInfo }) => {
  const statusInfo = getStatusInfo(user.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto m-2"
      >
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            User Details
          </h3>
          <button
            onClick={onClose}
            className="bg-gradient-to-b from-red-500 to-red-600 p-1"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {/* User Avatar and Basic Info */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <PersonIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                <span
                  className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full mt-1 ${statusInfo.color}`}
                >
                  {statusInfo.icon}
                  <span className="ml-1 capitalize">
                    {user.status}
                  </span>
                </span>
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  User ID
                </label>
                <p className="text-gray-900 dark:text-white text-sm font-mono">
                  {user.id || user._id}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Join Date
                </label>
                <p className="text-gray-900 dark:text-white text-sm">
                  {user.joinDate}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Login
                </label>
                <p className="text-gray-900 dark:text-white text-sm">
                  {user.lastLogin}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Account Created
                </label>
                <p className="text-gray-900 dark:text-white text-sm">
                  {user.createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-b from-red-400 to-red-500 rounded-md  transition-colors text-sm sm:text-base"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-gradient-to-r from-green-300 to-green-300 rounded-md transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <EditIcon className="mr-2 h-4 w-4" />
            Edit User
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// User Edit Modal Component
const UserEditModal = ({ user, onClose, onSave, getStatusInfo }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedUser);
  };

  const statusInfo = getStatusInfo(editedUser.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto m-2"
      >
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Edit User
          </h3>
          <button
            onClick={onClose}
            className="bg-gradient-to-b from-red-400 to-red-600  p-1"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                User ID
              </label>
              <p className="text-gray-900 dark:text-white text-sm font-mono">
                {user.id || user._id}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={editedUser.name || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editedUser.email || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={editedUser.status || "user"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Join Date
              </label>
              <p className="text-gray-900 dark:text-white text-sm">
                {user.joinDate}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Login
              </label>
              <p className="text-gray-900 dark:text-white text-sm">
                {user.lastLogin}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 rounded-md  transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <CancelIcon className="mr-2 h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-md transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Add User Modal Component
const AddUserModal = ({ registerData, onClose, onSave, onInputChange }) => {
  const handleSave = () => {
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto m-2"
      >
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Add New User
          </h3>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-red-400 to-red-600 p-1"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={onInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={onInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={onInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={onInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Confirm password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={registerData.status}
                onChange={onInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 rounded-md  transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <CancelIcon className="mr-2 h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <AddIcon className="mr-2 h-4 w-4" />
            Add User
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div className="mt-3 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Success!
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 transition-colors"
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Error Modal Component
const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <div className="mt-3 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Error!
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 transition-colors"
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
};