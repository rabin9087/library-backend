import UserSchema from "./UserSchema.js";

//create
export const createUser = (userObj) => {
    return UserSchema(userObj).save();
}

//read
export const getUserByEmail = (email) => {
    return UserSchema.findOne({email});
}

export const getOneAdmin = (filter) => {
    return UserSchema.findOne(filter);
}

//update

//delete

//add refreshJTW
export const updateRefreshJWT = async(email, refreshJWT) => {
    return await UserSchema.findOneAndUpdate({email}, {refreshJWT})
}