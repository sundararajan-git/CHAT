import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiGearSix } from "react-icons/pi";
import { RiChatAiFill } from "react-icons/ri";

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <header
      className="sticky w-full top-0 z-40 
    backdrop-blur-lg sm:pb-2 bg-red1-600"
    >
      <div className="container mx-auto px-4 h-12">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <RiChatAiFill className="size-4 sm:size-6" />
              <h1 className="sm:text-lg font-bold text-primary">Chat</h1>
            </Link>
          </div>

          <div role="tablist" className="tabs gap-6 tabs-sm">
            <Link
              to={"/"}
              role="tab"
              className={`tab font-semibold gap-2 ${
                path[1] === "" ? "tab-active text-primary" : ""
              } `}
            >
              <GoHome className="size-5" />
              <span className="hidden sm:block">Home</span>
            </Link>
            <Link
              to={"/profile"}
              className={`tab font-semibold gap-2 ${
                path[1] === "profile" ? "tab-active text-primary" : ""
              }`}
            >
              <FaRegCircleUser className="size-4" />
              <span className="hidden sm:block">Profile</span>
            </Link>

            <Link
              to={"/settings"}
              className={` tab font-semibold gap-2 ${
                path[1] === "settings" ? "tab-active text-primary" : ""
              }`}
            >
              <PiGearSix className="size-5" />
              <span className="hidden sm:block">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
