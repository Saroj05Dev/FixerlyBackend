// src/routes/Provider_routes.js
const express = require('express');
const { onboard, getProfile, updateProfile, toggleAvail, getEarn } = require('../controllers/Provider_controller');
const { isAuthenticated, isAuthorized } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/onboard', isAuthenticated, onboard);
router.get('/profile', isAuthenticated, isAuthorized(['provider']), getProfile);
router.put('/profile', isAuthenticated, isAuthorized(['provider']), updateProfile);
router.put('/availability', isAuthenticated, isAuthorized(['provider']), toggleAvail);
router.get('/earnings', isAuthenticated, isAuthorized(['provider']), getEarn);

module.exports = router;