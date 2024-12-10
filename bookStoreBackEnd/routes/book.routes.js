const router = require('express').Router();
const controllers = require('../controllers');
const { verifyAccessToken } = require('../middlewares/jwtVerification');

// Routes for Book Management
router.post('/addBook', verifyAccessToken, controllers.bookController.addBook); // Add a new book
router.put('/updateBook/:id', verifyAccessToken, controllers.bookController.updateBook); // Update a book by ID
router.delete('/deleteBook/:id', verifyAccessToken, controllers.bookController.deleteBook); // Delete a book by ID
router.get('/getAllBooks', verifyAccessToken, controllers.bookController.getAllBooks); // Get all books
router.get('/getBookById/:id', verifyAccessToken, controllers.bookController.getBookById); // Get a book by ID

module.exports = router;
