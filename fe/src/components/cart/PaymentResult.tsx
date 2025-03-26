import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import instance from "../../config/axiosConfig";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"success" | "error">();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const { data } = await instance.get(
          `payment/check_payment?${searchParams.toString()}`
        );
        setStatus(data?.data?.vnp_ResponseCode === "00" ? "success" : "error");
      } catch (error) {
        console.error("Lỗi khi kiểm tra thanh toán:", error);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [searchParams]);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center max-w-md">
        {loading ? (
          <p className="text-gray-500 text-lg">Đang kiểm tra thanh toán...</p>
        ) : status === "success" ? (
          <>
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Thanh toán thành công 🎉
            </h2>
          </>
        ) : (
          <>
            <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Thanh toán thất bại ❌
            </h2>
          </>
        )}
        <a
          href="/"
          className="mt-6 inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
};

export default PaymentResult;
