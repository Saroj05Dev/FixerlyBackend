const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/Service_controller');

router.post('/', serviceController.createService);

router.get('/', serviceController.getAllServices);

router.get('/:id', serviceController.getServiceById);

router.put('/:id', serviceController.updateService);

router.delete('/:id', serviceController.deleteService);

// router.get('/api/search', serviceController.searchServices);

module.exports = router;
