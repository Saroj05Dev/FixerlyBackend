const Admin = require("../schema/adminSchema");
// const Provider = require("../schema/providerSchema");

async function createAdmin(data) {
    return await Admin.create(data);
}

async function getAllAdmins() {
    return await Admin.find();
}

async function updateAdmin(id, data) {
    return await Admin.findByIdAndUpdate(id, data, { new: true });
}

async function deleteAdmin(id) {
    return await Admin.findByIdAndDelete(id);
}

async function findByIdAndUpdate(id) {
    return await Provider.findByIdAndUpdate(
        id,
        { status: true },
        { new: true }
    );
}

module.exports = {
    createAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
    findByIdAndUpdate
};
