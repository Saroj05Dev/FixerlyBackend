// src/services/booking_service.js
const { getCustomerBookings, getProviderBookings, updateBookingStatus, findBookingById ,createBooking, getAllBookings} = require("../repositories/booking_repositories");

async function registerBooking(bookingDetails) {
    const { customer_id, provider_id, service_id, status, address, lat, long, amount, date } = bookingDetails;

    if (!customer_id || !provider_id || !service_id) {
        throw { reason: "Customer, provider, and service are required", statusCode: 400 };
    }

    const newBooking = await createBooking({
        customer_id,
        provider_id,
        service_id,
        address,
        lat: lat ?? null,
        long: long ?? null,
        amount,
        // status & date are set by schema defaults
    });

    return await createBooking(bookingData);
}


async function getAllBookingsService() {
    return await getAllBookings();
}

async function getUserBookingsService(userId) {
    if (!userId) {
        throw { reason: "User ID is required", statusCode: 400 };
    }

    const bookings = await getBookingsByUserId(userId);

    return bookings;
}

module.exports = {
    registerBooking,
    getAllBookingsService
};
