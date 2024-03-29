import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  savedPost: Array<Schema.Types.ObjectId>;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, required: false, default: "" },
  savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const User = models.User || model("User", UserSchema);

export default User;
