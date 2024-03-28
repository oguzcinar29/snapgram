import SavedPage from "@/components/shared/SavedPage/SavedPage";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getAllUsers } from "@/lib/actions/user.actions";
import React from "react";

export default async function Saved() {
  const posts = await getAllPosts();
  const users = await getAllUsers();
  return (
    <div>
      <SavedPage posts={posts} users={users} />
    </div>
  );
}
