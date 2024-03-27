"use client";

import { z } from "zod";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/lib/validator";
import { FileUploader } from "../FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import {
  createPost,
  editPost,
  getAllPosts,
  PostProps,
} from "@/lib/actions/post.actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type EditPostProps = {
  caption: string;
  imageUrl: string;
  location: string;
  tags: string;
  _id: string;
};

export default function EditPostPage({
  caption,
  imageUrl,
  location,
  tags,
  _id,
}: EditPostProps) {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const getPostFunc = async () => {
      const getPosts = await getAllPosts();
      setPosts(getPosts);
    };
    getPostFunc();
  }, []);

  const { startUpload } = useUploadThing("imageUploader");
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: caption,
      imageUrl: imageUrl,
      location: location,
      tags: tags,
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    const userId = session?.user?.id as string;
    try {
      const res = await editPost({
        ...values,
        imageUrl: uploadedImageUrl,
        postId: _id,
      });
      if (res) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="p-10 w-5/6 max-sm:w-full max-sm:p-5">
      <div className="flex flex-col ">
        <div className="text-3xl flex items-center gap-3">
          <ImagePlus className="w-12 h-12" />
          <span className="font-bold">Create Post</span>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-10"
            >
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caption</FormLabel>
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
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add location</FormLabel>
                    <FormControl>
                      <Input
                        className=" py-7 bg-gray-900  border-transparent focus:border-transparent focus:ring-0 "
                        placeholder="Location here..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Tags</FormLabel>
                    <FormControl>
                      <Input
                        className=" py-7  bg-gray-900  border-transparent focus:border-transparent focus:ring-0 "
                        placeholder="Art, Expression, Learn"
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
                {form.formState.isSubmitting
                  ? "Please wait..."
                  : `Create Post `}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
