import Cart from "../models/cart";
import Product from "../models/product";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Nếu chưa có giỏ hàng, tạo mới
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        // Nếu sản phẩm đã có, tăng số lượng
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

    // Tìm giỏ hàng của user và lấy thông tin chi tiết của sản phẩm
    const cart = await Cart.findOne({ userId })
      .populate({
        path: "items.productId",
        select: "name price image stock", // Chọn các trường cần thiết của sản phẩm
      })
      .populate("userId", "name email"); // Thêm thông tin người dùng

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ message: "Giỏ hàng trống", cart: [] });
    }

    // Tính tổng giá trị giỏ hàng
    let totalAmount = 0;
    cart.items.forEach((item) => {
      totalAmount += item.productId.price * item.quantity;
    });

    return res.status(200).json({
      cart,
      totalAmount, // Trả về tổng giá trị giỏ hàng
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ userId })
      .populate("userId", "username email")
      .populate("items.productId", "name price image stock");

    return res.status(200).json({
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
