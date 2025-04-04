import User from "../models/user.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { getBaseUrl } from "../config/server.js";

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

const userSchema = Joi.object({
  username: Joi.string().min(3).trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string().trim(),
  image: Joi.string(),
  address: Joi.string().trim(),
  roles: Joi.string().valid("user", "admin"),
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
    const googleUserInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const { sub: googleId, email, name } = googleUserInfo.data;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        username: name,
        googleId,
      });
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECERT_KEY, {
      expiresIn: "1h",
    });

    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      user,
      accessToken: jwtToken,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(401).json({ message: "Đăng nhập bằng Google thất bại" });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Xử lý ảnh đại diện (nếu có)
    let image = null;
    if (req.files && req.files.length > 0) {
      // Chỉ lấy ảnh đầu tiên vì chỉ có một ảnh đại diện
      image = `${getBaseUrl()}/uploads/${req.files[0].filename}`;
    }

    // Tạo dữ liệu user từ req.body và image (nếu có)
    const userData = {
      ...req.body,
      ...(image && { image }), // Chỉ thêm image nếu có ảnh mới
    };

    // Validate dữ liệu với Joi
    const { error, value } = userSchema.validate(userData, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    // Cập nhật user trong database
    const userUpdate = await User.findByIdAndUpdate(
      req.params.id,
      { $set: value }, // Sử dụng $set để đảm bảo chỉ cập nhật các trường được gửi
      {
        new: true, // Trả về document đã cập nhật
        runValidators: true, // Chạy các validator của Mongoose (nếu có)
      }
    );

    // Kiểm tra nếu không tìm thấy user
    if (!userUpdate) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    return res.status(200).json({
      message: "Cập nhật user thành công!",
      userUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi cập nhật",
      error: error.message,
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    return res.status(200).json(getUser);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//admin user

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Lấy danh sách người dùng thành công!", users });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Cập nhật vai trò người dùng
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.body;

    if (!["admin", "user"].includes(roles)) {
      return res.status(400).json({ message: "Vai trò không hợp lệ!" });
    }

    const user = await User.findByIdAndUpdate(id, { roles }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    res.status(200).json({ message: "Cập nhật vai trò thành công!", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }
    res.status(200).json({ message: "Xóa người dùng thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
