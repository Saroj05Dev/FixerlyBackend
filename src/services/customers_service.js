const bcrypt = require("bcryptjs");
const { findCustomer, registerCustomer: createCustomerRepo, getAllCustomers } = require("../repositories/customers_repositories");

async function registerCustomer(customerDetails) {
    const { customer_name, email, phone, password } = customerDetails;

    const existingCustomer = await findCustomer({ email, phone });
    if (existingCustomer) {
        throw { reason: "Customer with the given email and phone already exists", statusCode: 400 };
    }
    const password_hash = await bcrypt.hash(password, 10);
    const newCustomer = await createCustomerRepo({
        customer_name,
        email,
        phone,
        password_hash
    });

    if (!newCustomer) {
        throw { reason: "Something went wrong, cannot create customer", statusCode: 500 };
    }
    return newCustomer;
}

async function getAllCustomersService() {
    return await getAllCustomers();
}

module.exports = {
    registerCustomer,
    getAllCustomersService
};


