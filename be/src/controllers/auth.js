import User from "../models/user";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signupSchema = Joi.object({
  username: Joi.string().min(3),
  email: Joi.string().email().required().trim(),
  phone: Joi.number(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required().valid(Joi.ref("password")),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required(),
});

export const signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json(errors);
    }

    const exitUser = await User.findOne({ email: value.email });
    if (exitUser) {
      return res.status(400).json({
        message: "Tài khoản đã tồn tại",
      });
    }

    const hashPassword = await bcrypt.hash(value.password, 10);
    const user = await User.create({ ...value, password: hashPassword });
    user.password = undefined;
    return res.status(200).json({
      message: "dang ki thanh cong",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { error, value } = signinSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({
        message: "Email không đúng!",
      });
    }
    const isMathchPassword = await bcrypt.compare(
      value.password,
      user.password
    );
    if (!isMathchPassword) {
      return res.status(400).json({
        message: "Sai mật khẩu!",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT_KEY, {
      expiresIn: "1h",
    });
    user.password = undefined;
    return res.status(200).json({
      message: "dang nhap thanh cong",
      user,
      accessToken: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  const { accessToken } = req.body;
  console.log("Access Token from Client:", accessToken);

  if (!accessToken) {
    return res
      .status(400)
      .json({ message: "Access Token không được cung cấp" });
  }

  try {
    // Gọi API Google để lấy thông tin user
    const googleUserInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const { sub: googleId, email, name } = googleUserInfo.data;

    // Kiểm tra xem user đã tồn tại chưa
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        username: name,
        googleId,
      });
    }

    // Tạo JWT token (Đổi tên accessToken -> jwtToken)
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECERT_KEY, {
      expiresIn: "1h",
    });

    user.password = undefined; // Ẩn password

    return res.status(200).json({
      message: "Đăng nhập thành công",
      user,
      accessToken: jwtToken, // Trả về token đã sửa
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(401).json({ message: "Đăng nhập bằng Google thất bại" });
  }
};
