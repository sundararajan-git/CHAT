import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import NavBar from "../components/NavBar";

const PrivateRoute = () => {
  const { isValidUser } = useContext(AuthContext);
  return isValidUser !== null ? (
    <div className="flex flex-col h-full w-full">
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
