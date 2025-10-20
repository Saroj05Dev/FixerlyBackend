const express = require("express");
const ProviderController = require("../controllers/provider_controller");

const router = express.Router();

// ✅ Create a new provider
router.post("/add", ProviderController.createProvider);

// ✅ Get all providers (no pagination)
router.get("/all", ProviderController.getAllProviders);

// ✅ Get all verified providers
router.get("/verified", ProviderController.getVerifiedProviders);

// ✅ Get providers by service ID
router.get("/service/:serviceId", ProviderController.getProvidersByServiceId);

// ✅ Get a provider by email (query parameter ?email=)
router.get("/by-email", ProviderController.getProviderByEmail);

// ✅ Get a provider by ID
router.get("/:id", ProviderController.getProviderById);

// ✅ Update a provider
router.patch("/:id", ProviderController.updateProvider);

// ✅ Verify a provider
router.patch("/:id/verify", ProviderController.verifyProvider);

// ✅ Delete a provider
router.delete("/:id", ProviderController.deleteProvider);

module.exports = router;
