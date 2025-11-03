const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/Service_controller');
const { isAuthenticated, isAuthorized } = require('../middlewares/authMiddleware');

// Create a new service
router.post('/', isAuthenticated, isAuthorized(['admin']), serviceController.createService);

// Get all services
router.get('/', serviceController.getAllServices);

// Get a specific service by ID
router.get('/:id', serviceController.getServiceById);

// Update a service by ID
router.put('/:id', serviceController.updateService);

// Delete a service by ID
router.delete('/:id', serviceController.deleteService);

module.exports = router;
