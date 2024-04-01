const UserModel = require("../models/user.model");
module.exports.getUserAuthService = async (user) => {
  const auth = await UserModel.userAuth(user);
  // validation for the credentials
  if (!auth) {
    throw new Error("username or password are incorrect!");
  } else {
    console.log(`username found.`);
    return auth;
  }
};