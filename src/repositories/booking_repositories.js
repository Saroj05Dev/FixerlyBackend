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
  findBookingById
};
