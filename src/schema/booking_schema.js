const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending"
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be positive"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
