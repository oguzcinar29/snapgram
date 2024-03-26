import EditPostPage from "@/components/shared/EditPost/EditPostPage";
import { getPostById } from "@/lib/actions/post.actions";

export default async function EditPost({ params }: any) {
  const post = await getPostById({ postId: params.id });
  console.log(post);

  return (
    <div>
      <EditPostPage {...post} />
    </div>
  );
}
