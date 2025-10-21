const bcrypt = require("bcryptjs");
const ProviderRepository = require("../repositories/provider_repository");
const { isValidObjectId } = require("mongoose");

// ✅ Create a new provider
async function createProvider(providerData) {
    try {
        const { name, email, phone, password, service_id, sub_service_id } = providerData;

        if (!name || !email || !phone || !password || !service_id) {
            throw { reason: "Missing required fields", statusCode: 400 };
        }

        if (!isValidObjectId(service_id)) throw { reason: "Invalid service_id format", statusCode: 400 };
        if (sub_service_id && !isValidObjectId(sub_service_id)) throw { reason: "Invalid sub_service_id format", statusCode: 400 };

        const password_hash = await bcrypt.hash(password, 10);

        const newProvider = await ProviderRepository.createProvider({
            ...providerData,
            password_hash,
            password: undefined
        });

        if (!newProvider) throw { reason: "Failed to create provider", statusCode: 500 };

        return newProvider;
    } catch (error) {
        throw error.reason ? error : { reason: `Service error: Failed to create provider - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Get provider by ID
async function getProviderById(id) {
    try {
        if (!id) throw { reason: "Provider ID is required", statusCode: 400 };
        if (!isValidObjectId(id)) throw { reason: "Invalid provider ID format", statusCode: 400 };

        const provider = await ProviderRepository.getProviderById(id);
        if (!provider) throw { reason: "Provider not found", statusCode: 404 };

        return provider;
    } catch (error) {
        throw error.reason ? error : { reason: `Service error: Failed to get provider - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Get provider by email
async function getProviderByEmail(email) {
    try {
        if (!email) throw { reason: "Email is required", statusCode: 400 };

        const provider = await ProviderRepository.getProviderByEmail(email);
        if (!provider) throw { reason: "Provider not found", statusCode: 404 };

        return provider;
    } catch (error) {
        throw error.reason ? error : { reason: `Service error: Failed to get provider by email - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Get providers by service ID
async function getProvidersByServiceId(serviceId) {
    try {
        if (!isValidObjectId(serviceId)) throw { reason: "Invalid service_id format", statusCode: 400 };

        return await ProviderRepository.getProvidersByServiceId(serviceId);
    } catch (error) {
        throw error.reason ? error : { reason: `Service error: Failed to get providers by service ID - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Get all verified providers
async function getVerifiedProviders() {
    try {
        return await ProviderRepository.getVerifiedProviders();
    } catch (error) {
        throw { reason: `Service error: Failed to get verified providers - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Update provider
async function updateProvider(id, updateData) {
    try {
        if (!id) throw { reason: "Provider ID is required", statusCode: 400 };
        if (!isValidObjectId(id)) throw { reason: "Invalid provider ID format", statusCode: 400 };

        if (updateData._id) delete updateData._id;

        if (updateData.password) {
            updateData.password_hash = await bcrypt.hash(updateData.password, 10);
            delete updateData.password;
        }

        if (updateData.service_id && !isValidObjectId(updateData.service_id)) throw { reason: "Invalid service_id format", statusCode: 400 };
        if (updateData.sub_service_id && !isValidObjectId(updateData.sub_service_id)) throw { reason: "Invalid sub_service_id format", statusCode: 400 };

        const provider = await ProviderRepository.updateProvider(id, updateData);
        if (!provider) throw { reason: "Provider not found", statusCode: 404 };

        return provider;
    } catch (error) {
        throw error.reason ? error : { reason: `Service error: Failed to update provider - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Delete provider
async function deleteProvider(id) {
    try {
        if (!id) throw { reason: "Provider ID is required", statusCode: 400 };
        if (!isValidObjectId(id)) throw { reason: "Invalid provider ID format", statusCode: 400 };

        const provider = await ProviderRepository.deleteProvider(id);
        if (!provider) throw { reason: "Provider not found", statusCode: 404 };

        return provider;
    } catch (error) {
        throw error.reason ? error : { reason: `Service error: Failed to delete provider - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Get all providers
async function getAllProviders({ serviceId, minRating } = {}) {
    try {
        if (serviceId && !isValidObjectId(serviceId)) throw { reason: "Invalid service_id format", statusCode: 400 };
        if (minRating && (minRating < 0 || minRating > 5)) throw { reason: "Invalid rating range", statusCode: 400 };

        return await ProviderRepository.getAllProviders({ serviceId, minRating });
    } catch (error) {
        throw { reason: `Service error: Failed to get providers - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Verify provider
async function verifyProvider(id) {
    try {
        if (!id) throw { reason: "Provider ID is required", statusCode: 400 };
        if (!isValidObjectId(id)) throw { reason: "Invalid provider ID format", statusCode: 400 };

        const provider = await ProviderRepository.updateProvider(id, { verified: true });
        if (!provider) throw { reason: "Provider not found", statusCode: 404 };

        return provider;
    } catch (error) {
        throw { reason: `Service error: Failed to verify provider - ${error.message}`, statusCode: 500 };
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
    verifyProvider,
};
