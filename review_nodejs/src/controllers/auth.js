import User from "../models/user";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signupSchema = Joi.object({
    username: Joi.string().min(3),
    email: Joi.string().email().required().trim(),
    phone: Joi.number(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required().valid(Joi.ref("password"))
});

const signinSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(6).required(),
});

export const signup = async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body, {
            abortEarly: false
        })
        if(error){
            const errors = error.details.map((error) => error.message);
            return res.status(400).json(errors)
        }

        const exitUser = await User.findOne({email: value.email});
        if(exitUser){
            return res.status(400).json({
                message: "Tài khoản đã tồn tại"
            })
        }

        const hashPassword = await bcrypt.hash(value.password, 10);
        const user = await User.create({...value, password: hashPassword});
        user.password = undefined;
        return res.status(200).json({
            message: "dang ki thanh cong",
            user
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const signin = async (req, res) => {
    try {
        const { error, value } = signinSchema.validate(req.body, {
            abortEarly: false
        })
        if(error){
            const errors = error.details.map((error) => error.message);
            return res.status(400).json(errors)
        }
        
        const user = await User.findOne({email: value.email});
        if(!user){
            return res.status(400).json({
                message: "Email không đúng!"
            })
        }
        const isMathchPassword  = await bcrypt.compare(value.password, user.password);
        if(!isMathchPassword){
            return res.status(400).json({
                message: "Sai mật khẩu!"
            })
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECERT_KEY, {expiresIn: "1h"});
        user.password = undefined;
        return res.status(200).json({
            message: "dang nhap thanh cong",
            user,
            accessToken: token
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const googleLogin = async (req, res) => {
    const { token } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log("Google payload:", payload);
      const { sub: googleId, email, name } = payload;
  
      let user = await User.findOne({email, googleId });
        if (!user) {
            user = await User.create({
            email,
            username: name,
            googleId,
            });
      }
  
      const Jwttoken = jwt.sign({id: user._id}, process.env.JWT_SECERT_KEY, {expiresIn: "1h"});
      user.password = undefined;
      return res.status(200).json({
          message: "dang nhap thanh cong",
          user,
          accessToken: Jwttoken
      })
    } catch (error) {
      return res.status(401).json({
        message: "Đăng nhập bằng Google thất bại",
      });
    }
  };