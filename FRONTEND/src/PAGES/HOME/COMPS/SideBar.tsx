import { useEffect, useState } from "react";
import userSvg from "../../../ASSETES/user.svg";
import Loader from "../../../COMPONETNS/Loader";
import { axiosInstance } from "../../../LIB/axiosInstance";

const SideBar = (props: any) => {
  // PROPS
  const { userClickHandler } = props;

  // CONTROL THE COMPONENT
  const [control, setControl] = useState({
    pageLoading: true,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {

      const usersResponse = await axiosInstance.get("/chat/user");

      console.log(usersResponse);
    
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- TESTING AREA -----------------------

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
          {arr.map((item, index) => {
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
                      {"Arun Kumar"}
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
