import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Tổng số người dùng
    const totalUsers = await User.countDocuments();

    // Tổng số đơn hàng
    const totalOrders = await Order.countDocuments();

    // Tổng doanh thu (tổng totalAmount của tất cả đơn hàng)
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Tổng số sản phẩm
    const totalProducts = await Product.countDocuments();

    // Thống kê đơn hàng theo trạng thái
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Thống kê người dùng theo vai trò
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$roles",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      message: "Lấy dữ liệu thống kê thành công!",
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalProducts,
        ordersByStatus: ordersByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        usersByRole: usersByRole.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server khi lấy dữ liệu thống kê",
      error: error.message,
    });
  }
};
