// src/controllers/cartController.js
import Cart from "../models/cart.js";
import Product from "../models/product.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    const updatedCart = await Cart.findById(cart._id)
      .populate("userId", "username email")
      .populate("items.productId", "name price thumbnail");

    return res.status(200).json({
      message: "Thêm sản phẩm vào giỏ hàng thành công",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId })
      .populate({
        path: "items.productId",
        select: "name price thumbnail stock",
      })
      .populate("userId", "usernam email");

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ message: "Giỏ hàng trống", cart: [] });
    }

    let totalAmount = 0;
    cart.items.forEach((item) => {
      totalAmount += item.productId.price * item.quantity;
    });

    return res.status(200).json({
      cart,
      totalAmount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Thiếu userId hoặc productId" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity < 1) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Sản phẩm không có trong giỏ hàng" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    return res.status(200).json({
      message: "Cập nhật số lượng thành công",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
