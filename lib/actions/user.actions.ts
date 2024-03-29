import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
export const dynamic = "force-dynamic";
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

export async function getUserById({ id }: any) {
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
}

type UpdateUserProps = {
  name: string;
  bio: string;
  image: string;
  userId: string;
};
export async function updateUser({
  name,
  bio,
  image,
  userId,
}: UpdateUserProps) {
  try {
    await connectToDatabase();
    const user = await User.findByIdAndUpdate(userId, { bio, name, image });
    const findUser = await User.findById(userId);
    revalidatePath("/");
    return JSON.parse(JSON.stringify(findUser));
  } catch (err) {
    console.log(err);
  }
}
