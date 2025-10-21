const ProviderService = require("../services/provider_service");

async function createProvider(req, res) {
    try {
        const providerData = req.body;
        const provider = await ProviderService.createProvider(providerData);
        return res.status(201).json({
            success: true,
            message: "Provider created successfully",
            data: provider,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getProviderById(req, res) {
    try {
        const { id } = req.params;
        const provider = await ProviderService.getProviderById(id);
        return res.status(200).json({
            success: true,
            data: provider,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

async function getProviderByEmail(req, res) {
    try {
        const { email } = req.query;
        const provider = await ProviderService.getProviderByEmail(email);
        return res.status(200).json({
            success: true,
            data: provider,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

async function getProvidersByServiceId(req, res) {
    try {
        const { serviceId } = req.params;
        const providers = await ProviderService.getProvidersByServiceId(serviceId);
        return res.status(200).json({
            success: true,
            data: providers,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function getVerifiedProviders(req, res) {
    try {
        const providers = await ProviderService.getVerifiedProviders();
        return res.status(200).json({
            success: true,
            data: providers,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function updateProvider(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const provider = await ProviderService.updateProvider(id, updateData);
        return res.status(200).json({
            success: true,
            message: "Provider updated successfully",
            data: provider,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function deleteProvider(req, res) {
    try {
        const { id } = req.params;
        const provider = await ProviderService.deleteProvider(id);
        return res.status(200).json({
            success: true,
            message: "Provider deleted successfully",
            data: provider,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

async function getAllProviders(req, res) {
    try {
        const { serviceId, minRating } = req.query;
        const providers = await ProviderService.getAllProviders({
            serviceId,
            minRating: minRating ? parseFloat(minRating) : undefined,
        });
        return res.status(200).json({
            success: true,
            data: providers,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function verifyProvider(req, res) {
    try {
        const { id } = req.params;
        const provider = await ProviderService.verifyProvider(id);
        return res.status(200).json({
            success: true,
            message: "Provider verified successfully",
            data: provider,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

async function loginProvider(req, res) {
    try {
        const { email, password } = req.body;
        const { provider, token } = await ProviderService.loginProvider({ email, password });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: { provider, token },
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
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
    loginProvider,
};