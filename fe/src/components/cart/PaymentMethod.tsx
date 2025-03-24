import { useState } from "react";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";

interface PaymentMethodProps {
  onCheckout: (paymentMethod: string) => void;
  isInfoComplete: boolean;
  loading: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  onCheckout,
  isInfoComplete,
  loading,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("cod");

  const availableMethods = [
    {
      value: "cod",
      label: "Thanh toán khi nhận hàng (COD)",
      icon: FaMoneyBillWave,
    },
    { value: "vnpay", label: "Thanh toán VNPAY", icon: FaCreditCard },
    { value: "wallet", label: "Ví điện tử (Momo, ZaloPay)", icon: FaWallet },
  ];

  const handleCheckout = () => {
    onCheckout(selectedMethod);
  };

  return (
    <div className="md:col-span-1">
      <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
      <div className="border rounded-lg p-4 space-y-4">
        {availableMethods.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name="paymentMethod"
              value={value}
              checked={selectedMethod === value}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <Icon className="text-gray-500 w-5 h-5" />
            <span className="text-gray-700">{label}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleCheckout}
        disabled={!isInfoComplete || loading}
        className={`mt-6 w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
          isInfoComplete && !loading
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {loading ? (
          "Đang xử lý..."
        ) : (
          <>
            <FaCheckCircle className="w-5 h-5 mr-2" />
            Xác nhận thanh toán
          </>
        )}
      </button>
    </div>
  );
};

export default PaymentMethod;
