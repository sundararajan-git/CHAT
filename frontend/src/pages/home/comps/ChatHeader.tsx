import { IoIosCall } from "react-icons/io";
import userSvg from "/avatar.jpg";
import { IoChevronBackOutline, IoVideocamOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = (props: any) => {
  const { backBtnHandler, chatUser } = props;
  console.log(chatUser);
  return (
    <div className="flex items-center justify-between sm:p-2.5">
      <div className="flex items-center gap-3">
        <div
          className="p-1 rounded cursor-pointer sm:hidden"
          onClick={backBtnHandler}
        >
          <IoChevronBackOutline size={18} />
        </div>

        <div className="avatar">
          <div className="size-6 sm:size-8 rounded-full relative">
            <img src={userSvg} alt={"user"} />
          </div>
        </div>

        <div>
          <h3 className="font-medium">{chatUser?.fullName}</h3>
          <p className="text-sm text-green-600">
            {true ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <IoVideocamOutline size={18} />
        <IoIosCall size={18} />
        <BsThreeDotsVertical size={18} />
      </div>
    </div>
  );
};
export default ChatHeader;
