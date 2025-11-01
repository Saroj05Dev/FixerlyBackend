// src/repositories/booking_repository.js
const Booking = require("../schema/booking_schema");


async function findBookingById(id) {
    try {
        const booking = await Booking.findById(id);
        if (!booking) throw new Error("Booking not found");
        return booking;
    } catch (error) {
        throw new Error(`Error finding booking by ID: ${error.message}`);
    }
}


async function getCustomerBookings(customerId) {
    try {
        return await Booking.find({ customer_id: customerId })
            .populate('provider_id', 'name phone rates')
            .populate('service_id', 'title')
            .sort({ date: -1 });
    } catch (error) {
        throw new Error(`Error fetching customer bookings: ${error.message}`);
    }
}


async function getProviderBookings(providerId) {
    try {
        return await Booking.find({ provider_id: providerId })
            .populate('customer_id', 'name phone')
            .populate('service_id', 'title')
            .sort({ date: -1 });
    } catch (error) {
        throw new Error(`Error fetching provider bookings: ${error.message}`);
    }
}


async function updateBookingStatus(id, status) {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBooking) throw new Error("Booking not found to update");
        return updatedBooking;
    } catch (error) {
        throw new Error(`Error updating booking status: ${error.message}`);
    }
}


async function createBooking(bookingData) {
    try {
        const booking = new Booking(bookingData);
        return await booking.save();
    } catch (error) {
        throw new Error(`Error creating booking: ${error.message}`);
    }
}


async function getAllBookings() {
    try {
        return await Booking.find({})
            .populate('customer_id', 'name phone')
            .populate('provider_id', 'name phone rates')
            .populate('service_id', 'title')
            .sort({ date: -1 });
    } catch (error) {
        throw new Error(`Error fetching all bookings: ${error.message}`);
    }
}

module.exports = {
    findBookingById,
    getCustomerBookings,
    getProviderBookings,
    updateBookingStatus,
    createBooking,
    getAllBookings,
};
