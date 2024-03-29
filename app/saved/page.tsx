import SavedPage from "@/components/shared/SavedPage/SavedPage";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getAllUsers } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";
export default async function Saved() {
  const posts = await getAllPosts();
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const users = await getAllUsers();
  return (
    <div>
      <SavedPage posts={posts} users={users} />
    </div>
  );
}
