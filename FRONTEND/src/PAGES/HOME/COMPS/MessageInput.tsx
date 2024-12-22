import { useRef } from "react";
import { BiImage, BiSend, BiX } from "react-icons/bi";
import logo from "../../../ASSETES/logo.svg";

const MessageInput = () => {
  const fileInputRef = useRef(null);

  return (
    <div className="p-4 w-full relative">
      {true && (
        <div className="flex items-center gap-2 absolute -top-[70px]">
          <div className="relative">
            <img
              className="w-20 h-20 object-cover rounded-lg bg-gray-100 p-2"
              src={logo}
              alt="Preview"
            />
            <button
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white
              flex items-center justify-center"
              type="button"
            >
              <BiX className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input border-gray-300 rounded-xl input-sm sm:input-md focus:outline-none focus:border-transparent focus:ring-1 focus:ring-green-400"
            placeholder="Type a message..."
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />
        </div>

        <button
          type="button"
          className={`hidden sm:flex btn btn-sm btn-circle text-gray-400`}
        >
          <BiImage size={20} />
        </button>

        <button type="submit" className="btn btn-sm btn-circle border-gray-400 text-gray-400">
          <BiSend size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
