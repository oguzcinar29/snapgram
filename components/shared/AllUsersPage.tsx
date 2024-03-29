import React from "react";
import SingleUser from "./SingleUser";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default function AllUsersPage({ users }: any) {
  return (
    <div className="">
      <div className="flex gap-4 items-center">
        <Users className="w-12 h-12 text-[#877eff]" />
        <span className="text-3xl font-bold">All Users</span>
      </div>
      <div className="flex flex-wrap gap-10 mt-10 ">
        {users.map((item: any) => {
          return (
            <div
              key={item._id}
              className="flex flex-col gap-5 p-5 border max-sm:gap-3 border-[#1f1f22] w-1/4 rounded-lg justify-center items-center"
            >
              <Link href={`/profile/${item._id}`}>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={item.image} />
                  <AvatarFallback className="bg-slate-300 text-white">
                    {item.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
