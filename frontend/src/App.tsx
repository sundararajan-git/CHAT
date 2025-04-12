import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Verification from "./pages/verification/Verification";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";
import PageNotFound from "./pages/404/PageNotFound";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  const { pageLoading } = useContext(AuthContext);

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<PublicRoute />}>
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
