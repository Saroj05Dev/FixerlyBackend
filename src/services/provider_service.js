const ProviderRepository = require("../repositories/provider_repository"); 
const bcrypt = require("bcrypt"); // For password hashing
const { isValidObjectId } = require("mongoose");

class ProviderService {
    constructor() {
        this.providerRepository = ProviderRepository;
    }

    // Create a new provider with password hashing
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
            delete providerData.password; // Remove plain password from data

            // Generate a unique custom ID if not provided
            if (!providerData.id) {
                providerData.id = await this.generateUniqueId();
            }

            return await this.providerRepository.createProvider(providerData);
        } catch (error) {
            throw new Error(`Service error: Failed to create provider - ${error.message}`);
        }
    }

    // Generate a unique custom ID
    async generateUniqueId() {
        let id;
        let isUnique = false;
        do {
            id = Math.floor(Math.random() * 1000000);
            const existingProvider = await this.providerRepository.getProviderById(id);
            if (!existingProvider) isUnique = true;
        } while (!isUnique);
        return id;
    }

    // Get a provider by ID
    async getProviderById(id) {
        try {
            if (!id) throw new Error("Provider ID is required");
            const provider = await this.providerRepository.getProviderById(id);
            if (!provider) throw new Error("Provider not found");
            return provider;
        } catch (error) {
            throw new Error(`Service error: Failed to get provider - ${error.message}`);
        }
    }

    // Get a provider by email
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

    // Get providers by service ID
    async getProvidersByServiceId(serviceId) {
        try {
            if (!isValidObjectId(serviceId)) throw new Error("Invalid service_id format");
            const providers = await this.providerRepository.getProvidersByServiceId(serviceId);
            return providers;
        } catch (error) {
            throw new Error(`Service error: Failed to get providers by service ID - ${error.message}`);
        }
    }

    // Get all verified providers
    async getVerifiedProviders() {
        try {
            return await this.providerRepository.getVerifiedProviders();
        } catch (error) {
            throw new Error(`Service error: Failed to get verified providers - ${error.message}`);
        }
    }

    // Update a provider
    async updateProvider(id, updateData) {
        try {
            if (!id) throw new Error("Provider ID is required");

            // Prevent updating the ID field
            if (updateData.id) {
                throw new Error("Cannot update provider ID");
            }

            // Hash password if provided
            if (updateData.password) {
                const saltRounds = 10;
                updateData.password_hash = await bcrypt.hash(updateData.password, saltRounds);
                delete updateData.password;
            }

            // Validate service_id and sub_service_id if provided
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

    // Delete a provider
    async deleteProvider(id) {
        try {
            if (!id) throw new Error("Provider ID is required");
            const provider = await this.providerRepository.deleteProvider(id);
            if (!provider) throw new Error("Provider not found");
            return provider;
        } catch (error) {
            throw new Error(`Service error: Failed to delete provider - ${error.message}`);
        }
    }

    // Get all providers with filters and pagination
    async getAllProviders({ page = 1, limit = 10, serviceId, minRating }) {
        try {
            if (page < 1 || limit < 1) throw new Error("Invalid pagination parameters");
            if (serviceId && !isValidObjectId(serviceId)) throw new Error("Invalid service_id format");
            if (minRating && (minRating < 0 || minRating > 5)) throw new Error("Invalid rating range");

            return await this.providerRepository.getAllProviders({ page, limit, serviceId, minRating });
        } catch (error) {
            throw new Error(`Service error: Failed to get providers - ${error.message}`);
        }
    }

    // Verify a provider
    async verifyProvider(id) {
        try {
            if (!id) throw new Error("Provider ID is required");
            const provider = await this.providerRepository.updateProvider(id, { verified: true });
            if (!provider) throw new Error("Provider not found");
            return provider;
        } catch (error) {
            throw new Error(`Service error: Failed to verify provider - ${error.message}`);
        }
    }
}

module.exports = new ProviderService();