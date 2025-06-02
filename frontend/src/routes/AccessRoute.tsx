import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

type AccessRouteShape = {
  page?: "public" | "private" | "inter";
};

const AccessRoute: React.FC<AccessRouteShape> = (props) => {
  const { page } = props;
  const { isValidUser } = useContext(AuthContext);

  if (isValidUser === null && page !== "public") {
    return <Navigate to="/login" replace />;
  } else if (isValidUser === "unverified" && page !== "inter") {
    return <Navigate to="/verification" replace />;
  } else if (isValidUser === "verified" && page !== "private") {
    return <Navigate to="/" replace />;
  } else {
    return (
      <div className="flex flex-col h-full  dark:bg-dark">
        <Outlet />
      </div>
    );
  }
};

export default AccessRoute;
