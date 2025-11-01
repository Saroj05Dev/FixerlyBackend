const express = require("express");
const { addBooking, getAllBookings, getUserBookings } = require("../controllers/booking_controller");

const bookingRouter = express.Router();

bookingRouter.post("/add", addBooking);
bookingRouter.get("/getall", getAllBookings);
bookingRouter.get("/users/:id", getUserBookings);

module.exports = bookingRouter;
