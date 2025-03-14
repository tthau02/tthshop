import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.roles !== "admin") {
    return <Navigate to="/" replace />;
  }
     
  return <Outlet />;
};

export default PrivateRoute;
