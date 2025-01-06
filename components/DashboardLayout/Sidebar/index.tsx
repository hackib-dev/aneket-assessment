/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutUser from "./LogoutGroup";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const {
    user: { image },
  } = useAppSelector((state) => state.userService);

  const pathname = usePathname();

  const lastSlashIndex = pathname.lastIndexOf("/");
  const pageName = pathname.substring(lastSlashIndex + 1);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = "true";
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  const [open] = React.useState(false);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target) ||
        open
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 bg-white text-black z-50 flex h-screen w-72 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-4 mt-5">
        <Link
          href="/dashboard"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex gap-2 items-center"
        >
          <img src={image} alt="" width={40} />
          <div className="flex items-baseline gap-1">
            <p className="font-bold text-xl">Dashboard</p>
            <p className="text-[10px] text-[#838383] font-medium">v.01</p>
          </div>
        </Link>

        <button
          type="button"
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5  px-8 lg:mt-2 lg:px-2">
          <div>
            <ul className="mb-6 flex flex-col gap-2">
              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Link
                  href="/dashboard"
                  className={`relative text-sm flex items-center gap-2 rounded-md py-3 px-4 font-medium  duration-300 ease-in-out mx-1 md:mx-6    ${
                    pageName.includes("dashboard") && "bg-[#5932EA] text-white"
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.0006 22.7498H9.00063C7.68063 22.7498 6.58063 22.6198 5.65063 22.3398C5.31063 22.2398 5.09063 21.9098 5.11063 21.5598C5.36063 18.5698 8.39063 16.2197 12.0006 16.2197C15.6106 16.2197 18.6306 18.5598 18.8906 21.5598C18.9206 21.9198 18.7006 22.2398 18.3506 22.3398C17.4206 22.6198 16.3206 22.7498 15.0006 22.7498ZM6.72063 21.0598C7.38063 21.1898 8.13063 21.2498 9.00063 21.2498H15.0006C15.8706 21.2498 16.6206 21.1898 17.2806 21.0598C16.7506 19.1398 14.5606 17.7197 12.0006 17.7197C9.44063 17.7197 7.25063 19.1398 6.72063 21.0598Z"
                      fill="white"
                    />
                    <path
                      d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
                      stroke="white"
                    />
                    <path
                      d="M11.9999 14.92C9.60992 14.92 7.66992 12.97 7.66992 10.58C7.66992 8.19002 9.60992 6.25 11.9999 6.25C14.3899 6.25 16.3299 8.19002 16.3299 10.58C16.3299 12.97 14.3899 14.92 11.9999 14.92ZM11.9999 7.75C10.4399 7.75 9.16992 9.02002 9.16992 10.58C9.16992 12.15 10.4399 13.42 11.9999 13.42C13.5599 13.42 14.8299 12.15 14.8299 10.58C14.8299 9.02002 13.5599 7.75 11.9999 7.75Z"
                      fill="white"
                    />
                  </svg>
                  Dashboard
                  <span className="absolute right-4">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 9L5 5L1 1" stroke="white" />
                    </svg>
                  </span>
                </Link>
              </li>

              <li onClick={() => setSidebarOpen(!sidebarOpen)}>
                <div
                  className={`relative text-sm flex items-center gap-2 rounded-md py-3 px-4 font-medium  duration-300 ease-in-out mx-1 md:mx-6  
                    bg-white text-[#9197B3]
                  `}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9998 11.1099C10.5898 11.1099 10.2498 10.7699 10.2498 10.3599V10.1499C10.2498 8.9899 11.0998 8.41989 11.4198 8.19989C11.7898 7.94989 11.9098 7.7799 11.9098 7.5199C11.9098 7.0199 11.4998 6.60986 10.9998 6.60986C10.4998 6.60986 10.0898 7.0199 10.0898 7.5199C10.0898 7.9299 9.7498 8.2699 9.3398 8.2699C8.92984 8.2699 8.58984 7.9299 8.58984 7.5199C8.58984 6.1899 9.6698 5.10986 10.9998 5.10986C12.3298 5.10986 13.4098 6.1899 13.4098 7.5199C13.4098 8.6599 12.5698 9.2299 12.2598 9.4399C11.8698 9.6999 11.7498 9.8699 11.7498 10.1499V10.3599C11.7498 10.7799 11.4098 11.1099 10.9998 11.1099Z"
                      fill="#9197B3"
                    />
                    <path
                      d="M7 21.3199C6.72 21.3199 6.42998 21.2499 6.16998 21.1099C5.59998 20.8099 5.25 20.2099 5.25 19.5699V18.15C2.23 17.84 0.25 15.6199 0.25 12.4399V6.43994C0.25 2.99994 2.56 0.689941 6 0.689941H16C19.44 0.689941 21.75 2.99994 21.75 6.43994V12.4399C21.75 15.8799 19.44 18.1899 16 18.1899H12.23L7.96997 21.03C7.67997 21.22 7.34 21.3199 7 21.3199ZM6 2.17993C3.42 2.17993 1.75 3.84993 1.75 6.42993V12.43C1.75 15.01 3.42 16.68 6 16.68C6.41 16.68 6.75 17.02 6.75 17.43V19.56C6.75 19.69 6.83 19.75 6.88 19.78C6.93001 19.81 7.03001 19.84 7.14001 19.77L11.59 16.81C11.71 16.73 11.86 16.68 12.01 16.68H16.01C18.59 16.68 20.26 15.01 20.26 12.43V6.42993C20.26 3.84993 18.59 2.17993 16.01 2.17993H6Z"
                      fill="#9197B3"
                    />
                    <path
                      d="M11 13.6001C10.58 13.6001 10.25 13.2601 10.25 12.8501C10.25 12.4401 10.59 12.1001 11 12.1001C11.41 12.1001 11.75 12.4401 11.75 12.8501C11.75 13.2601 11.42 13.6001 11 13.6001Z"
                      fill="#9197B3"
                    />
                  </svg>
                  Help
                  <span className="absolute right-4">
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 9L5 5L1 1" stroke="#9197B3" />
                    </svg>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div className="absolute w-full bottom-14 no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <div className="flex flex-col gap-4 bg-gradient-to-r from-[#EAABF0] from-0%  to-[#4623E9] to-100%  mx-6 px-10 py-7 rounded-[20px]">
            <p className="text-sm text-white text-center font-semibold">
              Need help? Contact our support team.
            </p>
            <Button className="text-[#4925E9] bg-white rounded-[20px] w-full ">
              Contact Support
            </Button>
          </div>
          <div className="mt-5  px-4 lg:mt-2 lg:px-6">
            <LogoutUser />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
