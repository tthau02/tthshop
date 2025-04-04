import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTimes,
  FaSave,
  FaUpload,
} from "react-icons/fa";
import instance from "../../config/axiosConfig";

const EditProfile = () => {
  const { user, login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      avatar: null,
    },
  });

  const [avatarPreview, setAvatarPreview] = React.useState(
    user?.image || "https://via.placeholder.com/100"
  );

  useEffect(() => {
    if (user) {
      setValue("fullName", user.username || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("address", user.address || "");
      if (user.image) {
        setAvatarPreview(user.image);
      }
    }
  }, [user, setValue]);

  // Xử lý khi chọn file ảnh
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file as any);
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  // Xử lý submit form
  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("username", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.avatar) {
        formData.append("image", data.avatar);
      }

      // Gửi request cập nhật lên backend
      const response = await instance.put(`/user/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const updatedUser = response.data.userUpdate;
      login(updatedUser);

      alert("Cập nhật thông tin thành công!");
    } catch (error: unknown) {
      console.error(
        "Lỗi khi cập nhật:",
        error instanceof Error ? error.message : "Unknown error"
      );
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  // Xử lý khi nhấn Hủy
  const handleCancel = () => {
    // Reset form hoặc điều hướng về trang trước
    console.log("Hủy cập nhật");
  };

  if (!user) {
    return <div>Vui lòng đăng nhập để chỉnh sửa thông tin!</div>;
  }

  return (
    <>
      <h4 className="font-medium text-lg mb-4">Cập nhật thông tin tài khoản</h4>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Ảnh đại diện */}
          <div className="flex items-center space-x-4">
            <FaUpload className="text-gray-500 w-4 h-4" />
            <div className="flex-1">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Ảnh đại diện
              </label>
              <div className="flex items-center space-x-4 mt-1">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  {...register("avatar")}
                  onChange={handleAvatarChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Họ và tên */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-gray-500 w-4 h-4" />
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
            <FaEnvelope className="text-gray-500 w-4 h-4" />
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
            <FaPhone className="text-gray-500 w-4 h-4" />
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
            <FaMapMarkerAlt className="text-gray-500 w-4 h-4" />
            <div className="flex-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Địa chỉ
              </label>
              <textarea
                id="address"
                {...register("address")}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              <FaTimes className="w-4 h-4 mr-2" />
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <FaSave className="w-4 h-4 mr-2" />
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
