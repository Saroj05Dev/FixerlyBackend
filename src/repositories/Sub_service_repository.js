const mongoose = require('mongoose');
const SubService = require('../schema/Subservice_schema');

class SubServiceRepository {
    async createSubService(subServiceData) {
        const subService = new SubService(subServiceData);
        return await subService.save();
    }

    async getSubServiceById(id) {
        return await SubService.findById(id).populate('serviceId');
    }

    async getSubServicesByServiceId(serviceId) {
        return await SubService.find({ serviceId }).populate('serviceId');
    }

    async updateSubService(id, updateData) {
        return await SubService.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteSubService(id) {
        return await SubService.findByIdAndDelete(id);
    }
}

module.exports = new SubServiceRepository();