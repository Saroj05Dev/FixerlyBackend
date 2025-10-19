const express = require('express');
const router = express.Router();
const subServiceController = require('../controllers/Sub_services_controler');

router.post('/', subServiceController.createSubService);
router.get('/:id', subServiceController.getSubServiceById);
router.get('/service/:serviceId', subServiceController.getSubServicesByServiceId);
router.put('/:id', subServiceController.updateSubService);
router.delete('/:id', subServiceController.deleteSubService);

module.exports = router;