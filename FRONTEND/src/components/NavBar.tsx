import { Link, useLocation } from "react-router-dom";
import logosvg from "../assets/logo.svg";

const NavBar = () => {
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <header
      className="sticky w-full top-0 z-40 
    backdrop-blur-lg p-1"
    >
      <div className="container mx-auto px-4 h-12">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <img src={logosvg} alt="logo" />
              <h1 className="text-lg font-bold text-green-600">Chat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-6 sm:gap-14">
            <Link
              to={"/"}
              className={`flex gap-2 items-center hover:text-green-600 font-medium border-b-2 ${
                path[1] === ""
                  ? "text-green-600 border-green-500"
                  : "border-transparent"
              } `}
            >
              <span>Home</span>
            </Link>
            <Link
              to={"/profile"}
              className={`flex gap-2 items-center hover:text-green-600 font-medium border-b-2 ${
                path[1] === "profile"
                  ? "text-green-600 border-green-500"
                  : "border-transparent"
              }`}
            >
              <span>Profile</span>
            </Link>

            <Link
              to={"/settings"}
              className={`flex gap-2 items-center font-medium border-b-2 ${
                path[1] === "settings"
                  ? "text-green-600 border-green-500"
                  : "border-transparent"
              }`}
            >
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
