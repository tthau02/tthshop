import { useState } from "react";
import { Button, message } from "antd";
import instance from "../../config/axiosConfig";
import { useCart } from "../../context/CartContext";

const AddToCart = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCartCount } = useCart();
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
      loading={loading}
      onClick={handleAddToCart}
      style={{
        width: "100%",
        color: "#fff",
        fontWeight: "600",
        backgroundColor: loading ? "#9CA3AF" : "#DC2626",
        padding: "0.5rem 1.5rem",
        borderRadius: "0 0 0.5rem 0.5rem",
        transition: "background-color 0.2s ease-in-out",
        cursor: loading ? "not-allowed" : "pointer",
        border: "none",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!loading)
          (e.target as HTMLElement).style.backgroundColor = "#B91C1C";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!loading)
          (e.target as HTMLElement).style.backgroundColor = "#DC2626";
      }}
    >
      {loading ? "Đang thêm..." : "Thêm vào giỏ hàng"}
    </Button>
  );
};

export default AddToCart;
