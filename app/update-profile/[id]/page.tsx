import UpdateProfilePage from "@/components/shared/UpdateProfilePage";
import { getUserById } from "@/lib/actions/user.actions";
import { Edit } from "lucide-react";
import React from "react";
export const dynamic = "force-dynamic";
export default async function UpdateProfile({ params }: any) {
  const { id } = params;
  const user = await getUserById({ id });
  console.log(user);

  return (
    <div className="p-12  max-sm:p-4">
      <div className="flex gap-3 items-center mb-10">
        <Edit className="w-12 h-12 text-[#877eff]" />
        <span className="text-3xl">Edit Profile</span>
      </div>
      <UpdateProfilePage {...user} />
    </div>
  );
}
