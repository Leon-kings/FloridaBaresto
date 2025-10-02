/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LocalBar,
  LocalCafe,
  Restaurant,
  WineBar,
  ShoppingCart,
  Close,
  Add,
  Remove,
  ArrowBack,
  ArrowForward,
  Person,
  Phone,
  LocationOn,
  Menu as MenuIcon,
  Image as ImageIcon,
  Payment,
  Smartphone,
  Info,
  Receipt,
} from "@mui/icons-material";

export const Products = () => {
  const [activeCategory, setActiveCategory] = useState("drinks");
  const [activeSubCategory, setActiveSubCategory] = useState("beers");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCustomerInfoOpen, setIsCustomerInfoOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isOrderInfoModalOpen, setIsOrderInfoModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    location: "onsite",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const itemsPerPage = 12;

  // Enhanced Menu Data with Images
  const menuData = {
    drinks: {
      title: "DRINKS",
      icon: <LocalBar className="mr-2" />,
      subCategories: {
        beers: {
          title: "BEER",
          subSubCategories: {
            blarirwa: {
              title: "BLARIRWA",
              items: [
                {
                  id: 1,
                  name: "BLARIRWA MÜTZIG",
                  price: 2500,
                  type: "bottle",
                  image:
                    "https://www.salonebly.com/storage/media/raiMDWMrAbE9v9VS7ZV1E39FmN8y6iEunedwZ3qm.jpeg",
                },
                {
                  id: 2,
                  name: "BLARIRWA PRIMUS KNOWLESS",
                  price: 1500,
                  type: "bottle",
                  image: "https://igihe.com/IMG/arton38712.jpg?1374298636",
                },
                {
                  id: 3,
                  name: "BLARIRWA AMSTEL",
                  price: 3000,
                  type: "bottle",
                  image:
                    "https://rwandainspirer.com/wp-content/uploads/2018/02/amster.jpg",
                },
                {
                  id: 4,
                  name: "BLARIRWA TURBO KING",
                  price: 2800,
                  type: "bottle",
                  image:
                    "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2025_05_19/b5394d87042763652aa512a79d39d299_c_1480350743_raw.jpg",
                },
                {
                  id: 5,
                  name: "BLARIRWA HEINEKEN",
                  price: 3200,
                  type: "bottle",
                  image:
                    "https://rwandamart.rw/wp-content/uploads/2022/01/HEINEKEN-Glass-33CL-CrateX24.jpg",
                },
              ],
            },
            skol: {
              title: "SKOL",
              items: [
                {
                  id: 6,
                  name: "SKOL LAGER",
                  price: 2200,
                  type: "bottle",
                  image:
                    "https://tuma250.com/wp-content/uploads/2021/06/Skol-Lager-33cl-600x600.webp",
                },
                {
                  id: 7,
                  name: "SKOL PREMIUM",
                  price: 2800,
                  type: "bottle",
                  image:
                    "https://goodpour.com/cdn/shop/files/skol-80-proof-vodka-200ML_1080x.png?v=1717459906",
                },
                {
                  id: 8,
                  name: "SKOL COOL",
                  price: 2600,
                  type: "bottle",
                  image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3sB9UuaNbxyzkpVrIPnBigCfXK_GsiBjxA&s",
                },
                {
                  id: 9,
                  name: "SKOL STRONG",
                  price: 3000,
                  type: "bottle",
                  image:
                    "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2025_08_26/35ca7d973d71fc7c4b67bdd9103f5bb9_c_1508605789_raw.jpg",
                },
              ],
            },
            other: {
              title: "OTHERS",
              items: [
                {
                  id: 10,
                  name: "GUINNESS",
                  price: 3500,
                  type: "bottle",
                  image:
                    "https://www.kroger.com/product/images/xlarge/front/0008382010401",
                },
                {
                  id: 11,
                  name: "STELLA ARTOIS",
                  price: 3200,
                  type: "bottle",
                  image:
                    "https://www.salonebly.com/storage/media/FgkabFpHLe3uHEW6ELFBZPSJXHjC0Hr2FBVWPQPf.jpeg",
                },
                {
                  id: 12,
                  name: "CORONA EXTRA",
                  price: 3800,
                  type: "bottle",
                  image:
                    "https://minuman.com/cdn/shop/files/151311961_269402274596353_5408357983262332808_n_ba3b3bd3-1da7-498e-9a2b-30d08900ab49_800x.jpg?v=1705039077",
                },
                {
                  id: 13,
                  name: "BUDWEISER",
                  price: 3000,
                  type: "bottle",
                  image:
                    "https://tamarindcalgary.ca/wp-content/uploads/2021/02/Budwieser.jpg",
                },
              ],
            },
          },
        },
        liquors: {
          title: "LIQUOR",
          items: [
            {
              id: 14,
              name: "BLACK LABEL",
              price: 100000,
              type: "bottle",
              image:
                "https://media.liquormax.com/eq4rxnkvcouvc1anfqqhe/088110011406.jpg",
            },
            {
              id: 15,
              name: "JACK DANIEL",
              price: 90000,
              type: "bottle",
              image:
                "https://images-svetnapojov-cdn.rshop.sk/gallery-big/products/0f3f4d696d6b90d59649b7c1b5617a10.png",
            },
            {
              id: 16,
              name: "CHIVAS",
              price: 100000,
              type: "bottle",
              image:
                "https://images.squarespace-cdn.com/content/v1/644f9d1d4925e04e12ba122a/1705956371538-GONODXVC4PQDE2VFRFE8/Chivas.png",
            },
            {
              id: 17,
              name: "DOUBLE BLACK",
              price: 125000,
              type: "bottle",
              image:
                "https://boozeone.ph/cdn/shop/files/3_d68988b8-9676-4f53-a07c-996cec6b7390.png?v=1686849118&width=3840",
            },
            {
              id: 18,
              name: "ABK6",
              price: 100000,
              type: "bottle",
              image:
                "https://www.wine-searcher.com/images/labels/66/39/10976639.jpg",
            },
            {
              id: 19,
              name: "COURVOISIER",
              price: 200000,
              type: "bottle",
              image:
                "https://cdn11.bigcommerce.com/s-kkxmb/images/stencil/1280x1280/products/3556/13224/1637657378924544767__33874.1707273103.jpg?c=2&imbypass=on",
            },
            {
              id: 20,
              name: "MARTELL VS",
              price: 100000,
              type: "bottle",
              image:
                "https://shreeramkenya.com/wp-content/uploads/2021/06/IMG_8399-scaled.jpg",
            },
            {
              id: 21,
              name: "MARTELL VS.O.P",
              price: 200000,
              type: "bottle",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ-SQVzi1k5cpANOzMV_ZsJ50-4UwWABC6Ew&s",
            },
            {
              id: 22,
              name: "REMY MARTIN",
              price: 40000,
              type: "bottle",
              image:
                "https://5pmsomewhereja.com/cdn/shop/products/RemyMartinVSOP-3.jpg?v=1670522280&width=1445",
            },
            {
              id: 23,
              name: "HENESSY VS",
              price: 200000,
              type: "bottle",
              image:
                "https://ginfling.nl/pub/media/catalog/product/cache/8981f8e3f39dfdcfb5ae82d173e66caa/h/e/hennessy_vs_cognac_perfect_serve.jpg",
            },
            {
              id: 24,
              name: "HENESSY VSOP",
              price: 250000,
              type: "bottle",
              image:
                "https://empirewine.imgix.net/item-uuid/5036-230E1121.jpeg?auto=compress&fm=jpg&fit=max&fill-color=FFFFFF&pad=20&h=600&w=600",
            },
            {
              id: 25,
              name: "UNITED GIN",
              price: 2500,
              type: "bottle",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYEohFswrqVkpE_8dXoNHO26ltdZNerX_wIg&s",
            },
            {
              id: 26,
              name: "KONYAGI",
              price: 15000,
              type: "bottle",
              image:
                "https://images.onebasket.rw/insecure/fit/1000/1000/ce/0/plain/https://onebasket-assets.s3.af-south-1.amazonaws.com/58bec9/prods/SOpk2D5uOlrPqoXf4iOyIk7BPxxRFNh3CjCjFxtD.png@webp",
            },
            {
              id: 27,
              name: "CAPTAIN MORGAN",
              price: 75000,
              type: "bottle",
              image:
                "https://images-svetnapojov-cdn.rshop.sk/gallery-big/products/4761ab086ea93e4bb2b4309242a6c95e.png",
            },
            {
              id: 28,
              name: "VODKA",
              price: 80000,
              type: "bottle",
              image:
                "https://cdn.tasteatlas.com/images/ingredients/6165666c50444ad6bf431e5a6ec396c8.jpg?w=600",
            },
            {
              id: 29,
              name: "WHITE RUM",
              price: 70000,
              type: "bottle",
              image:
                "https://capecornwallrum.com/cdn/shop/files/White_70cl_01_1024x1024.jpg?v=1706186193",
            },
            {
              id: 30,
              name: "TEQUILA",
              price: 85000,
              type: "bottle",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ299VDiNWPeOiYEWq4-g_ezXOeuE5PnzN3bw&s",
            },
            {
              id: 31,
              name: "BAILEYS",
              price: 95000,
              type: "bottle",
              image:
                "https://images.ctfassets.net/p1wk6poseifr/lvStu0H80957bU9VWepYw/cb8c72410a7a2b27a7b51269b494026a/Bailey_Chocolate_Martini.jpg",
            },
          ],
        },
        wines: {
          title: "WINE",
          items: [
            {
              id: 32,
              name: "RED WINE - MERLOT",
              price: 25000,
              type: "bottle",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiE_wWVKrMqIE_gc0ZWndIt9yuqi5xAZefIQ&s",
            },
            {
              id: 33,
              name: "RED WINE - CABERNET",
              price: 28000,
              type: "bottle",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzfB-E-SR8iXAvLewfj-NMjurcc7oqLSIrUw&s",
            },
            {
              id: 34,
              name: "WHITE WINE - CHARDONNAY",
              price: 22000,
              type: "bottle",
              image:
                "https://vinobucks.de/shop/images/product_images/original_images/3915.jpg",
            },
            {
              id: 35,
              name: "WHITE WINE - SAUVIGNON",
              price: 24000,
              type: "bottle",
              image:
                "https://spectus.com.cy/wp-content/uploads/2025/01/Hubert-Brochard-IGP-Sauvignon-Blanc.jpg",
            },
            {
              id: 36,
              name: "ROSE WINE",
              price: 20000,
              type: "bottle",
              image:
                "https://grandeurwines.com/cdn/shop/products/grandeur-wines-rose-2022-AE3A8999_2048x.jpg?v=1672957019",
            },
            {
              id: 37,
              name: "SPARKLING WINE",
              price: 35000,
              type: "bottle",
              image:
                "https://images.giftpro.co.uk/product-image/1200/1cd6f344-a527-4417-8c2c-2a3656f762ed.jpg",
            },
            {
              id: 38,
              name: "DESSERT WINE",
              price: 30000,
              type: "bottle",
              image:
                "https://grape-to-glass.com/wp-content/uploads/2020/05/Dessert-Wine-Banner-01-1568x816.jpg",
            },
            {
              id: 39,
              name: "FORTIFIED WINE",
              price: 32000,
              type: "bottle",
              image:
                "https://upload.wikimedia.org/wikipedia/commons/a/aa/Madeira_Wine.jpg",
            },
          ],
        },
        soft: {
          title: "SOFT",
          items: [
            {
              id: 40,
              name: "ENERGY DRINK",
              price: 1000,
              type: "bottle",
              image:
                "https://comores-en-ligne.fr/_next/image?url=https%3A%2F%2Fwww.comores-en-ligne.fr%2Fmedia%2Fimages%2Fproducts%2F2024%2F10%2Fboire1.png&w=1920&q=75",
            },
            {
              id: 41,
              name: "BOTTLE WATER",
              price: 1500,
              type: "bottle",
              image:
                "https://isokko.com/m/media/upload/photos/2024/07/free_sawacitife45caa7dfaa65172efd83d634b6f7281722008280.jpg",
            },
            {
              id: 42,
              name: "S WATER",
              price: 1000,
              type: "bottle",
              image:
                "https://hafiexpo.com/uploads/images/202506/img_683deb1d5a2529-67397665.png",
            },
            {
              id: 43,
              name: "BOTTLE JUICE",
              price: 1500,
              type: "bottle",
              image:
                "https://unblast.com/wp-content/uploads/2018/06/Juice-Bottle-Mockup-with-Fruit.jpg",
            },
            {
              id: 44,
              name: "PANACHE",
              price: 1000,
              type: "bottle",
              image:
                "https://assets.untappd.com/photo/2017_06_28/0dd72b53b21059c29a099ecb5a7b65c1_320x320.jpeg",
            },
            {
              id: 45,
              name: "FANTA",
              price: 1300,
              type: "bottle",
              image:
                "https://m.media-amazon.com/images/I/71Cd1SW1pVL._SL1500_.jpg",
            },
            {
              id: 46,
              name: "S FANTA",
              price: 1000,
              type: "bottle",
              image:
                "https://rwandamart.rw/wp-content/uploads/2021/06/FantaOrange-0001.jpg",
            },
            {
              id: 47,
              name: "COCA COLA",
              price: 1300,
              type: "bottle",
              image:
                "https://www.coca-cola.com/content/dam/onexp/us/en/brands/coca-cola-spiced/coke-product-category-card.png",
            },
            {
              id: 48,
              name: "SPRITE",
              price: 1300,
              type: "bottle",
              image:
                "https://t3.ftcdn.net/jpg/02/86/26/86/360_F_286268644_FJxZ9RW8bXWWiaZgKajwnwEZ61ynkfOp.jpg",
            },
            {
              id: 49,
              name: "ORANGE JUICE",
              price: 2000,
              type: "bottle",
              image:
                "https://healthmylifestyle.com/wp-content/uploads/2023/01/Fresh-squeezed-orange-juice-featured-500x500.jpg",
            },
            {
              id: 50,
              name: "APPLE JUICE",
              price: 2000,
              type: "bottle",
              image:
                "https://images.albertsons-media.com/is/image/ABS/120020370-C1N1?$ng-ecom-pdp-desktop$&defaultImage=Not_Available",
            },
            {
              id: 51,
              name: "PINEAPPLE JUICE",
              price: 2000,
              type: "bottle",
              image:
                "https://www.harney.com/cdn/shop/files/Harney_Sons_Pineapple_Juice_Mood.jpg?v=1731079555&width=1110",
            },
          ],
        },
      },
    },
    coffee: {
      title: "COFFEE",
      icon: <LocalCafe className="mr-2" />,
      items: [
        {
          id: 52,
          name: "LOMANO",
          price: 2000,
          type: "single",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNNc4qZ41PL9F2CQ1zQve8fqh5zbqKQ7WTWQ&s",
        },
        {
          id: 53,
          name: "LUNGO",
          price: 1500,
          type: "single",
          image:
            "https://www.wakacoffee.com/cdn/shop/articles/what-is-lungo-espresso-coffee.jpg?v=1593313291",
        },
        {
          id: 54,
          name: "RESTROTO",
          price: 1000,
          type: "single",
          image:
            "https://blogstudio.s3.theshoppad.net/coffeeheroau/10897ed60052f2aa1a495aa1c02a8ce6.jpg",
        },
        {
          id: 55,
          name: "AMERICANO",
          price: 2000,
          type: "single",
          image:
            "https://www.spoton.com/blog/content/images/2024/04/espresso-shot-coffee-1.jpeg",
        },
        {
          id: 56,
          name: "DOUBLE ESPRESSO",
          price: 2000,
          type: "single",
          image:
            "https://brot.ae/cdn/shop/files/double-espresso-side-view-Photoroom_450x450.jpg?v=1745579487",
        },
        {
          id: 57,
          name: "SINGLE ESPRESSO",
          price: 1500,
          type: "single",
          image:
            "https://www.cabuccoffee.com/site/sized/104609/2023/09/trk-kahvesi-2-kopya-1200x9000.webp",
        },
        {
          id: 58,
          name: "CAPPUCCINO",
          price: 2500,
          type: "single",
          image:
            "https://vinbarista.com/uploads/news/cappuccino-la-gi-cach-lam-1-ly-cafe-cappuccino-chuan-vi-y-202212231043.png",
        },
        {
          id: 59,
          name: "LATTE",
          price: 2500,
          type: "single",
          image:
            "https://abeautifulmess.com/wp-content/uploads/2023/05/latte-500x500.jpg",
        },
        {
          id: 60,
          name: "MACCHIATO",
          price: 2200,
          type: "single",
          image:
            "https://www.tankcoffee.com/wp-content/uploads/2023/07/A_close-up_shot_of_a_classic_Italian_macchiato.png",
        },
      ],
    },
    cocktail: {
      title: "COCKTAIL",
      icon: <WineBar className="mr-2" />,
      items: [
        {
          id: 68,
          name: "VIRGIN MOJITO",
          description: "SPRITE, MINT & LEMON",
          price: 8000,
          type: "single",
          image:
            "https://www.pastrywishes.com/wp-content/uploads/2022/06/virgin-mojito-with-sprite-square.jpg",
        },
        {
          id: 69,
          name: "CREATE YOUR SPECIAL COCKTAIL",
          description: "Customize your own cocktail",
          price: 12000,
          type: "custom",
          image:
            "https://media.istockphoto.com/id/690259246/photo/bartender-guy-working-prepare-cocktail-skills.jpg?s=612x612&w=0&k=20&c=8RCiLB2D8owWIHZWuMJG1Rr0yl5nJNdpA4pb57eyR6k=",
        },
        {
          id: 70,
          name: "VODKA SUNRISE",
          description: "VODKA, ORANGE JUICE & GRENADINE",
          price: 10000,
          type: "single",
          image:
            "https://www.tammileetips.com/wp-content/uploads/2023/05/Vodka-Sunrise-Recipe.jpg",
        },
        {
          id: 71,
          name: "JAGER BOMBER SHOT",
          description: "JAGER MASTER & RED BULL",
          price: 8000,
          type: "single",
          image: "https://assets3.thrillist.com/v1/image/2625598/1200x630",
        },
        {
          id: 72,
          name: "ADIOS MOTHER F",
          description: "GIN, WHITE RUM, VODKA, TEQUILA & BLUE CURCAQ",
          price: 15000,
          type: "single",
          image:
            "https://britneybreaksbread.com/wp-content/uploads/2022/07/amf-drink-6.jpg",
        },
        {
          id: 73,
          name: "TEQUILA SUNRISE",
          description: "TEQUILA, ORANGE JUICE & GRENADINE",
          price: 10000,
          type: "single",
          image:
            "https://www.liquor.com/thmb/oWq-2scokVB56sgAYk3ksulN33Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tequila-sunrise-1500x785-twitter-a6d1393909b843598a682808f94d3065.jpg",
        },
        {
          id: 74,
          name: "MARGARITA",
          description: "TEQUILA, TRIPLE SEC & LIME JUICE",
          price: 12000,
          type: "single",
          image:
            "https://filodeagave.com/wp-content/uploads/2024/05/Classic-Margarita-Recipe-with-Tequila-Filo-de-Agave-Blanco-v002.jpg",
        },
        {
          id: 75,
          name: "PINA COLADA",
          description: "RUM, COCONUT CREAM & PINEAPPLE JUICE",
          price: 13000,
          type: "single",
          image:
            "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2024-07-pina-colada%2Fpina-colada-177",
        },
        {
          id: 76,
          name: "BLUE LAGOON",
          description: "VODKA, BLUE CURACAO & LEMONADE",
          price: 11000,
          type: "single",
          image:
            "https://frobishers.com/cdn/shop/articles/Screenshot_2024-08-16_at_12.55.17.png?v=1724236070",
        },
        {
          id: 77,
          name: "SEX ON THE BEACH",
          description: "VODKA, PEACH SCHNAPPS & JUICES",
          price: 12500,
          type: "single",
          image:
            "https://hips.hearstapps.com/hmg-prod/images/sex-on-the-beach-index-6442f7c402c66.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
        },
        {
          id: 78,
          name: "MOJITO",
          description: "RUM, MINT, LIME & SODA",
          price: 9000,
          type: "single",
          image:
            "https://assets.malibudrinks.com/wp-content/uploads/2024/02/Malibu-Mojito-16x9-2-scaled.jpg?tr=q-80,w-2560",
        },
        {
          id: 79,
          name: "WHISKEY SOUR",
          description: "WHISKEY, LEMON JUICE & SUGAR",
          price: 11000,
          type: "single",
          image:
            "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2024-03-whiskey-sour%2Fwhiskey-sour-699_1",
        },
        {
          id: 80,
          name: "LONG ISLAND ICED TEA",
          description: "VODKA, RUM, GIN, TEQUILA & COLA",
          price: 16000,
          type: "single",
          image:
            "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/4/25/0/CCWM_Long-Island-Ice-Tea_s3x4.jpg.rend.hgtvcom.1280.960.suffix/1572356786983.webp",
        },
        {
          id: 81,
          name: "DAIQUIRI",
          description: "RUM, LIME JUICE & SUGAR",
          price: 9500,
          type: "single",
          image:
            "https://www.thebottleclub.com/cdn/shop/articles/TBC_recipe_image_11-436716.jpg?v=1707230647",
        },
        {
          id: 82,
          name: "MANHATTAN",
          description: "WHISKEY, SWEET VERMOUTH & BITTERS",
          price: 14000,
          type: "single",
          image:
            "https://cdn.loveandlemons.com/wp-content/uploads/2025/02/manhattan-drink.jpg",
        },
      ],
    },
    food: {
      title: "FOOD",
      icon: <Restaurant className="mr-2" />,
      items: [
        {
          id: 83,
          name: "WINGS OF CHICKEN",
          price: 5000,
          type: "single",
          image:
            "https://chickenairfryerrecipes.com/wp-content/uploads/2023/08/Air-Fryer-Whole-Chicken-Wing-9.jpg",
        },
        {
          id: 84,
          name: "BRUCHETTE",
          price: 2500,
          type: "single",
          image:
            "https://www.favfamilyrecipes.com/wp-content/uploads/2024/11/Oven-Roast-Beef-sliced.jpg",
        },
        {
          id: 85,
          name: "URUKWAVU ",
          price: 10000,
          type: "single",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkcFG9XCFPY8xdI9pKcDjYWDc70-9qc1jejQ&s",
        },
        {
          id: 86,
          name: "IGITI",
          price: 2500,
          type: "single",
          image: "https://www.kigalitoday.com/IMG/jpg/igiti_1-8.jpg",
        },
        {
          id: 87,
          name: "UMUSHISHIRO",
          price: 2000,
          type: "single",
          image:
            "https://www.newtimes.co.rw/uploads/imported_images/files/main/articles/2013/05/04/1367702494brochettes.jpg",
        },
        {
          id: 88,
          name: "BANANA MILK SHAKE",
          price: 5000,
          type: "single",
          image:
            "https://foodtasia.com/wp-content/uploads/2021/07/banana-milkshake-34.jpg",
        },
        {
          id: 89,
          name: "CARAMEL MILK SHAKE",
          price: 5000,
          type: "single",
          image:
            "https://amandascookin.com/wp-content/uploads/2021/06/salted-caramel-milkshake-RC-SQ.jpg",
        },
        {
          id: 90,
          name: "BUTTER SCOTCH",
          price: 5000,
          type: "single",
          image:
            "https://bakewithshivesh.com/wp-content/uploads/2021/07/image-scaled.jpg",
        },
        {
          id: 91,
          name: "CHOCOLATE MILK SHAKE",
          price: 5000,
          type: "single",
          image:
            "https://brooklynfarmgirl.com/wp-content/uploads/2021/03/The-Best-Chocolate-Milkshake-Featured-Image.jpg",
        },
        {
          id: 92,
          name: "STRAWBERRY MILK SHAKE",
          price: 5000,
          type: "single",
          image:
            "https://minimalistbaker.com/wp-content/uploads/2022/04/Strawberry-Milkshake-SQUARE.jpg",
        },
        {
          id: 93,
          name: "VANILLA MILK SHAKE",
          price: 5000,
          type: "single",
          image:
            "https://www.allrecipes.com/thmb/uzxCGTc-5WCUZnZ7BUcYcmWKxjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-48974-vanilla-milkshake-hero-4x3-c815295c714f41f6b17b104e7403a53b.jpg",
        },
        {
          id: 94,
          name: "GRILLED CHICKEN",
          price: 8000,
          type: "single",
          image:
            "https://www.spiceindiaonline.com/wp-content/uploads/2021/05/Tandoori-Chicken-20-500x400.jpg",
        },
        {
          id: 95,
          name: "GOAT MEAT PLATE",
          price: 12000,
          type: "single",
          image:
            "https://i.ytimg.com/vi/Z5om96jjvjA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD9KAclM5STZq1Tsm7TnpZOHXDEJQ",
        },
        {
          id: 96,
          name: "FISH PLATE",
          price: 15000,
          type: "single",
          image:
            "https://thumbs.dreamstime.com/b/grilled-fish-plate-freshly-caught-fish-served-sliced-tomatoes-lemons-perfect-casual-dining-scene-388256090.jpg",
        },
        {
          id: 97,
          name: "BEEF BURGER",
          price: 6000,
          type: "single",
          image:
            "https://www.unileverfoodsolutions.co.za/dam/global-ufs/mcos/SOUTH-AFRICA/calcmenu/recipes/ZA-recipes/general/beef-burger/main-header.jpg",
        },
        {
          id: 98,
          name: "CHICKEN BURGER",
          price: 5500,
          type: "single",
          image:
            "https://www.datocms-assets.com/129288/1725393944-moist-chicken-burgers.jpg",
        },
        {
          id: 99,
          name: "FRENCH FRIES",
          price: 3000,
          type: "single",
          image:
            "https://www.awesomecuisine.com/wp-content/uploads/2009/05/french-fries.jpg",
        },
        {
          id: 100,
          name: "ONION RINGS",
          price: 3500,
          type: "single",
          image:
            "https://smokinandgrillinwitab.com/wp-content/uploads/2025/02/iStock-2188707691-scaled.jpg",
        },
      ],
    },
  };

  // State for beer sub-subcategories
  const [activeBeerSubCategory, setActiveBeerSubCategory] =
    useState("blarirwa");

  // Get current items based on category and pagination
  const getCurrentItems = () => {
    let items = [];

    if (activeCategory === "drinks") {
      if (activeSubCategory === "beers") {
        items =
          menuData.drinks.subCategories.beers.subSubCategories[
            activeBeerSubCategory
          ].items;
      } else {
        items = menuData.drinks.subCategories[activeSubCategory].items;
      }
    } else {
      items = menuData[activeCategory].items;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const totalPages = () => {
    let items = [];

    if (activeCategory === "drinks") {
      if (activeSubCategory === "beers") {
        items =
          menuData.drinks.subCategories.beers.subSubCategories[
            activeBeerSubCategory
          ].items;
      } else {
        items = menuData.drinks.subCategories[activeSubCategory].items;
      }
    } else {
      items = menuData[activeCategory].items;
    }

    return Math.ceil(items.length / itemsPerPage);
  };

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setQuantity(item.type === "bottle" ? 1 : 1);
    setIsCartOpen(true);
  };

  const confirmAddToCart = () => {
    const totalPrice = selectedItem.price * quantity;
    const cartItem = {
      id: `${selectedItem.id}-${Date.now()}`,
      name: selectedItem.name,
      price: selectedItem.price,
      totalPrice: totalPrice,
      quantity: quantity,
      description: selectedItem.description,
      type: selectedItem.type,
      image: selectedItem.image,
    };

    setCart([...cart, cartItem]);
    setIsCartOpen(false);
    setSelectedItem(null);

    toast.success(`${quantity} ${selectedItem.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
    toast.info("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setIsConfirmOpen(true);
    }, 300);
  };

  const confirmOrder = () => {
    setIsConfirmOpen(false);
    setTimeout(() => {
      setIsCustomerInfoOpen(true);
    }, 300);
  };

  const submitOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast.error("Please fill in name and phone number", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setCheckoutStatus("loading");
      setIsCustomerInfoOpen(false);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful order
      const success = Math.random() > 0.2;

      if (success) {
        setCheckoutStatus("success");
        toast.success("Order placed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        // Close loading modal and open order info modal
        setTimeout(() => {
          setCheckoutStatus(null);
          setIsOrderInfoModalOpen(true);
        }, 1000);
        
      } else {
        setCheckoutStatus("error");
        toast.error("Failed to place order. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      setCheckoutStatus("error");
      toast.error("Network error. Please check your connection.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const proceedToPayment = () => {
    setIsOrderInfoModalOpen(false);
    setTimeout(() => {
      setIsPaymentModalOpen(true);
    }, 300);
  };

  const completePayment = () => {
    setIsPaymentModalOpen(false);
    
    // Reset everything after payment completion
    setTimeout(() => {
      setCart([]);
      setCustomerInfo({
        name: "",
        phone: "",
        location: "onsite",
      });
      setCheckoutStatus(null);
      
      toast.success("Payment completed! Your order is being processed.", {
        position: "top-right",
        autoClose: 4000,
      });
    }, 500);
  };

  const formatPrice = (price) => {
    return price.toLocaleString();
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory, activeBeerSubCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setIsMobileMenuOpen(false);
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  return (
    <>
      <div className="w-full flex-wrap min-h-screen items-center mt-2 mb-1 mx-0 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-gray-700 justify-center items- to-gray-800 bg-opacity-90 top-0 z-50 "
        >
          <div className="py-3 md:justify-center md:items-center px-2 sm:py-4">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden mr-2 xs:mr-3 p-1 xs:p-2 rounded-lg bg-gradient-to-t from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 shadow-lg transition-all"
                >
                  <MenuIcon className="text-sm xs:text-base" />
                </button>
                <div>
                  <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-amber-400">
                    VISTA BAR & RESTO
                  </h1>
                  <p className="text-gray-400 text-xs xs:text-sm">
                    Premium Dining Experience
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-gradient-to-t from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 p-1 xs:p-2 sm:p-3 rounded-full transition-all shadow-lg hover:shadow-amber-500/25"
              >
                <ShoppingCart className="text-base xs:text-lg sm:text-xl" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-t from-red-500 to-red-600 text-white rounded-full w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-xs flex items-center justify-center shadow-lg">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden bg-gray-800 rounded-lg p-3 xs:p-4 mb-3 xs:mb-4"
                >
                  <div className="grid grid-cols-2 gap-2 xs:gap-3">
                    {Object.keys(menuData).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-2 xs:px-3 py-2 rounded-lg text-xs xs:text-sm transition-all shadow-lg ${
                          activeCategory === category
                            ? "bg-gradient-to-t from-amber-600 to-amber-700 text-white"
                            : "bg-gradient-to-t from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          {React.cloneElement(menuData[category].icon, {
                            className: "text-xs xs:text-sm mr-1 xs:mr-2",
                          })}
                          <span className="ml-1">
                            {menuData[category].title}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Category Navigation */}
            <div className="hidden lg:block justify-center items-center overflow-x-auto">
              <div className="flex justify-center space-x-1 pb-2 w-full">
                {Object.keys(menuData).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 xs:px-4 py-2 xs:py-3 rounded-lg whitespace-nowrap transition-all shadow-lg ${
                      activeCategory === category
                        ? "bg-gradient-to-t from-amber-600 to-amber-700 text-white"
                        : "bg-gradient-to-t from-gray-800 to-gray-900 text-gray-300 hover:from-gray-700 hover:to-gray-800"
                    }`}
                  >
                    <div className="flex items-center">
                      {menuData[category].icon}
                      <span className="ml-1 xs:ml-2 text-sm xs:text-base">
                        {menuData[category].title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategory for Drinks */}
            {activeCategory === "drinks" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2"
              >
                <div className="flex space-x-1 justify-center xs:space-x-2 overflow-x-auto pb-2">
                  {Object.keys(menuData.drinks.subCategories).map(
                    (subCategory) => (
                      <button
                        key={subCategory}
                        onClick={() => setActiveSubCategory(subCategory)}
                        className={`px-2 xs:px-3 py-1 xs:py-2 rounded-lg text-xs xs:text-sm whitespace-nowrap transition-all shadow-lg ${
                          activeSubCategory === subCategory
                            ? "bg-gradient-to-t from-amber-500 to-amber-600 text-white"
                            : "bg-gradient-to-t from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700"
                        }`}
                      >
                        {menuData.drinks.subCategories[subCategory].title}
                      </button>
                    )
                  )}
                </div>

                {/* Beer Sub-Subcategories */}
                {activeSubCategory === "beers" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2"
                  >
                    <div className="flex space-x-1 xs:space-x-2 overflow-x-auto pb-2">
                      {Object.keys(
                        menuData.drinks.subCategories.beers.subSubCategories
                      ).map((beerSubCategory) => (
                        <button
                          key={beerSubCategory}
                          onClick={() =>
                            setActiveBeerSubCategory(beerSubCategory)
                          }
                          className={`px-2 xs:px-3 py-1 xs:py-2 rounded-lg text-xs whitespace-nowrap transition-all shadow-lg ${
                            activeBeerSubCategory === beerSubCategory
                              ? "bg-gradient-to-t from-amber-400 to-amber-500 text-white"
                              : "bg-gradient-to-t from-gray-600 to-gray-700 text-gray-300 hover:from-gray-500 hover:to-gray-600"
                          }`}
                        >
                          {
                            menuData.drinks.subCategories.beers
                              .subSubCategories[beerSubCategory].title
                          }
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* Main Content */}
        <main className=" px-2 xs:px-3 sm:px-4 py-4 xs:py-6 sm:py-8">
          {/* Category Header */}
          <motion.div
            key={`${activeCategory}-${activeSubCategory}-${activeBeerSubCategory}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 xs:mb-6 sm:mb-8"
          >
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4">
              <div className="flex items-center">
                {menuData[activeCategory].icon}
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-amber-400">
                  {activeCategory === "drinks"
                    ? activeSubCategory === "beers"
                      ? menuData.drinks.subCategories.beers.subSubCategories[
                          activeBeerSubCategory
                        ].title
                      : menuData.drinks.subCategories[activeSubCategory].title
                    : menuData[activeCategory].title}
                </h2>
              </div>

              {/* Pagination */}
              {totalPages() > 1 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="p-1 xs:p-2 rounded-lg bg-gradient-to-t from-gray-700 to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-600 hover:to-gray-700 shadow-lg transition-all"
                  >
                    <ArrowBack className="text-sm xs:text-base" />
                  </button>
                  <span className="text-xs xs:text-sm text-gray-300">
                    Page {currentPage} of {totalPages()}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages(), prev + 1))
                    }
                    disabled={currentPage === totalPages()}
                    className="p-1 xs:p-2 rounded-lg bg-gradient-to-t from-gray-700 to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-600 hover:to-gray-700 shadow-lg transition-all"
                  >
                    <ArrowForward className="text-sm xs:text-base" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Menu Items Grid */}
          <motion.div
            key={`${activeCategory}-${activeSubCategory}-${activeBeerSubCategory}-${currentPage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2 xs:gap-3 sm:gap-4"
          >
            {getCurrentItems().map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg xs:rounded-xl p-2 xs:p-3 sm:p-4 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border border-gray-700 hover:border-amber-500 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-amber-500/10 group"
                onClick={() => handleAddToCart(item)}
              >
                {/* Item Image */}
                <div className="relative h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 mb-2 xs:mb-3 rounded-lg overflow-hidden bg-gray-700">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-1 xs:top-2 right-1 xs:right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ImageIcon className="text-white text-xs xs:text-sm" />
                  </div>
                </div>

                <h3
                  className={`text-sm xs:text-base sm:text-lg font-bold mb-1 xs:mb-2 ${
                    item.type === "custom" ? "text-amber-300" : "text-white"
                  }`}
                >
                  {item.name}
                </h3>

                {item.description && (
                  <p className="text-gray-400 text-xs xs:text-sm mb-2 xs:mb-3 italic line-clamp-2">
                    {item.description}
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-bold text-xs xs:text-sm sm:text-lg">
                    {formatPrice(item.price)}
                  </span>
                  <button className="bg-gradient-to-t from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 p-1 xs:p-2 rounded-full transition-all shadow-lg hover:shadow-amber-500/25">
                    <Add className="text-xs xs:text-sm sm:text-base" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {getCurrentItems().length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 xs:py-12"
            >
              <p className="text-gray-400 text-base xs:text-lg sm:text-xl">
                No items found in this category
              </p>
            </motion.div>
          )}
        </main>

        {/* Add to Cart Modal */}
        <AnimatePresence>
          {isCartOpen && selectedItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4"
                onClick={() => setIsCartOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto border border-gray-700 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-3 xs:mb-4">
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-amber-400">
                      Add to Cart
                    </h3>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-400 hover:text-white bg-gradient-to-t from-red-700 to-red-800 p-1 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all"
                    >
                      <Close className="text-sm xs:text-base" />
                    </button>
                  </div>

                  <div className="relative h-36 xs:h-40 sm:h-48 mb-3 xs:mb-4 rounded-lg xs:rounded-xl overflow-hidden bg-gray-700">
                    <img
                      src={selectedItem.image}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-2 xs:left-3 sm:left-4">
                      <h4 className="text-lg xs:text-xl font-bold text-white">
                        {selectedItem.name}
                      </h4>
                      {selectedItem.description && (
                        <p className="text-gray-300 text-xs xs:text-sm">
                          {selectedItem.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 xs:mb-6">
                    <p className="text-amber-400 font-bold text-base xs:text-lg sm:text-xl mb-3 xs:mb-4 text-center">
                      Price: {formatPrice(selectedItem.price)}
                    </p>

                    <div className="flex items-center justify-between mb-3 xs:mb-4">
                      <span className="text-gray-300 text-xs xs:text-sm sm:text-base">
                        Quantity:
                      </span>
                      <div className="flex items-center space-x-2 xs:space-x-3">
                        <button
                          onClick={() =>
                            setQuantity((prev) => Math.max(1, prev - 1))
                          }
                          className="bg-gradient-to-t from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 p-1 xs:p-2 sm:p-3 rounded-full shadow-lg transition-all"
                        >
                          <Remove className="text-xs xs:text-sm" />
                        </button>
                        <span className="text-base xs:text-lg sm:text-xl font-bold w-6 xs:w-8 text-center bg-gradient-to-t from-amber-600 to-amber-700 rounded-lg py-1 text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((prev) => prev + 1)}
                          className="bg-gradient-to-t from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 p-1 xs:p-2 sm:p-3 rounded-full shadow-lg transition-all"
                        >
                          <Add className="text-xs xs:text-sm" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-3 xs:pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm xs:text-base sm:text-lg font-semibold">
                          Total:
                        </span>
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-amber-400">
                          {formatPrice(selectedItem.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 xs:space-x-3">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 bg-gradient-to-t from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 py-2 xs:py-3 rounded-lg font-semibold text-xs xs:text-sm sm:text-base transition-all shadow-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAddToCart}
                      className="flex-1 bg-gradient-to-t from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 py-2 xs:py-3 rounded-lg font-semibold text-xs xs:text-sm sm:text-base transition-all shadow-lg hover:shadow-amber-500/25"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Order Confirmation Modal */}
        <AnimatePresence>
          {isConfirmOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4"
                onClick={() => setIsConfirmOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto border border-gray-700 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-3 xs:mb-4">
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-amber-400">
                      Confirm Order
                    </h3>
                    <button
                      onClick={() => setIsConfirmOpen(false)}
                      className="text-gray-400 hover:text-white bg-gradient-to-t from-gray-700 to-gray-800 p-1 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all"
                    >
                      <Close className="text-sm xs:text-base" />
                    </button>
                  </div>

                  <div className="mb-4 xs:mb-6">
                    <h4 className="text-sm xs:text-base sm:text-lg font-semibold mb-3 xs:mb-4">
                      Order Summary
                    </h4>
                    <div className="space-y-2 xs:space-y-3 max-h-32 xs:max-h-48 sm:max-h-60 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center bg-gradient-to-r from-gray-700 to-gray-800 p-2 xs:p-3 rounded-lg border border-gray-600"
                        >
                          <div className="flex items-center space-x-2 xs:space-x-3 flex-1">
                            <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg overflow-hidden bg-gray-600 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-xs xs:text-sm sm:text-base">
                                {item.name}
                              </p>
                              <p className="text-xs xs:text-sm text-gray-400">
                                {item.quantity} x {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                          <p className="text-amber-400 font-bold text-xs xs:text-sm sm:text-base">
                            {formatPrice(item.totalPrice)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-700 mt-3 xs:mt-4 pt-3 xs:pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-base xs:text-lg sm:text-xl font-bold">
                          Total Amount:
                        </span>
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-amber-400">
                          {formatPrice(getTotalPrice())}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 xs:space-x-3">
                    <button
                      onClick={() => setIsConfirmOpen(false)}
                      className="flex-1 bg-gradient-to-t from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 py-2 xs:py-3 rounded-lg font-semibold text-xs xs:text-sm sm:text-base transition-all shadow-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmOrder}
                      className="flex-1 bg-gradient-to-t from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 py-2 xs:py-3 rounded-lg font-semibold text-xs xs:text-sm sm:text-base transition-all shadow-lg hover:shadow-amber-500/25"
                    >
                      Confirm Order
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Customer Information Modal */}
        <AnimatePresence>
          {isCustomerInfoOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4"
                onClick={() => setIsCustomerInfoOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto border border-gray-700 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4 xs:mb-6">
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-amber-400">
                      Customer Information
                    </h3>
                    <button
                      onClick={() => setIsCustomerInfoOpen(false)}
                      className="text-gray-400 hover:text-white bg-gradient-to-t from-red-700 to-red-800 p-1 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all"
                    >
                      <Close className="text-sm xs:text-base" />
                    </button>
                  </div>

                  <div className="space-y-3 xs:space-y-4 text-black mb-4 xs:mb-6">
                    <div>
                      <label className="flex items-center text-gray-300 text-xs xs:text-sm sm:text-base mb-1 xs:mb-2">
                        <Person className="mr-1 xs:mr-2 text-xs xs:text-sm" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-gradient-to-t from-gray-700 to-gray-800 border border-gray-600 rounded-lg px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 text-white focus:outline-none focus:border-amber-500 text-xs xs:text-sm sm:text-base transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-gray-300 text-xs xs:text-sm sm:text-base mb-1 xs:mb-2">
                        <Phone className="mr-1 xs:mr-2 text-xs xs:text-sm" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full bg-gradient-to-t from-gray-700 to-gray-800 border border-gray-600 rounded-lg px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 text-white focus:outline-none focus:border-amber-500 text-xs xs:text-sm sm:text-base transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-gray-300 text-xs xs:text-sm sm:text-base mb-1 xs:mb-2">
                        <LocationOn className="mr-1 xs:mr-2 text-xs xs:text-sm" />
                        Location
                      </label>
                      <select
                        value={customerInfo.location}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            location: e.target.value,
                          })
                        }
                        className="w-full bg-gradient-to-t from-gray-700 to-gray-800 border border-gray-600 rounded-lg px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3 text-white focus:outline-none focus:border-amber-500 text-xs xs:text-sm sm:text-base transition-all"
                      >
                        <option value="onsite">Onsite</option>
                        <option value="delivery">Delivery</option>
                        <option value="takeaway">Takeaway</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-3 xs:pt-4 mb-4 xs:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm xs:text-base sm:text-lg font-bold">
                        Total Amount:
                      </span>
                      <span className="text-base xs:text-lg sm:text-xl font-bold text-amber-400">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={submitOrder}
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 py-2 xs:py-3 rounded-lg font-bold text-xs xs:text-sm sm:text-base transition-all shadow-lg hover:shadow-amber-500/25"
                  >
                    Submit Order
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Order Information Modal */}
        <AnimatePresence>
          {isOrderInfoModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black overflow-y-auto bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4"
                onClick={() => setIsOrderInfoModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 mt-8 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto border border-gray-700 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4 xs:mb-6">
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-amber-400 flex items-center">
                      <Info className="mr-2 text-amber-400" />
                      Order Information
                    </h3>
                    <button
                      onClick={() => setIsOrderInfoModalOpen(false)}
                      className="text-gray-400 hover:text-white bg-gradient-to-t from-red-700 to-red-800 p-1 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all"
                    >
                      <Close className="text-sm xs:text-base" />
                    </button>
                  </div>

                  <div className="text-center mb-4 xs:mb-6">
                    <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-t from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                      <Receipt className="text-white text-xl xs:text-2xl" />
                    </div>
                    <h4 className="text-lg xs:text-xl font-bold text-white mb-2">
                      Order Confirmed!
                    </h4>
                    <p className="text-gray-300 text-xs xs:text-sm mb-4 xs:mb-6">
                      Your order has been received and is being processed
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg xs:rounded-xl p-3 xs:p-4 mb-4 xs:mb-6 border border-gray-600">
                    <h5 className="text-amber-300 font-bold text-xs xs:text-sm mb-2 xs:mb-3 flex items-center">
                      <Person className="mr-2 text-xs xs:text-sm" />
                      Customer Details
                    </h5>
                    <div className="space-y-2 text-white text-xs xs:text-sm">
                      <p><strong>Name:</strong> {customerInfo.name}</p>
                      <p><strong>Phone:</strong> {customerInfo.phone}</p>
                      <p><strong>Location:</strong> {customerInfo.location}</p>
                      <p><strong>Order Total:</strong> {formatPrice(getTotalPrice())} RWF</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-lg xs:rounded-xl p-3 xs:p-4 mb-4 xs:mb-6 border border-amber-600">
                    <h5 className="text-amber-300 font-bold text-xs xs:text-sm mb-2 xs:mb-3">
                      Order Summary
                    </h5>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-white text-xs xs:text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>{formatPrice(item.totalPrice)} RWF</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-amber-500 mt-2 pt-2 flex justify-between text-white text-xs xs:text-sm font-bold">
                      <span>Total:</span>
                      <span>{formatPrice(getTotalPrice())} RWF</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg xs:rounded-xl p-3 xs:p-4 mb-4 xs:mb-6 border border-blue-600">
                    <h5 className="text-blue-300 font-bold text-xs xs:text-sm mb-2 xs:mb-3">
                      Next Steps
                    </h5>
                    <ol className="text-white text-xs xs:text-sm space-y-1 xs:space-y-2 list-decimal list-inside">
                      <li>Proceed to payment using Mobile Money</li>
                      <li>You will receive payment instructions</li>
                      <li>Complete the payment process</li>
                      <li>Your order will be prepared immediately</li>
                    </ol>
                  </div>

                  <button
                    onClick={proceedToPayment}
                    className="w-full bg-gradient-to-t from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-2 xs:py-3 rounded-lg font-bold text-xs xs:text-sm sm:text-base transition-all shadow-lg hover:shadow-green-500/25"
                  >
                    Proceed to Payment
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Money Payment Modal */}
        <AnimatePresence>
          {isPaymentModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black overflow-y-auto bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto border border-gray-700 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4 xs:mb-6">
                    <h3 className="text-base xs:text-lg sm:text-xl font-bold text-amber-400">
                      Mobile Money Payment
                    </h3>
                    <button
                      onClick={() => setIsPaymentModalOpen(false)}
                      className="text-gray-400 hover:text-white bg-gradient-to-t from-red-700 to-red-800 p-1 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all"
                    >
                      <Close className="text-sm xs:text-base" />
                    </button>
                  </div>

                  <div className="text-center mb-4 xs:mb-6">
                    <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-t from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                      <Payment className="text-white text-xl xs:text-2xl" />
                    </div>
                    <h4 className="text-lg xs:text-xl font-bold text-white mb-2">
                      Pay with Mobile Money
                    </h4>
                    <p className="text-gray-300 text-xs xs:text-sm mb-4 xs:mb-6">
                      Complete your payment using the USSD code below
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg xs:rounded-xl p-3 xs:p-4 mb-4 xs:mb-6 border border-gray-600">
                    <div className="flex items-center justify-center mb-2 xs:mb-3">
                      <Smartphone className="text-amber-400 mr-2 text-sm xs:text-base" />
                      <span className="text-gray-300 text-xs xs:text-sm font-semibold">
                        USSD Payment Code:
                      </span>
                    </div>
                    <div className="bg-black bg-opacity-50 rounded-lg p-3 xs:p-4 text-center">
                      <code className="text-lg xs:text-xl sm:text-2xl font-bold text-green-400 break-all">
                        *182*8*1*272822#
                      </code>
                    </div>
                    <p className="text-gray-400 text-xs xs:text-sm mt-2 xs:mt-3 text-center">
                      Dial this code on your phone to complete payment
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-lg xs:rounded-xl p-3 xs:p-4 mb-4 xs:mb-6 border border-amber-600">
                    <h5 className="text-amber-300 font-bold text-xs xs:text-sm mb-2 xs:mb-3 flex items-center">
                      <Phone className="mr-2 text-xs xs:text-sm" />
                      Contact Information
                    </h5>
                    <p className="text-white text-xs xs:text-sm">
                      <strong>Phone:</strong> {customerInfo.phone}
                    </p>
                    <p className="text-white text-xs xs:text-sm mt-1">
                      <strong>Name:</strong> {customerInfo.name}
                    </p>
                    <p className="text-white text-xs xs:text-sm mt-1">
                      <strong>Total Amount:</strong> {formatPrice(getTotalPrice())} RWF
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg xs:rounded-xl p-3 xs:p-4 mb-4 xs:mb-6 border border-blue-600">
                    <h5 className="text-blue-300 font-bold text-xs xs:text-sm mb-2 xs:mb-3">
                      Instructions:
                    </h5>
                    <ol className="text-white text-xs xs:text-sm space-y-1 xs:space-y-2 list-decimal list-inside">
                      <li>Copy the USSD code: <code className="bg-black bg-opacity-50 px-1 py-0.5 rounded">*182*8*1*272822#</code></li>
                      <li>Open your phone dialer</li>
                      <li>Paste and dial the code</li>
                      <li>Follow the prompts to complete payment</li>
                      <li>Keep the transaction receipt for reference</li>
                    </ol>
                  </div>

                  <button
                    onClick={completePayment}
                    className="w-full bg-gradient-to-t from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-2 xs:py-3 rounded-lg font-bold text-xs xs:text-sm sm:text-base transition-all shadow-lg hover:shadow-green-500/25"
                  >
                    I Have Completed Payment
                  </button>

                  <p className="text-gray-400 text-xs text-center mt-3 xs:mt-4">
                    Need help? Contact support: +250 788 123 456
                  </p>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Checkout Status Modal */}
        <AnimatePresence>
          {checkoutStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl xs:rounded-2xl p-4 xs:p-6 sm:p-8 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto border border-gray-700 shadow-2xl text-center"
              >
                {checkoutStatus === "loading" ? (
                  <>
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-t from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                      <div className="animate-spin rounded-full h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 border-b-2 border-white"></div>
                    </div>
                    <h3 className="text-xl xs:text-2xl font-bold text-amber-400 mb-1 xs:mb-2">
                      Processing Order
                    </h3>
                    <p className="text-gray-300 text-xs xs:text-sm mb-4 xs:mb-6">
                      Please wait while we process your order...
                    </p>
                  </>
                ) : checkoutStatus === "success" ? (
                  <>
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-t from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                      <svg
                        className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl xs:text-2xl font-bold text-green-400 mb-1 xs:mb-2">
                      Order Successful!
                    </h3>
                    <p className="text-gray-300 text-xs xs:text-sm mb-4 xs:mb-6">
                      Your order has been placed successfully.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-t from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                      <svg
                        className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl xs:text-2xl font-bold text-red-400 mb-1 xs:mb-2">
                      Order Failed
                    </h3>
                    <p className="text-gray-300 text-xs xs:text-sm mb-4 xs:mb-6">
                      There was an error processing your order. Please try
                      again.
                    </p>
                    <button
                      onClick={() => setCheckoutStatus(null)}
                      className="w-full bg-gradient-to-t from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2 xs:py-3 rounded-lg font-bold text-xs xs:text-sm sm:text-base transition-all shadow-lg"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {isCartOpen && !selectedItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={() => setIsCartOpen(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30 }}
                className="fixed right-0 top-0 h-full w-full xs:w-80 sm:w-96 bg-gradient-to-b from-gray-900 to-gray-800 z-50 shadow-2xl border-l border-gray-700"
              >
                <div className="p-3 xs:p-4 sm:p-6 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4 xs:mb-6">
                    <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-amber-400">
                      Your Cart
                    </h2>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-400 hover:text-white bg-gradient-to-t from-gray-700 to-gray-800 p-1 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all"
                    >
                      <Close className="text-sm xs:text-base" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {cart.length === 0 ? (
                      <div className="text-center mt-6 xs:mt-8">
                        <div className="w-16 h-16 xs:w-20 xs:h-20 bg-gradient-to-t from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4">
                          <ShoppingCart className="text-2xl xs:text-3xl text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm xs:text-base">
                          Your cart is empty
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 xs:space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-2 xs:p-3 sm:p-4 border border-gray-700"
                          >
                            <div className="flex justify-between items-start mb-1 xs:mb-2">
                              <div className="flex items-center space-x-2 xs:space-x-3 flex-1">
                                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-xs xs:text-sm sm:text-base">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs xs:text-sm text-gray-400">
                                    Qty: {item.quantity} ×{" "}
                                    {formatPrice(item.price)}
                                  </p>
                                  {item.description && (
                                    <p className="text-xs text-gray-500 italic mt-1">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-400 hover:text-red-300 ml-1 xs:ml-2 bg-gradient-to-t from-gray-700 to-gray-800 p-1 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all"
                              >
                                <Remove className="text-xs xs:text-sm" />
                              </button>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-amber-400 font-bold text-xs xs:text-sm sm:text-base">
                                {formatPrice(item.totalPrice)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-gray-700 pt-3 xs:pt-4">
                      <div className="flex justify-between items-center mb-3 xs:mb-4">
                        <span className="text-base text-blue-300 xs:text-lg sm:text-xl font-bold">
                          Total:
                        </span>
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-amber-400">
                          {formatPrice(getTotalPrice())}
                        </span>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-t from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 py-2 xs:py-3 rounded-lg font-bold text-xs xs:text-sm sm:text-base transition-all shadow-lg hover:shadow-amber-500/25"
                      >
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};