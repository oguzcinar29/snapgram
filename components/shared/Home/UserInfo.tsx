import { getUserByPostUserId } from "@/lib/actions/user.actions";
import React from "react";

export default async function UserInfo({ userId }: any) {
  const user = await getUserByPostUserId({ userId });
  console.log(user);
  return <div>{user?.name}</div>;
}
