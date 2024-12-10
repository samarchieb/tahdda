const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const routes = require('./routes');
require('./dbconfig.js');
// port for express
const port = process.env.PORT || 3156


// Middleware to parse JSON request bodies
app.use(express.json()); // This is critical for req.body to be parsed
app.use(express.urlencoded({ extended: true })); // If expecting URL-encoded data

// cors
app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:5173',
    ],
   // allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
}));


// Cookies
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.ACCESS_TOKEN_SECRET],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


app.get('/', (req, res) => {
    return res.status(200).json('Book Store Server is up and running!');
});

corsOption = {
    origin: '*'
}

// API routes
app.use('/books', routes.bookRoutes);
app.use('/auth', routes.authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
