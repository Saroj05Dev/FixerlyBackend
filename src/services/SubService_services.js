const SubServiceRepository = require('../repositories/Sub_service_repository');

class SubServiceService {
    constructor() {
        this.subServiceRepository = SubServiceRepository;
    }

    async createSubService(subServiceData) {
        try {
            if (!subServiceData.name || !subServiceData.serviceId) {
                throw new Error("Name and serviceId are required");
            }
            // No id check since it's removed from schema
            return await this.subServiceRepository.createSubService(subServiceData);
        } catch (error) {
            throw new Error(`Service error: Failed to create sub-service - ${error.message}`);
        }
    }

    async getSubServiceById(id) {
        try {
            if (!id) throw new Error("SubService ID is required");
            const subService = await this.subServiceRepository.getSubServiceById(id);
            if (!subService) throw new Error("SubService not found");
            return subService;
        } catch (error) {
            throw new Error(`Service error: Failed to get sub-service - ${error.message}`);
        }
    }


      async getAllSubServices() {
        return await this.subServiceRepository.getAllSubServices();
    }


    async getSubServicesByServiceId(serviceId) {
        try {
            if (!serviceId) throw new Error("Service ID is required");
            return await this.subServiceRepository.getSubServicesByServiceId(serviceId);
        } catch (error) {
            throw new Error(`Service error: Failed to get sub-services - ${error.message}`);
        }
    }

    async updateSubService(id, updateData) {
        try {
            if (!id) throw new Error("SubService ID is required");
            const subService = await this.subServiceRepository.updateSubService(id, updateData);
            if (!subService) throw new Error("SubService not found");
            return subService;
        } catch (error) {
            throw new Error(`Service error: Failed to update sub-service - ${error.message}`);
        }
    }

    async deleteSubService(id) {
        try {
            if (!id) throw new Error("SubService ID is required");
            const subService = await this.subServiceRepository.deleteSubService(id);
            if (!subService) throw new Error("SubService not found");
            return subService;
        } catch (error) {
            throw new Error(`Service error: Failed to delete sub-service - ${error.message}`);
        }
    }
}

module.exports = new SubServiceService();