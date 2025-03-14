import { useForm } from "react-hook-form";
import { IRegister } from "../interfaces/users";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import instance from "../config/axiosConfig";

const Register: React.FC = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm<IRegister>()
    const navigate = useNavigate();
    const onSubmit = async (data: IRegister) => {
        try {
            // data.confirmPassword = undefined;
            await instance.post(`/signup`, data);
            toast.success("Đăng kí thành công")
            navigate("/login");
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại!";
          toast.error(errorMessage);
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-3">
      <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg mt-3">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Đăng ký
        </h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Họ và Tên
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập họ và tên"
              {...register("username", { required: "Không được để trống" })}
            />
            {errors?.username && (
              <span className="text-red-600 text-sm">{errors?.username?.message}</span>
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
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Sai định dạng email" },
              })}
            />
            {errors?.email && (
              <span className="text-red-600 text-sm">{errors?.email?.message}</span>
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
              <span className="text-red-600 text-sm">{errors?.password?.message}</span>
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
                required: "Không để trống Confirm Password",
                validate: (value) =>
                  value === watch("password") || "Confirm password không trùng với Password",
              })}
            />
            {errors?.confirmPassword && (
              <span className="text-red-600 text-sm">{errors?.confirmPassword?.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            Đăng ký
          </button>
        </form>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <FaFacebook />
            <span>Facebook</span>
          </button>
          <button className="flex items-center px-4 py-2 space-x-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
            <FaGoogle />
            <span>Google</span>
          </button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
