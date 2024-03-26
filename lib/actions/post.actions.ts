"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Post from "../database/models/post.model";
import User from "../database/models/user.model";

export type PostProps = {
  caption: string;
  imageUrl: string;
  location: string;
  tags: string;
  userId: string;
};
export type EditPostProps = {
  caption: string;
  imageUrl: string;
  location: string;
  tags: string;
  postId: string;
};

export async function createPost({
  caption,
  imageUrl,
  location,
  tags,
  userId,
}: PostProps) {
  try {
    await connectToDatabase();
    const newPost = await Post.create({
      caption,
      imageUrl,
      location,
      tags,
      userId,
    });
    revalidatePath("/");
    return JSON.parse(JSON.stringify(newPost));
  } catch (err) {
    console.log(err);
  }
}

export async function getAllPosts() {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(posts));
  } catch (err) {
    console.log(err);
  }
}

export async function likePost({ userId, postId }: any) {
  try {
    await connectToDatabase();
    const post = await Post.findById(postId);

    const findUserLike = post.likes.findIndex(
      (item: any) => item.toString() === userId
    );
    console.log(findUserLike);
    if (findUserLike === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(findUserLike, 1);
    }
    revalidatePath("/");
    await Post.findByIdAndUpdate(postId, { ...post });
  } catch (err) {
    console.log(err);
  }
}

export async function savePost({ postId, userId }: any) {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    const findUserPost = user.savedPosts.findIndex(
      (item: any) => item.toString() === postId
    );
    console.log(findUserPost);
    if (findUserPost === -1) {
      user.savedPosts.push(postId);
    } else {
      user.savedPosts.splice(findUserPost, 1);
    }
    revalidatePath("/");
    await User.findByIdAndUpdate(userId, { ...user });
  } catch (err) {
    console.log(err);
  }
}

export async function getPostById({ postId }: any) {
  try {
    await connectToDatabase();
    const post = await Post.findById(postId);
    return JSON.parse(JSON.stringify(post));
  } catch (err) {
    console.log(err);
  }
}
export async function editPost({
  location,
  imageUrl,
  tags,
  caption,
  postId,
}: EditPostProps) {
  console.log(postId);

  try {
    await connectToDatabase();
    const post = await Post.findByIdAndUpdate(postId, {
      location,
      imageUrl,
      tags,
      caption,
    });
    revalidatePath("/");
    return JSON.parse(JSON.stringify(post));
  } catch (err) {
    console.log(err);
  }
}
