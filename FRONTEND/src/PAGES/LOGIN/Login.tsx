import { Link, useNavigate } from "react-router-dom";
import logosvg from "../../assets/logo.svg";
import { MdOutlineLockPerson, MdOutlineMail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { validateForm } from "../../common/helper";
import toast from "react-hot-toast";
import { useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/redux/slices/userSlice";
import BtnLoader from "../../components/BtnLoader";

const Login = () => {
  const [control, setControl] = useState({
    btnlaoding: false,
    showpassword: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInHandler = async () => {
    try {
      const formElement = document.getElementById("singIn") as HTMLFormElement;

      const isValidForm = validateForm(formElement);

      if (!isValidForm) {
        toast.error("Invalid inputs !");
        return null;
      }

      const formData = new FormData(formElement);
      const formJson = Object.fromEntries(formData);

      console.log(formJson);

      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnloading = true;
        return clone;
      });

      const response = await axiosInstance.post("/users/login", formJson);

      if (response?.data?.success) {
        const { data } = response?.data;
        dispatch(updateUser(data));
        setTimeout(() => {
          toast.success("Sign In Successfully");
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      const error = err as Error;
      console.error(error);
    }
  };

  const showPasswordHandler = () => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.showpassword = !prev.showpassword;
        return clone;
      });
    } catch (err) {
      const error = err as Error;
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <img src={logosvg} alt="logo" />
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to your account</p>
            </div>
          </div>

          <form className="space-y-6" id="singIn">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineMail className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`input border-gray-300 w-full pl-10 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 text-sm`}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineLockPerson className="h-5 w-5 text-gray-700" />
                </div>
                <input
                  type={control?.showpassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`input border-gray-300 w-full pl-10 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-green-400 text-sm`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={showPasswordHandler}
                >
                  {control?.showpassword ? (
                    <FaRegEyeSlash className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <FaRegEye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn bg-green-500 w-full hover:bg-green-600 border-none text-white"
              onClick={signInHandler}
            >
              {control?.btnlaoding ? <BtnLoader /> : null}
              {control?.btnlaoding ? "Loading..." : "Sign in"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link text-green-600">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
