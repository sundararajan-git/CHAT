import { RiChatAiFill } from "react-icons/ri";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <RiChatAiFill className="size-4 sm:size-6" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to Chat!</h2>
        <p className="text-base-content/60">Start chatting</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
