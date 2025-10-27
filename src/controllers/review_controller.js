// src/controllers/review_controller.js
const { submitReview, getProviderReviewsService, getAllReviewsService } = require("../services/review_services");

async function submit(req, res) {
    try {
        const review = await submitReview(req.user.id, req.body);
        return res.status(201).json({ success: true, data: review });
    } catch (e) {
        return res.status(e.statusCode || 500).json({ success: false, error: e.reason });
    }
}

async function getProviderReviews(req, res) {
    try {
        const data = await getProviderReviewsService(req.params.id);
        return res.status(200).json({ success: true, data });
    } catch (e) {
        return res.status(e.statusCode || 500).json({ success: false, error: e.reason });
    }
}

async function getAllReviews(req, res) {
    try {
        const reviews = await getAllReviewsService();
        return res.status(200).json({ success: true, data: reviews });
    } catch (e) {
        return res.status(e.statusCode || 500).json({ success: false, error: e.reason });
    }
}

module.exports = { submit, getProviderReviews, getAllReviews };