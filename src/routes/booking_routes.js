// src/routes/booking_routes.js
const express = require('express');
const { getCustomerBookings, cancelBooking, getProviderBookings, updateBookingStatus,createBooking,
    getAllBookings } = require('../controllers/booking_controller');
const { isAuthenticated, isAuthorized } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/customer/:id', isAuthenticated, getCustomerBookings);
router.put('/:id/cancel', cancelBooking);
router.get('/provider/:id', isAuthenticated, isAuthorized(['provider']), getProviderBookings);
router.put('/:id/update', isAuthenticated, isAuthorized(['provider']), updateBookingStatus);
router.post('/', isAuthenticated, createBooking);                // Add a booking (customer only)
router.get('/',  getAllBookings); // Admin-only list
module.exports = router;