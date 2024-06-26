import AllUsersPage from "@/components/shared/AllUsersPage";
import { getAllUsers } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function AllUsers() {
  const users = await getAllUsers();
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="p-10 max-sm:p-4 max-sm:mb-52 ">
      <AllUsersPage users={users} />
    </div>
  );
}
