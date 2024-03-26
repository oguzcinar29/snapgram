import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Heart, Save } from "lucide-react";
import { getAllUsers, getUserByPostUserId } from "@/lib/actions/user.actions";
import moment from "moment";
import Image from "next/image";
import LikePost from "./LikePost";
import SavePost from "./SavePost";
import Link from "next/link";

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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="font-bold">{user?.name}</span>
            <span className="text-[#6d28d9] text-sm">
              {moment.utc(createdAt).local().startOf("seconds").fromNow()} -{" "}
              {location}
            </span>
          </div>
        </div>
        <span className="text-[#6d28d9] cursor-pointer">
          <Link href={`/edit-post/${_id}`}>
            <Edit />
          </Link>
        </span>
      </div>
      <div className="w-full object-cover h-96 mb-10">
        {/* i was here to do that set image properly  */}
        <Image
          src={imageUrl}
          alt="post image"
          width={1000}
          height={1000}
          className="w-full min-w-[300px] object-cover h-[400px] rounded-lg"
        />
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
