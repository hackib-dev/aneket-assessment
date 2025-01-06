/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginFormData } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/apiService";
import { HandleApiError, HandleApiSuccess } from "../api/apiResponseHandler";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data),
    onSuccess: (data: any) => {
      HandleApiSuccess(data, "You have successfully logged in!");
    },
    onError: HandleApiError,
  });
};
