import { useState } from "react";
import { Button, message } from "antd";
import instance from "../config/axiosConfig";
import { useCart } from "../CartContext"; // Import useCart

const AddToCart = ({ productId }: { productId: string }) => { // Định nghĩa kiểu cho prop
  const [loading, setLoading] = useState(false);
  const { fetchCartCount } = useCart(); // Lấy fetchCartCount từ context

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user || !user._id) {
        throw new Error("User ID not found");
      }
      const userId = user._id;

      await instance.post("/cart", {
        userId,
        productId,
        quantity: 1,
      });

      message.success("Thêm vào giỏ hàng thành công!");
      fetchCartCount(); // Cập nhật số lượng giỏ hàng ngay lập tức
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