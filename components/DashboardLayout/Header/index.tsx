import { Menu, SearchIcon, X } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const {
    user: { username },
  } = useAppSelector((state) => state.userService);

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  return (
    <header className="sticky top-0 z-40 flex w-full bg-[#FAFBFF] ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            type="button"
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke  p-2 shadow-sm  lg:hidden"
          >
            <span className="relative block h-6 w-6 cursor-pointer">
              <span className="block absolute right-0 h-full w-full">
                <Menu />
              </span>
            </span>
          </button>
        </div>

        <div className="flex ">
          <h3 className="text-black font-semibold">
            Hello{" "}
            {username
              ? username.charAt(0).toUpperCase() +
                username.slice(1).toLowerCase()
              : "Evano"}{" "}
            👋🏼
          </h3>
        </div>

        <div className="md:flex hidden items-center gap-3">
          <Input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearch}
            className="border-none bg-[#F9FBFF] rounded-md p-2 placeholder:text-[#B5B7C0] placeholder:text-xs placeholder:pl-8 pl-10"
            leftIcon={<SearchIcon width={20} color="#7E7E7E" />}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
