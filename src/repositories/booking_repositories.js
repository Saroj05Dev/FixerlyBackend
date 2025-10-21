const Booking = require("../schema/booking_schema");

// 🟢 Create new booking
async function createBooking(data) {
  try {
    const res = await Booking.create(data);
    return res;
  } catch (error) {
    console.log("Error in createBooking:", error);
  }
}

// 🟢 Fetch all bookings
async function getAllBookingsRepo() {
  try {
    const res = await Booking.find()
      .populate("customer_id")
      .populate("provider_id")
      .populate("service_id");
    return res;
  } catch (error) {
    console.log("Error in getAllBookingsRepo:", error);
  }
}

// 🟢 Find booking by ID
async function findBookingById(id) {
  try {
    const res = await Booking.findById(id)
      .populate("customer_id")
      .populate("provider_id")
      .populate("service_id");
    return res;
  } catch (error) {
    console.log("Error in findBookingById:", error);
  }
}

module.exports = {
  createBooking,
  getAllBookingsRepo,
  findBookingById
};
