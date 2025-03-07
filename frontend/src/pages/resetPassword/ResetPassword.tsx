import toast from "react-hot-toast";
import logo from "../../assets/logo.svg";
import { validateForm } from "../../common/helper";
import { useState } from "react";
import BtnLoader from "../../components/BtnLoader";
import { SlLock } from "react-icons/sl";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const ResetPassword = () => {
  const [control, setControl] = useState({
    btnloader: false,
    showpassword: false,
  });

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
        return { ...prev, btnloader: true };
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

  const passwordShowHandler = () => {
    setControl((prev: any) => {
      return { ...prev, showpassword: !prev.showpassword };
    });
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="w-full sm:w-1/2 lg:w-1/4 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm">
        <div className="flex items-center pb-2 gap-2">
          <img src={logo} />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">
            Reset Password
          </h2>
        </div>

        <form id="resetpassword" className="flex flex-col gap-6 w-full">
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
                className="absolute inset-y-0  cursor-pointer right-0 pr-3 flex items-center"
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

          <div className="flex flex-col gap-2 w-full">
            <button
              type="button"
              className="btn w-full"
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
