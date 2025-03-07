import ChatContainer from "./comps/ChatContainer";
import SideBar from "./comps/SideBar";
import { axiosInstance } from "../../lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import { setmessage } from "../../lib/redux/slices/messageSlice";

const Home = () => {
  const { messages } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [info, setInfo] = useState<any>({
    chatUserId: "",
  });

  const userClickHandler = (id: string) => {
    fetchUserData(id);
  };

  const fetchUserData = async (id: string) => {
    try {
      setInfo((prev: any) => {
        return { ...prev, chatUserId: id };
      });
      const { data, status } = await axiosInstance.get(`/chat/${id}`);
      if (status === 200) {
        dispatch(setmessage(data?.message));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(messages);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-row">
        <SideBar userClickHandler={userClickHandler} />
        {messages?.length ? (
          <ChatContainer chats={messages} info={info} />
        ) : (
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <img src={logo} alt="logo" />
            <p>No Chats..</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
