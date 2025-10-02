/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  MoreVert as MoreVertIcon
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

// User Management Component
export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);
  const usersPerPage = 10;

  // Fetch users from JSONPlaceholder API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();

        // Enhance the user data with additional fields for our UI
        const enhancedUsers = data.map((user) => ({
          ...user,
          status:
            user.id % 4 === 0
              ? "Active"
              : user.id % 4 === 1
              ? "Inactive"
              : user.id % 4 === 2
              ? "Suspended"
              : "Pending",
          joinDate: new Date(
            Date.now() - Math.floor(Math.random() * 10000000000)
          ).toLocaleDateString(),
          lastLogin: new Date(
            Date.now() - Math.floor(Math.random() * 1000000000)
          ).toLocaleDateString(),
        }));

        setUsers(enhancedUsers);
        setFilteredUsers(enhancedUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  };

  // Handle Enter key in search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open user details modal
  const openUserModal = (user, editMode = false) => {
    setSelectedUser(user);
    setIsEditMode(editMode);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsEditMode(false);
  };

  // Handle user update
  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    toast.success("User updated successfully!");
    closeModal();
  };

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      toast.success("User deleted successfully!");
    }
  };

  // Mobile User Card Component
  const MobileUserCard = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <PersonIcon className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-sm">{user.name}</h3>
            <p className="text-gray-500 truncate text-xs">@{user.username}</p>
            <p className="text-gray-500 truncate text-xs">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(mobileMenuOpen === user.id ? null : user.id)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <MoreVertIcon fontSize="small" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full
            ${
              user.status === "Active"
                ? "bg-green-100 text-green-800"
                : user.status === "Inactive"
                ? "bg-gray-100 text-gray-800"
                : user.status === "Suspended"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {user.status}
        </span>
        <span className="text-xs text-gray-500">{user.joinDate}</span>
      </div>

      {/* Mobile Actions Menu */}
      <AnimatePresence>
        {mobileMenuOpen === user.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 pt-3 space-y-2"
          >
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => openUserModal(user, true)}
                className="flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700 transition-colors"
              >
                <EditIcon fontSize="small" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => openUserModal(user, false)}
                className="flex items-center justify-center space-x-1 bg-green-600 text-white py-2 px-3 rounded text-xs hover:bg-green-700 transition-colors"
              >
                <PersonIcon fontSize="small" />
                <span>View</span>
              </button>
            </div>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="w-full flex items-center justify-center space-x-1 bg-red-600 text-white py-2 px-3 rounded text-xs hover:bg-red-700 transition-colors"
            >
              <DeleteIcon fontSize="small" />
              <span>Delete</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions (always visible) */}
      {mobileMenuOpen !== user.id && (
        <div className="flex space-x-2">
          <button
            onClick={() => openUserModal(user, false)}
            className="flex-1 bg-blue-600 text-white py-1 rounded text-xs hover:bg-blue-700 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => openUserModal(user, true)}
            className="flex-1 bg-green-600 text-white py-1 rounded text-xs hover:bg-green-700 transition-colors"
          >
            Edit
          </button>
        </div>
      )}
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
        className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 mt-4 sm:mt-6"
      >
        <div className="text-xs sm:text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastUser, filteredUsers.length)}
          </span>{" "}
          of <span className="font-medium">{filteredUsers.length}</span>{" "}
          users
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 sm:p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
          >
            <ChevronLeftIcon2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className="px-2 py-1 sm:px-3 sm:py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors text-xs sm:text-sm"
              >
                1
              </button>
              {startPage > 2 && <span className="px-1 text-xs sm:text-sm">...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md transition-colors text-xs sm:text-sm ${
                currentPage === number
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-1 text-xs sm:text-sm">...</span>}
              <button
                onClick={() => paginate(totalPages)}
                className="px-2 py-1 sm:px-3 sm:py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors text-xs sm:text-sm"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
          >
            <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-9 pr-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm sm:text-base whitespace-nowrap"
              >
                <SearchIcon className="mr-2 h-4 w-4" />
                Search
              </button>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                  <PersonIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            @{user.username}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${
                                  user.status === "Active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : user.status === "Inactive"
                                    ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                                    : user.status === "Suspended"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.joinDate}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openUserModal(user, true)}
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 p-1"
                                title="Edit user"
                              >
                                <EditIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </button>
                              <button
                                onClick={() => openUserModal(user, false)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-1"
                                title="View details"
                              >
                                <PersonIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1"
                                title="Delete user"
                              >
                                <DeleteIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Users List (shown on mobile) */}
            <div className="lg:hidden">
              <AnimatePresence>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <MobileUserCard key={user.id} user={user} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
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

        {/* User Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedUser && (
            <UserModal
              user={selectedUser}
              isEditMode={isEditMode}
              onClose={closeModal}
              onUpdate={handleUpdateUser}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Enhanced User Modal Component with responsive design
const UserModal = ({ user, isEditMode, onClose, onUpdate }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [isEditing, setIsEditing] = useState(isEditMode);

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
    onUpdate(editedUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto m-2"
      >
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? "Edit User" : "User Details"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Personal Information */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 text-sm sm:text-base">
                Personal Information
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white text-sm sm:text-base">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white text-sm sm:text-base">@{user.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center text-gray-900 dark:text-white text-sm sm:text-base">
                    <EmailIcon className="h-4 w-4 mr-2 text-gray-500" />
                    {user.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center text-gray-900 dark:text-white text-sm sm:text-base">
                    <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                    {user.phone}
                  </div>
                )}
              </div>
            </div>

            {/* Company & Address */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 text-sm sm:text-base">
                Company & Address
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.company.name}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        company: {
                          ...editedUser.company,
                          name: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center text-gray-900 dark:text-white text-sm sm:text-base">
                    <BusinessIcon className="h-4 w-4 mr-2 text-gray-500" />
                    {user.company.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Business
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.company.bs}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        company: {
                          ...editedUser.company,
                          bs: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white text-sm sm:text-base">{user.company.bs}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={`${editedUser.address.street}, ${editedUser.address.city}`}
                    onChange={(e) => {
                      const [street, city] = e.target.value.split(", ");
                      setEditedUser({
                        ...editedUser,
                        address: {
                          ...editedUser.address,
                          street: street || "",
                          city: city || "",
                        },
                      });
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <div className="flex items-start text-gray-900 dark:text-white text-sm sm:text-base">
                    <LocationIcon className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <div>
                      <div>{user.address.street}</div>
                      <div>{user.address.suite}</div>
                      <div>
                        {user.address.city}, {user.address.zipcode}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                {isEditing ? (
                  <select
                    name="status"
                    value={editedUser.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Pending">Pending</option>
                  </select>
                ) : (
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : user.status === "Inactive"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          : user.status === "Suspended"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                  >
                    {user.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky bottom-0">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <CancelIcon className="mr-2 h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <EditIcon className="mr-2 h-4 w-4" />
                Edit User
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};