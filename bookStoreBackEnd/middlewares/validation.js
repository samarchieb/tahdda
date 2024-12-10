const Joi = require('joi');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fs = require('fs');
const path = require('path');

/**
 * ============================================
 * auth Validations
 * ============================================
 * These functions are used for validating Admin-related data in Auth controllers.
 */


// Validate admin  login data
const LoginAdminValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
}


/**
 * ============================================
 * Books Validations
 * ============================================
 * These functions are used for validating Book-related data in Book controllers.
 */


// Validation schema for the book object
const bookValidationSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publishedDate: Joi.date().required(),
    numberOfPages: Joi.number().integer().positive().required(),
  });
  
  // Validation schema for updating a book
const updateBookValidationSchema = Joi.object({
    title: Joi.string().optional(),
    author: Joi.string().optional(),
    publishedDate: Joi.date().optional(),
    numberOfPages: Joi.number().integer().positive().optional(),
});


module.exports = {
    bookValidationSchema,
    LoginAdminValidation,
    updateBookValidationSchema

}