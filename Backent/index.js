const dotenv = require('dotenv');
dotenv.config(); // Load environment variables FIRST before anything else

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db');
const rateLimit = require('express-rate-limit');
const app = express();

const userRoutes = require('./routes/user.route');
const companyRoutes = require('./routes/company.route');
const productRoutes = require('./routes/product.route');
const orderRoutes = require('./routes/order.route');
const paymentRoutes = require('./routes/payment.route');
const notificationRoutes = require('./routes/notification.route');
const cart = require('./routes/cart.route')
const reviewRoutes = require('./routes/review.route');
const wishlistRoutes = require('./routes/wishlist.route');
const ratingRoutes = require('./routes/rating.route');
const likeRoutes = require('./routes/like.route');

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// CORS: explicit headers to support cross-domain cookie auth (Vercel frontend -> Render backend).
// This must allow credentials and echo the request origin (cannot be '*').
app.use((req, res, next) => {
    const requestOrigin = req.headers.origin;
    const allowedOrigin = requestOrigin || process.env.FRONTEND_URL;

    if (allowedOrigin) {
        res.header('Access-Control-Allow-Origin', allowedOrigin);
        res.header('Vary', 'Origin');
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // preflight
    }
    next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
app.use(limiter);

const PORT = process.env.PORT || 3000;

//* Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use('/api/v1/cart', cart)
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/rating', ratingRoutes);
app.use('/api/v1/like', likeRoutes);


//* database connection
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})

// Add this to your main server file to test your Cloudinary connection
const cloudinary = require("./utils/cloudinary");

// Test Cloudinary connection on startup
// async function testCloudinaryConnection() {
//   try {
//     const result = await cloudinary.uploader.upload(
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
//       { folder: "test" }
//     );
//     console.log("✅ Cloudinary connection successful:", result.secure_url);
//     return true;
//   } catch (error) {
//     console.error("❌ Cloudinary connection failed:", error);
//     return false;
//   }
// }

// testCloudinaryConnection();