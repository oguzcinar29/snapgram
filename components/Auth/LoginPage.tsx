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
    <div className="flex max-sm:pt-28 max-sm:w-full max-sm:justify-center max-sm:items-center ">
      {" "}
      <div className="w-1/2 flex flex-col justify-center items-center max-sm:w-full">
        <div className="flex flex-col gap-5 items-center mb-5">
          <img src="/images/logo.svg" />
          <div className="text-center">
            <h1 className="text-2xl font-black">Create a new account</h1>
            <p className="text-[#877eff]">
              To use Snapgram, please enter your details
            </p>
          </div>
        </div>
        <div className=" w-[420px] max-sm:w-[300px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              {err && <span>{err}</span>}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="  bg-gray-900  border-transparent focus:border-transparent focus:ring-0 "
                        type="text"
                        {...field}
                      />
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
                      <Input
                        className="  bg-gray-900  border-transparent focus:border-transparent focus:ring-0 "
                        type="password"
                        {...field}
                      />
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
            <div className="text-center mt-5">
              <span>
                Dont have an account ?{" "}
                <Link className="text-[#6d28d9]" href="/sign-up">
                  Sign Up
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
      <img
        className="hidden max-sm:hidden lg:block h-screen w-1/2 object-cover bg-no-repeat"
        src="/images/side-img.svg"
      />
    </div>
  );
}
