/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

"use client";

import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Loading from "@/components/ui/Loading";
import { logoutUser } from "@/store/slice/userService/userService";
import Token from "../Token";
import { DASHBOARD_ROUTE } from "@/app/config";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getCookie } from "@/utils/cookies";

const HOCLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const {
    user: { email },
  } = useAppSelector((state) => state.userService);
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const ttlCookie = getCookie("ttl") ?? "";
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => setLoader(false), 1500);
  }, []);

  useEffect(() => {
    if (email && !ttlCookie) {
      dispatch(logoutUser());
      router.push("/login");
      toast({
        variant: "destructive",
        title: "You are not in session!",
        description: "Redirecting to Login Page...",
      });
    } else if (!email && DASHBOARD_ROUTE.includes(pathname)) {
      router.push("/login");
      toast({
        variant: "destructive",
        title: "You are not in session!",
        description: "Redirecting to Login Page...",
      });
    }
  }, []);

  return loader ? (
    <>
      <Toaster />
      <Loading />
    </>
  ) : (
    <div>
      {children}
      <Token />
    </div>
  );
};

export default HOCLayout;
