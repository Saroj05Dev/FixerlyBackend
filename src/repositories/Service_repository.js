const mongoose = require('mongoose');
const Service = require('../schema/Service_schema');

async function createService(serviceData) {
    const service = new Service(serviceData);
    return await service.save();
}

async function getServiceById(id) {
    return await Service.findById(id);
}

async function getAllServices() {
    return await Service.find();
}

async function updateService(id, updateData) {
    return await Service.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteService(id) {
    return await Service.findByIdAndDelete(id);
}

module.exports = {
    createService,
    getServiceById,
    getAllServices,
    updateService,
    deleteService,
};