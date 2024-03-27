import { LogOut } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import Link from "next/link";
export default function MobileSideBar() {
  return (
    <nav className="p-4 ">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={125} height={125} />
        </Link>
        <div className="flex gap-5 items-center">
          <LogOut onClick={() => signOut()} className="text-[#6d28d9e6]" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
