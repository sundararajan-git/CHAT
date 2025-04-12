import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const PublicRoute = () => {
  const { isValidUser } = useContext(AuthContext);

  return isValidUser ? (
    <Navigate to="/" replace />
  ) : (
    <div className="flex flex-col h-full dark:bg-dark">
      <Outlet />
    </div>
  );
};

export default PublicRoute;
