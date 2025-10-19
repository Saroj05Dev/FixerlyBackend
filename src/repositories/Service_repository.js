const mongoose = require('mongoose');
const Service = require('../schema/Service_schema');

class ServiceRepository {
    async createService(serviceData) {
        const service = new Service(serviceData);
        return await service.save();
    }

    async getServiceById(id) {
        return await Service.findById(id);
    }

    async getAllServices() {
        return await Service.find();
    }

    async updateService(id, updateData) {
        return await Service.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteService(id) {
        return await Service.findByIdAndDelete(id);
    }
}

module.exports = new ServiceRepository();