/* eslint-disable no-unused-vars */
// src/components/inventory/CreateInventory.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Material-UI Icons
import {
  Add as PlusIcon,
  Remove as MinusIcon,
  Close as CloseIcon,
  Inventory as PackageIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  FileUpload as UploadIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  LocalBar as AlcoholIcon,
  WineBar as WineIcon,
  LocalCafe as CocktailIcon,
  LunchDining as FoodIcon,
  Cake as DessertIcon,
  LocalDrink as DrinkIcon,
  ShoppingCart as CartIcon,
  Assessment as ChartIcon,
  PictureAsPdf as PdfIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Sidebar } from "../sidebar/Sidebar";

// API Service
class InventoryAPI {
  constructor() {
    this.api = axios.create({
      baseURL: "https://florida-jv3u.onrender.com",
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error.response?.data?.message || error.message;

        // Handle specific status codes
        if (error.response?.status === 401) {
          // Redirect to login or refresh token
          console.error("❌ Unauthorized - Please login again");
        } else if (error.response?.status === 500) {
          console.error("❌ Server error - Please try again later");
        }

        return Promise.reject(new Error(message));
      }
    );
  }

  async getInventory() {
    const response = await this.api.get("/orders");
    return response.data.data.inventory;
  }

  async stockIn(data) {
    const response = await this.api.post("/orders/stock-in", data);
    return response.data.data;
  }

  async stockOut(data) {
    const response = await this.api.post("/orders/stock-out", data);
    return response.data.data;
  }

  async bulkStockIn(data) {
    const response = await this.api.post("/orders/bulk-stock-in", data);
    return response.data.data;
  }

  async getProducts(params = {}) {
    const response = await this.api.get("/products", { params });
    return response.data.data.products;
  }

  async getProductById(id) {
    const response = await this.api.get(`/products/${id}`);
    return response.data.data;
  }

  async createProduct(data) {
    const response = await this.api.post("/products", data);
    return response.data.data;
  }

  async updateProduct(id, data) {
    const response = await this.api.put(`/products/${id}`, data);
    return response.data.data;
  }

  async deleteProduct(id) {
    const response = await this.api.delete(`/products/${id}`);
    return response.data.data;
  }

  async getStockMovements(params = {}) {
    const response = await this.api.get("/orders/movements/daily", { params });
    return response.data.data;
  }

  async getLowStock() {
    const response = await this.api.get("/orders/alerts/low-stock");
    return response.data.data;
  }

  // Sales operations
  async createSale(data) {
    const response = await this.api.post("/financials/purchases", data);
    return response.data.data;
  }

  async getSales(params = {}) {
    const response = await this.api.get("/", { params });
    return response.data;
  }

  async getSaleById(id) {
    const response = await this.api.get(`/financials/records/${id}`);
    return response.data;
  }

  // Reports
  async getSalesReport(params = {}) {
    const response = await this.api.get("/financials/records", { params });
    return response.data;
  }

  async getInventoryReport() {
    const response = await this.api.get("/orders/stats/overview");
    return response.data;
  }
}

// Create and export singleton instance
const inventoryAPI = new InventoryAPI();

// Mock data fallback

