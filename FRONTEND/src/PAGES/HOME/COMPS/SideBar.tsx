import userSvg from "../../../ASSETES/user.svg";

const SideBar = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="w-full p-3">
        <div className="flex items-center gap-2">
          <span className="font-medium hidden lg:block uppercase">Members</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full p-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
          (user) => (
            <button
              key={user}
              className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${true ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={false || userSvg}
                  alt={"user"}
                  className="size-10 object-cover rounded-full"
                />
                {true && (
                  <span
                    className="absolute bottom-1 right-0 size-2 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate text-sm">{"Arun Kumar"}</div>
                <div className="text-sm text-zinc-400">
                  {true ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          )
        )}
      </div>
    </aside>
  );
};

export default SideBar;
