import Joi from "joi";
import Product from "../models/product";

const productsSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    thumbnail: Joi.string().optional(),
    brand: Joi.string().optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional(),
    categoryId: Joi.string().required(),
})


export const getProductsPaginate = async (req, res) => {
    const { _page, _limit, } = req.query;
    const options = {
        page: _page,
        limit: _limit ? parseInt(_limit) : 10,
        sort: { createdAt: -1 },
        populate: { path: 'categoryId', select: 'categoryName' } 
    };
    try {
        const products = await Product.paginate({}, options);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const getProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const {error, value} = productsSchema.validate(req.body, {
            abortEarly: false
        })
        if(error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json(errors)
        }

        const newProduct = await Product.create(value);
        return res.status(201).json({
            message: "them moi thanh cong",
            newProduct
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {error, value} = productsSchema.validate(req.body, {
            abortEarly: false
        })
        if(error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json(errors)
        }
        const product = await Product.findByIdAndUpdate(req.params.id, value, {new: true});
        return res.status(200).json({
            message: "update thanh cong",
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "update thanh cong",
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}