const mongoose = require("mongoose");
const Provider = require("../schema/provider_schema");

async function createProvider(providerData) {
    try {
        const provider = new Provider(providerData);
        return await provider.save();
    } catch (error) {
        throw new Error(`Failed to create provider: ${error.message}`);
    }
}

async function getProviderById(id) {
    try {
        return await Provider.findById(id).populate("service_id sub_service_id");
    } catch (error) {
        throw new Error(`Failed to get provider by ID: ${error.message}`);
    }
}

async function getProviderByEmail(email) {
    try {
        return await Provider.findOne({ email }).populate("service_id sub_service_id");
    } catch (error) {
        throw new Error(`Failed to get provider by email: ${error.message}`);
    }
}

async function getProvidersByServiceId(serviceId) {
    try {
        return await Provider.find({ service_id: serviceId }).populate("service_id sub_service_id");
    } catch (error) {
        throw new Error(`Failed to get providers by service ID: ${error.message}`);
    }
}

async function getVerifiedProviders() {
    try {
        return await Provider.find({ verified: true }).populate("service_id sub_service_id");
    } catch (error) {
        throw new Error(`Failed to get verified providers: ${error.message}`);
    }
}

async function updateProvider(id, updateData) {
    try {
        return await Provider.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).populate("service_id sub_service_id");
    } catch (error) {
        throw new Error(`Failed to update provider: ${error.message}`);
    }
}

async function deleteProvider(id) {
    try {
        return await Provider.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Failed to delete provider: ${error.message}`);
    }
}

async function getAllProviders({ serviceId, minRating } = {}) {
    try {
        const query = {};
        if (serviceId) query.service_id = serviceId;
        if (minRating) query.average_rating = { $gte: minRating };

        return await Provider.find(query).populate("service_id sub_service_id");
    } catch (error) {
        throw new Error(`Failed to get providers: ${error.message}`);
    }
}

module.exports = {
    createProvider,
    getProviderById,
    getProviderByEmail,
    getProvidersByServiceId,
    getVerifiedProviders,
    updateProvider,
    deleteProvider,
    getAllProviders,
};