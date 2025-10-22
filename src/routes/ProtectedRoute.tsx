// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppSelector } from "@app/hooks";

const ProtectedRoute: React.FC = () => {
  const isLoggedIn = useAppSelector((state: any) => state.auth?.isLoggedIn);
  const token = Cookies.get("auth_token");

  const hasAccess = isLoggedIn || Boolean(token);

  return hasAccess ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
