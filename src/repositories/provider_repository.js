const mongoose = require("mongoose");
const Provider = require("../schema/provider_schema");

class ProviderRepository {
    // ✅ Create a new provider
    async createProvider(providerData) {
        try {
            const provider = new Provider(providerData);
            return await provider.save();
        } catch (error) {
            throw new Error(`Failed to create provider: ${error.message}`);
        }
    }

    // ✅ Find a provider by MongoDB _id
    async getProviderById(id) {
        try {
            return await Provider.findById(id).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get provider by ID: ${error.message}`);
        }
    }

    // ✅ Find a provider by email
    async getProviderByEmail(email) {
        try {
            return await Provider.findOne({ email }).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get provider by email: ${error.message}`);
        }
    }

    // ✅ Find all providers by service ID
    async getProvidersByServiceId(serviceId) {
        try {
            return await Provider.find({ service_id: serviceId }).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get providers by service ID: ${error.message}`);
        }
    }

    // ✅ Find all verified providers
    async getVerifiedProviders() {
        try {
            return await Provider.find({ verified: true }).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get verified providers: ${error.message}`);
        }
    }

    // ✅ Update a provider by _id
    async updateProvider(id, updateData) {
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

    // ✅ Delete a provider by _id
    async deleteProvider(id) {
        try {
            return await Provider.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Failed to delete provider: ${error.message}`);
        }
    }

    // ✅ Get all providers (no pagination — show all together)
    async getAllProviders({ serviceId, minRating } = {}) {
        try {
            const query = {};
            if (serviceId) query.service_id = serviceId;
            if (minRating) query.average_rating = { $gte: minRating };

            return await Provider.find(query).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get providers: ${error.message}`);
        }
    }
}

module.exports = new ProviderRepository();
