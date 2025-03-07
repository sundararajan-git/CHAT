import ChatContainer from "./comps/ChatContainer";
import SideBar from "./comps/SideBar";
import { axiosInstance } from "../../lib/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { useState } from "react";

const Home = () => {
  const { user } = useSelector((state: RootState) => state);
  const [chats, setChats] = useState([]);

  const userClickHandler = (id: string) => {
    try {
      fetchUserData(id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async (id: string) => {
    try {
      console.log(user);
      const response = await axiosInstance.get(`/chat/${id}`);
      console.log("User Data:", response.data);
      setChats(response.data?.message);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-row">
        <SideBar userClickHandler={userClickHandler} />
        <ChatContainer chats={chats} />
      </div>
    </div>
  );
};

export default Home;
