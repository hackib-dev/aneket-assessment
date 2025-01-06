import { addMilliseconds } from "date-fns";
import axios from "./axios";
import { User } from "@/types.ts";
import { setCookie } from "./cookies";
import { jwtDecode } from "jwt-decode";
import { API_AUTH_URL, sessionStorageName } from "@/app/config";

let storedSession: string | null;
if (typeof window !== "undefined") {
  storedSession = sessionStorage.getItem(sessionStorageName);
}

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios(API_AUTH_URL).post(`/refresh`, {
    refreshToken,
  });
  return response.data;
};

let refreshTimer: NodeJS.Timeout | null = null;

export const stopTokenRefreshTimer = () => {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
};

export const startTokenRefreshTimer = (
  expirationTime: number,
  refreshToken: string
) => {
  const expirationMinus120000 = Number(expirationTime) - 120000;
  const jwtExpirationTime =
    expirationMinus120000 <= 0 ? 1000 : expirationMinus120000;

  refreshTimer = setTimeout(async () => {
    try {
      const { token: newToken, refreshToken: newExpirationTime } =
        await refreshAccessToken(refreshToken);
      const decodedToken = jwtDecode<{ exp: number }>(newExpirationTime);
      const ttl = decodedToken?.exp;
      const tokenExpiration = addMilliseconds(new Date(), ttl);
      setCookie("ttl", tokenExpiration.toISOString(), tokenExpiration);

      if (storedSession) {
        const storedSessionObj: Partial<User> = JSON.parse(storedSession);
        storedSessionObj.token = newToken;
        sessionStorage.setItem(
          sessionStorageName,
          JSON.stringify(storedSessionObj)
        );
      }
      startTokenRefreshTimer(Number(newExpirationTime), newToken);
    } catch (error) {
      console.error(error);
      sessionStorage.clear();
      stopTokenRefreshTimer();
    }
  }, jwtExpirationTime);
};
