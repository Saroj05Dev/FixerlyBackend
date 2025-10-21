const SubServiceRepository = require('../repositories/Sub_service_repository');

async function createSubService(subServiceData) {
    try {
        if (!subServiceData.name || !subServiceData.serviceId) {
            throw new Error("Name and serviceId are required");
        }
        return await SubServiceRepository.createSubService(subServiceData);
    } catch (error) {
        throw new Error(`Service error: Failed to create sub-service - ${error.message}`);
    }
}

async function getSubServiceById(id) {
    try {
        if (!id) throw new Error("SubService ID is required");
        const subService = await SubServiceRepository.getSubServiceById(id);
        if (!subService) throw new Error("SubService not found");
        return subService;
    } catch (error) {
        throw new Error(`Service error: Failed to get sub-service - ${error.message}`);
    }
}

async function getAllSubServices() {
    try {
        return await SubServiceRepository.getAllSubServices();
    } catch (error) {
        throw new Error(`Service error: Failed to get sub-services - ${error.message}`);
    }
}

async function getSubServicesByServiceId(serviceId) {
    try {
        if (!serviceId) throw new Error("Service ID is required");
        return await SubServiceRepository.getSubServicesByServiceId(serviceId);
    } catch (error) {
        throw new Error(`Service error: Failed to get sub-services - ${error.message}`);
    }
}

async function updateSubService(id, updateData) {
    try {
        if (!id) throw new Error("SubService ID is required");
        const subService = await SubServiceRepository.updateSubService(id, updateData);
        if (!subService) throw new Error("SubService not found");
        return subService;
    } catch (error) {
        throw new Error(`Service error: Failed to update sub-service - ${error.message}`);
    }
}

async function deleteSubService(id) {
    try {
        if (!id) throw new Error("SubService ID is required");
        const subService = await SubServiceRepository.deleteSubService(id);
        if (!subService) throw new Error("SubService not found");
        return subService;
    } catch (error) {
        throw new Error(`Service error: Failed to delete sub-service - ${error.message}`);
    }
}

module.exports = {
    createSubService,
    getSubServiceById,
    getAllSubServices,
    getSubServicesByServiceId,
    updateSubService,
    deleteSubService,
};