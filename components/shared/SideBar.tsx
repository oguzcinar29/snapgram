"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bookmark,
  HomeIcon,
  ImagePlus,
  ImagesIcon,
  LogOut,
  MailOpenIcon,
  Save,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const [hoverLink, setHoverLink] = useState<string>("Home");

  const { data: session } = useSession();

  const router = useRouter();

  return (
    <section className="px-7 py-9">
      <div className="flex flex-col">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" width={175} height={175} />
        </Link>
        <div className="mt-10 flex flex-col gap-5">
          <div>
            <Link
              className="flex gap-3 items-center"
              href={`/profile/${session?.user?.id}`}
            >
              <Avatar className="w-16 h-16 object-contain">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-slate-300 text-white">
                  {session?.user?.name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              <span className="font-black text-xl">{session?.user?.name}</span>
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <Button
              asChild
              onClick={() => setHoverLink("Home")}
              variant={"ghost"}
              className={
                hoverLink === "Home"
                  ? "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white bg-[#877eff]"
                  : "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white"
              }
            >
              <Link className="flex items-center gap-4" href="/">
                <HomeIcon size={28} className="text-[#6d28d9e6]" />
                <span>Home</span>
              </Link>
            </Button>

            <Button
              asChild
              onClick={() => setHoverLink("People")}
              variant={"ghost"}
              className={
                hoverLink === "People"
                  ? "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white bg-[#877eff]"
                  : "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white"
              }
            >
              <Link className="flex items-center gap-4" href="/all-users">
                <Users size={28} className="text-[#6d28d9e6]" />
                <span>People</span>
              </Link>
            </Button>
            <Button
              asChild
              onClick={() => setHoverLink("Saved")}
              variant={"ghost"}
              className={
                hoverLink === "Saved"
                  ? "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white bg-[#877eff]"
                  : "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white"
              }
            >
              <Link className="flex items-center gap-4" href="/saved">
                <Bookmark size={28} className="text-[#6d28d9e6]" />
                <span>Saved</span>
              </Link>
            </Button>
            <Button
              asChild
              onClick={() => setHoverLink("Create")}
              variant={"ghost"}
              className={
                hoverLink === "Create"
                  ? "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white bg-[#877eff]"
                  : "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white"
              }
            >
              <Link className="flex items-center gap-4" href="/create-post">
                <ImagePlus size={28} className="text-[#6d28d9e6]" />
                <span>Create Post</span>
              </Link>
            </Button>
          </div>
          <div className="mt-52">
            <Button
              asChild
              onClick={() => setHoverLink("Logout")}
              variant={"ghost"}
              className={
                hoverLink === "Logout"
                  ? "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white bg-[#877eff]"
                  : "w-3/4 flex justify-start rounded-sm hover:bg-[#877eff] text-base  hover:text-white"
              }
            >
              <Link
                onClick={() => {
                  signOut();
                  router.push("/sign-in");
                }}
                className="flex items-center gap-4"
                href="/sign-in"
              >
                <LogOut size={28} className="text-[#6d28d9e6]" />
                <span>Logout</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
