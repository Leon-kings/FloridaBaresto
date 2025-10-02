import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/nav/Navbar";
import { AuthProvider } from "./components/context/AuthContext";
import { Footer } from "./components/footer/Footer";
import Home from "./pages/home/Home";
import { DashboardPage } from "./dashboard/admin/Dashboard";
import { About } from "./pages/about/About";
import { Services } from "./pages/services/Services";
import { Products } from "./pages/products/Products";
// BackToTop component with Tailwind
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-gradient-to-l from-blue-400 to-indigo-400 w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

// Main App component
export default function App() {
  return (
    <AuthProvider>
      <div className="w-full">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
        <BackToTop />
        <Footer />
      </div>
    </AuthProvider>
  );
}
