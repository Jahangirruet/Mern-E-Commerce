import { OTPService,VerifyOTPService,SaveProfileServicee,ReadProfileService } from "../services/UserServices.js";

export const UserOTP = async function (req, res) {
  try {
    let result = await OTPService(req);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ status: "error", Message: error.message });
  }
};

export const VerifyLogin = async function (req, res) {
    let result = await VerifyOTPService(req);
    if(result['status'] == 'success'){
        // cookie option
        let cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: false,
        }
        // set cooke with response
        res.cookie("token", result['token'], cookieOption);
        return res.status(200).json(result);
    }
    else{
        return res.status(400).json(result);
    }
    
};

export const UserLogout = async function (req, res) {
  try {
    let cookieOption = {
            expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
            httpOnly: false,
        }
        // set cooke with response
        res.cookie("token", "", cookieOption);
        console.log(cookieOption)
        return res.status(200).json({status:"success",message:"logout successfully"},);
  } catch (error) {
    return res.status(400).json({ status: "error", Message: error.message });
  }
      
};

export const CreateProfile = async function (req, res) {
  try {
    let result = await SaveProfileServicee(req);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ status: "error", Message: error.message });
  }
};



export const ReadProfile = async function (req, res) {
  try {
    let result = await ReadProfileService(req);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ status: "error", Message: error.message });
  }
};
