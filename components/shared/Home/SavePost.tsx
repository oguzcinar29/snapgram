"use client";
import { savePost } from "@/lib/actions/post.actions";
import { Bookmark, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

export default function SavePost({ postId, users }: any) {
  const { data: session } = useSession();
  const findUser = users?.find(
    (item: any) => item._id.toString() === session?.user?.id
  );

  const findSavedPosts = findUser?.savedPosts?.find(
    (item: any) => item === postId
  );

  const handleClick = async () => {
    try {
      const userId = session?.user?.id;
      const res = await savePost({ postId, userId });
      toast(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <span onClick={handleClick}>
      {findSavedPosts ? (
        <Bookmark fill="#6d28d9" className="text-[#6d28d9] cursor-pointer" />
      ) : (
        <Bookmark className="text-[#6d28d9] cursor-pointer" />
      )}
    </span>
  );
}
