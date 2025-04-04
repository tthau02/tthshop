import Joi from "joi";
import Product from "../models/product.js";
import { getBaseUrl } from "../config/server.js";

const productsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().required(),
  images: Joi.array().items(Joi.string()).optional().default([]),
  thumbnail: Joi.string().allow("").optional(),
  brand: Joi.string().optional(),
  quantity: Joi.number().optional(),
  category: Joi.string().optional(),
  description: Joi.string().optional(),
  categoryId: Joi.string().required(),
});

export const getProductsPaginate = async (req, res) => {
  try {
    const { _page = 1, _limit = 8, category, price_lte, q } = req.query;
    const page = parseInt(_page);
    const limit = parseInt(_limit);
    const skip = (page - 1) * limit;

    let query = {};
    if (category) query.category = category;
    if (price_lte) query.price = { $lte: parseInt(price_lte) };
    if (q) query.name = { $regex: q, $options: "i" }; // Tìm kiếm theo tên

    const products = await Product.find(query).skip(skip).limit(limit);
    const totalDocs = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    return res.status(200).json({
      docs: products,
      totalPages,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params; // Lấy productId từ params
    const currentProduct = await Product.findById(productId);
    if (!currentProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    const relatedProducts = await Product.find({
      categoryId: currentProduct.categoryId,
      _id: { $ne: productId }, // Loại bỏ sản phẩm hiện tại
    })
      .limit(8)
      .select("name price thumbnail description");

    return res.status(200).json({
      message: "Lấy sản phẩm liên quan thành công",
      relatedProducts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Vui lòng chọn ít nhất một ảnh!" });
    }

    // Lưu danh sách ảnh với đường dẫn đầy đủ
    const images = req.files.map(
      (file) => `${getBaseUrl()}/uploads/${file.filename}`
    );

    // Chọn ảnh đầu tiên làm thumbnail
    const thumbnail = images.length > 0 ? images[0] : "";

    const productData = {
      ...req.body,
      images,
      thumbnail,
    };

    const { error, value } = productsSchema.validate(productData, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    // Tạo sản phẩm mới
    const newProduct = await Product.create(value);
    return res.status(201).json({
      message: "Thêm mới sản phẩm thành công!",
      newProduct,
    });
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error.message);
    return res.status(500).json({
      message: "Lỗi server nội bộ!",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Vui lòng chọn ít nhất một ảnh!" });
    }

    // Lưu danh sách ảnh với đường dẫn đầy đủ
    const images = req.files.map(
      (file) => `${getBaseUrl()}/uploads/${file.filename}`
    );

    // Chọn ảnh đầu tiên làm thumbnail
    const thumbnail = images.length > 0 ? images[0] : "";

    const productData = {
      ...req.body,
      images,
      thumbnail,
    };

    const { error, value } = productsSchema.validate(productData, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    // Tạo sản phẩm mới
    const product = await Product.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    return res.status(201).json({
      message: "update sản phẩm thành công!",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi cập nhật sản phẩm",
      error: error.message,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "update thanh cong",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query; // Lấy tham số q từ query
    if (!q) {
      return res.status(400).json({ message: "Vui lòng nhập từ khóa" });
    }
    const products = await Product.find({
      name: { $regex: q, $options: "i" }, // Tìm theo tên, không phân biệt hoa thường
    }).limit(10);

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
