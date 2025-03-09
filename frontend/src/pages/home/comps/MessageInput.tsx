import { useRef, useState } from "react";
import { BiImage, BiSend, BiX } from "react-icons/bi";
import logo from "../../../assets/logo.svg";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../lib/redux/slices/messageSlice";
import toast from "react-hot-toast";
import BtnLoader from "../../../components/BtnLoader";

const MessageInput = (props: any) => {
  const { chatUser } = props;
  const dispatch = useDispatch();
  const [actions, setActions] = useState({
    btnLoading: false,
  });

  const sendBtnHandler = async () => {
    try {
      const msgInputEle = document.getElementById(
        "msgInput"
      ) as HTMLInputElement;

      if (msgInputEle?.value.trim() === "") {
        toast.error("Invalid Message !");
        return null;
      }

      const reqData = {
        text: msgInputEle?.value,
        image: "",
      };

      setActions((prev) => {
        return { ...prev, btnLoading: true };
      });

      const { data, status } = await axiosInstance.post(
        `/chat/send/${chatUser?._id}`,
        reqData
      );

      if (status === 200) {
        dispatch(addMessage(data?.message));
        setActions((prev) => {
          return { ...prev, btnLoading: false };
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 w-full relative">
      {!true && (
        <div className="flex items-center gap-2 absolute -top-[70px]">
          <div className="relative">
            <img
              className="w-20 h-20 object-cover rounded-lg  p-2"
              src={logo}
              alt="Preview"
            />
            <button
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white
              flex items-center justify-center cursor-pointer"
              type="button"
            >
              <BiX className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form className="flex items-center gap-2">
        <button
          type="button"
          className={`p-2 btn rounded-md bg-gray-300 border-none shadow-none text-black`}
        >
          <BiImage size={20} />
        </button>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="input"
            id="msgInput"
            placeholder="Type a message..."
          />
        </div>
        <button
          type="button"
          className="p-2 btn rounded-md"
          onClick={sendBtnHandler}
        >
          {actions?.btnLoading ? <BtnLoader /> : <BiSend size={20} />}
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
