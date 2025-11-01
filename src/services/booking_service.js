const {
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
  findBookingById,
  createBooking,
  getAllBookings,
} = require("../repositories/booking_repositories");

async function getCustomerBookingsService(id) {
  return await getCustomerBookings(id);
}
async function getProviderBookingsService(id) {
  return await getProviderBookings(id);
}

async function cancelBookingService(bookingId, userId) {
  const booking = await findBookingById(bookingId);
  if (!booking || booking.customer_id.toString() !== userId)
    throw { reason: "Unauthorized", statusCode: 403 };
  if (booking.status === "Cancelled")
    throw { reason: "Already cancelled", statusCode: 400 };
  return await updateBookingStatus(bookingId, "Cancelled");
}

async function updateBookingStatusService(bookingId, providerId, status) {
  const booking = await findBookingById(bookingId);
  if (!booking || booking.provider_id.toString() !== providerId)
    throw { reason: "Unauthorized", statusCode: 403 };
  const valid = {
    Pending: ["Confirmed"],
    Confirmed: ["In Progress", "Completed"],
    "In Progress": ["Completed"],
  };
  if (!valid[booking.status]?.includes(status))
    throw { reason: "Invalid status", statusCode: 400 };
  return await updateBookingStatus(bookingId, status);
}

async function createBookingService(userId, payload) {
  // payload must contain: provider_id, service_id, address, lat, long, amount
  const { provider_id, service_id, address, lat, long, amount } = payload;

  if (!provider_id || !service_id || !address || amount == null) {
    throw { reason: "Missing required fields", statusCode: 400 };
  }

  const bookingData = {
    customer_id: userId,
    provider_id,
    service_id,
    address,
    lat: lat ?? null,
    long: long ?? null,
    amount,
    // status & date are set by schema defaults
  };

  return await createBooking(bookingData);
}

async function getAllBookingsService() {
  return await getAllBookings();
}

module.exports = {
  getCustomerBookingsService,
  getProviderBookingsService,
  cancelBookingService,
  updateBookingStatusService,
  createBookingService, // ← NEW
  getAllBookingsService,
};
