/**
 * Cross-app SSO handoff utilities (see checkaut.md)
 * Generates cryptographically random state for CSRF protection in merchant-initiated flow
 */
export const generateHandoffState = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
};

export const AUTH_STATE_KEY = "auth_state";
export const AUTH_RETURN_PATH_KEY = "auth_return_path";
