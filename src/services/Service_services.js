const ServiceRepository = require('../repositories/Service_repository');

class ServiceService {
    constructor() {
        this.serviceRepository = ServiceRepository;
    }

    async createService(serviceData) {
        try {
            if (!serviceData.name) {
                throw new Error("Name is required");
            }
            // No id check since it's removed from schema
            return await this.serviceRepository.createService(serviceData);
        } catch (error) {
            throw new Error(`Service error: Failed to create service - ${error.message}`);
        }
    }

    async getServiceById(id) {
        try {
            if (!id) throw new Error("Service ID is required");
            const service = await this.serviceRepository.getServiceById(id);
            if (!service) throw new Error("Service not found");
            return service;
        } catch (error) {
            throw new Error(`Service error: Failed to get service - ${error.message}`);
        }
    }

    async getAllServices() {
        try {
            return await this.serviceRepository.getAllServices();
        } catch (error) {
            throw new Error(`Service error: Failed to get services - ${error.message}`);
        }
    }

    async updateService(id, updateData) {
        try {
            if (!id) throw new Error("Service ID is required");
            const service = await this.serviceRepository.updateService(id, updateData);
            if (!service) throw new Error("Service not found");
            return service;
        } catch (error) {
            throw new Error(`Service error: Failed to update service - ${error.message}`);
        }
    }

    async deleteService(id) {
        try {
            if (!id) throw new Error("Service ID is required");
            const service = await this.serviceRepository.deleteService(id);
            if (!service) throw new Error("Service not found");
            return service;
        } catch (error) {
            throw new Error(`Service error: Failed to delete service - ${error.message}`);
        }
    }
}

module.exports = new ServiceService();