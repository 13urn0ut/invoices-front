import { useContext } from "react";
import { Navigate } from "react-router";
import UserContext from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute