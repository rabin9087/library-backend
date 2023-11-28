import UserSchema from "./UserSchema.js";

//create
export const createUser = (userObj) => {
    return UserSchema(userObj).save();
}

//read
export const getUserByEmail = (email) => {
    return UserSchema.findOne({email});
}

//update

//delete