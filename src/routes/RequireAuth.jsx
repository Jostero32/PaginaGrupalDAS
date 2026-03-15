import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/blog" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default RequireAuth;
