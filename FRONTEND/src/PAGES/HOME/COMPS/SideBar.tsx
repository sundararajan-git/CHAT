import { useEffect, useState } from "react";
import userSvg from "../../../ASSETES/user.svg";
import Loader from "../../../COMPONETNS/Loader";
import { axiosInstance } from "../../../LIB/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../LIB/REDUX/store";
import { setContacts } from "../../../LIB/REDUX/SLICES/contactsSlice";
import { setOnlineUsers, setSocket } from "../../../LIB/REDUX/SLICES/socketSlice";
import { io } from "socket.io-client";


const SideBar = (props: any) => {
  // PROPS
  const { userClickHandler } = props;

  // GET PRODUCTS FROM THE GLOBALS STATE
  const contacts = useSelector((state: RootState) => state.contacts);

  const user = useSelector((state: RootState) => state.user);

  const { socket, onlineUsers } = useSelector(
    (state: RootState) => state.socket
  );

  // DISPATCH FROM REDUX
  const dispatch = useDispatch();

  // CONTROL THE COMPONENT
  const [control, setControl] = useState({
    pageLoading: true,
  });

  useEffect(() => {
    // Fetch initial user data with Axios (if required)
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/user"); // Replace with your API
        console.log("User Data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // Initialize Socket.IO
    const newSocket = io("http://localhost:8080", {
      query: { userId: user._id }, // Replace with actual user ID
      withCredentials: true,
    });

    // Save socket instance in Redux
    dispatch(setSocket(newSocket));

    // Listen for online users
    newSocket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      newSocket.disconnect(); // Clean up on component unmount
    };
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const usersResponse = await axiosInstance.get("/chat/user");

      console.log(usersResponse);

      if (usersResponse?.data?.success) {
        const { filteredUsers } = usersResponse?.data;

        console.log(filteredUsers);

        dispatch(setContacts(filteredUsers));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setControl((prev) => {
        const clone = { ...prev };
        clone.pageLoading = false;
        return clone;
      });
    }
  };

  // ---------------- TESTING AREA -----------------------


  console.log(onlineUsers)

  console.log(socket)

  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      {control?.pageLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <section className=" flex flex-col gap-4 p-2 sm:p-4">
          {contacts.map((item, index) => {
            return (
              <div
                className="bg-lime-4001 flex gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                key={index}
                onClick={userClickHandler}
              >
                <img
                  src={userSvg}
                  alt={"user"}
                  className="size-10 object-cover rounded-full h-fit "
                />
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium truncate text-sm">
                      {item?.fullName}
                    </div>
                    <p className="line-clamp-2 text-wrap text-xs">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ea sequi voluptatem veniam voluptate, aliquam saepe
                      molestiae eaque, corporis mollitia rem assumenda repellat
                      suscipit qui itaque accusantium beatae. Laboriosam,
                      nostrum ullam?
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between text-xs w-full">
                    <span className="text-gray-500">12/13/2024</span>
                    <span className="p-2 rounded-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-500 font-semibold">
                        Online
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default SideBar;