export const CreateInventoryManagements = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showStockInModal, setShowStockInModal] = useState(false);
  const [showStockOutModal, setShowStockOutModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const tableRef = useRef();

  // Form states
  const [stockInForm, setStockInForm] = useState({
    productId: "",
    quantity: "",
    costPrice: "",
    supplier: "",
    notes: "",
  });

  const [stockOutForm, setStockOutForm] = useState({
    productId: "",
    quantity: "",
    reason: "waste",
    notes: "",
  });

  const [bulkForm, setBulkForm] = useState({
    items: [{ productId: "", quantity: "", costPrice: "" }],
    supplier: "",
    notes: "",
  });

  // Load inventory and products data
  useEffect(() => {
    loadInventory();
    loadProducts();
  }, []);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const data = await inventoryAPI.getInventory();
      setInventory(data.data?.inventory );
    } catch (error) {
      console.error("Error loading inventory:", error);
      toast.error("Failed to load inventory");
      // setInventory(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await inventoryAPI.getProducts();
      setProducts(data.data?.products );
    } catch (error) {
      console.error("Error loading products:", error);
      // setProducts(mockProducts);
    }
  };

  // Filter functions
  const getLowStockItems = () => {
    return inventory.filter(
      (item) => item.currentStock > 0 && item.currentStock <= item.reorderPoint
    );
  };

  const getOutOfStockItems = () => {
    return inventory.filter((item) => item.currentStock === 0);
  };

  const getFilteredInventory = () => {
    let filtered = inventory;

    // Apply tab filters
    if (activeTab === "low-stock") {
      filtered = getLowStockItems();
    } else if (activeTab === "out-of-stock") {
      filtered = getOutOfStockItems();
    }

    // Apply search and category filters
    filtered = filtered.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered;
  };

  const filteredInventory = getFilteredInventory();

  // Calculate statistics
  const stats = {
    totalItems: inventory.length,
    lowStock: getLowStockItems().length,
    outOfStock: getOutOfStockItems().length,
    totalValue: inventory.reduce(
      (sum, item) => sum + item.currentStock * (item.costPrice || 0),
      0
    ),
    categories: [...new Set(inventory.map((item) => item.category))],
  };

  // PDF Export Function
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text("Inventory Report", 105, 15, { align: "center" });

      // Date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, {
        align: "center",
      });

      // Summary Section
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text("Summary", 14, 35);

      const summaryData = [
        ["Total Products", stats.totalItems.toString()],
        ["Low Stock Items", stats.lowStock.toString()],
        ["Out of Stock Items", stats.outOfStock.toString()],
        ["Total Inventory Value", `$${stats.totalValue.toFixed(2)}`],
      ];

      autoTable(doc, {
        startY: 40,
        head: [["Metric", "Value"]],
        body: summaryData,
        theme: "grid",
        headStyles: { fillColor: [59, 130, 246] },
        styles: { fontSize: 10, cellPadding: 3 },
        margin: { left: 14, right: 14 },
      });

      // Inventory Table
      const tableData = filteredInventory.map((item) => [
        item.name,
        item.sku,
        item.category.replace("_", " "),
        `${item.currentStock} ${item.unit}`,
        `${item.reorderPoint} ${item.unit}`,
        item.currentStock === 0
          ? "Out of Stock"
          : item.currentStock <= item.reorderPoint
          ? "Low Stock"
          : "In Stock",
        `$${(item.currentStock * (item.costPrice || 0)).toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        head: [
          [
            "Product Name",
            "SKU",
            "Category",
            "Current Stock",
            "Reorder Point",
            "Status",
            "Value",
          ],
        ],
        body: tableData,
        theme: "grid",
        headStyles: { fillColor: [59, 130, 246] },
        styles: { fontSize: 8, cellPadding: 2 },
        margin: { left: 14, right: 14 },
        pageBreak: "auto",
      });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Page ${i} of ${pageCount}`,
          105,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      }

      doc.save(
        `inventory-report-${new Date().toISOString().split("T")[0]}.pdf`
      );
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    }
  };

  // Form handlers
  const handleStockInChange = (field, value) => {
    setStockInForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStockOutChange = (field, value) => {
    setStockOutForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBulkItemChange = (index, field, value) => {
    const newItems = [...bulkForm.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setBulkForm((prev) => ({ ...prev, items: newItems }));
  };

  const addBulkItem = () => {
    setBulkForm((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", quantity: "", costPrice: "" }],
    }));
  };

  const removeBulkItem = (index) => {
    if (bulkForm.items.length > 1) {
      const newItems = bulkForm.items.filter((_, i) => i !== index);
      setBulkForm((prev) => ({ ...prev, items: newItems }));
    }
  };

  // Form submissions with actual API calls
  const handleStockInSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!stockInForm.productId || !stockInForm.quantity) {
        toast.error("Please fill in all required fields");
        return;
      }

      const submissionData = {
        productId: stockInForm.productId,
        quantity: parseInt(stockInForm.quantity),
        ...(stockInForm.costPrice && {
          costPrice: parseFloat(stockInForm.costPrice),
        }),
        ...(stockInForm.supplier && { supplier: stockInForm.supplier }),
        ...(stockInForm.notes && { notes: stockInForm.notes }),
      };

      const response = await inventoryAPI.stockIn(submissionData);

      toast.success(response.message || "Stock added successfully!");
      setShowStockInModal(false);
      setStockInForm({
        productId: "",
        quantity: "",
        costPrice: "",
        supplier: "",
        notes: "",
      });
      await loadInventory();
    } catch (error) {
      console.error("Stock in error:", error);
      toast.error(error.message || "Failed to add stock");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStockOutSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (
        !stockOutForm.productId ||
        !stockOutForm.quantity ||
        !stockOutForm.reason
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      const submissionData = {
        productId: stockOutForm.productId,
        quantity: parseInt(stockOutForm.quantity),
        reason: stockOutForm.reason,
        ...(stockOutForm.notes && { notes: stockOutForm.notes }),
      };

      const response = await inventoryAPI.stockOut(submissionData);

      toast.success(response.message || "Stock removed successfully!");
      setShowStockOutModal(false);
      setStockOutForm({
        productId: "",
        quantity: "",
        reason: "waste",
        notes: "",
      });
      await loadInventory();
    } catch (error) {
      console.error("Stock out error:", error);
      toast.error(error.message || "Failed to remove stock");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const validItems = bulkForm.items.filter(
        (item) => item.productId && item.quantity && parseInt(item.quantity) > 0
      );

      if (validItems.length === 0) {
        toast.error("Please add at least one valid product");
        return;
      }

      const submissionData = {
        items: validItems.map((item) => ({
          productId: item.productId,
          quantity: parseInt(item.quantity),
          ...(item.costPrice && { costPrice: parseFloat(item.costPrice) }),
        })),
        ...(bulkForm.supplier && { supplier: bulkForm.supplier }),
        ...(bulkForm.notes && { notes: bulkForm.notes }),
      };

      const response = await inventoryAPI.bulkStockIn(submissionData);

      toast.success(response.message || "Bulk stock added successfully!");
      setShowBulkModal(false);
      setBulkForm({
        items: [{ productId: "", quantity: "", costPrice: "" }],
        supplier: "",
        notes: "",
      });
      await loadInventory();
    } catch (error) {
      console.error("Bulk stock error:", error);
      toast.error(error.message || "Failed to process bulk stock");
    } finally {
      setSubmitting(false);
    }
  };

  // Utility functions
  const getCategoryIcon = (category) => {
    const icons = {
      alcohol: <AlcoholIcon className="w-4 h-4 text-amber-300" />,
      wine: <WineIcon className="w-4 h-4 text-red-300" />,
      cocktail: <CocktailIcon className="w-4 h-4 text-blue-400" />,
      soft_drink: <DrinkIcon className="w-4 h-4 text-green-400" />,
      food: <FoodIcon className="w-4 h-4 text-black" />,
      dessert: <DessertIcon className="w-4 h-4 text-gray-800" />,
    };
    return icons[category] || <PackageIcon className="w-4 h-4" />;
  };

  const getStockStatus = (item) => {
    if (item.currentStock === 0)
      return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (item.currentStock <= item.reorderPoint)
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { status: "In Stock", color: "bg-green-100 text-green-800" };
  };

  // Modal Components
  const StockInModal = () => (
    <AnimatePresence>
      {showStockInModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black overflow-y-auto bg-opacity-50 flex items-center justify-center p-2 sm:p-3 md:p-4 z-50"
          onClick={() => setShowStockInModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add Stock</h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Add new stock to inventory
                </p>
              </div>
              <button
                onClick={() => setShowStockInModal(false)}
                className="p-1 sm:p-2 bg-gradient-to-b from-red-500 to-red-600 rounded-lg transition-colors"
                disabled={submitting}
              >
                <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <form onSubmit={handleStockInSubmit} className="p-4 sm:p-6 text-black space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  value={stockInForm.productId}
                  onChange={(e) =>
                    handleStockInChange("productId", e.target.value)
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={submitting}
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} ({product.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={stockInForm.quantity}
                  onChange={(e) =>
                    handleStockInChange("quantity", e.target.value)
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  step="1"
                  required
                  disabled={submitting}
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Cost Price (optional)
                </label>
                <input
                  type="number"
                  value={stockInForm.costPrice}
                  onChange={(e) =>
                    handleStockInChange("costPrice", e.target.value)
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  step="0.01"
                  min="0"
                  disabled={submitting}
                  placeholder="Enter cost price per unit"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Supplier (optional)
                </label>
                <input
                  type="text"
                  value={stockInForm.supplier}
                  onChange={(e) =>
                    handleStockInChange("supplier", e.target.value)
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={submitting}
                  placeholder="Supplier name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={stockInForm.notes}
                  onChange={(e) => handleStockInChange("notes", e.target.value)}
                  rows="2"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={submitting}
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowStockInModal(false)}
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border bg-gradient-to-b from-red-400 to-red-600 rounded-lg  transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gradient-to-l from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg"
                >
                  {submitting ? (
                    <>
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Add Stock</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const StockOutModal = () => (
    <AnimatePresence>
      {showStockOutModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-3 md:p-4 z-50"
          onClick={() => setShowStockOutModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg">
                  <MinusIcon className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Remove Stock
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Remove stock from inventory
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowStockOutModal(false)}
                className="p-1 sm:p-2 bg-gradient-to-l from-red-500 to-red-600 rounded-lg transition-colors"
                disabled={submitting}
              >
                <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <form onSubmit={handleStockOutSubmit} className="p-4 text-black sm:p-6 space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  value={stockOutForm.productId}
                  onChange={(e) =>
                    handleStockOutChange("productId", e.target.value)
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={submitting}
                >
                  <option value="">Select a product</option>
                  {inventory.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} ({product.sku}) - Stock:{" "}
                      {product.currentStock}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={stockOutForm.quantity}
                  onChange={(e) =>
                    handleStockOutChange("quantity", e.target.value)
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  step="1"
                  required
                  disabled={submitting}
                  placeholder="Enter quantity to remove"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Reason <span className="text-red-500">*</span>
                </label>
                <select
                  value={stockOutForm.reason}
                  onChange={(e) =>
                    handleStockOutChange("reason", e.target.value)
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={submitting}
                >
                  <option value="waste">Waste/Spoilage</option>
                  <option value="damage">Damage</option>
                  <option value="theft">Theft</option>
                  <option value="sample">Sample/Tasting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={stockOutForm.notes}
                  onChange={(e) =>
                    handleStockOutChange("notes", e.target.value)
                  }
                  rows="2"
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={submitting}
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowStockOutModal(false)}
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border bg-gradient-to-r from-red-300 to-red-400 rounded-lg transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gradient-to-l from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg"
                >
                  {submitting ? (
                    <>
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Removing...</span>
                    </>
                  ) : (
                    <>
                      <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Remove Stock</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const BulkStockModal = () => (
    <AnimatePresence>
      {showBulkModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-3 md:p-4 z-50"
          onClick={() => setShowBulkModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Bulk Stock In
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Add multiple products to inventory at once
                </p>
              </div>
              <button
                onClick={() => setShowBulkModal(false)}
                className="p-1 sm:p-2 bg-gradient-to-b from-red-500 to-red-700 rounded-lg transition-colors"
                disabled={submitting}
              >
                <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <form onSubmit={handleBulkSubmit} className="p-4 text-black sm:p-6 space-y-3 sm:space-y-4">
              {bulkForm.items.map((item, index) => (
                <div key={index} className="flex space-x-2 sm:space-x-3 items-start">
                  <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    <div className="xs:col-span-2 md:col-span-1">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Product <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={item.productId}
                        onChange={(e) =>
                          handleBulkItemChange(
                            index,
                            "productId",
                            e.target.value
                          )
                        }
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        disabled={submitting}
                      >
                        <option value="">Select product</option>
                        {products.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.name} ({product.sku})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleBulkItemChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                        step="1"
                        required
                        disabled={submitting}
                        placeholder="Quantity"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Cost Price
                      </label>
                      <input
                        type="number"
                        value={item.costPrice}
                        onChange={(e) =>
                          handleBulkItemChange(
                            index,
                            "costPrice",
                            e.target.value
                          )
                        }
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        step="0.01"
                        min="0"
                        disabled={submitting}
                        placeholder="Cost price"
                      />
                    </div>
                  </div>
                  {bulkForm.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBulkItem(index)}
                      className="mt-6 sm:mt-7 p-1.5 bg-gradient-to-r from-red-300 to-red-400 rounded-lg transition-colors disabled:opacity-50"
                      disabled={submitting}
                    >
                      <CloseIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addBulkItem}
                className="w-full py-2 text-xs sm:text-sm border-2 border-dashed bg-gradient-to-t from-blue-400 to-indigo-400 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-gray-600 disabled:opacity-50"
                disabled={submitting}
              >
                <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Add Another Product</span>
              </button>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Supplier
                  </label>
                  <input
                    type="text"
                    value={bulkForm.supplier}
                    onChange={(e) =>
                      setBulkForm((prev) => ({
                        ...prev,
                        supplier: e.target.value,
                      }))
                    }
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={submitting}
                    placeholder="Supplier name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Notes
                  </label>
                  <input
                    type="text"
                    value={bulkForm.notes}
                    onChange={(e) =>
                      setBulkForm((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={submitting}
                    placeholder="Additional notes"
                  />
                </div>
              </div>

              <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border bg-gradient-to-l from-red-300 to-red-400 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gradient-to-l from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg"
                >
                  {submitting ? (
                    <>
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Add Bulk Stock</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Low Stock Items Modal
  const LowStockModal = () => (
    <AnimatePresence>
      {showLowStockModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-3 md:p-4 z-50"
          onClick={() => setShowLowStockModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg">
                  <WarningIcon className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Low Stock Items
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Products that need restocking
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLowStockModal(false)}
                className="p-1 sm:p-2 bg-gradient-to-tr from-red-500 to-red-600 rounded-lg transition-colors"
              >
                <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reorder Point
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getLowStockItems().map((item, index) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 text-blue-600 rounded-lg flex items-center justify-center">
                              {getCategoryIcon(item.category)}
                            </div>
                            <div className="ml-2 sm:ml-4">
                              <div className="text-xs sm:text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.sku}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {item.currentStock} {item.unit}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {item.reorderPoint} {item.unit}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Low Stock
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                          <button
                            onClick={() => {
                              setStockInForm({
                                productId: item._id,
                                quantity: "",
                                costPrice: item.costPrice || "",
                                supplier: "",
                                notes: "",
                              });
                              setShowLowStockModal(false);
                              setShowStockInModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
                            title="Add Stock"
                          >
                            <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {getLowStockItems().length === 0 && (
                <div className="text-center py-6 sm:py-8">
                  <PackageIcon className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No low stock items
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    All products are well stocked.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Out of Stock Items Modal
  const OutOfStockModal = () => (
    <AnimatePresence>
      {showOutOfStockModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-3 md:p-4 z-50"
          onClick={() => setShowOutOfStockModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl mx-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg">
                  <CloseIcon className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Out of Stock Items
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Products that need immediate restocking
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOutOfStockModal(false)}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reorder Point
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getOutOfStockItems().map((item, index) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              {getCategoryIcon(item.category)}
                            </div>
                            <div className="ml-2 sm:ml-4">
                              <div className="text-xs sm:text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.sku}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          {item.currentStock} {item.unit}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {item.reorderPoint} {item.unit}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                          <button
                            onClick={() => {
                              setStockInForm({
                                productId: item._id,
                                quantity: "",
                                costPrice: item.costPrice || "",
                                supplier: "",
                                notes: "",
                              });
                              setShowOutOfStockModal(false);
                              setShowStockInModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
                            title="Add Stock"
                          >
                            <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {getOutOfStockItems().length === 0 && (
                <div className="text-center py-6 sm:py-8">
                  <PackageIcon className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No out of stock items
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    All products are in stock.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Main render
  return (
    <>
      <div className="min-h-screen mt-2 mb-1 rounded-2xl flex w-full bg-gradient-to-t from-gray-200 to-gray-300">
        <Sidebar />
        <div className="flex-1 w-full">
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

          {/* Header Section */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Inventory Management
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Manage your restaurant and bar inventory
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 lg:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowStockInModal(true)}
                    className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-l from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
                  >
                    <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Stock In
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowStockOutModal(true)}
                    className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-l from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg"
                  >
                    <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Stock Out
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowBulkModal(true)}
                    className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-l from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg"
                  >
                    <UploadIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Bulk Import
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={exportToPDF}
                    className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-l from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg"
                  >
                    <PdfIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Export PDF
                  </motion.button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="mt-4 sm:mt-6">
                <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
                  {["overview", "low-stock", "out-of-stock", "categories"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 sm:pb-4 px-1 border-b-2 font-medium text-xs sm:text-sm capitalize transition-colors whitespace-nowrap ${
                          activeTab === tab
                            ? "bg-gradient-to-bl from-blue-400 to-indigo-300"
                            : "border-transparent bg-gradient-to-r from-indigo-400 to-black"
                        }`}
                      >
                        {tab.replace("-", " ")}
                      </button>
                    )
                  )}
                </nav>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {/* Total Products Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveTab("overview")}
              >
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-gradient-to-l from-blue-500 to-blue-600 rounded-lg">
                    <PackageIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Total Products
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {stats.totalItems}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Low Stock Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowLowStockModal(true)}
              >
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-gradient-to-l from-yellow-500 to-yellow-600 rounded-lg">
                    <WarningIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Low Stock
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {stats.lowStock}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Out of Stock Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowOutOfStockModal(true)}
              >
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-gradient-to-l from-red-500 to-red-600 rounded-lg">
                    <CloseIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Out of Stock
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {stats.outOfStock}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Total Value Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
              >
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-gradient-to-l from-green-500 to-green-600 rounded-lg">
                    <TrendingUpIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Total Value
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      ${stats.totalValue.toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                {/* Search */}
                <div className="flex-1 text-black w-full">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex text-black flex-wrap gap-2 sm:gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {stats.categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() +
                          category.slice(1).replace("_", " ")}
                      </option>
                    ))}
                  </select>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={exportToPDF}
                    className="inline-flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gradient-to-l from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg"
                  >
                    <PdfIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Export PDF
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              ref={tableRef}
            >
              {loading ? (
                <div className="flex items-center justify-center py-8 sm:py-12">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Current Stock
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Reorder Point
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInventory.map((item, index) => {
                        const stockStatus = getStockStatus(item);
                        return (
                          <motion.tr
                            key={item._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                  {getCategoryIcon(item.category)}
                                </div>
                                <div className="ml-2 sm:ml-4">
                                  <div className="text-xs sm:text-sm font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {item.sku}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                {item.category.replace("_", " ")}
                              </span>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                              <div className="text-xs sm:text-sm text-gray-900">
                                {item.currentStock} {item.unit}
                              </div>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                              {item.reorderPoint} {item.unit}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}
                              >
                                {stockStatus.status}
                              </span>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              $
                              {(
                                (item.currentStock || 0) * (item.costPrice || 0)
                              ).toFixed(2)}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                              <div className="flex space-x-1 sm:space-x-2">
                                <button
                                  onClick={() => {
                                    setStockInForm({
                                      productId: item._id,
                                      quantity: "",
                                      costPrice: item.costPrice || "",
                                      supplier: "",
                                      notes: "",
                                    });
                                    setShowStockInModal(true);
                                  }}
                                  className="bg-gradient-to-b from-blue-500 to-indigo-400 transition-colors p-1 rounded"
                                  title="Add Stock"
                                >
                                  <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setStockOutForm({
                                      productId: item._id,
                                      quantity: "",
                                      reason: "waste",
                                      notes: "",
                                    });
                                    setShowStockOutModal(true);
                                  }}
                                  className="bg-gradient-to-r from-red-400 to-red-600 transition-colors p-1 rounded"
                                  title="Remove Stock"
                                >
                                  <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Empty State */}
            {!loading && filteredInventory.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <PackageIcon className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </motion.div>
            )}
          </div>

          {/* Modals */}
          <StockInModal />
          <StockOutModal />
          <BulkStockModal />
          <LowStockModal />
          <OutOfStockModal />
        </div>
      </div>
    </>
  );
};