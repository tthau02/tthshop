import React from "react";
import { useForm } from "react-hook-form";
import { ILogin } from "../interfaces/users";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import instance from "../config/axiosConfig";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const navigate = useNavigate();
  const { login } = useAuth(); // Sử dụng hook useAuth để lấy hàm login

  const onSubmit = async (data: ILogin) => {
    try {
      const res = await instance.post(`/signin`, data);
      if (res.data) {
        const { accessToken, user } = res.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        login(user);
        toast.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại!";
      toast.error(errorMessage);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await instance.post("/auth/google", {
          accessToken: tokenResponse.access_token,
        });

        const { accessToken, user } = res.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        login(user);
        toast.success("Đăng nhập bằng Google thành công");
        navigate("/");
      } catch (error: any) {
        console.error(error.response);
        toast.error(
          error.response?.data?.message || "Lỗi khi đăng nhập bằng Google"
        );
      }
    },
    onError: () => {
      toast.error("Đăng nhập bằng Google thất bại");
    },
    scope: "email profile",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[550px] p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Đăng nhập
        </h2>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400"
              placeholder="Nhập email"
              {...register("email", {
                required: "Không để trống email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Sai định dạng email",
                },
              })}
            />
            {errors?.email && (
              <span className="p-1 text-[14px] text-red-500">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400"
              placeholder="Nhập mật khẩu"
              {...register("password", {
                required: "Không để trống mật khẩu",
                minLength: {
                  value: 6,
                  message: "Cần tối thiểu 6 ký tự",
                },
              })}
            />
            {errors?.password && (
              <span className="p-1 text-[14px] text-red-500">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 uppercase text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          >
            Đăng nhập
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <span className="w-full border-b border-gray-300"></span>
          <span className="px-4 text-gray-500">Hoặc</span>
          <span className="w-full border-b border-gray-300"></span>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button className="flex items-center px-4 py-2 text-blue-500 border-2 border-blue-400 rounded-lg hover:bg-slate-100 transition-all duration-300">
            <FaFacebook className="mr-2" />
            Facebook
          </button>
          <button
            onClick={() => googleLogin()}
            className="flex items-center px-4 py-2 border-2 text-red-500 border-red-400 rounded-lg hover:bg-slate-100 transition-all duration-300"
          >
            <FaGoogle className="mr-2" />
            Google
          </button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
