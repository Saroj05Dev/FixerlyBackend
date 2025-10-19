const ProviderService = require("../services/provider_service"); // Adjust path to your service file

class ProviderController {
    // Create a new provider
    async createProvider(req, res) {
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

    // Get a provider by ID
    async getProviderById(req, res) {
        try {
            const { id } = req.params;
            const provider = await ProviderService.getProviderById(parseInt(id));
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

    // Get a provider by email
    async getProviderByEmail(req, res) {
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

    // Get providers by service ID
    async getProvidersByServiceId(req, res) {
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

    // Get all verified providers
    async getVerifiedProviders(req, res) {
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

    // Update a provider
    async updateProvider(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const provider = await ProviderService.updateProvider(parseInt(id), updateData);
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

    // Delete a provider
    async deleteProvider(req, res) {
        try {
            const { id } = req.params;
            const provider = await ProviderService.deleteProvider(parseInt(id));
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

    // Get all providers with pagination and filters
    async getAllProviders(req, res) {
        try {
            const { page, limit, serviceId, minRating } = req.query;
            const providers = await ProviderService.getAllProviders({
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10,
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

    // Verify a provider
    async verifyProvider(req, res) {
        try {
            const { id } = req.params;
            const provider = await ProviderService.verifyProvider(parseInt(id));
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
}

module.exports = new ProviderController();