const {
  updateUserById,
  findUserById,
} = require("../repositories/userRepository");
const mongoose = require("mongoose");

async function onboardProvider(userId, data) {
  return await updateUserById(userId, {
    role: "provider",
    kycStatus: "pending",
    rates: data.rates,
    workArea: data.workArea,
    experienceYears: data.experienceYears,
    kycDocs: data.kycDocs,
    availability: "offline",
  });
}

async function getProviderProfile(id) {
  const user = await findUserById(id);
  if (!user || user.role !== "provider")
    throw { reason: "Provider not found", statusCode: 404 };
  return user;
}

async function updateProviderProfile(id, data) {
  const allowed = ["rates", "workArea", "experienceYears"];
  const updates = {};
  allowed.forEach((k) => {
    if (data[k] !== undefined) updates[k] = data[k];
  });
  return await updateUserById(id, updates);
}

async function toggleAvailability(id, status) {
  if (!["online", "offline"].includes(status))
    throw { reason: "Invalid status", statusCode: 400 };
  return await updateUserById(id, { availability: status });
}

async function getEarnings(id) {
  const Booking = require("../schema/booking_schema");
  const completed = await Booking.countDocuments({
    provider_id: id,
    status: "Completed",
  });
  const agg = await Booking.aggregate([
    {
      $match: {
        provider_id: new mongoose.Types.ObjectId(id),
        status: "Completed",
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  return { completedJobs: completed, monthlyEarnings: agg[0]?.total || 0 };
}

module.exports = {
  onboardProvider,
  getProviderProfile,
  updateProviderProfile,
  toggleAvailability,
  getEarnings,
};
