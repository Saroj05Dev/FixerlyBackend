const express = require("express");
const ProviderController = require("../controllers/provider_controller");
const { authenticateToken } = require("../../auth_middleware");

const router = express.Router();

// Create a new provider (public)
router.post("/add", ProviderController.createProvider);

// Login provider (public)
router.post("/login", ProviderController.loginProvider);

// Get all providers (no pagination, public)
router.get("/all", ProviderController.getAllProviders);

// Get all verified providers (public)
router.get("/verified", ProviderController.getVerifiedProviders);

// Get providers by service ID (public)
router.get("/service/:serviceId", ProviderController.getProvidersByServiceId);

// Get a provider by email (query parameter ?email=, public)
router.get("/by-email", ProviderController.getProviderByEmail);

// Get a provider by ID (public)
router.get("/:id", ProviderController.getProviderById);

// Update a provider (protected)
router.patch("/:id", authenticateToken, ProviderController.updateProvider);

// Verify a provider (protected, typically for admins)
router.patch("/:id/verify", authenticateToken, ProviderController.verifyProvider);

// Delete a provider (protected)
router.delete("/:id", authenticateToken, ProviderController.deleteProvider);

module.exports = router;