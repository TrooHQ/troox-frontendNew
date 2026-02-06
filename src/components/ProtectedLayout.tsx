import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/**
 * Layout wrapper for protected routes. Redirects unauthenticated users
 * to Auth UI with merchant-initiated SSO flow.
 */
export default function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}
