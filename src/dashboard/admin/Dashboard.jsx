/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {
  ShoppingCart,
  LocalBar,
  Kitchen,
  LocalCafe,
  Add,
  Remove,
  Close,
  Liquor,
  Fastfood,
  LocalDrink,
  Dashboard,
  Inventory,
  Analytics,
  People,
  TrendingUp,
  TrendingDown,
  Warning,
  Restaurant,
  LocalBar as BarIcon,
  LocalDrink as DrinkIcon,
  Kitchen as KitchenIcon,
  AttachMoney,
  Schedule,
  Star,
  Visibility
} from '@mui/icons-material';


// Main Dashboard Component
export const DashboardPage = () => {
    // Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => (
  <motion.div 
    initial={{ x: -300 }}
    animate={{ x: 0 }}
    className="fixed h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl"
  >
    <div className="p-6">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          🍹
        </div>
        Bar & Kitchen
      </motion.h1>
    </div>

    <nav className="mt-8">
      {[
        { id: 'overview', label: 'Overview', icon: <Dashboard /> },
        { id: 'products', label: 'Products & Stock', icon: <Inventory /> },
        { id: 'analytics', label: 'Analytics', icon: <Analytics /> },
        { id: 'customers', label: 'Customers', icon: <People /> }
      ].map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ x: 5 }}
          className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all ${
            activeTab === item.id 
              ? 'bg-blue-500 bg-opacity-20 border-r-4 border-blue-500' 
              : 'hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab(item.id)}
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </motion.button>
      ))}
    </nav>
  </motion.div>
);

// Header Component
const Header = ({ timeRange, setTimeRange }) => (
  <header className="bg-white shadow-sm border-b">
    <div className="flex justify-between items-center px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>
      
      <div className="flex items-center gap-4">
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
        
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </div>
  </header>
);

