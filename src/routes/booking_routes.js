const express = require("express");
const { addBooking, getAllBookings } = require("../controllers/booking_controller");

const bookingRouter = express.Router();

bookingRouter.post("/add", addBooking);
bookingRouter.get("/getall", getAllBookings);

module.exports = bookingRouter;
