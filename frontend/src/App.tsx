import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import PublicLayout from "./layouts/PublicLayout";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Verification from "./pages/verification/Verification";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import PageNotFound from "./pages/404/PageNotFound";
import useValidUser from "./hook/useValidUser";
import { useSelector } from "react-redux";
import { RootState } from "./lib/redux/store";

const App = () => {
  const { pageloading, isValidUser } = useValidUser();
  const theme = useSelector((state: RootState) => state.theme);

  if (pageloading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full" data-theme={theme}>
      <Routes>
        <Route element={<AuthLayout isValidUser={isValidUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<PublicLayout isValidUser={isValidUser} />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
