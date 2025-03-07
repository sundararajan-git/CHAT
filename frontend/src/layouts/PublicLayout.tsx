import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = (props: any) => {
  const { isValidUser } = props;

  if (isValidUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col h-full">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
