import CreatePostPage from "@/components/shared/CreatePost/CreatePostPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function CreatePost() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <section>
      <CreatePostPage />
    </section>
  );
}
