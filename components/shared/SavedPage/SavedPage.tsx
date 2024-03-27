"use client";
import { Bookmark } from "lucide-react";
import React from "react";
import SavedPost from "./SavedPost";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function SavedPage({ posts }: any) {
  console.log(posts);

  return (
    <section className="p-10">
      <div className="flex  flex-col gap-10">
        <div className="flex gap-3 text-3xl items-center">
          <Bookmark className="text-[#6d28d9] w-12 h-12" />
          <span className="font-bold">Saved Posts</span>
        </div>
        <div className="flex flex-wrap gap-5 rounded-lg">
          {posts.map((item: any) => {
            console.log(item);
            if (item) {
              return (
                <SavedPost
                  key={item._id}
                  img={item.imageUrl}
                  postId={item._id}
                />
              );
            } else {
              return <Skeleton />;
            }
          })}
        </div>
      </div>
    </section>
  );
}
