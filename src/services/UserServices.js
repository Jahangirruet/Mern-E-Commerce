import { token } from "morgan";
import UserModel from "../models/UserModel.js";
import UserModelPassword from "../models/UserModelPassword.js";
import ProfileModel from "../models/ProfileModel.js";
import { EmailSend } from "../utility/EmailHelper.js";
import { EncodeToken } from "../utility/TokenHelper.js";
import bcrypt from "bcrypt";

//verify login with password

export const UserRegistrationService = async (req) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check required fields
    if (!name || !email || !password) {
      return { status: "error", message: "All fields are required" };
    }

    // 2. Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return { status: "error", message: "Email already registered" };
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save the new user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return { status: "success", message: "User registered", data: newUser };

  } catch (error) {
    return { status: "error", message: error.message };
  }
};

//import bcrypt from "bcrypt";

export const VerifyLoginService = async (req) => {
    try {
        let email = req.body.email;       // ✅ fixed
        let password = req.body.password; // ✅ fixed

        if (!email || !password) {
            return { status: "error", message: "Email and password are required" };
        }

        let user = await UserModel.findOne({ email: email }).select("_id password");
        if (!user) {
            return { status: "error", message: "Invalid email or password" };
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { status: "error", message: "Invalid email or password" };
        }

        let token = EncodeToken(email, user._id.toString());
        return { status: "success", message: "Login successful", token: token };
    } catch (error) {
        return { status: "error", message: error.message };
    }
};



export const SaveProfileServicee = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    let data =await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
    return { status: "success", message: "profile save", data: data };
  } catch (error) {
    return { status: "errors", message: error.message };
  }
};


export const ReadProfileService = async (req) => {
  let data = await ProfileModel.find({userID:req.headers.user_id});
  return { status: "success", message: "profile read", data: data };
};

export default {};
