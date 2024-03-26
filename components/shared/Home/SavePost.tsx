"use client";
import { savePost } from "@/lib/actions/post.actions";
import { Save } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

export default function SavePost({ postId, users }: any) {
  const { data: session } = useSession();
  const findUser = users.find(
    (item: any) => item._id.toString() === session?.user?.id
  );

  const findSavedPosts = findUser?.savedPosts?.find(
    (item: any) => item === postId
  );

  const handleClick = async () => {
    try {
      const userId = session?.user?.id;
      const res = await savePost({ postId, userId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <span onClick={handleClick}>
      {findSavedPosts ? (
        <Save fill="#6d28d9" className="text-white cursor-pointer" />
      ) : (
        <Save className="text-[#6d28d9] cursor-pointer" />
      )}
    </span>
  );
}
