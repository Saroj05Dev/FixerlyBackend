const bcrypt = require("bcryptjs");
const { findAdmin, addAdmin: createAdminRepo, getAllAdmin } = require("../repositories/admin_repositories");

async function addAdmin(adminDetails) {
    const { name, email, password } = adminDetails;

    const existingAdmin = await findAdmin({ email });
    if (existingAdmin) {
        throw { reason: "Admin with the given email already exists", statusCode: 400 };
    }
    const password_hash = await bcrypt.hash(password, 10);
    const newAdmin = await createAdminRepo({
        name,
        email,
        password_hash
    });

    if (!newAdmin) {
        throw { reason: "Something went wrong, cannot create admin", statusCode: 500 };
    }

    return newAdmin;
}

async function getAllAdminService() {
    return await getAllAdmin();
}

module.exports = {
    addAdmin,
    getAllAdminService
};
