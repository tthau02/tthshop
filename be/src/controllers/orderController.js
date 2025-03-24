import Order from "../models/order.js";
import Cart from "../models/cart.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      totalAmount,
      shippingFee,
      paymentMethod,
      shippingAddress,
    } = req.body;

    // Tạo đơn hàng mới
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingFee,
      paymentMethod,
      shippingAddress,
      status: paymentMethod === "cod" ? "pending" : "processing",
    });
    await order.save();
    await Cart.findOneAndDelete({ userId });

    return res.status(201).json({
      message: "Đặt hàng thành công!",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi tạo đơn hàng",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 5 } = req.query;
    const query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const orders = await Order.find(query)
      .populate("userId", "username email")
      .populate("items.productId", "name price thumbnail")
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limitNumber);

    return res.status(200).json({
      message: "Lấy danh sách đơn hàng thành công!",
      orders,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalOrders,
        limit: limitNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi lấy danh sách đơn hàng",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("userId", "username email phone address")
      .populate("items.productId", "name price thumbnail");

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng!",
      });
    }

    return res.status(200).json({
      message: "Lấy chi tiết đơn hàng thành công!",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi lấy chi tiết đơn hàng",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Trạng thái không hợp lệ!",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("userId", "username email")
      .populate("items.productId", "name price thumbnail");

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng!",
      });
    }

    return res.status(200).json({
      message: "Cập nhật trạng thái đơn hàng thành công!",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server khi cập nhật trạng thái đơn hàng",
      error: error.message,
    });
  }
};
