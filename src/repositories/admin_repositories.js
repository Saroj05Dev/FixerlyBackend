const Admin = require("../schema/admin_schema");

async function findAdmin(filter) {
    return await Admin.findOne(filter);
}

async function addAdmin(adminData) {
    const newAdmin = new Admin(adminData);
    return await newAdmin.save();
}

async function getAllAdmin() {
    return await Admin.find();
}

module.exports = {
    findAdmin,
    addAdmin,
    getAllAdmin
};
