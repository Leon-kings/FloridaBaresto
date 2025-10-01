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
  LocalDrink
} from '@mui/icons-material';

export const Products = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState('pub');
  const [activeSubCategory, setActiveSubCategory] = useState('bralirwa');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    name: '',
    phone: '',
    guests: 1,
    description: ''
  });

  // Product data with images
  const products = {
    pub: {
      bralirwa: [
        { id: 1, name: 'Primus Beer', price: 1200, stock: 120, type: 'bottle', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Primus' },
        { id: 2, name: 'Mützig Beer', price: 1300, stock: 96, type: 'bottle', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Mützig' },
        { id: 3, name: 'Amstel Beer', price: 1250, stock: 84, type: 'bottle', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Amstel' },
        { id: 4, name: 'Turbo King', price: 1100, stock: 60, type: 'bottle', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Turbo+King' },
        { id: 23, name: 'Heineken', price: 1400, stock: 72, type: 'bottle', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Heineken' },
        { id: 24, name: 'Guinness', price: 1500, stock: 48, type: 'bottle', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Guinness' }
      ],
      skol: [
        { id: 5, name: 'Skol Lager', price: 1150, stock: 108, type: 'bottle', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Skol+Lager' },
        { id: 6, name: 'Skol Pilsner', price: 1200, stock: 72, type: 'bottle', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Skol+Pilsner' },
        { id: 25, name: 'Skol Can', price: 1300, stock: 60, type: 'can', crateSize: 12, category: 'Beer', image: '/api/placeholder/300/300?text=Skol+Can' }
      ],
      wines: [
        { id: 7, name: 'Red Wine', price: 8000, stock: 24, type: 'bottle', category: 'Wine', image: '/api/placeholder/300/300?text=Red+Wine' },
        { id: 8, name: 'White Wine', price: 7500, stock: 18, type: 'bottle', category: 'Wine', image: '/api/placeholder/300/300?text=White+Wine' },
        { id: 9, name: 'Rosé Wine', price: 8200, stock: 12, type: 'bottle', category: 'Wine', image: '/api/placeholder/300/300?text=Rosé+Wine' },
        { id: 26, name: 'Sparkling Wine', price: 9500, stock: 8, type: 'bottle', category: 'Wine', image: '/api/placeholder/300/300?text=Sparkling+Wine' }
      ],
      liquor: [
        { id: 10, name: 'Whiskey', price: 15000, stock: 10, type: 'bottle', category: 'Spirit', image: '/api/placeholder/300/300?text=Whiskey' },
        { id: 11, name: 'Vodka', price: 12000, stock: 8, type: 'bottle', category: 'Spirit', image: '/api/placeholder/300/300?text=Vodka' },
        { id: 12, name: 'Gin', price: 13000, stock: 6, type: 'bottle', category: 'Spirit', image: '/api/placeholder/300/300?text=Gin' },
        { id: 27, name: 'Rum', price: 11000, stock: 7, type: 'bottle', category: 'Spirit', image: '/api/placeholder/300/300?text=Rum' },
        { id: 28, name: 'Tequila', price: 16000, stock: 5, type: 'bottle', category: 'Spirit', image: '/api/placeholder/300/300?text=Tequila' }
      ]
    },
    kitchen: {
      snacks: [
        { id: 13, name: 'Stick Potatoes', price: 1500, stock: 50, type: 'plate', category: 'Snack', image: '/api/placeholder/300/300?text=Stick+Potatoes' },
        { id: 14, name: 'Roasted Meat', price: 5000, stock: 30, type: 'plate', category: 'Main', image: '/api/placeholder/300/300?text=Roasted+Meat' },
        { id: 15, name: 'Chicken Wings', price: 4500, stock: 25, type: 'plate', category: 'Main', image: '/api/placeholder/300/300?text=Chicken+Wings' },
        { id: 16, name: 'Samosa', price: 1000, stock: 40, type: 'plate', category: 'Snack', image: '/api/placeholder/300/300?text=Samosa' },
        { id: 29, name: 'French Fries', price: 1200, stock: 35, type: 'plate', category: 'Snack', image: '/api/placeholder/300/300?text=French+Fries' },
        { id: 30, name: 'Grilled Fish', price: 6000, stock: 15, type: 'plate', category: 'Main', image: '/api/placeholder/300/300?text=Grilled+Fish' }
      ]
    },
    softDrinks: {
      beverages: [
        { id: 17, name: 'Coca Cola', price: 800, stock: 240, type: 'bottle', crateSize: 24, category: 'Soda', image: '/api/placeholder/300/300?text=Coca+Cola' },
        { id: 18, name: 'Fanta', price: 800, stock: 192, type: 'bottle', crateSize: 24, category: 'Soda', image: '/api/placeholder/300/300?text=Fanta' },
        { id: 19, name: 'Sprite', price: 800, stock: 168, type: 'bottle', crateSize: 24, category: 'Soda', image: '/api/placeholder/300/300?text=Sprite' },
        { id: 20, name: 'Mountain Dew', price: 850, stock: 144, type: 'bottle', crateSize: 24, category: 'Soda', image: '/api/placeholder/300/300?text=Mountain+Dew' },
        { id: 21, name: 'Pepsi', price: 800, stock: 120, type: 'bottle', crateSize: 24, category: 'Soda', image: '/api/placeholder/300/300?text=Pepsi' },
        { id: 22, name: 'Mirinda', price: 800, stock: 96, type: 'bottle', crateSize: 24, category: 'Soda', image: '/api/placeholder/300/300?text=Mirinda' },
        { id: 31, name: '7UP', price: 800, stock: 108, type: 'bottle', crateSize: 24, category: 'Soda', image: '/api/placeholder/300/300?text=7UP' },
        { id: 32, name: 'Fanta Passion', price: 850, stock: 84, type: 'bottle', crateSize: 24, category: 'Soda', image: '/api/placeholder/300/300?text=Fanta+Passion' }
      ]
    }
  };

  // API configuration
  const API_BASE_URL = 'https://your-api-endpoint.com/api';

  // Get current products based on category and page
  const getCurrentProducts = () => {
    let productList = [];
    
    if (activeCategory === 'pub') {
      productList = products.pub[activeSubCategory] || [];
    } else if (activeCategory === 'kitchen') {
      productList = products.kitchen.snacks || [];
    } else if (activeCategory === 'softDrinks') {
      productList = products.softDrinks.beverages || [];
    }
    
    // Pagination - 12 products per page
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    
    return productList.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const getTotalPages = () => {
    let productList = [];
    
    if (activeCategory === 'pub') {
      productList = products.pub[activeSubCategory] || [];
    } else if (activeCategory === 'kitchen') {
      productList = products.kitchen.snacks || [];
    } else if (activeCategory === 'softDrinks') {
      productList = products.softDrinks.beverages || [];
    }
    
    return Math.ceil(productList.length / 12);
  };

  // Add to cart function
  const addToCart = (product, quantity, isCrate = false) => {
    const existingItem = cart.find(item => 
      item.id === product.id && item.isCrate === isCrate
    );

    let itemQuantity = quantity;
    let itemPrice = product.price;
    let itemName = product.name;
    let unitType = product.type;

    // Handle crate logic
    if (isCrate && product.crateSize) {
      itemQuantity = quantity;
      itemPrice = product.price * product.crateSize;
      itemName = `${product.name} Crate`;
      unitType = `crate of ${product.crateSize} ${product.type}s`;
    }

    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.isCrate === isCrate
          ? { ...item, quantity: item.quantity + itemQuantity }
          : item
      ));
    } else {
      setCart([...cart, {
        ...product,
        quantity: itemQuantity,
        price: itemPrice,
        name: itemName,
        isCrate: isCrate,
        originalPrice: product.price,
        unitType: unitType,
        totalBottles: isCrate ? quantity * product.crateSize : quantity,
        unitPrice: product.price,
        totalPrice: isCrate ? (product.price * product.crateSize) * quantity : product.price * quantity
      }]);
    }

    toast.success(`${quantity} ${isCrate ? 'crate(s)' : 'item(s)'} added to cart!`);
    setShowCartModal(true);
  };

  // Remove from cart
  const removeFromCart = (id, isCrate) => {
    setCart(cart.filter(item => !(item.id === id && item.isCrate === isCrate)));
    toast.info('Item removed from cart');
  };

  // Update cart quantity
  const updateCartQuantity = (id, isCrate, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, isCrate);
      return;
    }

    setCart(cart.map(item => 
      item.id === id && item.isCrate === isCrate
        ? { 
            ...item, 
            quantity: newQuantity,
            totalBottles: isCrate ? newQuantity * item.crateSize : newQuantity,
            totalPrice: isCrate ? (item.originalPrice * item.crateSize) * newQuantity : item.originalPrice * newQuantity
          }
        : item
    ));
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate detailed order summary
  const calculateDetailedOrderSummary = () => {
    const summary = {
      totalCrates: 0,
      totalBottles: 0,
      totalIndividualItems: 0,
      totalPrice: calculateTotal(),
      items: [],
      detailedItems: []
    };

    cart.forEach(item => {
      const itemSummary = {
        name: item.name,
        type: item.isCrate ? 'crate' : 'individual',
        quantity: item.quantity,
        unitPrice: item.originalPrice,
        totalPrice: item.price * item.quantity,
        bottleCount: item.isCrate ? item.quantity * item.crateSize : item.quantity,
        crateSize: item.crateSize || null
      };

      summary.detailedItems.push(itemSummary);

      if (item.isCrate && item.crateSize) {
        summary.totalCrates += item.quantity;
        summary.totalBottles += item.quantity * item.crateSize;
        summary.items.push(`${item.quantity} crate(s) of ${item.name} (${item.quantity * item.crateSize} bottles) - RWF ${(item.price * item.quantity).toLocaleString()}`);
      } else if (item.type === 'bottle' || item.type === 'can') {
        summary.totalIndividualItems += item.quantity;
        summary.items.push(`${item.quantity} ${item.type}(s) of ${item.name} - RWF ${(item.price * item.quantity).toLocaleString()}`);
      } else {
        summary.totalIndividualItems += item.quantity;
        summary.items.push(`${item.quantity} ${item.type}(s) of ${item.name} - RWF ${(item.price * item.quantity).toLocaleString()}`);
      }
    });

    return summary;
  };

  // Handle order submission
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderSummary = calculateDetailedOrderSummary();
      
      // Prepare complete order data with all details
      const orderData = {
        customerInfo: {
          name: orderInfo.name,
          phone: orderInfo.phone,
          guests: orderInfo.guests,
          description: orderInfo.description,
          orderDate: new Date().toISOString()
        },
        orderItems: cart.map(item => ({
          productId: item.id,
          productName: item.name,
          type: item.isCrate ? 'crate' : 'individual',
          quantity: item.quantity,
          unitPrice: item.originalPrice,
          totalPrice: item.price * item.quantity,
          isCrate: item.isCrate,
          crateSize: item.crateSize || null,
          bottleCount: item.isCrate ? item.quantity * item.crateSize : item.quantity,
          category: item.category
        })),
        orderSummary: {
          totalCrates: orderSummary.totalCrates,
          totalBottles: orderSummary.totalBottles,
          totalIndividualItems: orderSummary.totalIndividualItems,
          totalAmount: orderSummary.totalPrice,
          itemBreakdown: orderSummary.items,
          detailedBreakdown: orderSummary.detailedItems
        },
        paymentInfo: {
          totalAmount: calculateTotal(),
          currency: 'RWF',
          status: 'pending'
        },
        orderStatus: 'pending',
        timestamp: new Date().toISOString()
      };

      console.log('Sending order data:', orderData);

      // Send order to API
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      
      toast.success('Order placed successfully!');
      console.log('Order response:', response.data);
      
      // Reset everything after successful order
      setShowOrderModal(false);
      setCart([]);
      setOrderInfo({
        name: '',
        phone: '',
        guests: 1,
        description: ''
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory]);

  // Get placeholder image based on product type
  const getPlaceholderImage = (product) => {
    const baseUrl = 'https://images.unsplash.com/photo-';
    const images = {
      beer: '1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      wine: '1506377244254-3a0c6f1aa8d9?w=300&h=300&fit=crop',
      spirit: '1572442389372-a82883b8a57e?w=300&h=300&fit=crop',
      snack: '1551782457-a4c6c6c6c3a9?w=300&h=300&fit=crop',
      main: '1555939593-5850a2c5ec8b?w=300&h=300&fit=crop',
      soda: '1624553307265-9edfe5b9c8e5?w=300&h=300&fit=crop'
    };

    if (product.category === 'Beer') return `${baseUrl}${images.beer}`;
    if (product.category === 'Wine') return `${baseUrl}${images.wine}`;
    if (product.category === 'Spirit') return `${baseUrl}${images.spirit}`;
    if (product.category === 'Snack') return `${baseUrl}${images.snack}`;
    if (product.category === 'Main') return `${baseUrl}${images.main}`;
    if (product.category === 'Soda') return `${baseUrl}${images.soda}`;
    
    return `${baseUrl}${images.beer}`;
  };

  // Render category buttons
  const renderCategoryButtons = () => (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg ${
          activeCategory === 'pub' 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/25' 
            : 'bg-gradient-to-r from-blue-200 to-purple-200'
        }`}
        onClick={() => setActiveCategory('pub')}
      >
        <LocalBar className="text-xl" />
        <span className="font-semibold">Pub & Bar</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg ${
          activeCategory === 'kitchen' 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/25' 
            : 'bg-gradient-to-r from-orange-200 to-red-200'
        }`}
        onClick={() => setActiveCategory('kitchen')}
      >
        <Kitchen className="text-xl" />
        <span className="font-semibold">Kitchen</span>
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg ${
          activeCategory === 'softDrinks' 
            ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-green-500/25' 
            : 'bg-gradient-to-r from-green-200 to-teal-200'
        }`}
        onClick={() => setActiveCategory('softDrinks')}
      >
        <LocalDrink className="text-xl" />
        <span className="font-semibold">Soft Drinks</span>
      </motion.button>
    </div>
  );

  // Render pub subcategories
  const renderPubSubcategories = () => (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {[
        { key: 'bralirwa', label: 'Bralirwa', icon: <Liquor /> },
        { key: 'skol', label: 'Skol', icon: <Liquor /> },
        { key: 'wines', label: 'Wines', icon: <LocalBar /> },
        { key: 'liquor', label: 'Spirits', icon: <LocalBar /> }
      ].map((subCat) => (
        <motion.button
          key={subCat.key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
            activeSubCategory === subCat.key 
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
              : 'bg-gradient-to-r from-purple-300 to-blue-400 shadow'
          }`}
          onClick={() => setActiveSubCategory(subCat.key)}
        >
          {subCat.icon}
          <span className="font-medium">{subCat.label}</span>
        </motion.button>
      ))}
    </div>
  );

  // Render product cards
  const renderProductCards = () => {
    const currentProducts = getCurrentProducts();
    
    if (currentProducts.length === 0) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-6xl mb-4">🍻</div>
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </motion.div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img 
                src={product.image || getPlaceholderImage(product)}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = getPlaceholderImage(product);
                }}
              />
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                  {product.category}
                </span>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
                  product.stock < 10 
                    ? 'bg-red-500 text-white' 
                    : product.stock < 20 
                    ? 'bg-orange-500 text-white'
                    : 'bg-green-500 text-white'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
              
              <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                {product.type === 'bottle' ? '🍾 Bottle' : 
                 product.type === 'can' ? '🥫 Can' : 
                 product.type === 'plate' ? '🍽️ Plate' : '📦 Item'}
              </p>
              
              <div className="mb-4">
                <p className="text-blue-600 font-bold text-xl">
                  RWF {product.price.toLocaleString()}
                  <span className="text-gray-500 text-sm font-normal ml-1">/ {product.type}</span>
                </p>
                {product.crateSize && (
                  <p className="text-green-600 font-semibold text-sm mt-1">
                    📦 Crate ({product.crateSize}): RWF {(product.price * product.crateSize).toLocaleString()}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col gap-3">
                {/* Single item purchase */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">Buy individually:</span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full p-2 transition-colors shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    onClick={() => addToCart(product, 1, false)}
                  >
                    <Add fontSize="small" />
                  </motion.button>
                </div>
                
                {/* Crate purchase (if applicable) */}
                {product.crateSize && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 font-medium">Buy by crate:</span>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full p-2 transition-colors shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                      onClick={() => addToCart(product, 1, true)}
                    >
                      <Add fontSize="small" />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Render pagination
  const renderPagination = () => {
    const totalPages = getTotalPages();
    
    if (totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all ${
                page === currentPage
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  // Render cart modal
  const renderCartModal = () => (
    <AnimatePresence>
      {showCartModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCartModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <ShoppingCart />
                Your Shopping Cart
              </h2>
              <button 
                className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                onClick={() => setShowCartModal(false)}
              >
                <Close />
              </button>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add some items to get started</p>
                </div>
              ) : (
                <div className="space-y-4 w-full grid">
                  {cart.map((item) => (
                    <motion.div 
                      key={`${item.id}-${item.isCrate}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 md:flex gap-4 border-b border-gray-100 pb-4"
                    >
                      {/* Item Image */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={item.image || getPlaceholderImage(item)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 text-lg truncate">{item.name}</h4>
                        <p className="text-gray-600 text-sm">
                          {item.isCrate ? '📦 Crate' : '🛍️ Individual'} • 
                          RWF {item.originalPrice.toLocaleString()} per {item.type}
                        </p>
                        <p className="text-blue-600 font-semibold text-sm">
                          Total: RWF {(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.isCrate && (
                          <p className="text-green-600 text-xs font-medium">
                            {item.quantity} crate(s) × {item.crateSize} bottles = {item.quantity * item.crateSize} bottles total
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">
                          <motion.button 
                            whileTap={{ scale: 0.8 }}
                            className="text-red-500 hover:text-red-600 transition-colors"
                            onClick={() => updateCartQuantity(item.id, item.isCrate, item.quantity - 1)}
                          >
                            <Remove fontSize="small" />
                          </motion.button>
                          <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                          <motion.button 
                            whileTap={{ scale: 0.8 }}
                            className="text-green-500 hover:text-green-600 transition-colors"
                            onClick={() => updateCartQuantity(item.id, item.isCrate, item.quantity + 1)}
                          >
                            <Add fontSize="small" />
                          </motion.button>
                        </div>
                        
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          className="text-red-500 hover:text-red-600 transition-colors p-2"
                          onClick={() => removeFromCart(item.id, item.isCrate)}
                        >
                          <Close fontSize="small" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    RWF {calculateTotal().toLocaleString()}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-semibold shadow"
                    onClick={() => setShowCartModal(false)}
                  >
                    Continue Shopping
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all font-semibold shadow-lg shadow-blue-500/25"
                    onClick={() => {
                      setShowCartModal(false);
                      setShowOrderModal(true);
                    }}
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render order modal
  const renderOrderModal = () => {
    const orderSummary = calculateDetailedOrderSummary();

    return (
      <AnimatePresence>
        {showOrderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowOrderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-green-500 to-teal-500 text-white">
                <h2 className="text-xl font-bold">Complete Your Order</h2>
                <button 
                  className="text-white hover:text-gray-200 transition-colors"
                  onClick={() => setShowOrderModal(false)}
                >
                  <Close />
                </button>
              </div>
              
              <form onSubmit={handleOrderSubmit} className="p-6">
                <div className="space-y-6">
                  {/* Detailed Order Summary */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="font-bold text-gray-800 text-lg mb-4">📋 Order Summary</h3>
                    
                    {/* Items Breakdown */}
                    <div className="space-y-3 mb-4">
                      {orderSummary.detailedItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.type === 'crate' 
                                ? `${item.quantity} crate(s) × ${item.crateSize} bottles = ${item.bottleCount} bottles total`
                                : `${item.quantity} individual ${item.type}(s)`
                              }
                            </p>
                            <p className="text-xs text-gray-500">
                              Unit Price: RWF {item.unitPrice.toLocaleString()} per {item.type === 'crate' ? 'bottle' : 'item'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">
                              RWF {item.totalPrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.type === 'crate' 
                                ? `RWF ${(item.unitPrice * item.crateSize).toLocaleString()} per crate`
                                : `RWF ${item.unitPrice.toLocaleString()} each`
                              }
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals Summary */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {orderSummary.totalCrates > 0 && (
                          <div className="text-center">
                            <p className="font-semibold text-gray-600">Total Crates</p>
                            <p className="text-xl font-bold text-green-600">{orderSummary.totalCrates}</p>
                          </div>
                        )}
                        {orderSummary.totalBottles > 0 && (
                          <div className="text-center">
                            <p className="font-semibold text-gray-600">Total Bottles</p>
                            <p className="text-xl font-bold text-blue-600">{orderSummary.totalBottles}</p>
                          </div>
                        )}
                        {orderSummary.totalIndividualItems > 0 && (
                          <div className="text-center">
                            <p className="font-semibold text-gray-600">Individual Items</p>
                            <p className="text-xl font-bold text-orange-600">{orderSummary.totalIndividualItems}</p>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="font-semibold text-gray-600">Total Amount</p>
                          <p className="text-xl font-bold text-purple-600">RWF {orderSummary.totalPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-800 text-lg mb-4">👤 Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          value={orderInfo.name}
                          onChange={(e) => setOrderInfo({...orderInfo, name: e.target.value})}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          value={orderInfo.phone}
                          onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">
                          Number of Guests
                        </label>
                        <input
                          type="number"
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          value={orderInfo.guests}
                          onChange={(e) => setOrderInfo({...orderInfo, guests: parseInt(e.target.value) || 1})}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Any special requests, delivery instructions, or additional information..."
                        value={orderInfo.description}
                        onChange={(e) => setOrderInfo({...orderInfo, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-semibold shadow"
                    onClick={() => {
                      setShowOrderModal(false);
                      setShowCartModal(true);
                    }}
                    disabled={isSubmitting}
                  >
                    Back to Cart
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all font-semibold shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Placing Order...
                      </div>
                    ) : (
                      'Place Order'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="w-full p-3 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
              🍹
            </div>
            Bar & Kitchen
          </motion.h1>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-blue-500/25"
            onClick={() => setShowCartModal(true)}
          >
            <ShoppingCart />
            <span className="font-semibold">View Cart</span>
            {cart.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
              >
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </motion.span>
            )}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderCategoryButtons()}
        
        {activeCategory === 'pub' && renderPubSubcategories()}
        
        {renderProductCards()}
        
        {renderPagination()}
      </main>




      {/* Modals */}
      {renderCartModal()}
      {renderOrderModal()}
      
      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};