const bcrypt = require("bcryptjs");
const ProviderRepository = require("../repositories/provider_repository");
const { isValidObjectId } = require("mongoose");
const jwt = require('jsonwebtoken');

<<<<<<< HEAD
async function createProvider(providerData) {
    try {
        if (!providerData.name || !providerData.email || !providerData.phone || !providerData.password || !providerData.service_id) {
            throw new Error("Missing required fields: name, email, phone, password, or service_id");
        }

        if (!isValidObjectId(providerData.service_id)) {
            throw new Error("Invalid service_id format");
        }

        if (providerData.sub_service_id && !isValidObjectId(providerData.sub_service_id)) {
            throw new Error("Invalid sub_service_id format");
        }

        const saltRounds = 10;
        providerData.password_hash = await bcrypt.hash(providerData.password, saltRounds);
        delete providerData.password;

        return await ProviderRepository.createProvider(providerData);
    } catch (error) {
        throw new Error(`Service error: Failed to create provider - ${error.message}`);
    }
}

async function getProviderById(id) {
    try {
        if (!id) throw new Error("Provider ID is required");
        if (!isValidObjectId(id)) throw new Error("Invalid provider ID format");

        const provider = await ProviderRepository.getProviderById(id);
        if (!provider) throw new Error("Provider not found");

        return provider;
    } catch (error) {
        throw new Error(`Service error: Failed to get provider - ${error.message}`);
    }
}

async function getProviderByEmail(email) {
    try {
        if (!email) throw new Error("Email is required");

        const provider = await ProviderRepository.getProviderByEmail(email);
        if (!provider) throw new Error("Provider not found");

        return provider;
    } catch (error) {
        throw new Error(`Service error: Failed to get provider by email - ${error.message}`);
    }
}

async function getProvidersByServiceId(serviceId) {
    try {
        if (!isValidObjectId(serviceId)) throw new Error("Invalid service_id format");

        return await ProviderRepository.getProvidersByServiceId(serviceId);
    } catch (error) {
        throw new Error(`Service error: Failed to get providers by service ID - ${error.message}`);
    }
}

=======
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
>>>>>>> 1f94f0281ddbef37f952c5ea59e9c2b37745d78d
async function getVerifiedProviders() {
    try {
        return await ProviderRepository.getVerifiedProviders();
    } catch (error) {
<<<<<<< HEAD
        throw new Error(`Service error: Failed to get verified providers - ${error.message}`);
    }
}

async function updateProvider(id, updateData) {
    try {
        if (!id) throw new Error("Provider ID is required");
        if (!isValidObjectId(id)) throw new Error("Invalid provider ID format");
=======
        throw { reason: `Service error: Failed to get verified providers - ${error.message}`, statusCode: 500 };
    }
}

// ✅ Update provider
async function updateProvider(id, updateData) {
    try {
        if (!id) throw { reason: "Provider ID is required", statusCode: 400 };
        if (!isValidObjectId(id)) throw { reason: "Invalid provider ID format", statusCode: 400 };
>>>>>>> 1f94f0281ddbef37f952c5ea59e9c2b37745d78d

        if (updateData._id) delete updateData._id;

        if (updateData.password) {
<<<<<<< HEAD
            const saltRounds = 10;
            updateData.password_hash = await bcrypt.hash(updateData.password, saltRounds);
            delete updateData.password;
        }

        if (updateData.service_id && !isValidObjectId(updateData.service_id)) {
            throw new Error("Invalid service_id format");
        }
        if (updateData.sub_service_id && !isValidObjectId(updateData.sub_service_id)) {
            throw new Error("Invalid sub_service_id format");
        }

        const provider = await ProviderRepository.updateProvider(id, updateData);
        if (!provider) throw new Error("Provider not found");

        return provider;
    } catch (error) {
        throw new Error(`Service error: Failed to update provider - ${error.message}`);
    }
}

async function deleteProvider(id) {
    try {
        if (!id) throw new Error("Provider ID is required");
        if (!isValidObjectId(id)) throw new Error("Invalid provider ID format");

        const provider = await ProviderRepository.deleteProvider(id);
        if (!provider) throw new Error("Provider not found");

        return provider;
    } catch (error) {
        throw new Error(`Service error: Failed to delete provider - ${error.message}`);
    }
}

async function getAllProviders({ serviceId, minRating } = {}) {
    try {
        if (serviceId && !isValidObjectId(serviceId)) throw new Error("Invalid service_id format");
        if (minRating && (minRating < 0 || minRating > 5)) throw new Error("Invalid rating range");

        return await ProviderRepository.getAllProviders({ serviceId, minRating });
    } catch (error) {
        throw new Error(`Service error: Failed to get providers - ${error.message}`);
    }
}

async function verifyProvider(id) {
    try {
        if (!id) throw new Error("Provider ID is required");
        if (!isValidObjectId(id)) throw new Error("Invalid provider ID format");

        const provider = await ProviderRepository.updateProvider(id, { verified: true });
        if (!provider) throw new Error("Provider not found");

        return provider;
    } catch (error) {
        throw new Error(`Service error: Failed to verify provider - ${error.message}`);
    }
}

async function loginProvider({ email, password }) {
    try {
        if (!email || !password) throw new Error("Email and password are required");

        const provider = await ProviderRepository.getProviderByEmail(email);
        if (!provider) throw new Error("Provider not found");

        const isMatch = await bcrypt.compare(password, provider.password_hash);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign(
            { id: provider._id, email: provider.email, role: 'provider' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { provider, token };
    } catch (error) {
        throw new Error(`Service error: Failed to login provider - ${error.message}`);
=======
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
>>>>>>> 1f94f0281ddbef37f952c5ea59e9c2b37745d78d
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
<<<<<<< HEAD
    loginProvider,
};
=======
};
>>>>>>> 1f94f0281ddbef37f952c5ea59e9c2b37745d78d
