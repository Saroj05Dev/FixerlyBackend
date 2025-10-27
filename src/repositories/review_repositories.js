// src/repositories/review_repository.js
const Review = require("../schema/review_schema");

async function createReview(data) {
    return await Review.create(data);
}

async function getAllReviews() {
    return await Review.find().populate('customer_id', 'name').populate('provider_id', 'name').sort({ createdAt: -1 });
}

async function getProviderReviews(providerId) {
    return await Review.find({ provider_id: providerId, isVisible: true })
        .populate('customer_id', 'name')
        .sort({ createdAt: -1 });
}

async function hideReview(id) {
    return await Review.findByIdAndUpdate(id, { isVisible: false }, { new: true });
}

async function findReviewById(id) {
    return await Review.findById(id);
}

module.exports = { createReview, getAllReviews, getProviderReviews, hideReview, findReviewById };