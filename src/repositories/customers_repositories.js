const Customer = require("../schema/customers_schema");

async function findCustomer(parameters) {
  try {
    const res = await Customer.findOne({ ...parameters });
    return res;
  } catch (error) {
    console.error("Error finding customer:", error);
    throw error;
  }
}

async function registerCustomer(customerDetails) {
  try {
    const res = await Customer.create(customerDetails);
    return res;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}

async function getAllCustomers() {
  try {
    const res = await Customer.find();
    return res;
  } catch (error) {
    console.error("Error fetching all customers:", error);
    throw error;
  }
}

async function findCustomerById(id) {
  try {
    const res = await Customer.findById(id);
    return res;
  } catch (error) {
    console.error("Error finding customer by ID:", error);
    throw error;
  }
}

module.exports = {
  findCustomer,
  registerCustomer,
  getAllCustomers,
  findCustomerById
};
