import { BiLogOut, BiUser } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import logosvg from "../ASSETES/logo.svg";

const NavBar = () => {
  //   const { logout, authUser } = useAuthStore();

  // LOG OUT LINK HADLER
  const logOutHandler = () => {
    try {
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <header
      className="bg-base-100 border-b border-base-300 sticky w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-12">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <img src={logosvg} alt="logo" />
              <h1 className="text-lg font-bold">Chat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {true && (
              <>
                <Link
                  to={"/profile"}
                  className={`p-2 gap-2 rounded-full bg-zinc-900 hover:bg-pink-700`}
                >
                  <BiUser className="size-5" />
                </Link>

                <Link
                  to={"/settings"}
                  className={`p-2 gap-2 rounded-full bg-zinc-900 hover:bg-pink-700`}
                >
                  <CiSettings className="size-5" />
                  {/* <span className="hidden sm:inline">Settings</span> */}
                </Link>

                {/* <button
                  className="flex gap-2 items-center"
                  onClick={logOutHandler}
                >
                  <BiLogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button> */}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
