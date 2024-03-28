"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema2, formSchema3 } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema3>>({
    resolver: zodResolver(formSchema3),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const router = useRouter();
  const [err, setErr] = useState<string>("");
  async function onSubmit(values: z.infer<typeof formSchema3>) {
    const hey = "12";
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    if (!res?.ok) {
      setErr("Invalid value! Try again.");
    } else {
      router.push("/");
    }
  }
  return (
    <div className="p-10">
      {" "}
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {err && <span>{err}</span>}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="text-black" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="text-black" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="button col-span-2 w-full"
            >
              {form.formState.isSubmitting ? "Please wait..." : `Sign In `}
            </Button>
          </form>
          <span>
            Dont have an account ?{" "}
            <Link className="text-[#6d28d9]" href="/sign-up">
              Sign Up
            </Link>
          </span>
        </Form>
      </div>
    </div>
  );
}
