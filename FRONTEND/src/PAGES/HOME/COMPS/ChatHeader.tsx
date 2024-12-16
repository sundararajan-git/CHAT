import { BiX } from "react-icons/bi";

const ChatHeader = () => {
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img alt={"asdfas"} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{"Arun Kumar"}</h3>
            <p className="text-sm text-base-content/70">
              {true ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button>
          <BiX />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
