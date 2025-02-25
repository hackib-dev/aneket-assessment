"use client";

import UseQueryProvider from "./useQuery";
import { ReduxProviders } from "@/store/provider";
import { Toaster } from "@/components/ui/toaster";
import HOCLayout from "./hocLayout";
import { useInitialRender } from "@/hooks";

export function Providers({ children }: { children: React.ReactNode }) {
  const isInitialRenderComplete = useInitialRender();

  if (!isInitialRenderComplete) return null;

  return (
    <UseQueryProvider>
      <ReduxProviders>
        <HOCLayout>{children}</HOCLayout>
      </ReduxProviders>
      <Toaster />
    </UseQueryProvider>
  );
}
