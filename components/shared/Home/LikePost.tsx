"use client";
import { likePost } from "@/lib/actions/post.actions";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

type LikePostProps = {
  postId: any;
  likes: Array<string>;
};
export default function LikePost({ postId, likes }: LikePostProps) {
  const { data: session } = useSession();

  const findLike = likes.find(
    (item: any) => item.toString() === session?.user?.id
  );

  const handleClick = async () => {
    const userId = session?.user?.id;

    try {
      const res = await likePost({ userId, postId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <span onClick={handleClick} className="flex items-center gap-1">
      {findLike ? (
        <Heart fill="red" className="text-red-500 cursor-pointer" />
      ) : (
        <Heart className="text-[#6d28d9] cursor-pointer" />
      )}{" "}
      {likes?.length}
    </span>
  );
}
