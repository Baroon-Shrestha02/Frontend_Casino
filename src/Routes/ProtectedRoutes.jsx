import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // This component is used to wrap routes that require slugs
  // It simply renders the child routes
  return <Outlet />;
};

export default ProtectedRoutes;
