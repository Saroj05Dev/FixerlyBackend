// routes/admin_routes.js
const express = require("express");
const { addAdmin, getAllAdmin } = require("../controllers/admin_controller");

const adminRouter = express.Router();

// Route to add a new admin
adminRouter.post("/add", addAdmin);

// Route to get all admins
adminRouter.get("/getall", getAllAdmin);

module.exports = adminRouter;
