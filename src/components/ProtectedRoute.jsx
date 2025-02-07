import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? children : <Navigate to="/login" />}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
