const { registerBooking, getAllBookingsService, getUserBookingsService } = require("../services/booking_service");

async function addBooking(req, res) {
    try {
        const booking = await registerBooking(req.body);
        return res.status(201).json({
            success: true,
            message: "Booking successfully",
            data: booking
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || "Error creating booking",
            error: error
        });
    }
}

async function getAllBookings(req, res) {
    try {
        const bookings = await getAllBookingsService();
        return res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching bookings",
            error: error
        });
    }
}

async function getUserBookings(req, res) {
    try {
        const { id } = req.params;
        const bookings = await getUserBookingsService(id);
        return res.status(200).json({
            success: true,
            data: bookings.length ? bookings : [],
            message: bookings.length
                ? "User bookings fetched successfully"
                : "No bookings found for this user"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user bookings",
            error: error.message
        });
    }
}

module.exports = { addBooking, getAllBookings, getUserBookings };

