import User from "../models/user.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);
    const totalProducts = await Product.countDocuments();
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

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
