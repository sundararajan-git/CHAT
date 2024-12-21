import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./COMPONETNS/NavBar";
import Home from "./PAGES/HOME/Home";
import SignUp from "./PAGES/SIGNUP/SignUp";
import Login from "./PAGES/LOGIN/Login";
import Settings from "./PAGES/SETTINGS/Settings";
import Profile from "./PAGES/PROFILE/Profile";
import { Toaster } from "react-hot-toast";

const App = () => {
  const authUser = !true;

  return (
    <div className="flex flex-col justify-between h-screen">
      {/* <NavBar /> */}

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
