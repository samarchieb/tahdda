const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");
const SessionToken = require('../models/sessionToken');

/**
 * Middleware to verify an access token.
 * - Checks if the access token is present and valid.
 * - If missing or invalid, it attempts to refresh the token.
 * - Attaches the admin details to the request object if authenticated.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
async function verifyAccessToken(req, res, next) {
    try {
        // Extract the access token from cookies
        const token = req.cookies?.bookStoreAccessToken;

        if (token) {
            // Validate the JWT access token
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            } catch (err) {
                console.log('Access token invalid, attempting to refresh');
                return await refreshAccessToken(req, res, next);
            }

            // Verify the session ID in the database
            const sessionToken = await SessionToken.findOne({ sessionId: decoded.sessionId });
            if (!sessionToken) {
                return res.status(403).json({ message: 'Session not found' });
            }

            // Verify the admin exists using the session's adminId
            const admin = await Admin.findById(sessionToken.adminId);
            if (!admin) {
                return res.status(403).json({ message: 'Admin does not exist' });
            }

            // Attach admin details to the request for downstream use
            req.admin = admin;
        } else {
            // If access token is missing, attempt to refresh it
            console.log('Access token missing, attempting to refresh');
            return await refreshAccessToken(req, res, next);
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(500).json({ message: 'Failed to authenticate token' });
    }
}

/**
 * Generates a new access token using the refresh token.
 * - Verifies the refresh token and regenerates a new access token.
 * - Sets the new access token in cookies.
 * - Optionally proceeds to the next middleware after a successful refresh.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Boolean} next - If true, proceeds to the next middleware after a successful refresh.
 */
async function refreshAccessToken(req, res, next = false) {
    try {
        // Extract the refresh token from cookies
        const refreshToken = req.cookies?.bookStoreRefreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: 'No refresh token found' });
        }

        // Verify the refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            console.error('Invalid refresh token:', err);
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }

        // Check if the session exists in the database
        const foundSession = await SessionToken.findOne({
            sessionId: decoded.sessionId,
            refreshToken: refreshToken
        });

        if (!foundSession) {
            return res.status(403).json({ message: 'Invalid session or token' });
        }

        // Check if the admin exists and is not deleted
        const foundAdmin = await Admin.findById(foundSession.adminId);
        if (!foundAdmin) {
            return res.status(403).json({ message: 'Admin not found' });
        }

        // Generate a new access token
        const newAccessToken = jwt.sign({ sessionId: foundSession.sessionId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });

        // Set the new access token in cookies
        res.cookie('bookStoreAccessToken', newAccessToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            maxAge: 5 * 60 * 1000 // 5 minutes
        });

        if (next) {
            // Attach the admin to the request object for continuation
            req.admin = foundAdmin;
            return next(); // Continue to the next middleware
        }

        // Respond with success for non-middleware cases
        return res.status(200).json({ message: 'Access token refreshed successfully' });
    } catch (error) {
        console.error('Error refreshing access token:', error);
        if (next) return next(error); // Pass error to the next middleware
        return res.status(500).json({ message: 'Server error occurred while refreshing access token' });
    }
}

module.exports = {
    verifyAccessToken,
    refreshAccessToken
};
