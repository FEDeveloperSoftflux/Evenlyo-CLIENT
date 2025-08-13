/**
 * API Headers
 */
export const apiHeaders = {
  application_json: "application/json",
  multipart_data: "multipart/form-data",
  text_plain: "text/plain",
  application_form_urlencoded: "application/x-www-form-urlencoded",
};

/**
 * HTTP Request Types
 */
export const requestType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

/**
 * API Endpoints
 */
export const endPoints = {
  // Authentication endpoints
  auth: {
    login: "client/login",
    register: "client/register",
    logout: "auth/logout",
    refreshToken: "client/refresh-token",
    sendOtp: "auth/send-otp",
    verifyOtp: "auth/verify-forgot-otp",
    forgotPassword: "auth/forgot-password",
    resetPassword: "auth/reset-password",
    changePassword: "auth/change-password",
    me: "auth/me",
  },

  // Client profile endpoints
  profile: {
    get: "client/profile",
    update: "client/profile",
    uploadAvatar: "client/profile/avatar",
    deleteAccount: "client/profile/delete",
    getPreferences: "client/profile/preferences",
    updatePreferences: "client/profile/preferences",
  },

  // Booking endpoints (matching backend structure)
  bookings: {
    create: "booking/request",
    history: "booking/history",
    accepted: "booking/accepted",
    pending: "booking/pending",
    vendorHistory: "booking/vendor-history",
    byId: (id) => `booking/${id}`,
    accept: (id) => `booking/${id}/accept`,
    reject: (id) => `booking/${id}/reject`,
    pay: (id) => `booking/${id}/pay`,
    markOnTheWay: (id) => `booking/${id}/mark-on-the-way`,
    markReceived: (id) => `booking/${id}/mark-received`,
    markPickedUp: (id) => `booking/${id}/mark-picked-up`,
    markComplete: (id) => `booking/${id}/mark-complete`,
    createClaim: (id) => `booking/${id}/claim`,
  },

  // Vendor discovery endpoints
  vendors: {
    search: "client/vendors/search",
    byDetails: (vendorId) => `vendor/details/${vendorId}`,
    byId: (id) => `client/vendors/${id}`,
    byCategory: (categoryId) => `vendor/bycategory/${categoryId}`,
    featured: "client/vendors/featured",
    nearby: "client/vendors/nearby",
    reviews: (id) => `client/vendors/${id}/reviews`,
    availability: (id) => `client/vendors/${id}/availability`,
    packages: (id) => `client/vendors/${id}/packages`,
    gallery: (id) => `client/vendors/${id}/gallery`,
  },

  // Category endpoints
  categories: {
    all: "categories",
    bySearch: (searchTerm) => `categories/search/${searchTerm}`,
    byId: (id) => `categories/${id}`,
  },

  // Subcategory endpoints
  subcategories: {
    all: "subcategories",
    byId: (id) => `subcategories/${id}`,
    byCategory: (categoryId) => `subcategories/category/${categoryId}`,
  },

  // Listing endpoints
  listings: {
    all: "listings",
    byId: (id) => `listings/${id}`,
    search: "listings/search",
    featured: "listings/featured",
    popular: "listings/popular",
    filter: "listings/filter", // Filter endpoint that accepts categoryId and/or subCategoryId as query params
    byCategory: (categoryId) => `listings/category/${categoryId}`,
    bySubCategory: (subCategoryId) => `listings/subcategory/${subCategoryId}`,
    byVendor: (vendorId) => `listings/vendor/${vendorId}`,
    byServiceType: (type) => `listings/service-type/${type}`,
    availability: (id) => `listings/${id}/availability`,
  },

  // Events endpoints
  events: {
    create: "client/events",
    all: "client/events",
    byId: (id) => `client/events/${id}`,
    update: (id) => `client/events/${id}`,
    delete: (id) => `client/events/${id}`,
    guests: (id) => `client/events/${id}/guests`,
    addGuest: (id) => `client/events/${id}/guests`,
    timeline: (id) => `client/events/${id}/timeline`,
  },

  // Wishlist endpoints
  wishlist: {
    get: "client/wishlist",
    add: "client/wishlist",
    remove: (id) => `client/wishlist/${id}`,
    clear: "client/wishlist/clear",
  },

  // Cart endpoints (matching backend structure)
  cart: {
    get: "cart",
    add: "cart/add",
    update: (listingId) => `cart/${listingId}`,
    remove: (listingId) => `cart/${listingId}`,
    clear: "cart",
    submit: "cart/submit",
  },

  // Payment endpoints
  payments: {
    process: "client/payments/process",
    verify: "client/payments/verify",
    refund: (id) => `client/payments/${id}/refund`,
    history: "client/payments/history",
    methods: "client/payments/methods",
    addMethod: "client/payments/methods",
    removeMethod: (id) => `client/payments/methods/${id}`,
  },

  // Review endpoints
  reviews: {
    create: "client/reviews",
    byVendor: (vendorId) => `client/reviews/vendor/${vendorId}`,
    byClient: "client/reviews/my-reviews",
    update: (id) => `client/reviews/${id}`,
    delete: (id) => `client/reviews/${id}`,
    helpful: (id) => `client/reviews/${id}/helpful`,
  },

  // Notification endpoints
  notifications: {
    all: "client/notifications",
    markRead: (id) => `client/notifications/${id}/read`,
    markAllRead: "client/notifications/mark-all-read",
    delete: (id) => `client/notifications/${id}`,
    settings: "client/notifications/settings",
  },

  // Support endpoints
  support: {
    tickets: "client/support/tickets",
    createTicket: "client/support/tickets",
    ticketById: (id) => `client/support/tickets/${id}`,
    addMessage: (id) => `client/support/tickets/${id}/messages`,
    closeTicket: (id) => `client/support/tickets/${id}/close`,
    faq: "client/support/faq",
    contactInfo: "client/support/contact",
  },

  // Blog endpoints
  blog: {
    all: 'blogs', // GET /api/blogs
    byId: (id) => `blogs/${id}`, // GET /api/blogs/:id
    addComment: (id) => `blogs/${id}/comments` // POST /api/blogs/:id/comments
  },

  // Search endpoints
  search: {
    global: "client/search",
    vendors: "client/search/vendors",
    events: "client/search/events",
    suggestions: "client/search/suggestions",
    filters: "client/search/filters",
  },

  // Location endpoints
  locations: {
    cities: "client/locations/cities",
    areas: (cityId) => `client/locations/cities/${cityId}/areas`,
    nearby: "client/locations/nearby",
    popular: "client/locations/popular",
  },

  // Plans endpoints
  plans: {
    all: "plans",
  },

  // Settings endpoints
  settings: {
    getPersonalInfo: "settings/personal-info",
    updateProfile: "settings/personal-info",
    updateProfilePicture: "settings/profile-picture",
    updatePassword: "settings/change-password",
    getNotifications: "settings/notifications",
    updateNotifications: "settings/notifications",
  },

  // General endpoints
  general: {
    settings: "client/settings",
    terms: "client/terms",
    privacy: "client/privacy",
    about: "client/about",
    contact: "client/contact",
  },
};

/**
 * API Response Status Codes
 */
export const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * API Error Messages
 */
export const errorMessages = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNAUTHORIZED: "Please login to continue.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: "Resource not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SESSION_EXPIRED: "Your session has expired. Please login again.",
};

/**
 * Default API Configuration
 */
export const apiConfig = {
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};
