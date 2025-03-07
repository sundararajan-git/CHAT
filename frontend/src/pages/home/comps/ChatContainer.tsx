import { useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import userSvg from "../../../assets/user.svg";
import logo from "../../../assets/logo.svg";

const ChatContainer = (props: any) => {
  const { setControl, chats } = props;
  const messageEndRef = useRef(null);

  const backBtnHandler = () => {
    try {
      console.log("clicking");
      setControl((prev: any) => {
        prev.chatpage = true;
        return null;
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!true) {
    return (
      <div className="flex flex-col w-[80%] mx-auto h-full">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full sm:w-[80%] h-[92vh] text-sm sm:text-base">
      <ChatHeader backBtnHandler={backBtnHandler} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chats?.map((message: any) => (
          <div
            key={message}
            className={`chat ${message % 2 === 0 ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={userSvg} alt="profile pic" />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {/* 12/12/2024 */}
                5:00 PM
                {/* {formatMessageTime(message.createdAt)} */}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {/* {message % 2 === 0 && (
                <img
                  src={logo}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )} */}
              <p>{message?.text}</p>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
