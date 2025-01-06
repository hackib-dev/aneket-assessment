"use client";

import _ from "lodash";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slice/userService/userService";
import { loginFormSchema } from "./validation";
import { LoginFormData } from "@/types.ts";
import { addMilliseconds } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { useLoginMutation } from "../queryHandler/useMutation";
import { useEffect } from "react";
import { setCookie } from "@/utils/cookies";
import AneketLogo from "../../public/images/aneket.png";

const LoginPage = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mutate: login, isPending, data } = useLoginMutation();

  useEffect(() => {
    if (data) {
      const {
        id,
        username,
        email,
        firstName,
        lastName,
        gender,
        image,
        clusterId,
        accessToken: token,
        refreshToken,
      } = data?.data || {};

      const decodedToken = jwtDecode<{ exp: number }>(token);
      const ttl = decodedToken?.exp;

      dispatch(
        setUser({
          id,
          username,
          email,
          firstName,
          lastName,
          gender,
          image,
          clusterId,
          token,
          ttl,
          refreshToken,
        })
      );

      const tokenExpiration = addMilliseconds(new Date(), ttl);

      setCookie("ttl", tokenExpiration.toISOString(), tokenExpiration);
      router.push("/dashboard");
    }
  }, [router, data, dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    if (!_.isEmpty(form.formState.errors)) {
      return;
    }

    login(data);
  };

  return (
    <div className="bg-[#ECEBE9] h-screen">
      <div className="flex items-center justify-center py-3 gap-1">
        <Image src={AneketLogo} alt="aneket-logo" width={20} />
        <p className="text-sm font-medium">Aneket Innovators</p>
      </div>
      <div className="mx-auto flex h-[calc(100vh-69px)] w-full max-w-sm flex-col justify-center overflow-hidden">
        <div className=" bg-white rounded-md p-8">
          <p className="text-start font-semibold mb-14">
            Login into your account
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs" aria-label="Email">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="info@aneketinnovators.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs" aria-label="Password">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-5">
                <Button
                  className="w-full bg-black shadow-md shadow-[#141414]"
                  type="submit"
                  size="lg"
                  disabled={isPending}
                >
                  {isPending && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login now
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
