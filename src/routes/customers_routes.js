const express = require("express");
const { registerCustomer, getAllCustomers } = require("../controllers/customers_controller");

const customerRouter = express.Router();  

customerRouter.post("/add", registerCustomer);
customerRouter.get("/getall", getAllCustomers);


module.exports = customerRouter;
