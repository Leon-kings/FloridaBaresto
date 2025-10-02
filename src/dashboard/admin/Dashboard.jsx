/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import WineBarIcon from "@mui/icons-material/WineBar";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import { Sidebar } from "./components/sidebar/Sidebar";

// API Base URL - Replace with your actual API endpoint
const API_BASE_URL = "https://your-api.com/api";

// Mock API Service for demonstration
const apiService = {
  // Fetch dashboard statistics
  getDashboardStats: async () => {
    try {
      // In real implementation, use: await axios.get(`${API_BASE_URL}/dashboard/stats`);
      return {
        totalRevenue: 1254000,
        totalOrders: 342,
        totalCustomers: 189,
        averageOrder: 3667,
        revenueChange: 12.5,
        ordersChange: 8.3,
        customersChange: 15.2,
        lowStockItems: 8,
        pendingOrders: 12
      };
    } catch (error) {
      console.log("Failed to fetch dashboard statistics");
    }
  },

  // Fetch sales data
  getSalesData: async () => {
    try {
      return [
        { month: "Jan", beer: 42, food: 38, cocktails: 25, revenue: 1250000 },
        { month: "Feb", beer: 38, food: 42, cocktails: 28, revenue: 1120000 },
        { month: "Mar", beer: 51, food: 45, cocktails: 32, revenue: 1530000 },
        { month: "Apr", beer: 47, food: 48, cocktails: 35, revenue: 1410000 },
        { month: "May", beer: 55, food: 52, cocktails: 38, revenue: 1650000 },
        { month: "Jun", beer: 58, food: 55, cocktails: 42, revenue: 1740000 },
        { month: "Jul", beer: 62, food: 58, cocktails: 45, revenue: 1860000 },
      ];
    } catch (error) {
      console.log("Failed to fetch sales data",error);
    }
  },

  // Fetch category data
  getCategoryData: async () => {
    try {
      return [
        { name: "Beer", value: 35 },
        { name: "Wine", value: 25 },
        { name: "Spirits", value: 15 },
        { name: "Cocktails", value: 10 },
        { name: "Food", value: 15 },
      ];
    } catch (error) {
      console.log("Failed to fetch category data");
    }
  },

  // Fetch inventory data
  getInventoryData: async () => {
    try {
      return [
        { name: "In Stock", value: 65 },
        { name: "Low Stock", value: 15 },
        { name: "Out of Stock", value: 8 },
        { name: "Expiring Soon", value: 12 },
      ];
    } catch (error) {
      console.log("Failed to fetch inventory data");
    }
  },

  // Fetch customer traffic data
  getTrafficData: async () => {
    try {
      return [
        { day: "1", lunch: 20, dinner: 32, lateNight: 15 },
        { day: "5", lunch: 25, dinner: 38, lateNight: 18 },
        { day: "10", lunch: 22, dinner: 35, lateNight: 20 },
        { day: "15", lunch: 30, dinner: 45, lateNight: 25 },
        { day: "20", lunch: 28, dinner: 42, lateNight: 22 },
        { day: "25", lunch: 35, dinner: 50, lateNight: 28 },
        { day: "30", lunch: 40, dinner: 55, lateNight: 30 },
      ];
    } catch (error) {
      console.log("Failed to fetch traffic data");
    }
  },

  // Fetch recent orders
  getRecentOrders: async () => {
    try {
      return [
        { id: 1, customer: "John Smith", amount: 12500, items: 8, status: "completed", time: "2 min ago", type: "dine-in" },
        { id: 2, customer: "Emma Wilson", amount: 8400, items: 5, status: "completed", time: "5 min ago", type: "takeaway" },
        { id: 3, customer: "Mike Johnson", amount: 15600, items: 12, status: "preparing", time: "8 min ago", type: "dine-in" },
        { id: 4, customer: "Sarah Brown", amount: 9200, items: 6, status: "pending", time: "12 min ago", type: "delivery" },
        { id: 5, customer: "David Lee", amount: 11300, items: 7, status: "completed", time: "15 min ago", type: "dine-in" },
      ];
    } catch (error) {
      console.log("Failed to fetch recent orders");
    }
  },

  // Fetch top products
  getTopProducts: async () => {
    try {
      return [
        { name: "Primus Beer", sales: 342, revenue: 410400, category: "Beer" },
        { name: "Chicken Wings", sales: 289, revenue: 1300500, category: "Food" },
        { name: "House Red Wine", sales: 156, revenue: 1248000, category: "Wine" },
        { name: "Mojito", sales: 203, revenue: 812000, category: "Cocktail" },
        { name: "Coca Cola", sales: 456, revenue: 364800, category: "Soft Drink" },
      ];
    } catch (error) {
      console.log("Failed to fetch top products");
    }
  }
};



// Notification Modal
const NotificationModal = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      content: "Table 5 ordered 2 Primus Beer and Chicken Wings",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "inventory",
      title: "Low Stock Alert",
      content: "Primus Beer running low (15 bottles remaining)",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "reservation",
      title: "New Reservation",
      content: "Party of 6 booked for Friday 8 PM",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Processed",
      content: "Table 3 payment of RWF 25,400 completed",
      time: "3 hours ago",
      read: true,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <RestaurantIcon className="text-green-500" />;
      case "inventory":
        return <InventoryIcon className="text-yellow-500" />;
      case "reservation":
        return <EventAvailableIcon className="text-blue-500" />;
      case "payment":
        return <PaymentIcon className="text-purple-500" />;
      default:
        return <NotificationsIcon />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// User Modal
