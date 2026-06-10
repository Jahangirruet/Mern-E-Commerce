import { SaveProfileServicee,ReadProfileService,UserRegistrationService,VerifyLoginService } from "../services/UserServices.js";



export const VerifyLogin = async function (req, res) {
    let result = await VerifyLoginService(req);
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
export const UserRegistration = async (req, res) => {
  try {
    const result = await UserRegistrationService(req);

    // Return 400 if service returns an error
    if (result.status === "error") {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};



export const UserLogout = async function (req, res) {
  try {
    let cookieOption = {
            expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
            httpOnly: false,
        }
        res.cookie("token", "", cookieOption);

        return res.status(200).json({status:"success",message:"logout successfully",cookie:cookieOption},);
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
