"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { updateUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const formSchema = z.object({
  imageUrl: z.string(),
  name: z.string().min(2),
  bio: z.string(),
});
type UpdateProfilePageProps = {
  _id: string;
  name: string;
  image: string;
  email: string;
  password: string;
  bio: string;
};

export default function UpdateProfilePage({
  _id,
  name,
  image,
  email,
  password,
  bio,
}: UpdateProfilePageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: image,
      name: name,
      bio: bio,
    },
  });
  const { data: session, update } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    try {
      const res = await updateUser({
        ...values,
        image: uploadedImageUrl,
        userId: _id,
      });
      if (res) {
        const image = res?.image;
        const name = res?.name;
        await update({ image, name });
        router.push(`/profile/${_id}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-4/5 max-sm:w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-3">
            <Label className="text-xl">Change Profile Photo</Label>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full rounded-lg bg-gray-900   ">
                  <FormControl>
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="  bg-gray-900  border-transparent focus:border-transparent focus:ring-0 "
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className=" h-32 bg-gray-900 resize-none  border-transparent focus:border-transparent focus:ring-0 "
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
            {form.formState.isSubmitting ? "Please wait..." : `Update Profile `}
          </Button>
        </form>
      </Form>
    </div>
  );
}
