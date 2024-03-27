import SavedPage from "@/components/shared/SavedPage/SavedPage";
import { getAllPosts } from "@/lib/actions/post.actions";
import React from "react";

export default async function Saved() {
  const posts = await getAllPosts();
  return (
    <div>
      <SavedPage posts={posts} />
    </div>
  );
}
