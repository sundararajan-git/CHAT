import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logosvg from "../../assets/logo.svg";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import BtnLoader from "../../components/BtnLoader";
import toast from "react-hot-toast";
import { validateForm } from "../../common/helper";
import { axiosInstance } from "../../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/redux/slices/userSlice";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { SlLock } from "react-icons/sl";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [control, setControl] = useState({
    btnloading: false,
    showpassword: false,
  });

  const createAccountHandler = async () => {
    try {
      const formElement = document.getElementById("signup") as HTMLFormElement;
      const isValidForm = validateForm(formElement);

      if (!isValidForm) {
        toast.error("Invalid inputs !");
        return null;
      }

      setControl((prev: any) => {
        return { ...prev, btnloading: true };
      });
      const formData = new FormData(formElement);
      const formJson = Object.fromEntries(formData);
      const response = await axiosInstance.post("/user/signup", formJson);
      if (response?.data?.success) {
        const { data } = response?.data;
        toast.success("Sign Up Successfully");
        dispatch(updateUser({ ...data }));
        navigate("/");
      }
    } catch (err) {
      const error = err as Error;
      console.error(error);
    }
  };

  const passwordShowHandler = () => {
    setControl((prev: any) => {
      return { ...prev, showpassword: !prev.showpassword };
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-8 p-12">
        <div className="text-center mb-2">
          <div className="flex flex-col items-center gap-2 group">
            <img src={logosvg} alt="logo" />
            <h1 className="text-2xl font-bold mt-1">Create Account</h1>
            <p className="text-gray-400">Get started with your free account</p>
          </div>
        </div>

        <form className="space-y-2 text-sm" id="signup">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Full Name</legend>
            <label className="input input-md" id="fullName">
              <FiUser className="h-5 w-5 text-gray-600" />
              <input
                type="text"
                name="fullName"
                placeholder="Your Name"
                required
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <label className="input input-md" id="email">
              <MdOutlineMail className="h-5 w-5 text-gray-600" />
              <input
                type="text"
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
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={passwordShowHandler}
              >
                {control?.showpassword ? (
                  <VscEyeClosed className="h-5 w-5 text-base-content/40" />
                ) : (
                  <VscEye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </label>
          </fieldset>

          <div className="pt-4">
            <button
              type="button"
              className="btn w-full"
              onClick={createAccountHandler}
            >
              {control.btnloading && <BtnLoader />}
              {control.btnloading ? "Loading..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="ms-1 link text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
