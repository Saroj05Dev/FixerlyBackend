const CustomerService = require("../services/customers_service");

async function registerCustomer(req, res) {
    try {
        const response = await CustomerService.registerCustomer(req.body);

        return res.status(201).json({
            message: "Successfully registered the customer",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to register customer",
            data: {},
            error: error
        });
    }
}

async function getAllCustomers(req, res) {
    try {
        const response = await CustomerService.getAllCustomersService();

        return res.status(200).json({
            message: "Fetched all customers successfully",
            success: true,
            data: response,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch customers",
            data: {},
            error: error
        });
    }
}

module.exports = {
    registerCustomer,
    getAllCustomers
};
