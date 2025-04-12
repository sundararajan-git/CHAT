import { BiCamera } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import userSvg from "/avatar.jpg";
import { RootState } from "../../lib/redux/store";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="w-full sm:max-w-2xl mx-auto sm:p-4 py-6 h-[93vh] space-y-2">
      <div className="text-center">
        <h1 className="sm:text-2xl font-semibold text-primary">Profile</h1>
        <p className="text-sm sm:text-base mt-2 text-gray-400">
          Your profile information
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={userSvg}
            alt="Profile"
            className="size-32 rounded-full object-cover border-2  border-primary p-0.5"
          />
          <label
            htmlFor="avatar-upload"
            className={`
                absolute bottom-0 right-0
                bg-base-100 hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
              `}
          >
            <BiCamera className="w-5 h-5 text-gray-800" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <p className="text-sm text-zinc-400">
          {false ? "Uploading..." : "Online"}
        </p>
      </div>

      <div className="p-2">
        <h2 className="text-lg font-semibold  mb-4 text-primary">
          Profile Information
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400">Full Name</span>
            <span className="text-gray-700">{user?.fullName}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400">Email Address</span>
            <span className="text-gray-700">{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm px-2">
        <span className="hover:underline hover:text-red-600 cursor-pointer">
          Forgot Password
        </span>
        <button type="button" className="btn btn-sm gap-2 rounded-md">
          <RiLogoutCircleLine />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
