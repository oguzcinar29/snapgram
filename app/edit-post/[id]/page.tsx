import EditPostPage from "@/components/shared/EditPost/EditPostPage";
import { getPostById } from "@/lib/actions/post.actions";

export default async function EditPost({ params }: any) {
  const postId = params.id;

  const post = await getPostById({ postId: postId });

  return (
    <div>
      <EditPostPage {...post} />
    </div>
  );
}
