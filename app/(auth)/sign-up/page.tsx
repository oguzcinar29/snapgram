import RegisterPage from "@/components/Auth/RegisterPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignUp() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <RegisterPage />
    </div>
  );
}
