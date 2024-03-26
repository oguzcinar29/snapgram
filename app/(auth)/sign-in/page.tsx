import LoginPage from "@/components/Auth/LoginPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignIn() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <LoginPage />
    </div>
  );
}
