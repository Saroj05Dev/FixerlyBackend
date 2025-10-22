const User = require("../schema/userSchema");

async function findUser(params) {
    try {
        const user = await User.findOne({ ...params })
        return user;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

async function createUser(userDetails) {
    try {
        const user = await User.create(userDetails);
        return user;
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    findUser,
    createUser
}