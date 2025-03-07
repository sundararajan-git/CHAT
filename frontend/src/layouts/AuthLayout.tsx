import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const AuthLayout = (props: any) => {
  const { isValidUser } = props;

  if (!isValidUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-screen justify-between overflow-hidden">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
