/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  LocalBar,
  LocalCafe,
  WineBar,
  Restaurant,
  Category as CategoryIcon,
  Fastfood as FastfoodIcon,
  Liquor as LiquorIcon,
  Coffee as CoffeeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ChevronLeft,
  ChevronRight
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const ProductsManagement = () => {
  // Initial menu data structure
  const initialMenuData = {
    drinks: {
      title: "DRINKS",
      icon: <LocalBar className="mr-2" />,
      subCategories: {
        beers: {
          title: "Beers",
          subSubCategories: {
            blarirwa: {
              title: "Blarirwa Beers",
              items: [
                { id: 1, name: "BLARIRWA MÜTZIG", price: 2500, type: "bottle", image: "https://www.salonebly.com/storage/media/raiMDWMrAbE9v9VS7ZV1E39FmN8y6iEunedwZ3qm.jpeg" },
                { id: 2, name: "BLARIRWA PRIMUS KNOWLESS", price: 1500, type: "bottle", image: "https://igihe.com/IMG/arton38712.jpg?1374298636" },
                { id: 3, name: "BLARIRWA AMSTEL", price: 3000, type: "bottle", image: "https://rwandainspirer.com/wp-content/uploads/2018/02/amster.jpg" },
                { id: 4, name: "BLARIRWA TURBO KING", price: 2800, type: "bottle", image: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2025_05_19/b5394d87042763652aa512a79d39d299_c_1480350743_raw.jpg" },
                { id: 5, name: "BLARIRWA HEINEKEN", price: 3200, type: "bottle", image: "https://rwandamart.rw/wp-content/uploads/2022/01/HEINEKEN-Glass-33CL-CrateX24.jpg" },
              ]
            },
            skol: {
              title: "Skol Beers",
              items: [
                { id: 6, name: "SKOL LAGER", price: 2200, type: "bottle", image: "https://tuma250.com/wp-content/uploads/2021/06/Skol-Lager-33cl-600x600.webp" },
                { id: 7, name: "SKOL PREMIUM", price: 2800, type: "bottle", image: "https://goodpour.com/cdn/shop/files/skol-80-proof-vodka-200ML_1080x.png?v=1717459906" },
                { id: 8, name: "SKOL COOL", price: 2600, type: "bottle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3sB9UuaNbxyzkpVrIPnBigCfXK_GsiBjxA&s" },
                { id: 9, name: "SKOL STRONG", price: 3000, type: "bottle", image: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2025_08_26/35ca7d973d71fc7c4b67bdd9103f5bb9_c_1508605789_raw.jpg" }
              ]
            },
            other: {
              title: "Other Beers",
              items: [
                { id: 10, name: "GUINNESS", price: 3500, type: "bottle", image: "https://www.kroger.com/product/images/xlarge/front/0008382010401" },
                { id: 11, name: "STELLA ARTOIS", price: 3200, type: "bottle", image: "https://www.salonebly.com/storage/media/FgkabFpHLe3uHEW6ELFBZPSJXHjC0Hr2FBVWPQPf.jpeg" },
                { id: 12, name: "CORONA EXTRA", price: 3800, type: "bottle", image: "https://minuman.com/cdn/shop/files/151311961_269402274596353_5408357983262332808_n_ba3b3bd3-1da7-498e-9a2b-30d08900ab49_800x.jpg?v=1705039077" },
                { id: 13, name: "BUDWEISER", price: 3000, type: "bottle", image: "https://tamarindcalgary.ca/wp-content/uploads/2021/02/Budwieser.jpg" }
              ]
            }
          }
        },
        liquors: {
          title: "Liquors & Spirits",
          items: [
            { id: 14, name: "BLACK LABEL", price: 100000, type: "bottle", image: "https://media.liquormax.com/eq4rxnkvcouvc1anfqqhe/088110011406.jpg" },
            { id: 15, name: "JACK DANIEL", price: 90000, type: "bottle", image: "https://images-svetnapojov-cdn.rshop.sk/gallery-big/products/0f3f4d696d6b90d59649b7c1b5617a10.png" },
            { id: 16, name: "CHIVAS", price: 100000, type: "bottle", image: "https://images.squarespace-cdn.com/content/v1/644f9d1d4925e04e12ba122a/1705956371538-GONODXVC4PQDE2VFRFE8/Chivas.png" },
            { id: 17, name: "DOUBLE BLACK", price: 125000, type: "bottle", image: "https://boozeone.ph/cdn/shop/files/3_d68988b8-9676-4f53-a07c-996cec6b7390.png?v=1686849118&width=3840" },
            { id: 18, name: "ABK6", price: 100000, type: "bottle", image: "https://www.wine-searcher.com/images/labels/66/39/10976639.jpg" },
            { id: 19, name: "COURVOISIER", price: 200000, type: "bottle", image: "https://cdn11.bigcommerce.com/s-kkxmb/images/stencil/1280x1280/products/3556/13224/1637657378924544767__33874.1707273103.jpg?c=2&imbypass=on" },
            { id: 20, name: "MARTELL VS", price: 100000, type: "bottle", image: "https://shreeramkenya.com/wp-content/uploads/2021/06/IMG_8399-scaled.jpg" },
            { id: 21, name: "MARTELL VS.O.P", price: 200000, type: "bottle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ-SQVzi1k5cpANOzMV_ZsJ50-4UwWABC6Ew&s" },
            { id: 22, name: "REMY MARTIN", price: 40000, type: "bottle", image: "https://5pmsomewhereja.com/cdn/shop/products/RemyMartinVSOP-3.jpg?v=1670522280&width=1445" },
            { id: 23, name: "HENESSY VS", price: 200000, type: "bottle", image: "https://ginfling.nl/pub/media/catalog/product/cache/8981f8e3f39dfdcfb5ae82d173e66caa/h/e/hennessy_vs_cognac_perfect_serve.jpg" },
            { id: 24, name: "HENESSY VSOP", price: 250000, type: "bottle", image: "https://empirewine.imgix.net/item-uuid/5036-230E1121.jpeg?auto=compress&fm=jpg&fit=max&fill-color=FFFFFF&pad=20&h=600&w=600" },
            { id: 25, name: "UNITED GIN", price: 2500, type: "bottle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYEohFswrqVkpE_8dXoNHO26ltdZNerX_wIg&s" },
            { id: 26, name: "KONYAGI", price: 15000, type: "bottle", image: "https://images.onebasket.rw/insecure/fit/1000/1000/ce/0/plain/https://onebasket-assets.s3.af-south-1.amazonaws.com/58bec9/prods/SOpk2D5uOlrPqoXf4iOyIk7BPxxRFNh3CjCjFxtD.png@webp" },
            { id: 27, name: "CAPTAIN MORGAN", price: 75000, type: "bottle", image: "https://images-svetnapojov-cdn.rshop.sk/gallery-big/products/4761ab086ea93e4bb2b4309242a6c95e.png" },
            { id: 28, name: "VODKA", price: 80000, type: "bottle", image: "https://cdn.tasteatlas.com/images/ingredients/6165666c50444ad6bf431e5a6ec396c8.jpg?w=600" },
            { id: 29, name: "WHITE RUM", price: 70000, type: "bottle", image: "https://capecornwallrum.com/cdn/shop/files/White_70cl_01_1024x1024.jpg?v=1706186193" },
            { id: 30, name: "TEQUILA", price: 85000, type: "bottle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ299VDiNWPeOiYEWq4-g_ezXOeuE5PnzN3bw&s" },
            { id: 31, name: "BAILEYS", price: 95000, type: "bottle", image: "https://images.ctfassets.net/p1wk6poseifr/lvStu0H80957bU9VWepYw/cb8c72410a7a2b27a7b51269b494026a/Bailey_Chocolate_Martini.jpg" }
          ]
        },
        wines: {
          title: "Wines",
          items: [
            { id: 32, name: "RED WINE - MERLOT", price: 25000, type: "bottle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiE_wWVKrMqIE_gc0ZWndIt9yuqi5xAZefIQ&s" },
            { id: 33, name: "RED WINE - CABERNET", price: 28000, type: "bottle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzfB-E-SR8iXAvLewfj-NMjurcc7oqLSIrUw&s" },
            { id: 34, name: "WHITE WINE - CHARDONNAY", price: 22000, type: "bottle", image: "https://vinobucks.de/shop/images/product_images/original_images/3915.jpg" },
            { id: 35, name: "WHITE WINE - SAUVIGNON", price: 24000, type: "bottle", image: "https://spectus.com.cy/wp-content/uploads/2025/01/Hubert-Brochard-IGP-Sauvignon-Blanc.jpg" },
            { id: 36, name: "ROSE WINE", price: 20000, type: "bottle", image: "https://grandeurwines.com/cdn/shop/products/grandeur-wines-rose-2022-AE3A8999_2048x.jpg?v=1672957019" },
            { id: 37, name: "SPARKLING WINE", price: 35000, type: "bottle", image: "https://images.giftpro.co.uk/product-image/1200/1cd6f344-a527-4417-8c2c-2a3656f762ed.jpg" },
            { id: 38, name: "DESSERT WINE", price: 30000, type: "bottle", image: "https://grape-to-glass.com/wp-content/uploads/2020/05/Dessert-Wine-Banner-01-1568x816.jpg" },
            { id: 39, name: "FORTIFIED WINE", price: 32000, type: "bottle", image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Madeira_Wine.jpg" }
          ]
        },
        soft: {
          title: "Soft Drinks",
          items: [
            { id: 40, name: "ENERGY DRINK", price: 1000, type: "bottle", image: "https://comores-en-ligne.fr/_next/image?url=https%3A%2F%2Fwww.comores-en-ligne.fr%2Fmedia%2Fimages%2Fproducts%2F2024%2F10%2Fboire1.png&w=1920&q=75" },
            { id: 41, name: "BOTTLE WATER", price: 1500, type: "bottle", image: "https://isokko.com/m/media/upload/photos/2024/07/free_sawacitife45caa7dfaa65172efd83d634b6f7281722008280.jpg" },
            { id: 42, name: "S WATER", price: 1000, type: "bottle", image: "https://hafiexpo.com/uploads/images/202506/img_683deb1d5a2529-67397665.png" },
            { id: 43, name: "BOTTLE JUICE", price: 1500, type: "bottle", image: "https://unblast.com/wp-content/uploads/2018/06/Juice-Bottle-Mockup-with-Fruit.jpg" },
            { id: 44, name: "PANACHE", price: 1000, type: "bottle", image: "https://assets.untappd.com/photo/2017_06_28/0dd72b53b21059c29a099ecb5a7b65c1_320x320.jpeg" },
            { id: 45, name: "FANTA", price: 1300, type: "bottle", image: "https://m.media-amazon.com/images/I/71Cd1SW1pVL._SL1500_.jpg" },
            { id: 46, name: "S FANTA", price: 1000, type: "bottle", image: "https://rwandamart.rw/wp-content/uploads/2021/06/FantaOrange-0001.jpg" },
            { id: 47, name: "COCA COLA", price: 1300, type: "bottle", image: "https://www.coca-cola.com/content/dam/onexp/us/en/brands/coca-cola-spiced/coke-product-category-card.png" },
            { id: 48, name: "SPRITE", price: 1300, type: "bottle", image: "https://t3.ftcdn.net/jpg/02/86/26/86/360_F_286268644_FJxZ9RW8bXWWiaZgKajwnwEZ61ynkfOp.jpg" },
            { id: 49, name: "ORANGE JUICE", price: 2000, type: "bottle", image: "https://healthmylifestyle.com/wp-content/uploads/2023/01/Fresh-squeezed-orange-juice-featured-500x500.jpg" },
            { id: 50, name: "APPLE JUICE", price: 2000, type: "bottle", image: "https://images.albertsons-media.com/is/image/ABS/120020370-C1N1?$ng-ecom-pdp-desktop$&defaultImage=Not_Available" },
            { id: 51, name: "PINEAPPLE JUICE", price: 2000, type: "bottle", image: "https://www.harney.com/cdn/shop/files/Harney_Sons_Pineapple_Juice_Mood.jpg?v=1731079555&width=1110" }
          ]
        }
      }
    },
    coffee: {
      title: "COFFEE",
      icon: <LocalCafe className="mr-2" />,
      items: [
        { id: 52, name: "LOMANO", price: 2000, type: "single", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNNc4qZ41PL9F2CQ1zQve8fqh5zbqKQ7WTWQ&s" },
        { id: 53, name: "LUNGO", price: 1500, type: "single", image: "https://www.wakacoffee.com/cdn/shop/articles/what-is-lungo-espresso-coffee.jpg?v=1593313291" },
        { id: 54, name: "RESTROTO", price: 1000, type: "single", image: "https://blogstudio.s3.theshoppad.net/coffeeheroau/10897ed60052f2aa1a495aa1c02a8ce6.jpg" },
        { id: 55, name: "AMERICANO", price: 2000, type: "single", image: "https://www.spoton.com/blog/content/images/2024/04/espresso-shot-coffee-1.jpeg" },
        { id: 56, name: "DOUBLE ESPRESSO", price: 2000, type: "single", image: "https://brot.ae/cdn/shop/files/double-espresso-side-view-Photoroom_450x450.jpg?v=1745579487" },
        { id: 57, name: "SINGLE ESPRESSO", price: 1500, type: "single", image: "https://www.cabuccoffee.com/site/sized/104609/2023/09/trk-kahvesi-2-kopya-1200x9000.webp" },
        { id: 58, name: "CAPPUCCINO", price: 2500, type: "single", image: "https://vinbarista.com/uploads/news/cappuccino-la-gi-cach-lam-1-ly-cafe-cappuccino-chuan-vi-y-202212231043.png" },
        { id: 59, name: "LATTE", price: 2500, type: "single", image: "https://abeautifulmess.com/wp-content/uploads/2023/05/latte-500x500.jpg" },
        { id: 60, name: "MACCHIATO", price: 2200, type: "single", image: "https://www.tankcoffee.com/wp-content/uploads/2023/07/A_close-up_shot_of_a_classic_Italian_macchiato.png" },
      ]
    },
    cocktail: {
      title: "COCKTAIL",
      icon: <WineBar className="mr-2" />,
      items: [
        { id: 68, name: "VIRGIN MOJITO", description: "SPRITE, MINT & LEMON", price: 8000, type: "single", image: "https://www.pastrywishes.com/wp-content/uploads/2022/06/virgin-mojito-with-sprite-square.jpg" },
        { id: 69, name: "CREATE YOUR SPECIAL COCKTAIL", description: "Customize your own cocktail", price: 12000, type: "custom", image: "https://media.istockphoto.com/id/690259246/photo/bartender-guy-working-prepare-cocktail-skills.jpg?s=612x612&w=0&k=20&c=8RCiLB2D8owWIHZWuMJG1Rr0yl5nJNdpA4pb57eyR6k=" },
        { id: 70, name: "VODKA SUNRISE", description: "VODKA, ORANGE JUICE & GRENADINE", price: 10000, type: "single", image: "https://www.tammileetips.com/wp-content/uploads/2023/05/Vodka-Sunrise-Recipe.jpg" },
        { id: 71, name: "JAGER BOMBER SHOT", description: "JAGER MASTER & RED BULL", price: 8000, type: "single", image: "https://assets3.thrillist.com/v1/image/2625598/1200x630" },
        { id: 72, name: "ADIOS MOTHER F", description: "GIN, WHITE RUM, VODKA, TEQUILA & BLUE CURCAQ", price: 15000, type: "single", image: "https://britneybreaksbread.com/wp-content/uploads/2022/07/amf-drink-6.jpg" },
      ]
    },
    food: {
      title: "FOOD",
      icon: <Restaurant className="mr-2" />,
      items: [
        { id: 83, name: "WINGS OF CHICKEN", price: 5000, type: "single", image: "https://chickenairfryerrecipes.com/wp-content/uploads/2023/08/Air-Fryer-Whole-Chicken-Wing-9.jpg" },
        { id: 84, name: "BRUCHETTE", price: 2500, type: "single", image: "https://www.favfamilyrecipes.com/wp-content/uploads/2024/11/Oven-Roast-Beef-sliced.jpg" },
        { id: 85, name: "URUKWAVU ", price: 10000, type: "single", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkcFG9XCFPY8xdI9pKcDjYWDc70-9qc1jejQ&s" },
        { id: 86, name: "IGITI", price: 2500, type: "single", image: "https://www.kigalitoday.com/IMG/jpg/igiti_1-8.jpg" },
      ]
    }
  };

  const [menuData, setMenuData] = useState(initialMenuData);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubCategories, setExpandedSubCategories] = useState({});

  // Enhanced Stat Card Component
  const StatCard = ({ title, value, icon, color }) => {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      yellow: "from-yellow-500 to-yellow-600",
      red: "from-red-500 to-red-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              {title}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {value}
            </p>
          </div>
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0 ml-4`}
          >
            <span className="text-lg sm:text-2xl text-white">{icon}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Get all products for statistics and filtering
  const getAllProducts = () => {
    const products = [];
    
    Object.values(menuData).forEach(category => {
      if (category.items) {
        products.push(...category.items);
      }
      if (category.subCategories) {
        Object.values(category.subCategories).forEach(subCategory => {
          if (subCategory.items) {
            products.push(...subCategory.items);
          }
          if (subCategory.subSubCategories) {
            Object.values(subCategory.subSubCategories).forEach(subSubCategory => {
              if (subSubCategory.items) {
                products.push(...subSubCategory.items);
              }
            });
          }
        });
      }
    });
    
    return products;
  };

  // Enhanced Product Modal Component
  const ProductModal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    initialData,
  }) => {
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      price: "",
      type: "bottle",
      image: "",
      category: "drinks",
      subCategory: "",
      subSubCategory: ""
    });

    React.useEffect(() => {
      if (initialData) {
        setFormData({
          ...initialData,
          price: initialData.price.toString(),
          category: initialData.category || "drinks",
          subCategory: initialData.subCategory || "",
          subSubCategory: initialData.subSubCategory || ""
        });
      } else {
        setFormData({
          name: "",
          description: "",
          price: "",
          type: "bottle",
          image: "",
          category: "drinks",
          subCategory: "",
          subSubCategory: ""
        });
      }
    }, [initialData, isOpen]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const productData = {
        ...formData,
        price: parseInt(formData.price),
        id: initialData ? initialData.id : Date.now()
      };
      onSubmit(productData);
    };

    const getCategoryOptions = () => {
      return Object.entries(menuData).map(([key, category]) => ({
        value: key,
        label: category.title
      }));
    };

    const getSubCategoryOptions = () => {
      if (!formData.category || !menuData[formData.category]?.subCategories) return [];
      return Object.entries(menuData[formData.category].subCategories).map(([key, subCategory]) => ({
        value: key,
        label: subCategory.title
      }));
    };

    const getSubSubCategoryOptions = () => {
      if (!formData.subCategory || !menuData[formData.category]?.subCategories?.[formData.subCategory]?.subSubCategories) return [];
      return Object.entries(menuData[formData.category].subCategories[formData.subCategory].subSubCategories).map(([key, subSubCategory]) => ({
        value: key,
        label: subSubCategory.title
      }));
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[95vh] overflow-y-auto m-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <CloseIcon className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 text-black overflow-y-auto">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Product Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter product description"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter price"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Type *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="bottle">Bottle</option>
                        <option value="single">Single</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {getCategoryOptions().map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {getSubCategoryOptions().length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                          Sub Category
                        </label>
                        <select
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Select Sub Category</option>
                          {getSubCategoryOptions().map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {getSubSubCategoryOptions().length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                          Sub Sub Category
                        </label>
                        <select
                          name="subSubCategory"
                          value={formData.subSubCategory}
                          onChange={handleInputChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Select Sub Sub Category</option>
                          {getSubSubCategoryOptions().map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image Preview
                      </label>
                      <div className="flex items-center space-x-4">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-300 dark:border-gray-600"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        <div className="hidden text-red-500 text-sm">
                          Unable to load image. Please check the URL.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
                  >
                    {initialData ? "Update Product" : "Create Product"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Filter products based on search and filters
  const filteredProducts = getAllProducts().filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    const matchesType =
      filterType === "all" || product.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, filterType]);

  const handleCreateProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now()
    };

    setMenuData(prev => {
      const newData = { ...prev };
      
      if (productData.subSubCategory && productData.subCategory) {
        // Add to sub-sub-category
        newData[productData.category].subCategories[productData.subCategory]
          .subSubCategories[productData.subSubCategory].items.push(newProduct);
      } else if (productData.subCategory) {
        // Add to sub-category
        newData[productData.category].subCategories[productData.subCategory].items.push(newProduct);
      } else {
        // Add to main category
        newData[productData.category].items.push(newProduct);
      }
      
      return newData;
    });

    toast.success(`Product "${productData.name}" created successfully!`);
    setIsCreateModalOpen(false);
  };

  const handleEditProduct = (productData) => {
    // First remove the product from its current location
    setMenuData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
      
      // Function to remove product by ID
      const removeProduct = (data, productId) => {
        Object.keys(data).forEach(categoryKey => {
          const category = data[categoryKey];
          
          // Check main category items
          if (category.items) {
            category.items = category.items.filter(item => item.id !== productId);
          }
          
          // Check sub-categories
          if (category.subCategories) {
            Object.keys(category.subCategories).forEach(subKey => {
              const subCategory = category.subCategories[subKey];
              
              if (subCategory.items) {
                subCategory.items = subCategory.items.filter(item => item.id !== productId);
              }
              
              // Check sub-sub-categories
              if (subCategory.subSubCategories) {
                Object.keys(subCategory.subSubCategories).forEach(subSubKey => {
                  const subSubCategory = subCategory.subSubCategories[subSubKey];
                  
                  if (subSubCategory.items) {
                    subSubCategory.items = subSubCategory.items.filter(item => item.id !== productId);
                  }
                });
              }
            });
          }
        });
      };
      
      removeProduct(newData, productData.id);
      
      // Add product to new location
      if (productData.subSubCategory && productData.subCategory) {
        newData[productData.category].subCategories[productData.subCategory]
          .subSubCategories[productData.subSubCategory].items.push(productData);
      } else if (productData.subCategory) {
        newData[productData.category].subCategories[productData.subCategory].items.push(productData);
      } else {
        newData[productData.category].items.push(productData);
      }
      
      return newData;
    });

    toast.success(`Product "${productData.name}" updated successfully!`);
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      setMenuData(prev => {
        const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
        
        const removeProduct = (data, id) => {
          Object.keys(data).forEach(categoryKey => {
            const category = data[categoryKey];
            
            if (category.items) {
              category.items = category.items.filter(item => item.id !== id);
            }
            
            if (category.subCategories) {
              Object.keys(category.subCategories).forEach(subKey => {
                const subCategory = category.subCategories[subKey];
                
                if (subCategory.items) {
                  subCategory.items = subCategory.items.filter(item => item.id !== id);
                }
                
                if (subCategory.subSubCategories) {
                  Object.keys(subCategory.subSubCategories).forEach(subSubKey => {
                    const subSubCategory = subCategory.subSubCategories[subSubKey];
                    
                    if (subSubCategory.items) {
                      subSubCategory.items = subSubCategory.items.filter(item => item.id !== id);
                    }
                  });
                }
              });
            }
          });
        };
        
        removeProduct(newData, productId);
        return newData;
      });
      
      toast.success(`Product "${productName}" deleted successfully!`);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const toggleSubCategory = (subCategoryKey) => {
    setExpandedSubCategories(prev => ({
      ...prev,
      [subCategoryKey]: !prev[subCategoryKey]
    }));
  };

  // Calculate statistics
  const totalProducts = getAllProducts().length;
  const totalValue = getAllProducts().reduce((sum, product) => sum + product.price, 0);
  const averagePrice = totalProducts > 0 ? (totalValue / totalProducts).toFixed(0) : 0;

  // Enhanced Pagination Controls
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
        className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mt-6 sm:mt-8"
      >
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {indexOfFirstProduct + 1}-
          {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <ChevronLeft fontSize="small" />
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg border transition-colors text-sm ${
                currentPage === number
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <ChevronRight fontSize="small" />
          </button>
        </div>
      </motion.div>
    );
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF'
    }).format(price);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
        <ToastContainer />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Product Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
                Manage your menu products and categories
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-sm sm:text-base w-full lg:w-auto"
            >
              <AddIcon className="text-lg" />
              <span>Add New Product</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={<FastfoodIcon />}
            color="blue"
          />
          <StatCard
            title="Total Value"
            value={formatPrice(totalValue)}
            icon="💰"
            color="green"
          />
          <StatCard
            title="Average Price"
            value={formatPrice(averagePrice)}
            icon="📊"
            color="yellow"
          />
          <StatCard
            title="Categories"
            value={Object.keys(menuData).length}
            icon={<CategoryIcon />}
            color="purple"
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-full sm:max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap gap-2">
              <FilterIcon className="text-gray-400 hidden sm:block" />
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[120px]"
              >
                <option value="all">All Categories</option>
                {Object.entries(menuData).map(([key, category]) => (
                  <option key={key} value={key}>{category.title}</option>
                ))}
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 sm:px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[120px]"
              >
                <option value="all">All Types</option>
                <option value="bottle">Bottle</option>
                <option value="single">Single</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Tree - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Menu Structure
              </h3>
              
              <div className="space-y-2">
                {Object.entries(menuData).map(([categoryKey, category]) => (
                  <div key={categoryKey} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleCategory(categoryKey)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          {category.icon}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {category.title}
                        </span>
                      </div>
                      {expandedCategories[categoryKey] ? 
                        <ExpandLessIcon className="text-gray-400" /> : 
                        <ExpandMoreIcon className="text-gray-400" />
                      }
                    </button>
                    
                    <AnimatePresence>
                      {expandedCategories[categoryKey] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 pr-2 pb-2"
                        >
                          {category.subCategories && Object.entries(category.subCategories).map(([subKey, subCategory]) => (
                            <div key={subKey} className="mt-2 border-l-2 border-gray-200 dark:border-gray-600 pl-3">
                              <button
                                onClick={() => toggleSubCategory(subKey)}
                                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                              >
                                <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                                  {subCategory.title}
                                </span>
                                {subCategory.subSubCategories && (
                                  expandedSubCategories[subKey] ? 
                                    <ExpandLessIcon className="text-gray-400 text-sm" /> : 
                                    <ExpandMoreIcon className="text-gray-400 text-sm" />
                                )}
                              </button>
                              
                              {subCategory.subSubCategories && expandedSubCategories[subKey] && (
                                <div className="pl-3 mt-1 space-y-1">
                                  {Object.entries(subCategory.subSubCategories).map(([subSubKey, subSubCategory]) => (
                                    <div key={subSubKey} className="p-2 text-sm text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-500 pl-2">
                                      {subSubCategory.title}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          
                          {category.items && (
                            <div className="mt-2 pl-3 text-sm text-gray-500 dark:text-gray-400">
                              {category.items.length} direct items
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid - Right Content */}
          <div className="lg:col-span-2">
            {/* Results Count */}
            <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <AnimatePresence>
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative h-32 sm:h-40 bg-gray-200 dark:bg-gray-700">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden absolute inset-0 items-center justify-center bg-gray-300 dark:bg-gray-600">
                        <FastfoodIcon className="text-gray-400 text-4xl" />
                      </div>
                      
                      {/* Type Badge */}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.type === 'bottle' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          product.type === 'single' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                          {product.type}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base flex-1 pr-2">
                          {product.name}
                        </h3>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      
                      {product.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span>ID: {product.id}</span>
                        <span>{product.category}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openEditModal(product)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <EditIcon fontSize="small" />
                          <span>Edit</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="flex items-center justify-center bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <DeleteIcon fontSize="small" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🍽️</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                  {searchTerm || filterCategory !== "all" || filterType !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by adding your first product"}
                </p>
                {!searchTerm && filterCategory === "all" && filterType === "all" && (
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
                  >
                    Add Your First Product
                  </button>
                )}
              </motion.div>
            )}

            {/* Pagination Controls */}
            <PaginationControls />
          </div>
        </div>

        {/* Modals */}
        <ProductModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProduct}
          title="Create New Product"
        />

        <ProductModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleEditProduct}
          title="Edit Product"
          initialData={editingProduct}
        />
      </div>
    </div>
  );
};