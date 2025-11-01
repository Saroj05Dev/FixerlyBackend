const mongoose = require('mongoose');
const SubService = require('../schema/Subservice_schema');

async function createSubService(subServiceData) {
    const subService = new SubService(subServiceData);
    return await subService.save();
}

async function getSubServiceById(id) {
    return await SubService.findById(id).populate({
        path: 'serviceId',
        select: 'name description',
    });
}

async function getAllSubServices() {
    return await SubService.find().populate({
        path: 'serviceId',
        select: 'name description',
    }).sort({ createdAt: -1 });
}

async function getSubServicesByServiceId(serviceId) {
    return await SubService.find({ serviceId }).populate({
        path: 'serviceId',
        select: 'name description',
    });
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