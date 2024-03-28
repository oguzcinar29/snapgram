import React from "react";
import moment from "moment";
import Image from "next/image";
type SinglePostProps = {
  imageUrl: string;
  name: string;
  createdAt: number;
  location: string;
  tags: string;
  likes: Array<string>;
  caption: string;
};

export default function SinglePostPage({
  imageUrl,
  name,
  createdAt,
  location,
  caption,
  tags,
  likes,
}: SinglePostProps) {
  return (
    <div>
      <div className="w-1/2">
        <Image
          src={imageUrl}
          alt="post image"
          width={400}
          height={500}
          className="max-h-full max-w-full"
        />
      </div>
      <div></div>
    </div>
  );
}
