import { useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./SKELETONS/MessageSkeleton";
import userSvg from "../../../ASSETES/user.svg"

const ChatContainer = () => {
  const messageEndRef = useRef(null);

  if (!true) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[1, 324, 3, 4, 5, 5].map((message) => (
          <div
            key={message}
            className={`chat ${true ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={userSvg} alt="profile pic" />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {/* {formatMessageTime(message.createdAt)} */}
              </time>
            </div>
            <div className="chat-bubble bg-pink-700 flex flex-col">
              {!true && (
                <img
                  // src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {true && <p>Hello</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
