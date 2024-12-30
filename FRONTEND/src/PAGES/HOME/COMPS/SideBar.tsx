import userSvg from "../../../ASSETES/user.svg";

const SideBar = (props: any) => {
  // PROPS
  const { userClickHandler } = props;
  return (
    <aside className="w-fit sm:w-[90%] mx-auto h-full flex flex-col transition-all duration-200">
      <div className="w-full h-full overflow-auto flex flex-col p-1.5 sm:mt-12">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
          (user) => (
            <div
              key={user}
              className={`
              w-full p-3 flex items-center gap-3 transition-colors hover:bg-zinc-100 cursor-pointer rounded-xl fade-up border-b
            `}
              onClick={userClickHandler}
            >
              <img
                src={userSvg}
                alt={"user"}
                className="size-10 object-cover rounded-full h-fit"
              />

              <div className="flex items-center justify-between gap-2 w-full">
                <div className="w-1/2">
                  <div className="font-medium truncate text-sm">
                    {"Arun Kumar"}
                  </div>
                  <div className="text-sm text-zinc-400 truncate w-1/2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    {/* Unde delectus necessitatibus enim, nihil nisi fugit modi,
                    tempore, veniam nostrum accusamus ullam itaque ipsam? Odio
                    repellat velit aut, exercitationem ea odit. */}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between text-xs">
                  <span className="p-2 rounded-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-500 font-semibold">Online</span>
                  </span>
                  <span className="text-gray-500">12/13/2024</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </aside>
  );
};

export default SideBar;
