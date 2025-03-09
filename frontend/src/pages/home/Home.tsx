import ChatContainer from "./comps/ChatContainer";
import SideBar from "./comps/SideBar";
import { axiosInstance } from "../../lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { useEffect, useMemo, useState } from "react";
import logo from "../../assets/logo.svg";
import { addMessage, setmessage } from "../../lib/redux/slices/messageSlice";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../../lib/redux/slices/socketSlice";

const Home = () => {
  const messages = useSelector((state: RootState) => state.messages);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [info, setInfo] = useState<any>({
    chatUser: null,
  });
  const [socket, setSocket] = useState<any>(null);

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

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected! Attempting to reconnect...");
    });

    newSocket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user._id, dispatch]); // ✅ Also include `dispatch`

  useEffect(() => {
    if (!socket) return;

    console.log("Re-rendering & setting up socket listeners");

    socket.off("newMessage"); // Remove existing listener to prevent duplicates
    socket.on("newMessage", (message: any) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("newMessage"); // Cleanup when component unmounts
    };
  }, [messages, socket]);

  console.log(socket);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-row">
        <SideBar userClickHandler={userClickHandler} />
        {messages?.length ? (
          <ChatContainer chats={messages} chatUser={info?.chatUser} />
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
