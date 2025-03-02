import { useForm } from "react-hook-form";
import { IRegister } from "../interfaces/users";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm<IRegister>()

    const onSubmit = async (data: IRegister) => {
        try {
            // data.confirmPassword = undefined;
            await axios.post(`http://localhost:3000/api/signup`, data);
            
            toast.success("dang ky thanh cong")
        } catch (error: any) {
            toast.error(error.response.data)
        }
    }
  return (
    <div className="w-[1200px] m-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Đăng ký
      </h2>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Họ và Tên
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập họ và tên"
            {...register("username", {
                required: "Không được để trống"
            })}
          />
          {errors?.username && <span className="p-2 text-red-600">{errors?.username?.message}</span>}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập email"
            {...register("email", {
                required: "Không được để trống",
                pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Sai định dạng email"
                }
            })}
          />
          {errors?.email && <span className="p-2 text-red-600">{errors?.email?.message}</span>}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Mật khẩu
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập mật khẩu"
            {...register("password",{
                required: "Không để trống password",
                minLength: {
                  value: 6,
                  message: "Cần tối thiểu 6 ký tự"
                }
              })}
          />
          {errors?.password && <span className="p-2 text-red-600">{errors?.password?.message}</span>}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập lại mật khẩu"
            {...register("confirmPassword",{
                required: "Không để trống Confirm Password",
                validate: (value)=>{
                  return value == watch("password") || "Confirm password không trùng với Password"
                }
              })}
          />
          {errors?.confirmPassword && <span className="p-2 text-red-600">{errors?.confirmPassword?.message}</span>}
        </div>
        <button type="submit" className="w-full px-4 py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Đăng ký
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Đã có tài khoản?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Đăng nhập
        </a>
      </p>
    </div>
  );
};

export default Register;
