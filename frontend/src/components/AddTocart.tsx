import { useState } from "react";
import { Button, message } from "antd";
import instance from "../config/axiosConfig";

const AddToCart = ({ productId }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user")); // Parse chuỗi JSON từ localStorage
      if (!user || !user._id) {
        throw new Error("User ID not found");
      }
      const userId = user._id; // Lấy _id từ object user

      await instance.post("/cart", {
        userId, // Chỉ gửi _id thay vì toàn bộ object
        productId,
        quantity: 1,
      });

      message.success("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng", error);
      message.error("Không thể thêm vào giỏ hàng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      danger
      loading={loading}
      onClick={handleAddToCart}
    >
      {loading ? "Đang thêm..." : "+Add"}
    </Button>
  );
};

export default AddToCart;