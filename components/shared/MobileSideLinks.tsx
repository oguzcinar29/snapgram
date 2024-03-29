import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  Bookmark,
  HomeIcon,
  ImagePlus,
  ImagesIcon,
  Save,
  Users,
} from "lucide-react";

export default function MobileSideLinks() {
  return (
    <section className="p-5 border-t border-t-slate-600">
      <div className="flex justify-between ">
        <Button
          variant={"ghost"}
          className="flex hover:bg-[#877eff] p-3 w-1/6 hover:text-white hover:p-3  "
        >
          <Link className="flex flex-col items-center hover:p-3   " href="/">
            <HomeIcon className="text-[#6d28d9e6] hover:text-white " />
            Home
          </Link>
        </Button>

        <Button
          variant={"ghost"}
          className="flex hover:bg-[#877eff] w-1/6 hover:text-white"
        >
          <Link className="flex flex-col items-center  " href="/all-users">
            <Users className="  hover:text-white text-[#6d28d9e6]" />
            <span>People</span>
          </Link>
        </Button>
        <Button
          variant={"ghost"}
          className="flex hover:bg-[#877eff] w-1/6 hover:text-white"
        >
          <Link className="flex flex-col items-center  " href="/saved">
            <Bookmark className=" hover:text-white text-[#6d28d9e6]" />
            <span>Saved</span>
          </Link>
        </Button>
        <Button
          variant={"ghost"}
          className="flex hover:bg-[#877eff] w-1/6 hover:text-white"
        >
          <Link
            className="flex flex-col items-center   hover:text-white "
            href="/create-post"
          >
            <ImagePlus className="text-[#6d28d9e6]  hover:text-white" />
            <span>Create</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
