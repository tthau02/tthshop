import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import instance from "../../config/axiosConfig";

interface ReceiverInfoProps {
  username: string;
  onUpdateSuccess: (updatedUser: User) => void;
}

interface User {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const ReceiverInfo: React.FC<ReceiverInfoProps> = ({
  username,
  onUpdateSuccess,
}) => {
  const { user, login } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: user?.username || username,
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("fullName", user.username || username);
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("address", user.address || "");
    }
  }, [user, username, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const updatedUser = {
        username: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };

      const response = await instance.put(`/user/${user?._id}`, updatedUser);
      const updatedUserData = response.data.userUpdate;

      login(updatedUserData);
      onUpdateSuccess(updatedUserData);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể cập nhật thông tin"
      );
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Thông tin người nhận</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Họ và tên */}
        <div className="flex items-center space-x-4">
          <FaUser className="text-gray-500 w-5 h-5" />
          <div className="flex-1">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Họ và tên
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: "Họ và tên là bắt buộc",
                minLength: {
                  value: 3,
                  message: "Họ và tên phải có ít nhất 3 ký tự",
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Nhập họ và tên"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-gray-500 w-5 h-5" />
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ",
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Nhập email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Số điện thoại */}
        <div className="flex items-center space-x-4">
          <FaPhone className="text-gray-500 w-5 h-5" />
          <div className="flex-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^(0|\+84)[0-9]{9}$/,
                  message:
                    "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 hoặc +84 và có 10 chữ số)",
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-gray-500 w-5 h-5" />
          <div className="flex-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ
            </label>
            <textarea
              id="address"
              {...register("address", {
                required: "Địa chỉ là bắt buộc",
              })}
              rows={3}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Nhập địa chỉ"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        {/* Nút cập nhật thông tin */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceiverInfo;
