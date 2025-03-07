import { useState } from "react";
import logo from "../../assets/logo.svg";
import { validateForm } from "../../common/helper";
import toast from "react-hot-toast";
import BtnLoader from "../../components/BtnLoader";
import { MdOutlineLockPerson } from "react-icons/md";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../lib/axiosInstance";
import { updateUser } from "../../lib/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contol, setControl] = useState({
    btnloader: false,
  });

  const vertificationHandler = async () => {
    try {
      const verificationForm = document.getElementById(
        "verificationForm"
      ) as HTMLFormElement;

      const isValidForm = validateForm(verificationForm);
      if (!isValidForm) {
        toast.error("Invalid Inputs");
        return;
      }

      setControl((prev: any) => {
        return { ...prev, btnloader: true };
      });

      const data = new FormData(verificationForm);
      const json = Object.fromEntries(data);
      const response = await axiosInstance.post("/users/verify", json);
      if (response?.data?.success) {
        toast.success("Verification Successfull");
        const { data } = response?.data;
        dispatch(updateUser({ ...data }));
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="w-full sm:w-1/2 lg:w-1/4 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm">
        <div className="flex items-center pb-2 gap-2">
          <img src={logo} />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">Verify</h2>
        </div>

        <form id="verificationForm" className="flex flex-col gap-6 w-full">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Code</legend>
            <label className="input" id="code">
              <MdOutlineLockPerson className="h-5 w-5 text-gray-600" />
              <input
                type="number"
                name="code"
                placeholder="verification code"
                required
              />
            </label>
          </fieldset>

          <div className="flex flex-col gap-2 w-full">
            <button
              type="button"
              className="btn"
              onClick={vertificationHandler}
            >
              {contol?.btnloader ? <BtnLoader /> : null}
              {contol?.btnloader ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Verification;
