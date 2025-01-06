/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import _ from "lodash";

import { useMemo } from "react";
import { DataTable } from "@/components/ui/Table/DataTable";
import { columns } from "./columns";
import { CustomerData } from "./types";
import Image from "next/image";
import IconOne from "../../public/images/iconOne.png";
import IconTwo from "../../public/images/iconTwo.png";
import IconThree from "../../public/images/iconThree.png";
import IconFive from "../../public/images/icon5.png";
import ArrowUp from "../../public/images/arrow-up.png";
import ArrowDown from "../../public/images/arrow-down.png";
import { useFetchCustomerQuery } from "../queryHandler/useQuery";

const CustomerInfo = () => {
  const {
    isLoading: isLoadingCustomerData,
    isError: isErrorCustomerData,
    isRefetching: isRefetchingCustomerData,
    data: customerData,
    refetch,
  } = useFetchCustomerQuery();

  const transformedData: CustomerData[] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (customerData?.users || []).map((user: any, index: number) => ({
      username: user.username,
      company: user.company?.name,
      phone: user.phone,
      phonenumber: user.phone,
      email: user.email,
      country: user.address?.country,
      status: index % 2 === 0 ? 1 : 0,
    }));
  }, [customerData]);

  return (
    <>
      <div className=" mx-auto bg-white rounded-[20px] px-12 py-8 grid grid-cols-1 md:grid-cols-3 mb-8 gap-y-10 md:gap-y-0 divide-x-0 divide-y md:divide-y-0 md:divide-x divide-[#E4E2F8] ">
        <div className="flex items-center gap-3 ">
          <Image src={IconOne} alt="icon" width={60} loading="lazy"></Image>
          <div>
            <p className="text-xs text-[#ACACAC]">Total Users</p>
            <p className="text-2xl font-bold">{customerData?.users.length}</p>
            <div className="flex gap-1">
              <Image
                src={ArrowUp}
                alt="icon"
                className="w-4"
                loading="lazy"
              ></Image>
              <p className="text-xs">
                <span className="text-[#00AC4F] font-semibold"> 16% </span>this
                month
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 pl-0 md:pl-[20%] pt-[10%] md:pt-0">
          <Image src={IconTwo} alt="icon" width={60} loading="lazy"></Image>
          <div>
            <p className="text-xs text-[#ACACAC]">Members</p>
            <p className="text-2xl font-bold">1893</p>
            <div className="flex gap-1">
              <Image
                src={ArrowDown}
                alt="icon"
                width={15}
                loading="lazy"
              ></Image>
              <p className="text-xs">
                <span className="text-[#D0004B] font-semibold"> 1% </span>this
                month
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 pl-0 md:pl-[20%] pt-[10%] md:pt-0">
          <Image src={IconThree} alt="icon" width={60} loading="lazy"></Image>
          <div>
            <p className="text-xs text-[#ACACAC]">Active Now</p>
            <p className="text-2xl font-bold">189</p>
            <Image src={IconFive} alt="icon" width={80} loading="lazy"></Image>
          </div>
        </div>
      </div>
      <div className=" mx-auto bg-white rounded-[20px] p-5">
        <DataTable
          columns={columns}
          data={transformedData}
          isLoading={isLoadingCustomerData || isRefetchingCustomerData}
        />
      </div>
    </>
  );
};

export default CustomerInfo;
