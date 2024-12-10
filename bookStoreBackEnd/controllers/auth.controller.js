const Admin = require("../models/admin");
const SessionToken = require('../models/sessionToken');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { LoginAdminValidation } = require("../middlewares/validation");

const { v4: uuidv4 } = require('uuid');

/**
 * API to login an admin.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;
        // Validate the input
        const { error } = LoginAdminValidation({ email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if the user exists
        const foundAdmin = await Admin.findOne({ email });
        if (!foundAdmin) {
            return res.status(400).json({ error: 'This email does not exist!' });
        }
        
        // Verify the password
        const validPass = await bcrypt.compare(password, foundAdmin.password);
        if (!validPass) {
            return res.status(400).json({ error: 'Password is incorrect!' });
        }

        // Generate a session ID
        const sessionId = uuidv4();

        // Generate access and refresh tokens
        const accessToken = jwt.sign({ sessionId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
        const refreshToken = jwt.sign({ sessionId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1w" });

        // Save the session token in the database
        const sessionToken = new SessionToken({
            adminId: foundAdmin._id,
            sessionId,
            refreshToken
        });
        await sessionToken.save();

        // Remove sensitive data before sending the user object
        const userResponse = { ...foundAdmin.toObject() };
        delete userResponse.password;

        // Set cookies for tokens
        res.cookie('bookStoreRefreshToken', refreshToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.cookie('bookStoreAccessToken', accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            maxAge: 5 * 60 * 1000 // 5 minutes
        });

        // Respond with a success message
        return res.status(200).json({
            message: 'Login successful',
            user: userResponse
        });

    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: 'Unexpected error occurred' });
    }
}

/**
 * API for Admin logout
 * @param {*} req 
 * @param {*} res 
 * @returns  
 */
async function logout(req, res) {
    try {

        let refreshToken = "";
      
        refreshToken = req.cookies?.bonexAccessToken;

        if (!refreshToken) {
            return res.status(404).json('Invalid refresh token');
        }

        // Validate the JWT access token
        const decoded = jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET);

        // verify a token asymmetric
        if (!decoded) {
            return res.status(401).json('Invalid access token');
        }

        // Use sessionToken's userId to find the user
        const foundSession = await SessionToken.findOne({ sessionId: decoded._id });

        if (!foundSession) {
            return res.status(404).json('Session not found');
        }

        // Delete the session from the database
        await foundSession.deleteOne({ _id: foundSession._id });

        // Clear cookies
        res.cookie('bookStoreAccessToken', '', { expires: 0, secure: true, httpOnly: true, sameSite: 'none' });
        res.cookie('bookStoreRefreshToken', '', { expires: 0, secure: true, httpOnly: true, sameSite: 'none' });
        res.cookie('loginAdmin', '', { expires: 0, secure: true, httpOnly: false, sameSite: 'none' });

        return res.status(200).json('Logout successful');
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json('An unexpected error occurred');
    }
}

module.exports = { login,logout };
