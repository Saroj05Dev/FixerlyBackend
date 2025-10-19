const express = require("express");
const { registerCustomer, getAllCustomers } = require("../controllers/customers_controller");

const customerRouter = express.Router();  

customerRouter.post("/", registerCustomer);
customerRouter.get("/", getAllCustomers);


module.exports = customerRouter;
