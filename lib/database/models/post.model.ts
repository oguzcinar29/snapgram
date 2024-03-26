import { Document, model, models, Schema } from "mongoose";

export interface ISchema extends Document {
  caption: string;
  imageUrl: string;
  location: string;
  tags: string;
  likes: Array<Schema.Types.ObjectId>;
}

const PostSchema = new Schema(
  {
    caption: String,
    imageUrl: String,
    location: String,
    tags: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
