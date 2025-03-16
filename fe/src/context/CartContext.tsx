// CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import instance from "../config/axiosConfig";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cartItemCount: number;
  fetchCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { user } = useAuth(); // Lấy user từ AuthContext

  const fetchCartCount = async () => {
    if (!user) {
      setCartItemCount(0);
      return;
    }
    try {
      const response = await instance.get(`/cart/${user._id}`);
      const cartItems = response.data.cart?.items || [];
      setCartItemCount(cartItems.length);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [user]); // Gọi lại khi user thay đổi

  return (
    <CartContext.Provider value={{ cartItemCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
