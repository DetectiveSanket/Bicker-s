// Central API config — all base URLs read from environment variables.
// For Vite: set VITE_API_BASE_URL in .env (local) or in your hosting platform (production).
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const USER_API_END_POINT = `${API_BASE}/api/v1/user`;
export const Product_API_END_POINT = `${API_BASE}/api/v1/product`;
export const APPLICATION_API_END_POINT = `${API_BASE}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_BASE}/api/v1/company`;
export const WISHLIST_API_END_POINT = `${API_BASE}/api/v1/wishlist`;
export const RATING_API_END_POINT = `${API_BASE}/api/v1/rating`;
export const LIKE_API_END_POINT = `${API_BASE}/api/v1/like`;
export const ORDER_API_END_POINT = `${API_BASE}/api/v1/order`;
export const CART_API_END_POINT = `${API_BASE}/api/v1/cart`;
export const REVIEW_API_END_POINT = `${API_BASE}/api/v1/reviews`;
export const NOTIFICATION_API_END_POINT = `${API_BASE}/api/v1/notification`;
export const PAYMENT_API_END_POINT = `${API_BASE}/api/v1/payment`;

export default API_BASE;