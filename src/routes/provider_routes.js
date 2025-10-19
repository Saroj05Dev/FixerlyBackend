const express = require("express");
const ProviderController = require("../controllers/provider_controller"); // Adjust path to your controller file

const router = express.Router();

// Create a new provider
router.post("/add", ProviderController.createProvider);

// Get a provider by ID
router.get("/:id", ProviderController.getProviderById);

// Get a provider by email
router.get("/email", ProviderController.getProviderByEmail);

// Get providers by service ID
router.get("/service/:serviceId", ProviderController.getProvidersByServiceId);

// Get all verified providers
router.get("/verified", ProviderController.getVerifiedProviders);

// Update a provider
router.patch("/:id", ProviderController.updateProvider);

// Delete a provider
router.delete("/:id", ProviderController.deleteProvider);

// Get all providers with pagination and filters
router.get("/", ProviderController.getAllProviders);

// Verify a provider
router.patch("/:id/verify", ProviderController.verifyProvider);

module.exports = router;