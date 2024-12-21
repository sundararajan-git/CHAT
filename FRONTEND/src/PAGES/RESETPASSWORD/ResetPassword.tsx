import toast from "react-hot-toast";
import logo from "../../ASSETES/logo.svg";
import { validateForm } from "../../COMMON/Helper";
import { useState } from "react";
import { MdOutlineLockPerson } from "react-icons/md";
import BtnLoader from "../../COMPONETNS/BtnLoader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  // CONTROL THE COMPONENT
  const [control, setControl] = useState({
    btnloader: false,
    showpassword: false,
  });

  //  USE DISPATCH
  // const dispatch = useDispatch();

  // USE LOCATION
  // const location = useLocation();

  // RESET BTN HANDLER
  const resetBtnHandler = async () => {
    try {
      const resetPasswordForm = document.getElementById(
        "resetpassword"
      ) as HTMLFormElement;

      const isvalid = validateForm(resetPasswordForm);

      if (!isvalid) {
        toast.error("Invalid Inputs");
        return;
      }

      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnloader = true;
        return clone;
      });
      const data = new FormData(resetPasswordForm);
      const json = Object.fromEntries(data);
      console.log(json);

      // const token = location.pathname.split("/")[2];
      // const response = await axiosInstance.put(
      //   `/users/resetpassword/${token}`,
      //   json
      // );

      // console.log(response);

      // if (response?.data?.success) {
      //   toast.success("Password updated");
      //   const { data } = response?.data;
      //   dispatch(updateUser({ ...data }));
      // }
    } catch (err) {
      console.error(err);
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
    <section className="flex items-center justify-center w-full h-screen">
      <div className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm">
        <div className="flex items-center pb-2 gap-2">
          <img src={logo} />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">
            Reset Password
          </h2>
        </div>

        <form id="resetpassword" className="flex flex-col gap-6 w-full">
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

          <div className="flex flex-col gap-2 w-full">
            <button
              type="button"
              className="btn bg-green-500 hover:bg-green-600 w-full text-white"
              onClick={resetBtnHandler}
            >
              {control?.btnloader ? <BtnLoader /> : null}
              {control?.btnloader ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
