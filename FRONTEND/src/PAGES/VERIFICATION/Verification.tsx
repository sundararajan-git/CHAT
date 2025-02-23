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
  const [contol, setControl] = useState({
    btnloader: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        const clone = { ...prev };
        clone.btnloader = true;
        return clone;
      });

      const data = new FormData(verificationForm);
      const json = Object.fromEntries(data);

      console.log(json);

      const response = await axiosInstance.post("/users/verify", json);

      console.log(response);

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
      <div className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm">
        <div className="flex items-center pb-2 gap-2">
          <img src={logo} />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">Verify</h2>
        </div>

        <form id="verificationForm" className="flex flex-col gap-6 w-full">
          <div className="form-control">
            <label className="label cursor-pointer" htmlFor="code">
              <span className="label-text font-medium">Code</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdOutlineLockPerson className="size-5 text-gray-700" />
              </div>
              <input
                type="text"
                className={`input border-gray-300 w-full pl-10 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-400 text-sm`}
                id="code"
                name="code"
                placeholder="code"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <button
              type="button"
              className="btn bg-green-500 hover:bg-green-600 w-full text-white"
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
