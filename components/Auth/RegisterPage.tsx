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
import { formSchema2 } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [err, setErr] = useState<string>("");
  async function onSubmit(values: z.infer<typeof formSchema2>) {
    console.log(values);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...values }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErr(data.message);
      } else {
        router.push("/sign-in");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex max-sm:pt-20 max-sm:w-full max-sm:justify-center max-sm:items-center ">
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                Do you have an account ?{" "}
                <Link className="text-[#6d28d9]" href="/sign-in">
                  Sign In
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
