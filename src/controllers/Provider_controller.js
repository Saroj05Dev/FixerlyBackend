// src/controllers/Provider_controller.js
const { onboardProvider, getProviderProfile, updateProviderProfile, toggleAvailability, getEarnings } = require("../services/Provider_service");

async function onboard(req, res) {
    try { return res.status(200).json({ success: true, data: await onboardProvider(req.user.id, req.body) }); }
    catch (e) { return res.status(e.statusCode || 500).json({ success: false, error: e.reason }); }
}

async function getProfile(req, res) {
    try { return res.status(200).json({ success: true, data: await getProviderProfile(req.user.id) }); }
    catch (e) { return res.status(e.statusCode || 500).json({ success: false, error: e.reason }); }
}

async function updateProfile(req, res) {
    try { return res.status(200).json({ success: true, data: await updateProviderProfile(req.user.id, req.body) }); }
    catch (e) { return res.status(e.statusCode || 500).json({ success: false, error: e.reason }); }
}

async function toggleAvail(req, res) {
    try { return res.status(200).json({ success: true, data: await toggleAvailability(req.user.id, req.body.status) }); }
    catch (e) { return res.status(e.statusCode || 500).json({ success: false, error: e.reason }); }
}

async function getEarn(req, res) {
    try { return res.status(200).json({ success: true, data: await getEarnings(req.user.id) }); }
    catch (e) { return res.status(e.statusCode || 500).json({ success: false, error: e.reason }); }
}

module.exports = { onboard, getProfile, updateProfile, toggleAvail, getEarn };