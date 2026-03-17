import React from "react";
import { Outlet, useNavigate } from "react-router"
const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (!user) return navigate('/login');
  return <Outlet/>;
};

export default ProtectedRoute;
