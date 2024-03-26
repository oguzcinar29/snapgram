import HomePage from "@/components/shared/Home/HomePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <section>
      <HomePage />
    </section>
  );
}
