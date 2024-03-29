import React from "react";
import moment from "moment";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikePost from "./Home/LikePost";
import SavePost from "./Home/SavePost";

type SinglePostProps = {
  imageUrl: string;
  name: string;
  createdAt: number;
  location: string;
  tags: string;
  likes: Array<string>;
  caption: string;
  _id: string;
  users: Array<any>;
  user: any;
};

export default function SinglePostPage({
  imageUrl,
  name,
  createdAt,
  location,
  caption,
  tags,
  likes,
  _id,
  users,
  user,
}: SinglePostProps) {
  return (
    <div className="border border-[#1f1f22] p-6 rounded-lg flex gap-10 max-sm:flex-col max-sm:w-full max-lg:flex-col ">
      <div className="w-1/2 max-sm:w-full">
        <img
          src={imageUrl}
          alt="post image"
          className="max-h-full w-[450px] min-w-[280px] min-h-[280px] h-[400px] object-cover max-w-full"
        />
      </div>
      <div className="flex  flex-col gap-5 w-1/2 justify-between max-sm:w-full">
        <div className="flex flex-col gap-5 ">
          <div className="flex gap-2 ">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback className="bg-slate-300 text-white">
                {user?.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <span className="font-bold">{user.name}</span>
              <span className="text-sm text-[#6d28d9]">
                {moment.utc(createdAt).local().startOf("seconds").fromNow()} -{" "}
                {location}
              </span>
            </div>
          </div>
          <hr className=" border border-[#1f1f22]" />
          <div className="flex flex-col gap-3">
            <span>{caption}</span>
            <span className="text-[#6d28d9]">{tags}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <LikePost postId={_id} likes={likes} />
          <SavePost users={users} postId={_id} />
        </div>
      </div>
    </div>
  );
}
