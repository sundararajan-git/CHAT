import { RiLoader4Fill } from "react-icons/ri";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen w-full ">
      <RiLoader4Fill className="animate-spin" size={35} />
      <span className="font-semibold ">Please Wait...</span>
    </div>
  );
};

export default Loader;
