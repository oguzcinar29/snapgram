import EditPostPage from "@/components/shared/EditPost/EditPostPage";
import { getPostById } from "@/lib/actions/post.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function EditPost({ params }: any) {
  const postId = params.id;

  const post = await getPostById({ postId: postId });
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <EditPostPage {...post} />
    </div>
  );
}
