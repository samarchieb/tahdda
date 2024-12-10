const mongoose = require('mongoose'); // Import Mongoose
require("dotenv").config(); // Load environment variables
require('./dbconfig.js'); // Import your DB config (if needed)
const { dbInitialiserAdmin } = require('./services/index.js'); // Import any initialisation logic

// MongoDB connection URLs
const mongoUrl = {
    dev: process.env.MONGO_URL_DEV, // Local development MongoDB URL
};

// Enable strict query mode
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(
    mongoUrl.dev, // Use the development URL for local
    { dbName: 'bookStore' } // Specify the database name
).then(async () => {
    console.log('Connected to MongoDB successfully!');
    
    // Initialize database for admin if needed
    await dbInitialiserAdmin();

}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});
