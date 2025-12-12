import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const location = useLocation();

  const token = localStorage.getItem("ironwall_token");
  const userStr = localStorage.getItem("ironwall_user");

  // Not logged in
  if (!token || !userStr) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin requirement
  if (requireAdmin) {
    try {
      const user = JSON.parse(userStr);
      if (user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
      }
    } catch {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};
