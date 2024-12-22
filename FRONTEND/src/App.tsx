import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./PAGES/HOME/Home";
import SignUp from "./PAGES/SIGNUP/SignUp";
import Login from "./PAGES/LOGIN/Login";
import Settings from "./PAGES/SETTINGS/Settings";
import Profile from "./PAGES/PROFILE/Profile";
import { Toaster } from "react-hot-toast";
import Verification from "./PAGES/VERIFICATION/Verification";
import ResetPassword from "./PAGES/RESETPASSWORD/ResetPassword";
import AuthLayout from "./LAYOUTS/AuthLayout";
import useValidUser from "./HOOK/useValidUser";
import Loader from "./COMPONETNS/Loader";
import PublicLayout from "./LAYOUTS/PublicLayout";
import PageNotFound from "./PAGES/404/PageNotFound";

const App = () => {
  // VALIDATE FROM THE CUSTOM HOOK
  // const { pageloading, isValidUser } = useValidUser();

  const pageloading = false;
  const isValidUser = !false;

  if (pageloading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

export default App;
