import { getAllSavedPost } from "@/lib/actions/post.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SavedPost({ img, postId, userId }: any) {
  return (
    <>
      <Link href={`/posts/${postId}`}>
        <img
          src={img}
          alt="post image"
          className="h-72 w-72 max-sm:w-full max-sm:min-h-[600px] object-cover rounded-lg"
        />
      </Link>
    </>
  );
}
