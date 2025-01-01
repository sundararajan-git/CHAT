import { useState } from "react";
import ChatContainer from "./COMPS/ChatContainer";
import NoChatSelected from "./COMPS/NoChatSelected";
import SideBar from "./COMPS/SideBar";

const Home = () => {
  // CONTROL THE COMPOENT
  const [control, setControl] = useState({
    chatpage: false,
  });

  // USER CLICK HANDLER
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
