import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SavedPost({ img, postId }: any) {
  return (
    <Link href={`/saved/${postId}`}>
      <Image
        src={img}
        alt="post image"
        width={300}
        height={300}
        className="h-72 object-cover rounded-lg"
      />
    </Link>
  );
}
