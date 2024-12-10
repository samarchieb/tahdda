const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Represents system's session token
 */
const SessionTokenSchema = new mongoose.Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);
module.exports = mongoose.model('SessionToken', SessionTokenSchema) 