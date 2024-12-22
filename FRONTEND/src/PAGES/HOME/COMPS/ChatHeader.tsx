import { IoIosCall } from "react-icons/io";
import userSvg from "../../../ASSETES/user.svg"
import { IoChevronBackOutline, IoVideocamOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
const ChatHeader = () => {
  return (
    <div className="p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">


          <div className="cursor-pointer p-2">
            <IoChevronBackOutline size={18} />
          </div>

          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img  src={userSvg} alt={"asdfas"} />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{"Arun Kumar"}</h3>
            <p className="text-sm text-green-600">
              {true ? "Online" : "Offline"}
            </p>
          </div>
        </div>


        <div className="flex items-center gap-6">
          <IoVideocamOutline  size={18}/>
          <IoIosCall size={18} />
          <BsThreeDotsVertical size={18} />
        </div>

      </div>
    </div>
  );
};
export default ChatHeader;
