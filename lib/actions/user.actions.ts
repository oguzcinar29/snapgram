"use server";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

export async function getUserByPostUserId({ userId }: any) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
}
export async function getAllUsers() {
  try {
    await connectToDatabase();
    const users = await User.find();
    return JSON.parse(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
}
