import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import userSvg from "/avatar.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";
import { RiChatAiFill } from "react-icons/ri";

const ChatContainer = (props: any) => {
  const { chats, chatUser, setInfo } = props;
  const { user } = useSelector((state: RootState) => state);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const backBtnHandler = () => {
    setInfo((prev: any) => {
      return { ...prev, chatUser: null };
    });
  };

  useEffect(() => {
    console.log(messageEndRef);
    if (messageEndRef?.current) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <div className="flex flex-col w-full sm:w-[80%] h-full text-sm sm:text-base overflow-y-hidden">
      {chatUser ? (
        <div className="flex flex-col gap-2 h-full overflow-y-hidden">
          <ChatHeader chatUser={chatUser} backBtnHandler={backBtnHandler} />
          <div className="overflow-y-auto p-4 space-y-4 h-full">
            {chats?.map((message: any) => (
              <div
                key={message?._id}
                className={`chat ${
                  message.senderId === user._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="size-8 sm:size-10 rounded-full">
                    <img src={userSvg} alt="profile pic" />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {message?.createdAt.split("T")[0]}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col text-sm">
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
      ) : (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <RiChatAiFill className="size-4 sm:size-6" />
          <p>No Chats..</p>
        </div>
      )}
    </div>
  );
};
export default ChatContainer;
