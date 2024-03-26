import { LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function MobileSideBar() {
  return (
    <nav className="p-4 ">
      <div className="flex justify-between">
        <Image src="/images/logo.svg" alt="logo" width={125} height={125} />
        <div className="flex gap-5 items-center">
          <LogOut className="text-[#6d28d9e6]" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
