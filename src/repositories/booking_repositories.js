const Booking = require("../schema/booking_schema");

// Create a new booking
async function createBooking(data) {
  try {
    const res = await Booking.create(data);
    return res;
  } catch (error) {
    console.log("Error in createBooking:", error);
  }
}

// Get all bookings
async function getAllBookingsRepo() {
  try {
    const res = await Booking.find()
      .populate("user_id")       // changed from customer_id
      .populate("provider_id")
      .populate("service_id");
    return res;
  } catch (error) {
    console.log("Error in getAllBookingsRepo:", error);
  }
}

// Get a single booking by ID
async function findBookingById(id) {
  try {
    const res = await Booking.findById(id)
      .populate("user_id")       // changed from customer_id
      .populate("provider_id")
      .populate("service_id");
    return res;
  } catch (error) {
    console.log("Error in findBookingById:", error);
  }
}

async function getBookingsByUserId(userId) {
  try {
    const res = await Booking.find({ user_id: userId })
      .populate("user_id")
      .populate("provider_id")
      .populate("service_id");
    return res || []; // return empty array if query fails
  } catch (error) {
    console.log("Error in getBookingsByUserId:", error);
    return []; // prevent undefined
  }
}

module.exports = {
  createBooking,
  getAllBookingsRepo,
  findBookingById,
  getBookingsByUserId
};
