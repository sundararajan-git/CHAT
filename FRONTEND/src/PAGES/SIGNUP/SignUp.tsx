import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import logosvg from "../../ASSETES/logo.svg";
import { MdOutlineLockPerson, MdOutlineMail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import BtnLoader from "../../COMPONETNS/BtnLoader";
import toast from "react-hot-toast";
import { validateForm } from "../../COMMON/Helper";

const SignUp = () => {
  // CONTROL THE COMPONENT
  const [control, setControl] = useState({
    btnloading: false,
    showpassword: false,
  });

  // CREATE ACCOUNT HANDLER
  const createAccountHandler = async () => {
    try {
      const formElement = document.getElementById("signup") as HTMLFormElement;

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
      toast.success("Account created !");
    } catch (err) {
      const error = err as Error;
      console.error(error);
    }
  };

  // EYE ICON HANDLER
  const passwordShowHandler = () => {
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-12">
        <div className="text-center mb-2">
          <div className="flex flex-col items-center gap-2 group">
            <img src={logosvg} alt="logo" />
            <h1 className="text-2xl font-bold mt-1">Create Account</h1>
            <p className="text-gray-400">Get started with your free account</p>
          </div>
        </div>

        <form className="space-y-2 text-sm" id="signup">
          <div className="form-control">
            <label className="label cursor-pointer" htmlFor="name">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="size-5 text-gray-700" />
              </div>
              <input
                type="text"
                className="input border-gray-300 w-full pl-10 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 text-sm"
                id="name"
                name="name"
                placeholder="Arun Kumar"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer" htmlFor="email">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdOutlineMail className="size-5 text-gray-700" />
              </div>
              <input
                type="email"
                className={`input border-gray-300 w-full pl-10 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 text-sm`}
                id="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer" htmlFor="password">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdOutlineLockPerson className="size-5 text-gray-700" />
              </div>
              <input
                type={control?.showpassword ? "text" : "password"}
                className={`input border-gray-300 w-full pl-10 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 text-sm`}
                id="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={passwordShowHandler}
              >
                {control?.showpassword ? (
                  <FaRegEyeSlash className="size-5 text-base-content/40" />
                ) : (
                  <FaRegEye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="btn bg-green-500 hover:bg-green-600 w-full text-white"
              onClick={createAccountHandler}
            >
              {control.btnloading && <BtnLoader />}
              {control.btnloading ? "Loading..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="link text-green-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
