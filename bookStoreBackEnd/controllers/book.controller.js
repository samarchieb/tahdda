const Book = require('../models/book');
const { bookValidationSchema, updateBookValidationSchema} = require("../middlewares/validation");

/**
 * Function to add a book
 * Endpoint: POST /api/books
 */
async function addBook(req, res) {
    try {
        const { error } = bookValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedDate: req.body.publishedDate,
            numberOfPages: req.body.numberOfPages,
        };

        const savedBook = await Book.create(newBook);
        res.status(201).json(savedBook);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Error adding book", error });
    }
}

/**
 * Function to retrieve all books
 * Endpoint: GET /api/books
 */
async function getAllBooks(req, res) {
    try {
        // Fetch all books from the database
        const books = await Book.find();

        // Check if books exist
        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        // Return the list of books
        res.status(200).json({ message: "Books retrieved successfully", books });
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({ message: "Error retrieving books", error: error.message });
    }
}

/**
 * Function to get a book by ID
 * Endpoint: GET /api/books/{id}
 */
async function getBookById(req, res) {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error retrieving book by ID:", error);
        res.status(500).json({ message: "Error retrieving book by ID", error });
    }
}

/**
 * Function to update a book
 * Endpoint: PUT /api/books/{id}
 */
async function updateBook(req, res) {
    try {
        const { id } = req.params;

        const { error } = updateBookValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: `Validation error: ${error.details[0].message}` });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                author: req.body.author,
                publishedDate: req.body.publishedDate,
                numberOfPages: req.body.numberOfPages,
            },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        return res.status(500).json({ message: 'Error updating book', error });
    }
}

/**
 * Function to delete a book
 * Endpoint: DELETE /api/books/{id}
 */
async function deleteBook(req, res) {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Error deleting book", error });
    }
}

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
