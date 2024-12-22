import { BiCamera } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import userSvg from "../../ASSETES/user.svg";

const Profile = () => {
  return (
    <div className="h-full">
      <div className="max-w-2xl mx-auto p-4 py-6">
        <div className="bg-base-300 rounded-xl p-6 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-500">Profile</h1>
            <p className="mt-2 text-gray-400">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={false || userSvg}
                alt="Profile"
                className="size-32 rounded-full object-cover border-2  border-green-400 p-0.5"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                absolute bottom-0 right-0
                bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                ${true ? "animate-pulse pointer-events-none" : ""}
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
              {true
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="bg-base-300 rounded-xl p-2">
            <h2 className="text-lg font-medium  mb-4 text-green-500">
              Profile Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-400">
                <span className="text-gray-400">Full Name</span>
                <span className="text-gray-700">Arun Kumar</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Email Address</span>
                <span className="text-gray-700">abc@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="bg-base-300 rounded-xl p-2">
            <h2 className="text-lg font-medium  mb-4 text-green-500">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-400">
                <span className="text-gray-400">Member Since</span>
                <span className="text-gray-700">{"12/12/2024"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500 bg-green-50 rounded-lg px-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-semibold">Active</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 text-sm ">
            <span className="hover:underline hover:text-blue-600 cursor-pointer">
              Forgot Password
            </span>
            <button
              type="button"
              className="p-2 flex items-center gap-2 bg-gray-100 rounded-md hover:text-red-600 font-medium"
            >
              <RiLogoutCircleLine />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
