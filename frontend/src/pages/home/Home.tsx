import ChatContainer from "./comps/ChatContainer";
import SideBar from "./comps/SideBar";
import { axiosInstance } from "../../lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { useEffect, useState } from "react";
import { addMessage, setmessage } from "../../lib/redux/slices/messageSlice";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../../lib/redux/slices/socketSlice";

const Home = () => {
  const messages = useSelector((state: RootState) => state.messages);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<any>(null);
  const [info, setInfo] = useState<any>({
    chatUser: null,
  });

  const userClickHandler = async (conatct: any) => {
    try {
      setInfo((prev: any) => {
        return { ...prev, chatUser: conatct };
      });
      const { data, status } = await axiosInstance.get(`/chat/${conatct?._id}`);

      if (status === 200) {
        dispatch(setmessage(data?.message));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      query: { userId: user._id },
      withCredentials: true,
      reconnection: true, // ✅ Enables automatic reconnection
      reconnectionAttempts: 5, // ✅ Tries 5 times before failing
      reconnectionDelay: 1000, // ✅ Wait 1 second before reconnecting
    });

    // newSocket.on("connect", () => {
    //   console.log("Socket connected:", newSocket.id);
    // });

    // newSocket.on("disconnect", () => {
    //   console.log("Socket disconnected! Attempting to reconnect...");
    // });

    newSocket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user._id, dispatch]);

  useEffect(() => {
    if (!socket) return;
    socket.off("newMessage"); // Remove existing listener to prevent duplicates
    socket.on("newMessage", (message: any) => {
      dispatch(addMessage(message));
    });
    return () => {
      socket.off("newMessage"); // Cleanup when component unmounts
    };
  }, [messages, socket]);

  return (
    <>
      <div className="block sm:hidden h-[93vh]">
        {info?.chatUser ? (
          <ChatContainer
            chats={messages}
            chatUser={info?.chatUser}
            setInfo={setInfo}
          />
        ) : (
          <SideBar userClickHandler={userClickHandler} />
        )}
      </div>
      <div className="w-full h-[92vh] relative hidden sm:flex flex-row overflow-y-hidden">
        <SideBar userClickHandler={userClickHandler} />
        <ChatContainer chats={messages} chatUser={info?.chatUser} />
      </div>
    </>
  );
};

export default Home;
