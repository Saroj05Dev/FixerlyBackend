const {
    createBooking,
    getAllBookingsRepo,
    getBookingsByUserId 
} = require("../repositories/booking_repositories");

async function registerBooking(bookingDetails) {
    const { user_id, provider_id, service_id, status, address, lat, long, amount, date } = bookingDetails;

    if (!user_id || !provider_id || !service_id) {
        throw { reason: "User, provider, and service are required", statusCode: 400 };
    }

    const newBooking = await createBooking({
        user_id,
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

async function getUserBookingsService(userId) {
    if (!userId) {
        throw { reason: "User ID is required", statusCode: 400 };
    }

    const bookings = await getBookingsByUserId(userId);

    return bookings;
}

module.exports = {
    registerBooking,
    getAllBookingsService,
    getUserBookingsService
};
