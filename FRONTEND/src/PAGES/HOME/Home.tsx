import ChatContainer from "./COMPS/ChatContainer";
import NoChatSelected from "./COMPS/NoChatSelected";
import SideBar from "./COMPS/SideBar";

const Home = () => {
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center p-4 h-full overflow-auto">
        {/* <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]"> */}
        <div className="w-full h-[85vh]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />
            {!true ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
