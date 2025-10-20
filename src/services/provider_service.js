const ProviderRepository = require("../repositories/provider_repository");
const bcrypt = require("bcrypt");
const { isValidObjectId } = require("mongoose");

class ProviderService {
    constructor() {
        this.providerRepository = ProviderRepository;
    }

    // ✅ Create a new provider with password hashing
    async createProvider(providerData) {
        try {
            // Validate required fields
            if (!providerData.name || !providerData.email || !providerData.phone || !providerData.password || !providerData.service_id) {
                throw new Error("Missing required fields: name, email, phone, password, or service_id");
            }

            // Validate service_id format
            if (!isValidObjectId(providerData.service_id)) {
                throw new Error("Invalid service_id format");
            }

            // Validate sub_service_id if provided
            if (providerData.sub_service_id && !isValidObjectId(providerData.sub_service_id)) {
                throw new Error("Invalid sub_service_id format");
            }

            // Hash password
            const saltRounds = 10;
            providerData.password_hash = await bcrypt.hash(providerData.password, saltRounds);
            delete providerData.password; // Remove plain password

            // Save provider
            return await this.providerRepository.createProvider(providerData);
        } catch (error) {
            throw new Error(`Service error: Failed to create provider - ${error.message}`);
        }
    }

    // ✅ Get provider by MongoDB _id
    async getProviderById(id) {
        try {
            if (!id) throw new Error("Provider ID is required");
            if (!isValidObjectId(id)) throw new Error("Invalid provider ID format");

            const provider = await this.providerRepository.getProviderById(id);
            if (!provider) throw new Error("Provider not found");

            return provider;
        } catch (error) {
            throw new Error(`Service error: Failed to get provider - ${error.message}`);
        }
    }

    // ✅ Get provider by email
    async getProviderByEmail(email) {
        try {
            if (!email) throw new Error("Email is required");

            const provider = await this.providerRepository.getProviderByEmail(email);
            if (!provider) throw new Error("Provider not found");

            return provider;
        } catch (error) {
            throw new Error(`Service error: Failed to get provider by email - ${error.message}`);
        }
    }

    // ✅ Get providers by service ID
    async getProvidersByServiceId(serviceId) {
        try {
            if (!isValidObjectId(serviceId)) throw new Error("Invalid service_id format");

            return await this.providerRepository.getProvidersByServiceId(serviceId);
        } catch (error) {
            throw new Error(`Service error: Failed to get providers by service ID - ${error.message}`);
        }
    }

    // ✅ Get all verified providers
    async getVerifiedProviders() {
        try {
            return await this.providerRepository.getVerifiedProviders();
        } catch (error) {
            throw new Error(`Service error: Failed to get verified providers - ${error.message}`);
        }
    }

    // ✅ Update provider details
    async updateProvider(id, updateData) {
        try {
            if (!id) throw new Error("Provider ID is required");
            if (!isValidObjectId(id)) throw new Error("Invalid provider ID format");

            // Prevent updating _id
            if (updateData._id) delete updateData._id;

            // Hash password if provided
            if (updateData.password) {
                const saltRounds = 10;
                updateData.password_hash = await bcrypt.hash(updateData.password, saltRounds);
                delete updateData.password;
            }

            // Validate service IDs
            if (updateData.service_id && !isValidObjectId(updateData.service_id)) {
                throw new Error("Invalid service_id format");
            }
            if (updateData.sub_service_id && !isValidObjectId(updateData.sub_service_id)) {
                throw new Error("Invalid sub_service_id format");
            }

            const provider = await this.providerRepository.updateProvider(id, updateData);
            if (!provider) throw new Error("Provider not found");

            return provider;
        } catch (error) {
            throw new Error(`Service error: Failed to update provider - ${error.message}`);
        }
    }

    // ✅ Delete provider
    async deleteProvider(id) {
        try {
            if (!id) throw new Error("Provider ID is required");
            if (!isValidObjectId(id)) throw new Error("Invalid provider ID format");

            const provider = await this.providerRepository.deleteProvider(id);
            if (!provider) throw new Error("Provider not found");

            return provider;
        } catch (error) {
            throw new Error(`Service error: Failed to delete provider - ${error.message}`);
        }
    }

    // ✅ Get all providers (no pagination)
    async getAllProviders({ serviceId, minRating } = {}) {
        try {
            if (serviceId && !isValidObjectId(serviceId)) throw new Error("Invalid service_id format");
            if (minRating && (minRating < 0 || minRating > 5)) throw new Error("Invalid rating range");

            return await this.providerRepository.getAllProviders({ serviceId, minRating });
        } catch (error) {
            throw new Error(`Service error: Failed to get providers - ${error.message}`);
        }
    }

    // ✅ Verify provider (set verified = true)
    async verifyProvider(id) {
        try {
            if (!id) throw new Error("Provider ID is required");
            if (!isValidObjectId(id)) throw new Error("Invalid provider ID format");

            const provider = await this.providerRepository.updateProvider(id, { verified: true });
            if (!provider) throw new Error("Provider not found");

            return provider;
        } catch (error) {
            throw new Error(`Service error: Failed to verify provider - ${error.message}`);
        }
    }
}

module.exports = new ProviderService();
