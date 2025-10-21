const { createBooking, getAllBookingsRepo } = require("../repositories/booking_repositories");

async function registerBooking(bookingDetails) {
    const { customer_id, provider_id, service_id, status, address, lat, long, amount, date } = bookingDetails;

    if (!customer_id || !provider_id || !service_id) {
        throw { reason: "Customer, provider, and service are required", statusCode: 400 };
    }

    const newBooking = await createBooking({
        customer_id,
        provider_id,
        service_id,
        status,
        address,
        lat,
        long,
        amount,
        date: date || new Date()
    });

    if (!newBooking) {
        throw { reason: "Failed to create booking", statusCode: 500 };
    }

    return newBooking;
}

async function getAllBookingsService() {
    return await getAllBookingsRepo();
}

module.exports = {
    registerBooking,
    getAllBookingsService
};
