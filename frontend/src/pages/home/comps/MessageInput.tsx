import { useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { axiosInstance } from "../../../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../lib/redux/slices/messageSlice";
import toast from "react-hot-toast";
import BtnLoader from "../../../components/BtnLoader";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const MessageInput = (props: any) => {
  const { chatUser } = props;
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [actions, setActions] = useState({
    btnLoading: false,
  });

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      toast.error("No file selected");
      return;
    }

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error("File size exceeds 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sendBtnHandler = async () => {
    const msgInputEle = document.getElementById("msgInput") as HTMLInputElement;
    try {
      if (msgInputEle?.value.trim() === "") {
        toast.error("Invalid Message !");
        return null;
      }

      const image =
        fileInputRef.current && fileInputRef.current.files?.length
          ? fileInputRef.current?.files[0]
          : "";

      console.log(image);

      const formData = new FormData();
      formData.append("text", msgInputEle?.value);
      formData.append("file", image);

      setActions((prev) => {
        return { ...prev, btnLoading: true };
      });

      const { data, status } = await axiosInstance.post(
        `/chat/send/${chatUser?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (status === 200) {
        dispatch(addMessage(data?.message));
        setActions((prev) => {
          return { ...prev, btnLoading: false };
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      msgInputEle.value = "";
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setActions((prev) => {
        return { ...prev, btnLoading: false };
      });
    }
  };

  return (
    <div className="px-4 w-full relative mb-2">
      {imagePreview && (
        <div className="flex items-center gap-2 absolute -top-[70px]">
          <div className="relative">
            <img
              className="w-20 h-20 object-cover rounded-lg  p-2"
              src={imagePreview}
              alt="Preview"
            />
            <button
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white
              flex items-center justify-center cursor-pointer"
              type="button"
              onClick={removeImage}
            >
              <BiX className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`p-2 h-fit btn rounded-md bg-gray-300 border-none shadow-none text-black`}
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current?.click();
            }
          }}
        >
          <RiAttachment2 size={18} />
        </button>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="border w-full h-full p-2 outline-none border-gray-300 rounded-md"
            id="msgInput"
            placeholder="Type a message..."
          />
        </div>
        <button
          type="button"
          className="p-2.5 bg-primary text-white rounded-md"
          onClick={sendBtnHandler}
        >
          {actions?.btnLoading ? <BtnLoader /> : <FaRegArrowAltCircleRight />}
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
