import { useEffect } from "react";
import {
  generateHandoffState,
  AUTH_STATE_KEY,
  AUTH_RETURN_PATH_KEY,
} from "../utils/handoff";
import { AUTH_UI_URL } from "../Api/Api";

/**
 * Redirects to Auth UI for login. All authentication goes through Auth UI
 * per the cross-domain SSO handoff flow (checkaut.md).
 * Uses merchant-initiated flow so user returns to Merchant UI after login.
 */
const LoginPage = () => {
  useEffect(() => {
    const state = generateHandoffState();
    sessionStorage.setItem(AUTH_STATE_KEY, state);
    sessionStorage.setItem(AUTH_RETURN_PATH_KEY, "/overview");

    const redirectUri = `${window.location.origin}/auth/callback`;
    const params = new URLSearchParams({
      redirect_uri: redirectUri,
      state,
    });
    window.location.href = `${AUTH_UI_URL}/login?${params}`;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFEFEF]">
      <p className="text-gray-600">Redirecting to sign in...</p>
    </div>
  );
};

export default LoginPage;
