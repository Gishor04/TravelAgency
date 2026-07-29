export const MOCK_PACKAGES = [
  {
    _id: "pkg_101",
    title: "Bali Luxury Villa & Tropical Island Odyssey",
    slug: "bali-luxury-villa-odyssey",
    category: "Luxury Tours",
    destination: "Ubud & Seminyak, Bali",
    country: "Indonesia",
    city: "Denpasar",
    price: 1850,
    discountPrice: 1599,
    durationDays: 7,
    durationNights: 6,
    maxGroupSize: 10,
    availableDates: ["2026-08-15", "2026-09-01", "2026-10-10"],
    departureAirport: "Colombo (CMB)",
    tourType: "Private Guided Villa Package",
    highlights: [
      "Private infinity pool villa in Ubud jungle",
      "Sunset catamaran cruise to Nusa Penida",
      "Helicopter tour over Mt. Batur caldera",
      "Floating luxury breakfast & spa ritual"
    ],
    inclusions: ["5-Star Villa", "Daily Gourmet Breakfast", "Private Airport Transfers", "Helicopter Ride", "All Entrance Fees"],
    exclusions: ["Personal Souvenirs", "Alcoholic Drinks outside dinners", "Travel Insurance"],
    hotelDetails: {
      name: "Viceroy Bali Resort & Spa",
      rating: 5,
      roomType: "Pool Villa Suite",
      amenities: ["Private Pool", "Spa", "Helipad", "Fine Dining"]
    },
    flightDetails: {
      airline: "Singapore Airlines",
      included: true,
      class: "Business Class Upgrade Option"
    },
    mealPlan: "Full Board (Breakfast, Lunch & Gourmet Dinner)",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mapCoordinates: { lat: -8.4095, lng: 115.1889 },
    ratings: 4.95,
    reviewCount: 148,
    featured: true,
    trending: true,
    seasonalOffer: true,
    itinerary: [
      { day: 1, title: "VIP Arrival & Jungle Villa Check-in", description: "Private luxury transfer to Viceroy Ubud. Welcome herbal elixirs and relaxing couples massage.", activities: ["Airport VIP lounge", "Jungle Spa"], meals: ["Dinner"], accommodation: "Viceroy Ubud" },
      { day: 2, title: "Sacred Waterfalls & Floating Breakfast", description: "Private photographer tour to Tegallalang rice terraces & Tukad Cepung waterfall.", activities: ["Waterfall trek", "Rice terrace swing"], meals: ["Breakfast", "Lunch", "Dinner"], accommodation: "Viceroy Ubud" },
      { day: 3, title: "Helicopter Volcano Safari", description: "Scenic 45-min flight over Kintamani caldera followed by crater lunch.", activities: ["Helicopter tour", "Wine tasting"], meals: ["Breakfast", "Lunch"], accommodation: "Viceroy Ubud" }
    ]
  },
  {
    _id: "pkg_102",
    title: "Swiss Alps & Glacier Express Grand Escape",
    slug: "swiss-alps-glacier-express",
    category: "International Tours",
    destination: "Zermatt & St. Moritz",
    country: "Switzerland",
    city: "Zurich",
    price: 3490,
    discountPrice: 3190,
    durationDays: 8,
    durationNights: 7,
    maxGroupSize: 8,
    availableDates: ["2026-09-05", "2026-10-12", "2026-11-20"],
    departureAirport: "Colombo (CMB)",
    tourType: "Scenic Rail & Alpine Luxury",
    highlights: [
      "Glacier Express Excellence Class panoramic journey",
      "Matterhorn cable car to 3,883m summit station",
      "Private alpine fondue tasting in St. Moritz",
      "5-Star Alpine Spa & Thermal Springs"
    ],
    inclusions: ["Excellence Class Rail Passes", "Luxury Chalet Stay", "Daily Breakfast & Alpine Dinners", "Peak Pass Tickets"],
    exclusions: ["Ski Equipment Rentals", "Visa Fees"],
    hotelDetails: {
      name: "The Chedi Andermatt & Badrutt’s Palace",
      rating: 5,
      roomType: "Alpine Deluxe Room",
      amenities: ["Indoor Heated Pool", "Ski Concierge", "Michelin Star Restaurant"]
    },
    flightDetails: {
      airline: "Swiss International Air Lines",
      included: true,
      class: "Economy / Business"
    },
    mealPlan: "Half Board (Breakfast & 4-Course Dinner)",
    images: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1527631746610-1ec002b38463?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "",
    mapCoordinates: { lat: 45.9765, lng: 7.7491 },
    ratings: 4.98,
    reviewCount: 92,
    featured: true,
    trending: true,
    seasonalOffer: false,
    itinerary: [
      { day: 1, title: "Arrival in Zurich & Transfer to Zermatt", description: "Scenic first-class train ride along Lake Thun to car-free Zermatt.", activities: ["Welcome Cocktail", "Zermatt stroll"], meals: ["Dinner"], accommodation: "Omnia Zermatt" },
      { day: 2, title: "Matterhorn Glacier Paradise", description: "Ascend to Europe's highest cable car station overlooking 38 4,000-meter peaks.", activities: ["Glacier Palace", "Summit Platform"], meals: ["Breakfast", "Dinner"], accommodation: "Omnia Zermatt" }
    ]
  },
  {
    _id: "pkg_103",
    title: "Sri Lanka Coastal & Tea Country Heritage Expedition",
    slug: "sri-lanka-coastal-tea-heritage",
    category: "Domestic Tours",
    destination: "Ella, Sigiriya & Bentota",
    country: "Sri Lanka",
    city: "Colombo",
    price: 950,
    discountPrice: 799,
    durationDays: 6,
    durationNights: 5,
    maxGroupSize: 12,
    availableDates: ["2026-08-01", "2026-08-10", "2026-09-01"],
    departureAirport: "Colombo (CMB)",
    tourType: "Cultural & Wildlife Heritage",
    highlights: [
      "First-class observation train over Nine Arch Bridge",
      "Yala Leopard Safari in private 4x4 Land Cruiser",
      "Private sunrise climb up Sigiriya Rock Fortress",
      "Bentota beach resort relaxation & water sports"
    ],
    inclusions: ["Luxury Boutique Hotels", "Private Chauffeur Car", "All Safari Tickets", "Daily Breakfast"],
    exclusions: ["Personal Expenses", "Tips"],
    hotelDetails: {
      name: "Ceylon Tea Trails & Anantara Kalutara",
      rating: 5,
      roomType: "Heritage Bungalow & Ocean View Suite",
      amenities: ["Butler Service", "Infinity Pool", "Ayurvedic Spa"]
    },
    flightDetails: {
      airline: "N/A (Domestic Package)",
      included: false,
      class: "N/A"
    },
    mealPlan: "Half Board",
    images: [
      "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "",
    mapCoordinates: { lat: 6.8667, lng: 81.0466 },
    ratings: 4.92,
    reviewCount: 215,
    featured: true,
    trending: true,
    seasonalOffer: true,
    itinerary: [
      { day: 1, title: "Cultural Triangle & Sigiriya Fortress", description: "Climb ancient UNESCO fortress with expert historian guide.", activities: ["Sigiriya Fortress", "Village Safari"], meals: ["Dinner"], accommodation: "Water Garden Sigiriya" }
    ]
  },
  {
    _id: "pkg_104",
    title: "Maldives Overwater Bungalow Honeymoon Sanctuary",
    slug: "maldives-overwater-bungalow-honeymoon",
    category: "Honeymoon Packages",
    destination: "North Malé Atoll",
    country: "Maldives",
    city: "Malé",
    price: 2890,
    discountPrice: 2490,
    durationDays: 5,
    durationNights: 4,
    maxGroupSize: 2,
    availableDates: ["2026-08-10", "2026-09-01", "2026-10-15"],
    departureAirport: "Colombo (CMB)",
    tourType: "Couples Ultra-Luxury Haven",
    highlights: [
      "Overwater Sunset Pool Villa with ocean glass floor",
      "Private sandbank candlelit dinner with champagne",
      "Manta ray & sea turtle snorkeling excursion",
      "Couples underwater spa package"
    ],
    inclusions: ["Seaplane Transfers", "All-Inclusive Dining & Drinks", "Snorkeling Equipment", "Sunset Cruise"],
    exclusions: ["International Flights"],
    hotelDetails: {
      name: "Soneva Jani & Hurawalhi Island Resort",
      rating: 5,
      roomType: "Water Reserve with Water Slide",
      amenities: ["Private Water Slide", "Observatory", "Underwater Restaurant"]
    },
    flightDetails: {
      airline: "Maldivian / SriLankan Airlines",
      included: true,
      class: "Economy"
    },
    mealPlan: "Ultra All-Inclusive",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "",
    mapCoordinates: { lat: 4.1755, lng: 73.5093 },
    ratings: 4.99,
    reviewCount: 310,
    featured: true,
    trending: false,
    seasonalOffer: true,
    itinerary: [
      { day: 1, title: "Seaplane Arrival & Overwater Villa", description: "Scenic 30-min flight to private island resort.", activities: ["Welcome Champagne", "Sunset Snorkel"], meals: ["Dinner"], accommodation: "Soneva Jani" }
    ]
  },
  {
    _id: "pkg_105",
    title: "Tokyo, Kyoto & Mt Fuji Futuristic Japan Discovery",
    slug: "tokyo-kyoto-mt-fuji-discovery",
    category: "Family Tours",
    destination: "Tokyo, Hakone & Kyoto",
    country: "Japan",
    city: "Tokyo",
    price: 2750,
    discountPrice: 2450,
    durationDays: 9,
    durationNights: 8,
    maxGroupSize: 14,
    availableDates: ["2026-09-10", "2026-10-05", "2026-11-12"],
    departureAirport: "Colombo (CMB)",
    tourType: "Bullet Train & Futuristic Culture",
    highlights: [
      "Shinkansen bullet train pass between Tokyo & Kyoto",
      "teamLab Planets digital art immersive museum",
      "Ryokan stay with traditional hot spring Onsen",
      "Kyoto Geisha district tour & tea ceremony"
    ],
    inclusions: ["7-Day JR Pass", "4-Star Hotels + Ryokan", "Guided Tours", "TeamLab Tickets"],
    exclusions: ["Lunch on free days"],
    hotelDetails: {
      name: "Keio Plaza Tokyo & Kyoto Ryokan Hoshinoya",
      rating: 5,
      roomType: "Executive Family Suite",
      amenities: ["Natural Hot Springs", "City Skyline Views"]
    },
    flightDetails: {
      airline: "Japan Airlines (JAL)",
      included: true,
      class: "Economy"
    },
    mealPlan: "Breakfast & 3 Kaiseki Dinners",
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800"
    ],
    videoUrl: "",
    mapCoordinates: { lat: 35.6762, lng: 139.6503 },
    ratings: 4.91,
    reviewCount: 88,
    featured: true,
    trending: true,
    seasonalOffer: false,
    itinerary: [
      { day: 1, title: "Futuristic Tokyo Welcome", description: "Check in at Shinjuku, visit Shibuya Crossing night walk.", activities: ["Shibuya Crossing", "Skytree view"], meals: ["Dinner"], accommodation: "Keio Plaza Tokyo" }
    ]
  }
];

