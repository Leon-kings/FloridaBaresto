
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LocalBar,
  Restaurant,
  EmojiFoodBeverage,
  Close,
  Person,
  LocationOn,
  Schedule,
  ShoppingCart,
  TableRestaurant,
  Liquor,
} from "@mui/icons-material";

export const Services = () => {
  // Services Data
  const [services] = useState([
    {
      id: 1,
      name: "Restaurant",
      icon: <Restaurant className="text-4xl" />,
      description: "Dine-in experience with table service",
      type: "restaurant",
      category: "dine-in",
    },
    {
      id: 2,
      name: "Bar",
      icon: <LocalBar className="text-4xl" />,
      description: "Premium alcoholic beverages - 12 bottles per case",
      type: "bar",
      category: "delivery",
    },
    {
      id: 3,
      name: "Soft Drinks",
      icon: <EmojiFoodBeverage className="text-4xl" />,
      description: "Non-alcoholic beverages - 24 bottles per case",
      type: "soft_drinks",
      category: "delivery",
    },
    {
      id: 4,
      name: "Liquor",
      icon: <Liquor className="text-4xl" />,
      description: "Premium spirits and liquors - Individual bottles",
      type: "liquor",
      category: "delivery",
    },
  ]);

  // Drink Menu Data
  const [drinkMenu] = useState({
    restaurant: [
      { id: 1, name: "Craft Beer", category: "beer", price: 8 },
      { id: 2, name: "House Wine", category: "wine", price: 12 },
      { id: 3, name: "Signature Cocktail", category: "cocktail", price: 15 },
      { id: 4, name: "Soft Drink", category: "non-alcoholic", price: 4 },
      { id: 5, name: "Fresh Juice", category: "non-alcoholic", price: 6 },
    ],
    bar: [
      { id: 1, name: "Premium Whiskey", category: "liquor", price: 25 },
      { id: 2, name: "Vodka", category: "liquor", price: 20 },
      { id: 3, name: "Gin", category: "liquor", price: 22 },
      { id: 4, name: "Rum", category: "liquor", price: 18 },
      { id: 5, name: "Tequila", category: "liquor", price: 24 },
    ],
    soft_drinks: [
      { id: 1, name: "Cola", category: "soda", price: 3 },
      { id: 2, name: "Lemonade", category: "soda", price: 3 },
      { id: 3, name: "Orange Soda", category: "soda", price: 3 },
      { id: 4, name: "Ginger Ale", category: "soda", price: 3 },
      { id: 5, name: "Sparkling Water", category: "water", price: 2 },
    ],
    liquor: [
      { id: 1, name: "Single Malt Scotch", category: "whiskey", price: 35 },
      { id: 2, name: "Premium Vodka", category: "vodka", price: 28 },
      { id: 3, name: "Aged Rum", category: "rum", price: 26 },
      { id: 4, name: "Craft Gin", category: "gin", price: 30 },
      { id: 5, name: "Añejo Tequila", category: "tequila", price: 32 },
    ],
  });

  // State Management
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState("service");

  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    location: "",
    date: "",
    time: "",
    tableNumber: "",
    numberOfGuests: 1,
    serviceType: "",
    specialInstructions: "",
  });

  // Cart Functions
  const addToCart = (drink) => {
    const existingItem = cartItems.find((item) => item.id === drink.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...drink, quantity: 1 }]);
    }
    toast.success(`Added ${drink.name} to cart!`);
  };

  const removeFromCart = (drinkId) => {
    setCartItems(cartItems.filter((item) => item.id !== drinkId));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (drinkId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(drinkId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === drinkId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  // Service Selection Handler
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setFormData((prev) => ({
      ...prev,
      serviceType: service.type,
    }));

    if (service.type === "restaurant") {
      setCurrentStep("cart");
      setShowCart(true);
    } else {
      setCurrentStep("form");
      setShowBookingForm(true);
    }
    toast.info(`Selected: ${service.name}`);
  };

  // ✅ Fixed Input Handler
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // ✅ Reset Form
  const resetForm = () => {
    setFormData({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      location: "",
      date: "",
      time: "",
      tableNumber: "",
      numberOfGuests: 1,
      serviceType: "",
      specialInstructions: "",
    });
    setCartItems([]);
    setShowBookingForm(false);
    setShowCart(false);
    setSelectedService(null);
    setCurrentStep("service");
  };

  const handleCartToForm = () => {
    if (cartItems.length === 0) {
      toast.error("Please add at least one item to your cart");
      return;
    }
    setCurrentStep("form");
    setShowCart(false);
    setShowBookingForm(true);
  };

  // ✅ Fixed Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      cartItems,
      totalPrice: getTotalPrice(),
      totalItems: getTotalItems(),
      bookingId: `BK${Date.now()}`,
      timestamp: new Date().toISOString(),
      serviceName: selectedService?.name,
    };

    console.log("Booking submitted:", bookingData);

    const orderSummary = cartItems
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(", ");
    toast.success(
      `🎉 Order Confirmed!\n${selectedService?.name}\n${orderSummary}\nTotal: $${getTotalPrice()}`,
      { position: "top-center", autoClose: 6000 }
    );
    resetForm();
  };

  // UI Components
  const ServiceCard = ({ service }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white w-full p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all"
      onClick={() => handleServiceSelect(service)}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-blue-600">{service.icon}</div>
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>
    </motion.div>
  );

  const DrinkItem = ({ drink }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white w-full p-4 rounded-lg shadow-md flex justify-between items-center"
    >
      <div>
        <h4 className="font-semibold">{drink.name}</h4>
        <p className="text-gray-600">${drink.price}</p>
      </div>
      <button
        onClick={() => addToCart(drink)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add
      </button>
    </motion.div>
  );

  const CartModal = () => (
    <AnimatePresence>
      {showCart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="bg-gradient-to-r from-red-400 to-red-600">
                <Close />
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 bg-gradient-to-r from-red-300 to-red-400 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 bg-gradient-to-bl from-green-300 to-indigo-300 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-gradient-to-t from-red-300 to-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="font-bold text-blue-400">Total: ${getTotalPrice()}</span>
              <button
                onClick={handleCartToForm}
                className="bg-gradient-to-b from-blue-400 to-indigo-400 px-6 py-2 rounded-lg "
              >
                Proceed
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const BookingFormModal = () => (
    <AnimatePresence>
      {showBookingForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-300 text-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <button onClick={() => setShowBookingForm(false)} className="bg-gradient-to-b from-red-400 to-red-600">
                <Close />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-black overflow-y-auto">
              <input
                type="text"
                name="clientName"
                placeholder="Your Name"
                value={formData.clientName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="email"
                name="clientEmail"
                placeholder="Your Email"
                value={formData.clientEmail}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="tel"
                name="clientPhone"
                placeholder="Phone Number"
                value={formData.clientPhone}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                min={new Date().toISOString().split("T")[0]}
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              {selectedService?.type === "restaurant" && (
                <>
                  <input
                    type="number"
                    name="tableNumber"
                    placeholder="Table Number"
                    value={formData.tableNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    min="1"
                  />
                  <input
                    type="number"
                    name="numberOfGuests"
                    placeholder="Number of Guests"
                    value={formData.numberOfGuests}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    min="1"
                  />
                </>
              )}
              <textarea
                name="specialInstructions"
                placeholder="Special Instructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-indigo-400 p-3 rounded-lg "
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Main Render
  return (
    <div className="container mx-auto bg-gray-300 text-black px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-400 text-center mb-8">Our Services</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Show Drinks if Restaurant Selected */}
      {selectedService && selectedService.type === "restaurant" && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Available Drinks</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinkMenu[selectedService.type].map((drink) => (
              <DrinkItem key={drink.id} drink={drink} />
            ))}
          </div>
        </div>
      )}

      <CartModal />
      <BookingFormModal />
      <ToastContainer />
    </div>
  );
};

