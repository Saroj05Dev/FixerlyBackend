// src/schema/Booking_schema.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    status:      { type: String, enum: ['Pending','Confirmed','Cancelled','Completed'], default: 'Pending' },
    address:     { type: String, required: true },
    lat: Number, long: Number,
    amount:      { type: Number, required: true, min: 0 },
    date:        { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);