export const MOCK_DESTINATIONS = [
  { _id: "dest_1", name: "Bali", country: "Indonesia", region: "Southeast Asia", coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", description: "Island of Gods featuring jungle infinity pools, sacred temples, and white sand beaches.", bestTimeToVisit: "April to October", tourCount: 14, featured: true },
  { _id: "dest_2", name: "Swiss Alps", country: "Switzerland", region: "Europe", coverImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800", description: "Majestic snow-capped peaks, scenic panoramic trains, and world-class luxury resorts.", bestTimeToVisit: "December to April (Skiing), June to Sept (Trekking)", tourCount: 9, featured: true },
  { _id: "dest_3", name: "Maldives", country: "Maldives", region: "Indian Ocean", coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", description: "Turquoise lagoons, private island overwater bungalows, and pristine coral reefs.", bestTimeToVisit: "November to April", tourCount: 18, featured: true },
  { _id: "dest_4", name: "Sri Lanka", country: "Sri Lanka", region: "South Asia", coverImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=800", description: "Ancient UNESCO ruins, lush tea hills, wildlife leopard safaris, and tropical beaches.", bestTimeToVisit: "Year-Round", tourCount: 22, featured: true },
  { _id: "dest_5", name: "Tokyo & Kyoto", country: "Japan", region: "East Asia", coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800", description: "A seamless blend of neon futuristic technology and tranquil ancient Zen shrines.", bestTimeToVisit: "March to May & Sept to Nov", tourCount: 12, featured: true }
];

export const MOCK_BLOGS = [
  {
    _id: "blog_1",
    title: "The Ultimate 2026 Visa-Free & E-Visa Guide for Global Travelers",
    slug: "ultimate-2026-visa-guide",
    category: "Visa Guides",
    author: "Elena Rostova (Lead Travel Specialist)",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    content: "Navigating international travel in 2026 has become smoother than ever with AI-driven digital border control and expanded electronic visa processing...",
    readTime: "6 min read",
    featured: true,
    publishedAt: "2026-07-20"
  },
  {
    _id: "blog_2",
    title: "10 Secret High-Altitude Luxury Resorts in the Swiss Alps",
    slug: "secret-high-altitude-swiss-resorts",
    category: "Luxury Travel",
    author: "Marcus Vance",
    coverImage: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=800",
    content: "From private heated infinity pools suspended over frozen alpine lakes to heli-skiing concierges, here are the top 10 hidden retreats in Switzerland...",
    readTime: "8 min read",
    featured: true,
    publishedAt: "2026-07-15"
  }
];

export const MOCK_REVIEWS = [
  {
    _id: "rev_1",
    userName: "Sophia Martinez",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    title: "Unforgettable Bali Honeymoon!",
    comment: "The Viceroy Ubud villa was beyond breathtaking! Antigravity AI custom itinerary was spot on. Every detail from VIP private transfers to the helicopter ride was seamless.",
    verifiedBooking: true,
    createdAt: "2026-07-10"
  },
  {
    _id: "rev_2",
    userName: "David Chen",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    title: "Excellence Class Glacier Express was a dream!",
    comment: "Flawless service, incredible food, and effortless booking through Aura Luxury Travels. The multi-language AI assistant helped us plan our daily outings with ease.",
    verifiedBooking: true,
    createdAt: "2026-07-04"
  }
];
