import { useEffect, useState } from "react";
import userSvg from "../../../assets/user.svg";
import Loader from "../../../components/Loader";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";
import { setContacts } from "../../../lib/redux/slices/contactsSlice";

const SideBar = (props: any) => {
  const { userClickHandler } = props;
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state: RootState) => state.socket);
  const [control, setControl] = useState({
    pageLoading: true,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const usersResponse = await axiosInstance.get("/chat/users");
      if (usersResponse?.data?.success) {
        const { filteredUsers } = usersResponse?.data;
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

  return (
    <>
      {control?.pageLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <section className=" flex flex-col gap-4 w-full h-[91vh] max-w-1/4  overflow-auto px-4">
          <p className="font-semibold">Contacts</p>
          {contacts?.map((item) => {
            return (
              <div
                className="bg-lime-4001 flex gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                key={item?._id}
                onClick={() => userClickHandler(item)}
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
                    <span className="p-2 rounded-lg flex items-center gap-1">
                      {onlineUsers?.includes(item?._id) ? (
                        <>
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-green-500 font-semibold">
                            On
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span className="text-red-500 font-semibold">
                            Off
                          </span>
                        </>
                      )}
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
