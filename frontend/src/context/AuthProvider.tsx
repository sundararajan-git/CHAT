import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import useJwtToken from "../hook/useJwtToken";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axiosInstance";
import { updateUser } from "../lib/redux/slices/userSlice";
import { RootState } from "../lib/redux/store";
import { showToast } from "../utils/helper";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getJwtToken } = useJwtToken();
  const token = getJwtToken();
  const [isValidUser, setIsValidUser] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      checkIsValidUser();
    } else {
      setIsValidUser(null);
      setPageLoading(false);
    }
  }, [location.pathname, navigate, dispatch, token]);

  const checkIsValidUser = async () => {
    try {
      setPageLoading(true);
      setIsValidUser(null);
      const { data, status } = await axiosInstance.get("/user/isvaliduser", {
        headers: { Authorization: "Bearer " + token },
      });

      if (status === 200) {
        const { user } = data;
        console.log("User data:", user);
        dispatch(updateUser(user));
        setIsValidUser(user?.isVerified ? "verified" : "unverified");
      }
    } catch (err: any) {
      setIsValidUser(null);
      showToast(err);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isValidUser, pageLoading, userRole: "admin", setPageLoading }}
    >
      <div data-theme={theme}>{children}</div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            // background: theme === "dark" ? "#030712" : "#fff",
            // color: theme === "dark" ? "#fff" : "#000",
            padding: "10px 20px 10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
