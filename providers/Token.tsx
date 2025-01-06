"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffectOnce } from "@/hooks";
import { logoutUser } from "@/store/slice/userService/userService";
import { getCookie, getRemainingTTL, removeCookie } from "@/utils/cookies";
import { startTokenRefreshTimer, stopTokenRefreshTimer } from "@/utils/token";

const Token = () => {
  const dispatch = useAppDispatch();

  const ttlCookie = getCookie("ttl") ?? "";

  const router = useRouter();

  const cookies = useMemo(() => ({ ttl: ttlCookie }), [ttlCookie]);

  const {
    user: { token, ttl: storedInitialTTL },
  } = useAppSelector((state) => state.userService);

  useEffectOnce(() => {
    const jwtExpirationTime = getRemainingTTL(cookies, "ttl");
    startTokenRefreshTimer(jwtExpirationTime!, token!);
  });

  useEffect(() => {
    if (!storedInitialTTL) return;

    let activityTimer: NodeJS.Timeout;

    const resetActivityTimer = () => {
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        stopTokenRefreshTimer();
        dispatch(logoutUser());
        removeCookie("ttl");
        router.push("/login");
      }, storedInitialTTL);
    };

    window.addEventListener("mousemove", resetActivityTimer);
    window.addEventListener("keydown", resetActivityTimer);
    window.addEventListener("touchstart", resetActivityTimer);

    resetActivityTimer();

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(activityTimer);
      window.removeEventListener("mousemove", resetActivityTimer);
      window.removeEventListener("keydown", resetActivityTimer);
      window.removeEventListener("touchstart", resetActivityTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedInitialTTL, router]);
  return null;
};

export default Token;
