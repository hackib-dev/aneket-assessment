"use client";

import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useInitialRender, useToast } from "@/hooks";
import UserImage from "../../../public/images/userImage.png";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slice/userService/userService";
import { LogOutIcon } from "lucide-react";

const LogoutUser = () => {
  const initialRenderComplete = useInitialRender();

  const {
    user: { username },
  } = useAppSelector((state) => state.userService);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  return (
    <div className="relative mt-12">
      <div className="flex items-center gap-4 justify-between">
        <div className=" text-left lg:block">
          {initialRenderComplete && (
            <div className="flex items-center gap-3">
              <Image
                src={UserImage}
                width={40}
                alt="user"
                loading="lazy"
              ></Image>
              <div className="text-xs">
                <p className="block text-sm font-medium text-black">
                  {username
                    ? username.charAt(0).toUpperCase() +
                      username.slice(1).toLowerCase()
                    : "Evano"}
                </p>
                <p className="text-[#757575]">Project Manager</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <LogOutIcon
            width={24}
            height={24}
            color="#757575"
            className="hover:cursor-pointer"
            onClick={() => {
              dispatch(logoutUser());
              sessionStorage.clear();
              router.push("/login");
              toast({
                description: "Successfully Logout",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoutUser;
