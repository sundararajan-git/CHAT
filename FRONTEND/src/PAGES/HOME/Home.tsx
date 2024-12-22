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
    <div className="w-full h-full overflow-hidden">
      {!control?.chatpage ? (
        <SideBar userClickHandler={userClickHandler} />
      ) : (
        <ChatContainer setControl={setControl} />
      )}
    </div>
  );
};

export default Home;

{
  /* <div className="h-screen bg-base-200">
<div className="flex items-center justify-center p-4 h-full overflow-auto">
  <div className="w-full h-[85vh]">
    <div className="flex h-full rounded-lg overflow-hidden">
      <SideBar />
      {!true ? <NoChatSelected /> : <ChatContainer />}
    </div>
  </div>
</div>
</div> */
}
