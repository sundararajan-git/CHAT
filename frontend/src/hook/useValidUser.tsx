import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../lib/redux/slices/userSlice";
import { axiosInstance } from "../lib/axiosInstance";

const useValidUser = () => {
  const [isValidUser, setIsValidUser] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [control, setControl] = useState({
    pageloading: true,
  });

  useEffect(() => {
    checkIsValidUser();
  }, [location]);

  const checkIsValidUser = async () => {
    try {
      const validUserResponse = await axiosInstance.get("/user/isvaliduser");
      console.log(validUserResponse);
      if (validUserResponse?.data?.success) {
        const { user } = validUserResponse?.data;
        dispatch(updateUser(user));
        setIsValidUser(true);
      }
    } catch (err) {
      setIsValidUser(false);
    } finally {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.pageloading = false;
        return clone;
      });
    }
  };

  return { isValidUser, pageloading: control?.pageloading };
};

export default useValidUser;
