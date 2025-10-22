const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        index: true
    },

    otp: {
        type: String,
        required: true
    },

    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;