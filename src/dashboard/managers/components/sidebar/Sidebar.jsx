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
  Dashboard,
  CarRepairRounded,
  Store,
  FormatQuote,
  Balance,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, url: "/728289/292jh020-7" },
    { name: "Testimony", icon: <FormatQuote />, url: "/dashboard/728981" },
    { name: "Users", icon: <PersonIcon />, url: "/dashboard/78292" },
    { name: "Orders", icon: <NotificationsIcon />, url: "/dashboard/72891" },
    { name: "Store", icon: <Store />, url: "/dashboard/7281/191" },
    { name: "Balance", icon: <Balance />, url: "/dashboard/payment" },
    { name: "Settings", icon: <SettingsIcon />, url: "/dashboard/02000" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    toast.info(`Sidebar ${isOpen ? "collapsed" : "expanded"}`, {
      position: "bottom-left",
      autoClose: 2000,
    });
  };

  const handleItemClick = (name) => {
    setActiveItem(name);
    if (isMobile) setIsOpen(false); // Close sidebar on mobile after selection
    toast.success(`Navigated to ${name}`);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate logout process
    setTimeout(() => {
      setIsLoggingOut(false);
      toast.success("Logged out successfully!");
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Toast Container */}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Mobile menu button */}
      {isMobile && !isOpen && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-gradient-to-b from-blue-400 to-indigo-500 text-white rounded-full shadow-lg lg:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Dashboard />
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed lg:relative bg-white shadow-lg z-50 flex flex-col h-full ${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
        initial={false}
        animate={{
          width: isOpen ? 256 : 80,
          x: isMobile && !isOpen ? -300 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <HomeIcon className="text-indigo-600 text-2xl mr-2" />
                <span className="text-xl font-bold text-indigo-600">
                  Dashboard
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden mt-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.url}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item.name)}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      activeItem === item.name
                        ? "bg-gradient-to-t from-violet-500 to-indigo-500 text-white"
                        : "bg-gradient-to-tr from-blue-300 to-indigo-500 "
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
              isLoggingOut
                ? "bg-gradient-to-b from-gray-200 to-gray-300 cursor-not-allowed"
                : "bg-gradient-to-b from-blue-600 to-indigo-600 "
            }`}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-t-indigo-600 border-r-transparent border-b-indigo-600 border-l-transparent rounded-full animate-spin"></div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 font-medium"
                    >
                      Logging out...
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <LogoutIcon />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 font-medium"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
