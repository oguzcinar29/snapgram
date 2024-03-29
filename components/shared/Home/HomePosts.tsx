import { getAllPosts } from "@/lib/actions/post.actions";
import React from "react";
import SinglePost from "./SinglePost";

export default async function HomePosts() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-10 max-sm:gap-16 mt-6">
      {posts.map((item: any) => {
        return <SinglePost key={item._id} {...item} />;
      })}
    </div>
  );
}
