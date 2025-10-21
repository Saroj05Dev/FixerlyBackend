const AdminService = require("../services/admin_service");

const addAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        const newAdmin = await AdminService.addAdmin(adminData); 
        res.status(201).json({ success: true, data: newAdmin });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllAdmin = async (req, res) => {
    try {
        const admins = await AdminService.getAllAdminService(); 
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    addAdmin,
    getAllAdmin
};
