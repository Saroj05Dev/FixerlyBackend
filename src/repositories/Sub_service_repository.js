// src/repositories/subservice_repository.js
const mongoose = require('mongoose');
const SubService = require('../schema/Subservice_schema');

async function createSubService(subServiceData) {
    try {
        const subService = new SubService(subServiceData);
        return await subService.save();
    } catch (error) {
        throw error;
    }
}

async function getSubServiceById(id) {
    try {
        const subService = await SubService.findById(id).populate('serviceId');
        if (!subService) throw new Error("Sub-service not found");
        return subService;
    } catch (error) {
        throw error;
    }
}

async function getAllSubServices() {
    try {
        return await SubService.find()
            .populate('serviceId')
            .sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
}

async function getSubServicesByServiceId(serviceId) {
    try {
        const subServices = await SubService.find({ serviceId }).populate('serviceId');
        if (!subServices || subServices.length === 0)
            throw new Error("No sub-services found for the given service ID");
        return subServices;
    } catch (error) {
        throw error;
    }
}

async function updateSubService(id, updateData) {
    try {
        const updated = await SubService.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) throw new Error("Sub-service not found to update");
        return updated;
    } catch (error) {
        throw error;
    }
}

async function deleteSubService(id) {
    try {
        const deleted = await SubService.findByIdAndDelete(id);
        if (!deleted) throw new Error("Sub-service not found to delete");
        return deleted;
    } catch (error) {
        throw error;
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
