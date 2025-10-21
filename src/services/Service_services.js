const ServiceRepository = require('../repositories/Service_repository');

async function createService(serviceData) {
    try {
        if (!serviceData.name) {
            throw new Error("Name is required");
        }
        return await ServiceRepository.createService(serviceData);
    } catch (error) {
        throw new Error(`Service error: Failed to create service - ${error.message}`);
    }
}

async function getServiceById(id) {
    try {
        if (!id) throw new Error("Service ID is required");
        const service = await ServiceRepository.getServiceById(id);
        if (!service) throw new Error("Service not found");
        return service;
    } catch (error) {
        throw new Error(`Service error: Failed to get service - ${error.message}`);
    }
}

async function getAllServices() {
    try {
        return await ServiceRepository.getAllServices();
    } catch (error) {
        throw new Error(`Service error: Failed to get services - ${error.message}`);
    }
}

async function updateService(id, updateData) {
    try {
        if (!id) throw new Error("Service ID is required");
        const service = await ServiceRepository.updateService(id, updateData);
        if (!service) throw new Error("Service not found");
        return service;
    } catch (error) {
        throw new Error(`Service error: Failed to update service - ${error.message}`);
    }
}

async function deleteService(id) {
    try {
        if (!id) throw new Error("Service ID is required");
        const service = await ServiceRepository.deleteService(id);
        if (!service) throw new Error("Service not found");
        return service;
    } catch (error) {
        throw new Error(`Service error: Failed to delete service - ${error.message}`);
    }
}

module.exports = {
    createService,
    getServiceById,
    getAllServices,
    updateService,
    deleteService,
};