const UserModal = ({ isOpen, onClose }) => {
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@pubresto.com",
    phone: "+250 78 123 4567",
    role: "Manager",
    location: "Kigali, Rwanda",
    stats: [
      { label: "Orders Managed", value: "1,242" },
      { label: "Total Revenue", value: "RWF 25.8M" },
      { label: "Customer Rating", value: "4.7/5" },
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Profile</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <CloseIcon />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4 text-white text-2xl">
                  AJ
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.role}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <EmailIcon className="text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="text-gray-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <LocationOnIcon className="text-gray-400" />
                  <span>{user.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {user.stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, icon, color, loading = false }) => {
  if (loading) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl shadow-sm border p-6 animate-pulse"
      >
        <div className="flex justify-between items-center">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border p-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
          <p className={`text-sm mt-2 flex items-center ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}>
            {change >= 0 ? (
              <TrendingUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <TrendingUpIcon className="w-4 h-4 mr-1 transform rotate-180" />
            )}
            {Math.abs(change)}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
export const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    salesData: [],
    categoryData: [],
    inventoryData: [],
    trafficData: [],
    recentOrders: [],
    topProducts: []
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          stats,
          salesData,
          categoryData,
          inventoryData,
          trafficData,
          recentOrders,
          topProducts
        ] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getSalesData(),
          apiService.getCategoryData(),
          apiService.getInventoryData(),
          apiService.getTrafficData(),
          apiService.getRecentOrders(),
          apiService.getTopProducts()
        ]);

        setDashboardData({
          stats,
          salesData,
          categoryData,
          inventoryData,
          trafficData,
          recentOrders,
          topProducts
        });

        toast.success("Dashboard data loaded successfully!");
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error("Dashboard data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  const INVENTORY_COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3"];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <ToastContainer position="top-right" />
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <MenuIcon />
            </button>
            <h1 className="ml-2 lg:ml-4 text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Pub & Restaurant Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setNotificationOpen(true)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <NotificationsIcon className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={() => setUserModalOpen(true)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                AJ
              </div>
              <span className="hidden sm:block text-sm font-medium">Alex Johnson</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
            <StatCard
              title="Total Revenue"
              value={dashboardData.stats ? `RWF ${dashboardData.stats.totalRevenue.toLocaleString()}` : "RWF 0"}
              change={dashboardData.stats?.revenueChange || 0}
              icon={<PaymentIcon className="text-green-600 text-2xl" />}
              color="bg-green-100"
              loading={loading}
            />
            <StatCard
              title="Total Orders"
              value={dashboardData.stats?.totalOrders?.toString() || "0"}
              change={dashboardData.stats?.ordersChange || 0}
              icon={<RestaurantIcon className="text-blue-600 text-2xl" />}
              color="bg-blue-100"
              loading={loading}
            />
            <StatCard
              title="Customers"
              value={dashboardData.stats?.totalCustomers?.toString() || "0"}
              change={dashboardData.stats?.customersChange || 0}
              icon={<PeopleIcon className="text-purple-600 text-2xl" />}
              color="bg-purple-100"
              loading={loading}
            />
            <StatCard
              title="Avg Order Value"
              value={dashboardData.stats ? `RWF ${dashboardData.stats.averageOrder.toLocaleString()}` : "RWF 0"}
              change={5.2}
              icon={<LocalBarIcon className="text-orange-600 text-2xl" />}
              color="bg-orange-100"
              loading={loading}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Sales & Revenue Chart */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border"
            >
              <h3 className="text-lg font-semibold mb-4">Sales & Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}`, 'Value']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="beer" fill="#0088FE" name="Beer Sales" />
                  <Bar dataKey="food" fill="#00C49F" name="Food Sales" />
                  <Bar dataKey="cocktails" fill="#FFBB28" name="Cocktail Sales" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Product Categories */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border"
            >
              <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {dashboardData.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Second Row Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Inventory Status */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border"
            >
              <h3 className="text-lg font-semibold mb-4">Inventory Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.inventoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}
                  >
                    {dashboardData.inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={INVENTORY_COLORS[index % INVENTORY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Customer Traffic */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border"
            >
              <h3 className="text-lg font-semibold mb-4">Customer Traffic</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dashboardData.trafficData}>
                  <defs>
                    <linearGradient id="colorLunch" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDinner" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLateNight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="lunch" stroke="#8884d8" fillOpacity={1} fill="url(#colorLunch)" name="Lunch" />
                  <Area type="monotone" dataKey="dinner" stroke="#82ca9d" fillOpacity={1} fill="url(#colorDinner)" name="Dinner" />
                  <Area type="monotone" dataKey="lateNight" stroke="#ffc658" fillOpacity={1} fill="url(#colorLateNight)" name="Late Night" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Recent Orders & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Recent Orders */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {dashboardData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-800">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.items} items • {order.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">RWF {order.amount.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
              <div className="space-y-3">
                {dashboardData.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{product.sales} sales</p>
                      <p className="text-sm text-green-600">RWF {product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <NotificationModal
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
      <UserModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
      />
    </div>
  );
};

