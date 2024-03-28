"use client";
import React from "react";
import SavedPost from "./SavedPost";
import { getAllSavedPost } from "@/lib/actions/post.actions";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function SavedPosts({ posts, users }: any) {
  const { data: session } = useSession();
  const findUser = users?.find(
    (item: any) => item._id.toString() === session?.user?.id
  );
  const savedPosts = findUser?.savedPosts;

  return (
    <div className="flex flex-wrap gap-5 rounded-lg">
      {posts.map((item: any) => {
        if (savedPosts?.find((item2: any) => item._id === item2.toString())) {
          return (
            (
              <SavedPost
                userId={session?.user?.id}
                key={item._id}
                img={item.imageUrl}
                postId={item._id}
              />
            ) || <Skeleton />
          );
        }
      })}
    </div>
  );
}
