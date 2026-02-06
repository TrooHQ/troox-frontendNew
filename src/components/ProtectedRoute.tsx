import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  generateHandoffState,
  AUTH_STATE_KEY,
  AUTH_RETURN_PATH_KEY,
} from "../utils/handoff";
import { AUTH_UI_URL } from "../Api/Api";

function getToken(): string | null {
  return (
    localStorage.getItem("token") || sessionStorage.getItem("access_token")
  );
}

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protects routes that require authentication.
 * When user is not authenticated, redirects to Auth UI with redirect_uri and state
 * for merchant-initiated SSO flow (see checkaut.md).
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      const state = generateHandoffState();
      sessionStorage.setItem(AUTH_STATE_KEY, state);
      sessionStorage.setItem(
        AUTH_RETURN_PATH_KEY,
        location.pathname + location.search
      );

      const redirectUri = `${window.location.origin}/auth/callback`;
      const params = new URLSearchParams({
        redirect_uri: redirectUri,
        state,
      });
      window.location.href = `${AUTH_UI_URL}/login?${params}`;
    }
  }, [token, location.pathname, location.search]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFEFEF]">
        <p className="text-gray-600">Redirecting to sign in...</p>
      </div>
    );
  }

  return <>{children}</>;
}
