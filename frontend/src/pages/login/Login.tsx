import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { validateForm } from "../../common/helper";
import toast from "react-hot-toast";
import { useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/redux/slices/userSlice";
import BtnLoader from "../../components/BtnLoader";
import { SlLock } from "react-icons/sl";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import logo from "../../assets/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [control, setControl] = useState({
    btnlaoding: false,
    showpassword: false,
  });

  const signInHandler = async () => {
    try {
      const formElement = document.getElementById("singIn") as HTMLFormElement;
      const isValidForm = validateForm(formElement);

      if (!isValidForm) {
        toast.error("Invalid inputs !");
        return null;
      }

      setControl((prev: any) => {
        return { ...prev, btnlaoding: true };
      });

      const formData = new FormData(formElement);
      const formJson = Object.fromEntries(formData);
      const { data } = await axiosInstance.post("/user/login", formJson);

      if (data?.success) {
        const { data: user } = data;
        dispatch(updateUser(user));
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
    setControl((prev: any) => {
      return { ...prev, showpassword: !prev.showpassword };
    });
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <img src={logo} alt="logo" />
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to your account</p>
            </div>
          </div>

          <form className="space-y-2" id="singIn">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <label className="input" id="email">
                <MdOutlineMail className="h-5 w-5 text-gray-600" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  required
                />
              </label>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <label className="input" id="password">
                <SlLock className="h-4 w-4 text-gray-700" />
                <input
                  type={control?.showpassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center
                  cursor-pointer"
                  onClick={showPasswordHandler}
                >
                  {control?.showpassword ? (
                    <VscEyeClosed className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <VscEye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </label>
            </fieldset>

            <button
              type="button"
              className="btn w-full mt-4"
              onClick={signInHandler}
            >
              {control?.btnlaoding ? <BtnLoader /> : null}
              {control?.btnlaoding ? "Loading..." : "Sign in"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="ms-1 link text-primary">
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
