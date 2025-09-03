import { token } from "morgan";
import UserModel from "../models/UserModel.js";
import ProfileModel from "../models/ProfileModel.js";
import { EmailSend } from "../utility/EmailHelper.js";
import { EncodeToken } from "../utility/TokenHelper.js";

export const OTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(10000 + Math.random() * 900000);
    let EmailText = `Your OTP is ${code}`;
    let EmailSubject = "email verifucation";
    await EmailSend(email, EmailText, EmailSubject);
    await UserModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );
    return { status: "success", message: "otp send", email: email, otp: code };
  } catch (error) {
    return { status: "errors", message: error.message };
  }
};

export const VerifyOTPService = async (req) => {
try {
    let email = req.params.email;
    let otp = req.params.otp;
    console.log(email, otp);
  //user count
  let total = await UserModel.find({ email: email, otp: otp }).countDocuments();
  if (total == 1) {
    //user id read
    let user_id = await UserModel.find({ email: email, otp: otp }).select("_id");
    console.log(user_id);
    //token generate
    let token = EncodeToken(email,user_id[0]['_id'].toString());
    console.log(token);
    await UserModel.updateOne({ email: email }, { $set: { otp: 0 } });
    return { status: "success", message: "valid otp",token:token };
  }

  else {
    return { status: "errors", message: "invalid otp" };
  }
  // otp code update to 0
} catch (error) {
    return { status: "errors", message: error.message };
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
