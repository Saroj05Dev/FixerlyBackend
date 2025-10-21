const mongoose = require('mongoose');
const SubService = require('../schema/Subservice_schema');

async function createSubService(subServiceData) {
    const subService = new SubService(subServiceData);
    return await subService.save();
}

async function getSubServiceById(id) {
    return await SubService.findById(id).populate('serviceId');
}

async function getAllSubServices() {
    return await SubService.find().populate('serviceId').sort({ createdAt: -1 });
}

async function getSubServicesByServiceId(serviceId) {
    return await SubService.find({ serviceId }).populate('serviceId');
}

async function updateSubService(id, updateData) {
    return await SubService.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteSubService(id) {
    return await SubService.findByIdAndDelete(id);
}

module.exports = {
    createSubService,
    getSubServiceById,
    getAllSubServices,
    getSubServicesByServiceId,
    updateSubService,
    deleteSubService,
};