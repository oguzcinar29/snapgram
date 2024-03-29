"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import UserProfilePost from "./UserProfilePost";
import Link from "next/link";
export default function SingleUser({
  posts,
  users,
  userId,
  name,
  savedPosts,
  bio,
  image,
}: any) {
  const { data: session } = useSession();

  return (
    <div className="p-10 w-4/5 max-sm:w-full max-sm:p-4">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between gap-3 items-center">
          <div className="flex items-center gap-3">
            <Avatar className="w-16 object-cover h-16">
              <AvatarImage src={image} />
              <AvatarFallback className="bg-slate-300 text-white">
                {name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xl font-bold">{name}</span>
          </div>
          {session?.user?.id === userId && (
            <Button asChild>
              <Link href={`/update-profile/${userId}`}>Edit profile</Link>
            </Button>
          )}
        </div>
        <span>{bio}</span>
        <div className="flex gap-5 flex-wrap justify-between">
          {posts.map((item: any) => {
            if (item.userId === userId) {
              return <UserProfilePost key={item._id} {...item} users={users} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
