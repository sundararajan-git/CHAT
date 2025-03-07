import { useRef } from "react";
import { BiImage, BiSend, BiX } from "react-icons/bi";
import logo from "../../../assets/logo.svg";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";

const MessageInput = () => {
  const fileInputRef = useRef(null);
  const { user } = useSelector((state: RootState) => state);

  const sendBtnHandler = async () => {
    try {
      const { data } = await axiosInstance.post(
        `/chat/send/${"67c870840ba67003ffa1c822"}`,
        {
          text: "hello",
        }
      );

      console.log(data);
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
            placeholder="Type a message..."
          />
        </div>

        <button
          type="button"
          className="p-2 btn rounded-md"
          onClick={sendBtnHandler}
        >
          <BiSend size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
