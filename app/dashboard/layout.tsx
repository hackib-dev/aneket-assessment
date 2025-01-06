"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Home({ children }: LayoutProps) {
  return (
    <div className="bg-[#FAFBFF]">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
