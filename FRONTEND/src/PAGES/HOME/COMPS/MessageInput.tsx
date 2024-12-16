import { useRef } from "react";
import { BiImage, BiSend, BiX } from "react-icons/bi";

const MessageInput = () => {
  const fileInputRef = useRef(null);

  return (
    <div className="p-4 w-full">
      {true && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
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
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${false ? "text-emerald-500" : "text-zinc-400"}`}
          >
            <BiImage size={20} />
          </button>
        </div>
        <button type="submit" className="btn btn-sm btn-circle">
          <BiSend size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
