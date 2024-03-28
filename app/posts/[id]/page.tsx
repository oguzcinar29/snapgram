import SinglePostPage from "@/components/shared/SinglePostPage";
import { getPostById } from "@/lib/actions/post.actions";
import { getUserByPostUserId } from "@/lib/actions/user.actions";
import React from "react";

export default async function SinglePost({ params }: any) {
  const { id } = params;

  const post = await getPostById({ id });
  const userId = post?.userId;
  const user = await getUserByPostUserId({ userId });

  return (
    <div className="p-10">
      <SinglePostPage {...post} {...user} />
    </div>
  );
}
