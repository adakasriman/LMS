import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import WithAuthLayout from "@layouts/WithAuthLayout";
import WithoutAuthLayout from "@layouts/WithoutAuthLayout";
import DashboardPage from "@features/dashboard/pages/Overview";
import LoginPage from "@features/auth/LoginPage";
import NotFoundPage from "@pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route element={<WithoutAuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<WithAuthLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
