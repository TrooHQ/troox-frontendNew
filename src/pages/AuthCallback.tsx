import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SERVER_DOMAIN, AUTH_UI_URL } from '../Api/Api';
import { setUserData } from '../slices/UserSlice';
import type { AppDispatch } from '../store/store';
import { AUTH_STATE_KEY, AUTH_RETURN_PATH_KEY } from '../utils/handoff';

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      setError('Missing authorization code');
      return;
    }

    // State verification (CSRF protection) - only when auth_state was stored (merchant-initiated flow)
    if (state) {
      const expectedState = sessionStorage.getItem(AUTH_STATE_KEY);
      if (expectedState !== null && state !== expectedState) {
        setError('State mismatch - possible CSRF attack');
        return;
      }
      // Clear auth_state after use (single-use, prevents replay)
      if (expectedState !== null) {
        sessionStorage.removeItem(AUTH_STATE_KEY);
      }
    }

    const redirectUri = `${window.location.origin}/auth/callback`;

    const exchange = async () => {
      try {
        const res = await fetch(`${SERVER_DOMAIN}/auth/exchange/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            code,
            redirect_uri: redirectUri,
            ...(state && { state }),
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || err.message || 'Exchange failed');
        }

        const data = await res.json();
        let accessToken = data.access_token || data.access;

        if (!accessToken) {
          throw new Error('No access token in response');
        }

        // Call /auth/refresh/ to establish session (refresh_token is in HttpOnly cookie from exchange)
        const refreshRes = await fetch(`${SERVER_DOMAIN}/auth/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({}),
        });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          const refreshedToken = refreshData.access_token || refreshData.access;
          if (refreshedToken) {
            accessToken = refreshedToken;
          }
        }

        // Dual storage (Option C): sessionStorage for new flows, localStorage for backward compatibility
        sessionStorage.setItem('access_token', accessToken);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user_data', JSON.stringify({ token: accessToken }));
        dispatch(setUserData({ token: accessToken }));

        // Redirect to originally requested path (merchant-initiated flow) or default to overview
        const returnPath = sessionStorage.getItem(AUTH_RETURN_PATH_KEY);
        sessionStorage.removeItem(AUTH_RETURN_PATH_KEY);
        navigate(returnPath && returnPath.startsWith('/') ? returnPath : '/overview', {
          replace: true,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    };

    exchange();
  }, [searchParams, navigate, dispatch]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[#EFEFEF]">
        <p className="text-red-600 font-medium">{error}</p>
        <a
          href={`${AUTH_UI_URL}/login`}
          className="text-[#DC6803] font-semibold underline hover:no-underline"
        >
          Return to login
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFEFEF]">
      <p className="text-gray-600">Signing you in...</p>
    </div>
  );
}
