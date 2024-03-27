"use client";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function EditBtn({ userId, _id }: any) {
  const { data: session } = useSession();
  return (
    <>
      {session?.user?.id === userId && (
        <span className="text-[#6d28d9] cursor-pointer">
          <Link href={`/edit-post/${_id}`}>
            <Edit />
          </Link>
        </span>
      )}
    </>
  );
}
