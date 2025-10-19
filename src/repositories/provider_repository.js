const mongoose = require("mongoose");
const Provider = require("../schema/provider_schema"); 

class ProviderRepository {
    // Create a new provider
    async createProvider(providerData) {
        try {
            const provider = new Provider(providerData);
            return await provider.save();
        } catch (error) {
            throw new Error(`Failed to create provider: ${error.message}`);
        }
    }

    // Find a provider by ID
    async getProviderById(id) {
        try {
            return await Provider.findOne({ id }).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get provider by ID: ${error.message}`);
        }
    }

    // Find a provider by email
    async getProviderByEmail(email) {
        try {
            return await Provider.findOne({ email }).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get provider by email: ${error.message}`);
        }
    }

    // Find all providers by service ID
    async getProvidersByServiceId(serviceId) {
        try {
            return await Provider.find({ service_id: serviceId }).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get providers by service ID: ${error.message}`);
        }
    }

    // Find all verified providers
    async getVerifiedProviders() {
        try {
            return await Provider.find({ verified: true }).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to get verified providers: ${error.message}`);
        }
    }

    // Update a provider by ID
    async updateProvider(id, updateData) {
        try {
            return await Provider.findOneAndUpdate(
                { id },
                { $set: updateData },
                { new: true, runValidators: true }
            ).populate("service_id sub_service_id");
        } catch (error) {
            throw new Error(`Failed to update provider: ${error.message}`);
        }
    }

    // Delete a provider by ID
    async deleteProvider(id) {
        try {
            return await Provider.findOneAndDelete({ id });
        } catch (error) {
            throw new Error(`Failed to delete provider: ${error.message}`);
        }
    }

    // Get all providers with pagination and optional filters
    async getAllProviders({ page = 1, limit = 10, serviceId, minRating }) {
        try {
            const query = {};
            if (serviceId) query.service_id = serviceId;
            if (minRating) query.average_rating = { $gte: minRating };

            return await Provider.find(query)
                .populate("service_id sub_service_id")
                .skip((page - 1) * limit)
                .limit(limit);
        } catch (error) {
            throw new Error(`Failed to get providers: ${error.message}`);
        }
    }
}

module.exports = new ProviderRepository();