// Overview Dashboard
const OverviewDashboard = ({ timeRange }) => {
  const stats = {
    revenue: 1254000,
    orders: 342,
    customers: 189,
    averageOrder: 3667,
    revenueChange: 12.5,
    ordersChange: 8.3,
    customersChange: 15.2
  };

  const recentOrders = [
    { id: 1, customer: 'John Doe', amount: 12500, items: 8, status: 'completed', time: '2 min ago' },
    { id: 2, customer: 'Jane Smith', amount: 8400, items: 5, status: 'completed', time: '5 min ago' },
    { id: 3, customer: 'Mike Johnson', amount: 15600, items: 12, status: 'preparing', time: '8 min ago' },
    { id: 4, customer: 'Sarah Wilson', amount: 9200, items: 6, status: 'pending', time: '12 min ago' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`RWF ${stats.revenue.toLocaleString()}`}
          change={stats.revenueChange}
          icon={<AttachMoney className="text-green-500" />}
          color="green"
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.toString()}
          change={stats.ordersChange}
          icon={<ShoppingCart className="text-blue-500" />}
          color="blue"
        />
        <StatCard
          title="Customers"
          value={stats.customers.toString()}
          change={stats.customersChange}
          icon={<People className="text-purple-500" />}
          color="purple"
        />
        <StatCard
          title="Avg Order Value"
          value={`RWF ${stats.averageOrder.toLocaleString()}`}
          change={-2.1}
          icon={<TrendingUp className="text-orange-500" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-800">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.items} items • {order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">RWF {order.amount.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <StockAlerts />
      </div>

      {/* Category Performance */}
      <CategoryPerformance />
    </motion.div>
  );
};

// Products Dashboard
const ProductsDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts = [
      { id: 1, name: 'Primus Beer', category: 'Beer', price: 1200, stock: 45, minStock: 20, sales: 342 },
      { id: 2, name: 'Mützig Beer', category: 'Beer', price: 1300, stock: 28, minStock: 20, sales: 289 },
      { id: 3, name: 'Red Wine', category: 'Wine', price: 8000, stock: 12, minStock: 10, sales: 156 },
      { id: 4, name: 'Whiskey', category: 'Spirit', price: 15000, stock: 8, minStock: 5, sales: 89 },
      { id: 5, name: 'Chicken Wings', category: 'Food', price: 4500, stock: 15, minStock: 25, sales: 203 },
      { id: 6, name: 'Coca Cola', category: 'Soft Drink', price: 800, stock: 120, minStock: 50, sales: 456 }
    ];
    setProducts(mockProducts);
  }, []);

  const updateStock = (productId, newStock) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, stock: newStock } : p
    ));
    toast.success('Stock updated successfully');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          Add New Product
        </button>
      </div>

      {/* Stock Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Inventory className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Warning className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-800">
                {products.filter(p => p.stock < p.minStock).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-800">
                {products.filter(p => p.stock === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sales} sales</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    RWF {product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            product.stock < product.minStock 
                              ? 'bg-red-500' 
                              : product.stock < product.minStock * 2 
                              ? 'bg-yellow-500' 
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((product.stock / (product.minStock * 3)) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{product.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock === 0 
                        ? 'bg-red-100 text-red-800' 
                        : product.stock < product.minStock 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock === 0 ? 'Out of Stock' : product.stock < product.minStock ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateStock(product.id, product.stock + 10)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Add />
                      </button>
                      <button 
                        onClick={() => updateStock(product.id, Math.max(0, product.stock - 1))}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Remove />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Visibility />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

// Analytics Dashboard
const AnalyticsDashboard = ({ timeRange }) => {
  const analyticsData = {
    pageViews: 12543,
    uniqueVisitors: 8432,
    bounceRate: 32.1,
    avgSession: '4m 23s',
    topProducts: [
      { name: 'Primus Beer', sales: 342, revenue: 410400 },
      { name: 'Chicken Wings', sales: 289, revenue: 1300500 },
      { name: 'Coca Cola', sales: 456, revenue: 364800 },
      { name: 'Red Wine', sales: 156, revenue: 1248000 }
    ],
    trafficSources: [
      { source: 'Direct', percentage: 45, visitors: 3794 },
      { source: 'Social Media', percentage: 30, visitors: 2530 },
      { source: 'Search', percentage: 20, visitors: 1686 },
      { source: 'Referral', percentage: 5, visitors: 422 }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Website Analytics</h2>

      {/* Web Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Page Views"
          value={analyticsData.pageViews.toLocaleString()}
          change={8.7}
          icon={<Visibility className="text-blue-500" />}
          color="blue"
        />
        <StatCard
          title="Unique Visitors"
          value={analyticsData.uniqueVisitors.toLocaleString()}
          change={12.3}
          icon={<People className="text-green-500" />}
          color="green"
        />
        <StatCard
          title="Bounce Rate"
          value={`${analyticsData.bounceRate}%`}
          change={-5.2}
          icon={<TrendingDown className="text-orange-500" />}
          color="orange"
        />
        <StatCard
          title="Avg Session"
          value={analyticsData.avgSession}
          change={2.1}
          icon={<Schedule className="text-purple-500" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Top Selling Products</h3>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">RWF {product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+12.5%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {analyticsData.trafficSources.map((source, index) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{source.source}</span>
                  <span className="text-gray-600">{source.percentage}% ({source.visitors.toLocaleString()})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Customers Dashboard
const CustomersDashboard = () => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, totalSpent: 125000, joinDate: '2024-01-15', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 8, totalSpent: 89000, joinDate: '2024-02-20', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 3, totalSpent: 45000, joinDate: '2024-03-10', status: 'inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', orders: 15, totalSpent: 156000, joinDate: '2024-01-05', status: 'active' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <People className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-800">
                {customers.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <AttachMoney className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-800">
                RWF {Math.round(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.length).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    RWF {customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

// Reusable Components
const StatCard = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
    orange: 'bg-orange-50 border-orange-200'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-sm border p-6 ${colorClasses[color]}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className={`flex items-center mt-4 text-sm ${
        change >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        <span>{Math.abs(change)}% from last period</span>
      </div>
    </motion.div>
  );
};

const StockAlerts = () => {
  const alerts = [
    { product: 'Chicken Wings', current: 15, min: 25, urgency: 'high' },
    { product: 'White Wine', current: 8, min: 10, urgency: 'medium' },
    { product: 'Gin', current: 3, min: 5, urgency: 'high' },
    { product: 'French Fries', current: 28, min: 30, urgency: 'low' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Stock Alerts</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          {alerts.length} Alerts
        </span>
      </div>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.product}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all"
          >
            <div>
              <p className="font-semibold text-gray-800">{alert.product}</p>
              <p className="text-sm text-gray-600">
                Current: {alert.current} • Minimum: {alert.min}
              </p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              alert.urgency === 'high' 
                ? 'bg-red-100 text-red-800' 
                : alert.urgency === 'medium' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {alert.urgency === 'high' ? 'Urgent' : alert.urgency === 'medium' ? 'Warning' : 'Notice'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CategoryPerformance = () => {
  const categories = [
    { name: 'Beer', revenue: 584000, orders: 432, change: 8.5 },
    { name: 'Wine', revenue: 423000, orders: 156, change: 12.3 },
    { name: 'Spirits', revenue: 387000, orders: 89, change: 5.7 },
    { name: 'Food', revenue: 645000, orders: 289, change: 15.2 },
    { name: 'Soft Drinks', revenue: 198000, orders: 456, change: 3.4 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Category Performance</h3>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                {category.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{category.name}</p>
                <p className="text-sm text-gray-600">{category.orders} orders</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">RWF {category.revenue.toLocaleString()}</p>
              <p className={`text-sm ${category.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {category.change >= 0 ? '+' : ''}{category.change}%
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" />
      
      {/* Sidebar */}
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 ml-64">
          <Header timeRange={timeRange} setTimeRange={setTimeRange} />
          
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && <OverviewDashboard timeRange={timeRange} />}
              {activeTab === 'products' && <ProductsDashboard />}
              {activeTab === 'analytics' && <AnalyticsDashboard timeRange={timeRange} />}
              {activeTab === 'customers' && <CustomersDashboard />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

