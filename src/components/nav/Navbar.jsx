/* eslint-disable no-unused-vars */
// components/Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Close,
  Person,
  Lock,
  Email,
  AccountCircle,
  Dashboard,
  Logout,
  Home,
  SensorsRounded,
  Store,
  LocalDrink,
} from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from '../../assets/images/ChatGPT Image Oct 4, 2025, 03_47_28 AM.png'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const { user, login, logout, isAuthenticated, isAdmin, isUser, isManager } =
    useAuth();
  const navigate = useNavigate();

  // Navigation links object
  const navLinks = [
    {
      id: 1,
      name: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "About",
      href: "/about",
      icon: <AboutIcon className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Services",
      href: "/services",
      icon: <SensorsRounded className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "About",
      href: "/about",
      icon: <AboutIcon className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "Store",
      href: "/products",
      icon: <Store className="h-5 w-5" />,
    },
  ];

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openLogin = () => {
    setActiveForm("login");
    setIsLoginOpen(true);
    setIsOpen(false);
  };

  const openRegister = () => {
    setActiveForm("register");
    setIsRegisterOpen(true);
    setIsOpen(false);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    // Reset forms
    setLoginData({ email: "", password: "" });
    setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginData.email || !loginData.password) {
      toast.error('❌ Please fill in all fields!', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = "https://floridabarnode.onrender.com/users/login";

      const response = await axios.post(
        API_URL,
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log('API Response:', response.data); // Debug log

      // CORRECTED: Extract from nested structure
      const { token, data } = response.data;
      const user = data.user;

      // Store token and user data
      login(user, token);

      toast.success("🎉 Login successful! Welcome back!", {
        position: "top-right",
        autoClose: 3000,
      });

      if (closeModals) {
        closeModals();
      }

      // Navigate to appropriate dashboard
      navigateToDashboard(user.status);

    } catch (error) {
      let errorMessage = "❌ Login failed! Please check your credentials.";

      // Handle different types of errors
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          errorMessage = "❌ Invalid email or password!";
        } else if (status === 404) {
          errorMessage = "❌ Service unavailable. Please try again later.";
        } else if (status >= 500) {
          errorMessage = "❌ Server error. Please try again later.";
        } else if (error.response.data?.message) {
          errorMessage = `❌ ${error.response.data.message}`;
        }
      } else if (error.request) {
        errorMessage = "❌ Network error. Please check your connection.";
      } else {
        errorMessage = `❌ Login failed: ${error.message}`;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

const handleRegisterSubmit = async (e) => {
  e.preventDefault();

  // Debug: Log current state before validation
  console.log('Current form data:', registerData);
  console.log('Password comparison:', {
    password: registerData.password,
    confirmPassword: registerData.confirmPassword,
    match: registerData.password === registerData.confirmPassword
  });

  // Client-side validation - FIXED: Use exact comparison
  if (registerData.password !== registerData.confirmPassword) {
    console.log('PASSWORDS DO NOT MATCH:', {
      password: registerData.password,
      confirmPassword: registerData.confirmPassword
    });
    
    toast.error("🔒 Passwords do not match!", {
      position: "top-right",
      autoClose: 4000,
    });
    return;
  }

  console.log('✅ Passwords match - proceeding with validation');

  if (registerData.password.length < 6) {
    toast.error("🔒 Password must be at least 6 characters long!", {
      position: "top-right",
      autoClose: 4000,
    });
    return;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registerData.email)) {
    toast.error("📧 Please enter a valid email address!", {
      position: "top-right",
      autoClose: 4000,
    });
    return;
  }

  // Name validation
  if (!registerData.name || registerData.name.trim().length < 2) {
    toast.error("👤 Please enter your full name!", {
      position: "top-right",
      autoClose: 4000,
    });
    return;
  }

  setIsLoading(true);

  try {
    const API_URL = "https://floridabarnode.onrender.com/users/register";

    // Send registration data to real API
    const response = await axios.post(
      API_URL,
      {
        name: registerData.name.trim(),
        email: registerData.email.toLowerCase().trim(),
        password: registerData.password,
        confirmPassword:registerData.confirmPassword
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    console.log('Registration API response:', response.data);

    // FIXED: Handle different possible response structures
    let token, user;

    if (response.data.token && response.data.data?.user) {
      // Structure: { token, data: { user } }
      token = response.data.token;
      user = response.data.data.user;
    } else if (response.data.token && response.data.user) {
      // Structure: { token, user }
      token = response.data.token;
      user = response.data.user;
    } else {
      // Fallback structure
      token = response.data.token;
      user = response.data.user || response.data;
    }

    console.log('Extracted token and user:', { token, user });

    // Store token and user data
    login(user, token);

    toast.success("🎊 Registration successful! Welcome to our community!", {
      position: "top-right",
      autoClose: 3000,
    });

    closeModals();

    // Navigate to appropriate dashboard - FIXED: Use status instead of role
    navigateToDashboard(user.status || user.role || "user");

  } catch (error) {
    let errorMessage = "❌ Registration failed! Please try again.";

    // Enhanced error logging
    console.error("Registration error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      
      if (status === 400) {
        if (responseData?.errors) {
          const serverErrors = responseData.errors;
          if (serverErrors.email) {
            errorMessage = `❌ ${serverErrors.email[0]}`;
          } else if (serverErrors.password) {
            errorMessage = `❌ ${serverErrors.password[0]}`;
          } else if (serverErrors.name) {
            errorMessage = `❌ ${serverErrors.name[0]}`;
          }
        } else if (responseData?.message) {
          errorMessage = `❌ ${responseData.message}`;
        } else {
          errorMessage = "❌ Invalid registration data. Please check your information.";
        }
      } else if (status === 409) {
        errorMessage = "❌ User already exists with this email!";
      } else if (status === 422) {
        errorMessage = "❌ Validation failed. Please check your information.";
      } else if (status >= 500) {
        errorMessage = "❌ Server error. Please try again later.";
      } else if (responseData?.message) {
        errorMessage = `❌ ${responseData.message}`;
      }
    } else if (error.request) {
      errorMessage = "❌ Network error. Please check your connection.";
    } else {
      errorMessage = `❌ Registration failed: ${error.message}`;
    }

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
    });
  } finally {
    setIsLoading(false);
  }
};
  const navigateToDashboard = (status) => {
    // Convert role to lowercase for case-insensitive comparison
    const userRole = status?.toLowerCase();

    switch (userRole) {
      case "admin":
        navigate("/dashboard");
        break;
      case "manager":
        navigate("/manager-dashboard");
        break;
      case "user":
        navigate("/user/dashboard");
        break;
      default:
        // Fallback for unknown roles or missing role
        console.warn(
          `Unknown role: ${status}. Redirecting to default dashboard.`
        );
        navigate("/");
        break;
    }
  };

  const handleDashboardClick = () => {
    // Assuming you have these state variables or get them from context/auth
    if (isAdmin) {
      navigate("/dashboard");
    } else if (isManager) {
      navigate("/manager-dashboard");
    } else if (isUser) {
      navigate("/user/dashboard");
    } else {
      // Fallback for unauthenticated or unknown roles
      navigate("/");
    }
  };
  const handleLogout = () => {
    logout();
    toast.info("👋 Logged out successfully!", {
      position: "top-right",
      autoClose: 300,
    });
    navigate("/");
    setIsOpen(false);
  };

  const switchToRegister = () => {
    setActiveForm("register");
    setIsLoginOpen(false);
    setTimeout(() => setIsRegisterOpen(true), 300);
  };

  const switchToLogin = () => {
    setActiveForm("login");
    setIsRegisterOpen(false);
    setTimeout(() => setIsLoginOpen(true), 300);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -5, 0] }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => navigate("/")}
              >
          <img src={logo} alt="" className='w-20' />
              </motion.div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.id} to={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center space-x-2 text-black hover:text-blue-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 group"
                  >
                    <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </motion.div>
                </Link>
              ))}

              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                {isAuthenticated ? (
                  <>
                    {/* Dashboard Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDashboardClick}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                    >
                      <Dashboard className="h-5 w-5" />
                      <span>Dashboard</span>
                      {isAdmin && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Admin
                        </span>
                      )}
                    </motion.button>

                    {/* User Profile Dropdown */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      <button className="flex items-center space-x-2 text-black font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <UserProfileIcon className="h-8 w-8 text-blue-600" />
                        <span className="max-w-32 truncate">{user?.name}</span>
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="p-2">
                          <div className="px-3 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-black truncate">
                              {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </p>
                            <p className="text-xs text-blue-600 font-medium capitalize">
                              {user?.status}
                            </p>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm bg-gradient-to-l from-indigo-400 to-blue-400 text-white rounded-lg transition-colors mt-1"
                          >
                            <Logout className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openLogin}
                      className="flex items-center space-x-2 bg-gradient-to-l from-indigo-400 to-blue-400 text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                    >
                      <LoginIcon className="h-5 w-5" />
                      <span>Login</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openRegister}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
                    >
                      <RegisterIcon className="h-5 w-5" />
                      <span>Register</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
                className="bg-gradient-to-b from-violet-400 to-indigo-400 text-white transition-colors p-2 rounded-lg hover:bg-blue-50"
              >
                {isOpen ? <Close className="text-red-400" /> : <Menu />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
              >
                <div className="px-2 pt-2 pb-4 space-y-1">
                  {navLinks.map((link) => (
                    <Link key={link.id} to={link.href}>
                      <div className="flex items-center space-x-3 text-black hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors group">
                        <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                          {link.icon}
                        </span>
                        <span>{link.name}</span>
                      </div>
                    </Link>
                  ))}

                  <div className="pt-4 space-y-2 border-t border-gray-200">
                    {isAuthenticated ? (
                      <>
                        {/* User Info */}
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <UserProfileIcon className="h-10 w-10 text-blue-600" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-black truncate">
                                {user?.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {user?.email}
                              </p>
                              <p className="text-xs text-blue-600 font-medium capitalize">
                                {user?.status}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Dashboard Button */}
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleDashboardClick}
                          className="w-full flex items-center space-x-3 text-black hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Dashboard className="h-5 w-5" />
                          <span>Dashboard {isAdmin && "(Admin)"}</span>
                        </motion.button>

                        {/* Logout Button */}
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 text-red-600 hover:bg-red-50 font-medium py-3 px-4 rounded-lg transition-colors"
                        >
                          <Logout className="h-5 w-5" />
                          <span>Logout</span>
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={openLogin}
                          className="w-full flex items-center space-x-3 text-black hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <LoginIcon className="h-5 w-5" />
                          <span>Login</span>
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={openRegister}
                          className="w-full flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium justify-center"
                        >
                          <RegisterIcon className="h-5 w-5" />
                          <span>Register</span>
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Login Modal */}
      <AuthModal
        isOpen={isLoginOpen}
        onClose={closeModals}
        type="login"
        formData={loginData}
        onChange={handleLoginChange}
        onSubmit={handleLoginSubmit}
        onSwitch={switchToRegister}
        isLoading={isLoading}
      />

      {/* Register Modal */}
      <AuthModal
        isOpen={isRegisterOpen}
        onClose={closeModals}
        type="register"
        formData={registerData}
        onChange={handleRegisterChange}
        onSubmit={handleRegisterSubmit}
        onSwitch={switchToLogin}
        isLoading={isLoading}
      />
    </>
  );
};

// Auth Modal Component
const AuthModal = ({
  isOpen,
  onClose,
  type,
  formData,
  onChange,
  onSubmit,
  onSwitch,
  isLoading,
}) => {
  const isLogin = type === "login";

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 overflow-y-auto backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="text-center mt-12 mb-8">
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <AuthIcon className="h-16 w-16 text-blue-600" />
                  </motion.div>
                </div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  {isLogin ? "Welcome Back!" : "Join Us Today!"}
                </h2>
                <p className="text-gray-600">
                  {isLogin
                    ? "Sign in to your account to continue"
                    : "Create your account to get started"}
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={onSubmit}
                className="space-y-6 text-black overflow-y-auto"
              >
                {!isLogin && (
                  <div className="relative">
                    <AccountCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={onChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 bg-gray-50/50 transition-all"
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <Email className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 bg-gray-50/50 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 bg-gray-50/50 transition-all"
                    required
                    minLength="6"
                  />
                </div>

                {!isLogin && (
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={onChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 bg-gray-50/50 transition-all"
                      required
                      minLength="6"
                    />
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner className="h-5 w-5" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  )}
                </motion.button>
              </form>

              {/* Switch Auth Type */}
              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={onSwitch}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    {isLogin ? "Sign up now" : "Sign in here"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AuthIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const UserProfileIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5C14.8 3.4 14.6 3.3 14.3 3.3C14 3.3 13.8 3.4 13.5 3.5L7 7V9C7 9.6 7.4 10 8 10H9V11C9 12.7 10.3 14 12 14C13.7 14 15 12.7 15 11V10H16C16.6 10 17 9.6 17 9Z" />
  </svg>
);

const AboutIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 8a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6v2h6v-2z" />
  </svg>
);

const LoginIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path d="M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
  </svg>
);

const RegisterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const LoadingSpinner = ({ className }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
