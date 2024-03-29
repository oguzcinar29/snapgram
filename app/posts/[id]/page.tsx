import SinglePostPage from "@/components/shared/SinglePostPage";
import { getPostById } from "@/lib/actions/post.actions";
import { getAllUsers, getUserByPostUserId } from "@/lib/actions/user.actions";
import React from "react";
export const dynamic = "force-dynamic";
export default async function SinglePost({ params }: any) {
  const { id } = params;

  const post = await getPostById({ postId: id });
  const userId = post?.userId;
  const user = await getUserByPostUserId({ userId });
  const users = await getAllUsers();
  console.log(post);

  return (
    <div className="p-10 w-4/5 max-sm:w-full max-sm:p-0 ">
      <SinglePostPage {...post} user={user} users={users} />
    </div>
  );
}
