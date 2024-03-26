import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);

  try {
    await connectToDatabase();
    const hashPass = await bcrypt.hash(data.password, 10);
    const users = await User.find();
    const findUser = users.find((item) => item.email === data.email);
    if (!findUser) {
      await User.create({ ...data, password: hashPass });
      return NextResponse.json({ message: "OK" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Email already exist! Try again." },
        { status: 422 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Err" }, { status: 500 });
  }
}
