import { getAllSavedPost } from "@/lib/actions/post.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SavedPost({ img, postId, userId }: any) {
  return (
    <>
      <Link href={`/posts/${postId}`}>
        <Image
          src={img}
          alt="post image"
          width={300}
          height={300}
          className="h-72 object-cover rounded-lg"
        />
      </Link>
    </>
  );
}
