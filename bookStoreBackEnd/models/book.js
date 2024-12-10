const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    numberOfPages: {
        type: Number, 
        required: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
