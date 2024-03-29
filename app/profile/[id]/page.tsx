import SingleUser from "@/components/shared/SingleUser";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getAllUsers, getUserById } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";
export default async function UserProfile({ params }: any) {
  const { id } = params;
  const posts = await getAllPosts();
  const users = await getAllUsers();
  const user = await getUserById({ id });
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <SingleUser posts={posts} users={users} userId={id} {...user} />
    </div>
  );
}
