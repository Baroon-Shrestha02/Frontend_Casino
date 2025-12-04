import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slices/UserSlice";

const AdminOnlyRoutes = ({ children }) => {
  const user = useSelector(selectUser);

  // Check if user is logged in and is an admin
  if (!user || user.role !== "admin") {
    // Redirect to home page if not admin
    return <Navigate to="/" replace />;
  }

  // Render the protected component if user is admin
  return children;
};

export default AdminOnlyRoutes;
