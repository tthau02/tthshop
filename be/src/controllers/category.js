import Product from "../models/product";
import Category from "../models/category";
import { getBaseUrl } from "../config/server.js";
import Joi from "joi";

const categorySchema = Joi.object({
  categoryName: Joi.string().required(),
  image: Joi.string().optional(),
  desc: Joi.string(),
});

export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({
        message: "Không có danh mục nào!",
      });
    }
    const products = await Product.find({ categoryId: id });
    return res.status(200).json({
      name: category.name,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const image = req.file
      ? `${getBaseUrl()}/uploads/${req.file.filename}`
      : null;

    const { error, value } = categorySchema.validate(
      { ...req.body, image },
      { abortEarly: false }
    );

    if (error)
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });

    const newCategory = await Category.create(value);
    return res.status(201).json({
      message: "Thêm mới danh mục thành công!",
      category: newCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};
export const getCategoryName = async (req, res) => {
  try {
    const categoryName = await Category.find();
    return res.status(200).json(categoryName);
  } catch (error) {
    return res.status(400).json({
      message: error.massage,
    });
  }
};

export const removeCate = async (req, res) => {
  try {
    const cate = await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json(cate);
  } catch (error) {
    return res.status(400).json({
      message: error.massage,
    });
  }
};

export const getByid = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.massage,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const image = req.file
      ? `${getBaseUrl()}/uploads/${req.file.filename}`
      : null;

    const { error, value } = categorySchema.validate(
      { ...req.body, image },
      { abortEarly: false }
    );

    if (error)
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });

    const category = await Category.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    return res.status(201).json({
      message: "updatedanh mục thành công!",
      category: category,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};
