import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, Row, Col } from "antd";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import instance from "../../config/axiosConfig";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  ordersByStatus: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  usersByRole: {
    admin: number;
    user: number;
  };
}

const DashboardContent = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Lấy dữ liệu thống kê từ API
  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/stats");
      setStats(response.data.stats);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể lấy dữ liệu thống kê"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: "center", color: "#666" }}>
        Đang tải...
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ padding: 24, textAlign: "center", color: "#666" }}>
        Không có dữ liệu
      </div>
    );
  }

  // Dữ liệu cho biểu đồ đơn hàng theo trạng thái (Bar Chart)
  const ordersByStatusData = {
    labels: ["Chờ xử lý", "Đang xử lý", "Đã giao hàng", "Hoàn thành", "Đã hủy"],
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: [
          stats.ordersByStatus.pending || 0,
          stats.ordersByStatus.processing || 0,
          stats.ordersByStatus.shipped || 0,
          stats.ordersByStatus.delivered || 0,
          stats.ordersByStatus.cancelled || 0,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.6)", // pending
          "rgba(54, 162, 235, 0.6)", // processing
          "rgba(153, 102, 255, 0.6)", // shipped
          "rgba(75, 192, 192, 0.6)", // delivered
          "rgba(255, 99, 132, 0.6)", // cancelled
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu cho biểu đồ người dùng theo vai trò (Pie Chart)
  const usersByRoleData = {
    labels: ["Admin", "User"],
    datasets: [
      {
        label: "Số lượng người dùng",
        data: [stats.usersByRole.admin || 0, stats.usersByRole.user || 0],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 24,
        }}
      >
        Dashboard Thống Kê
      </h2>

      {/* Thẻ thống kê */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Tổng người dùng" bordered={false}>
            <p style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>
              {stats.totalUsers}
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Tổng đơn hàng" bordered={false}>
            <p style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>
              {stats.totalOrders}
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Tổng doanh thu" bordered={false}>
            <p style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>
              {stats.totalRevenue.toLocaleString()}đ
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card title="Tổng sản phẩm" bordered={false}>
            <p style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>
              {stats.totalProducts}
            </p>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ */}
      <Row gutter={[16, 16]}>
        {/* Biểu đồ đơn hàng theo trạng thái */}
        <Col xs={24} lg={12}>
          <Card title="Đơn hàng theo trạng thái" bordered={false}>
            <div style={{ height: 300 }}>
              <Bar
                data={ordersByStatusData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Số lượng đơn hàng",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </Card>
        </Col>

        {/* Biểu đồ người dùng theo vai trò */}
        <Col xs={24} lg={12}>
          <Card title="Người dùng theo vai trò" bordered={false}>
            <div style={{ height: 300 }}>
              <Pie
                data={usersByRoleData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
