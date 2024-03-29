import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Heart, Save } from "lucide-react";
import { getAllUsers, getUserByPostUserId } from "@/lib/actions/user.actions";
import moment from "moment";
import Image from "next/image";
import LikePost from "./LikePost";
import SavePost from "./SavePost";
import Link from "next/link";
import EditBtn from "./EditBtn";

export type PostShowProps = {
  userId: string;
  createdAt: number;
  caption: string;
  tags: string;
  location: string;
  imageUrl: string;
  _id: string;
  likes: Array<string>;
};

export default async function SinglePost({
  userId,
  createdAt,
  caption,
  tags,
  location,
  _id,
  imageUrl,

  likes,
}: PostShowProps) {
  const user = await getUserByPostUserId({ userId });
  const users = await getAllUsers();
  return (
    <div className="border border-[#1f1f22] rounded-lg w-2/3 max-sm:w-full p-4 max-sm:p-0 flex flex-col gap-5   ">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.image} />
            <AvatarFallback className="bg-slate-300 text-white">
              {user.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-bold">{user?.name}</span>
            <span className="text-[#6d28d9] text-sm">
              {moment.utc(createdAt).local().startOf("seconds").fromNow()} -{" "}
              {location}
            </span>
          </div>
        </div>
        <EditBtn userId={userId} _id={_id} />
      </div>
      <div className="w-full object-cover h-96 mb-10">
        <Link href={`/posts/${_id}`}>
          <img
            src={imageUrl}
            alt="post image"
            className="w-full min-w-[300px] object-cover h-[400px] rounded-lg"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <span>{caption}</span>
        <span className="text-[#6d28d9]">{tags}</span>
      </div>
      <div className="flex justify-between items-center">
        <LikePost postId={_id} likes={likes} />
        <SavePost users={users} postId={_id} />
      </div>
    </div>
  );
}
