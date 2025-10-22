const { findUser, createUser } = require("../repositories/userRepository");

async function registerUser(userDetails) {

    //1. We need to check if the user with the email and phone is already exists.
    const user = await findUser({
        email: userDetails.email,
        phone: userDetails.phone
    });

    //2. If found don't create
    if(user) {
        throw { reason: "User with the given phone and email already exists", statusCode: 400 }
    }

    //3. If not then create a new user in DB
    const newUser = createUser({
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
        phone: userDetails.phone
    });

    if(!newUser) {
        throw { reason: "Something went wrong can't create user", statuscode: 500 }
    }

    //4. Return the details of create user
    return newUser;

}

module.exports = {
    registerUser
}