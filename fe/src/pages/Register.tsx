import { useForm } from "react-hook-form";
import { IRegister } from "../interfaces/users";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import instance from "../config/axiosConfig";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegister>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const onSubmit = async (data: IRegister) => {
    try {
      await instance.post(`/signup`, data);
      toast.success("Đăng kí thành công");
      navigate("/login");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-3">
      <div className="w-[550px] p-6 bg-white rounded-lg shadow-lg mt-3">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Đăng ký
        </h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Họ và tên
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập họ và tên"
              {...register("username", { required: "Không được để trống" })}
            />
            {errors?.username && (
              <span className="text-red-400 text-sm p-1">
                {errors?.username?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email"
              {...register("email", {
                required: "Không được để trống",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Sai định dạng email",
                },
              })}
            />
            {errors?.email && (
              <span className="text-red-400 text-sm p-1">
                {errors?.email?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu"
              {...register("password", {
                required: "Không để trống password",
                minLength: { value: 6, message: "Cần tối thiểu 6 ký tự" },
              })}
            />
            {errors?.password && (
              <span className="text-red-400 text-sm p-1">
                {errors?.password?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập lại mật khẩu"
              {...register("confirmPassword", {
                required: "Không để trống",
                validate: (value) =>
                  value === watch("password") ||
                  "Confirm password không trùng với password",
              })}
            />
            {errors?.confirmPassword && (
              <span className="text-red-400 text-sm p-1">
                {errors?.confirmPassword?.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 uppercase text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300 "
          >
            Đăng ký
          </button>
        </form>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button className="flex items-center gap-2 px-4 py-2 text-blue-500 border-2 border-blue-400 rounded-lg hover:bg-slate-100 transition-all duration-300">
            <FaFacebook />
            <span>Facebook</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 border-2 text-red-500 border-red-400 rounded-lg hover:bg-slate-100 transition-all duration-300"
            onClick={() => googleLogin()}
          >
            <FaGoogle />
            <span>Google</span>
          </button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
