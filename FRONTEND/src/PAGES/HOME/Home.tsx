import { useState } from "react";
import ChatContainer from "./comps/ChatContainer";
import NoChatSelected from "./comps/NoChatSelected";
import SideBar from "./comps/SideBar";

const Home = () => {
  const [control, setControl] = useState({
    chatpage: !false,
  });

  const userClickHandler = () => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.chatpage = true;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full">
      {control?.chatpage ? (
        <ChatContainer setControl={setControl} />
      ) : (
        <SideBar userClickHandler={userClickHandler} />
      )}
    </div>
  );
};

export default Home;
