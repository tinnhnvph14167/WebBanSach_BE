import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../middlewares/error.js";
import jwt from "jsonwebtoken";
import { MESSAGE_ERROR } from "../const/messages.js";
// import Role from "../models/Role.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log("req.body",req.body)
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Email đã được sử dụng");
    }
    const existingPhoneUser = await User.findOne({ phone: req.body.phone });
    if (existingPhoneUser) {
      return res.status(400).send("Số điện thoại đã được sử dụng");
    }
    const newUser = new User({          
      ...req.body,
      password: hash,
      
    });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    console.log("req.body",req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(400, MESSAGE_ERROR.MAIL_ALREADY_NOT_EXISTS));
    // if(req.originalUrl === "/api/auth/login-admin" && !user.isAdmin) return next(createError(403, MESSAGE_ERROR.NOT_PERMISSIONS));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, MESSAGE_ERROR.WRONG_ACCOUNT));

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ access_token: token,message:"dang nhap thanh cong" });
          
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  const accessToken = req.header("authorization").replace("Bearer ", "");
  try{
    if(accessToken){    
      res
        .cookie("access_token",'', {
          httpOnly: true,
        })
        .status(200)
        .json({message : 'Sign Out Successfully'})     
    }
    else{
      res.status(500).json({message : 'accessToken = undefine '})
    }
  
  }
  catch{
     res.status(500).json({
      message : 'Server error'
     })
  }

}