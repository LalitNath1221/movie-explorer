import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router"
const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (!user) return <Navigate to={'/login'}/>;
  return <Outlet/>;
};

export default ProtectedRoute;
