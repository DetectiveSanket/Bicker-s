

const multer = require("multer");
const path = require("path");

// Set up memory storage for file uploads
const storage = multer.memoryStorage();

// File type filter
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
    ];
    
    const allowedVideoTypes = [
        "video/mp4",
        "video/webm",
        "video/quicktime"
    ];
    
    if (file.fieldname === 'logo' || file.fieldname === 'images') {
        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported image format! Please upload jpeg, png, gif or webp."), false);
        }
    } else if (file.fieldname === 'videos') {
        if (allowedVideoTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported video format! Please upload mp4, webm or quicktime."), false);
        }
    } else {
        cb(null, true);
    }
};

// Product upload middleware
const productUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for videos
    }
}).fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 10 }
]);

// Company logo upload middleware
const uploadMiddleware = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported image format! Please upload jpeg, png, gif or webp."), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    }
}).single("logo");

module.exports = { uploadMiddleware, productUpload };