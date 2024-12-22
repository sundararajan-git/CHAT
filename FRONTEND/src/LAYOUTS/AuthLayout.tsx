import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../COMPONETNS/NavBar";

const AuthLayout = (props: any) => {
  // PROPS
  const { isValidUser } = props;

  // PRODUCT THE HOMEPAGE
  if (!isValidUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-screen dark:bg-dark">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
