// src/routes/PublicRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppSelector } from "@app/hooks";

const PublicRoute: React.FC = () => {
  const isLoggedIn = useAppSelector((state: any) => state.auth?.isLoggedIn);
  const token = Cookies.get("auth_token");

  // If already logged in or token exists, redirect to dashboard
  if (isLoggedIn || token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, allow access to login/register pages
  return <Outlet />;
};

export default PublicRoute;
