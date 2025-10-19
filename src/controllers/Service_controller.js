const ServiceService = require('../services/Service_services');

async function createService(req, res) {
    try {
        const serviceData = req.body;
        const service = await ServiceService.createService(serviceData);
        return res.status(201).json({
            success: true,
            data: service,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getServiceById(req, res) {
    try {
        const { id } = req.params;
        const service = await ServiceService.getServiceById(id);
        return res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

async function getAllServices(req, res) {
    try {
        const services = await ServiceService.getAllServices();
        return res.status(200).json({
            success: true,
            data: services,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function updateService(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const service = await ServiceService.updateService(id, updateData);
        return res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

async function deleteService(req, res) {
    try {
        const { id } = req.params;
        const service = await ServiceService.deleteService(id);
        return res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    createService,
    getServiceById,
    getAllServices,
    updateService,
    deleteService,
};