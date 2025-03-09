import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import userSvg from "../../../assets/user.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";

const ChatContainer = (props: any) => {
  const { chats, chatUser } = props;
  const { user } = useSelector((state: RootState) => state);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const backBtnHandler = () => {};

  useEffect(() => {
    console.log(messageEndRef);
    if (messageEndRef?.current) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <div className="flex flex-col w-full sm:w-[80%] h-[92vh] text-sm sm:text-base">
      <ChatHeader chatUser={chatUser} backBtnHandler={backBtnHandler} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chats?.map((message: any) => (
          <div
            key={message?._id}
            className={`chat ${
              message.senderId === user._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={userSvg} alt="profile pic" />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {message?.createdAt.split("T")[0]}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message?.image && (
                <img
                  src={message?.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              <p>{message?.text}</p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <MessageInput chatUser={chatUser} />
    </div>
  );
};
export default ChatContainer;
