const Booking = require("../schema/booking_schema");

async function findBookingById(id) {
  return await Booking.findById(id);
}
async function getCustomerBookings(id) {
  return await Booking.find({ customer_id: id })
    .populate("provider_id", "name phone rates, workArea")
    .populate("service_id", "name description")
    .populate("customer_id", "name phone")
    .sort({ date: -1 });
}
async function getProviderBookings(id) {
  return await Booking.find({ provider_id: id })
    .populate("customer_id", "name phone")
    .populate("service_id", "name description")
    .populate("provider_id", "name phone rates, workArea")
    .sort({ date: -1 });
}
async function updateBookingStatus(id, status) {
  return await Booking.findByIdAndUpdate(id, { status }, { new: true });
}
async function createBooking(bookingData) {
  const booking = new Booking(bookingData);
  return await booking.save();
}

async function getAllBookings() {
  return await Booking.find({})
    .populate("customer_id", "name phone")
    .populate("provider_id", "name phone rates")
    .populate("service_id", "name")
    .sort({ date: -1 });
}
module.exports = {
  findBookingById,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
  createBooking,
  getAllBookings,
};
