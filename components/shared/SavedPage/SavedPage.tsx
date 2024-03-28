import { Bookmark } from "lucide-react";
import React from "react";
import SavedPost from "./SavedPost";
import { useSession } from "next-auth/react";
import SavedPosts from "./SavedPosts";

export default async function SavedPage({ posts, users }: any) {
  console.log(posts);

  return (
    <section className="p-10">
      <div className="flex  flex-col gap-10">
        <div className="flex gap-3 text-3xl items-center">
          <Bookmark className="text-[#6d28d9] w-12 h-12" />
          <span className="font-bold">Saved Posts</span>
        </div>
        <SavedPosts posts={posts} users={users} />
      </div>
    </section>
  );
}
