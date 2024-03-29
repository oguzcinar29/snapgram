import React from "react";
import LikePost from "./Home/LikePost";
import SavePost from "./Home/SavePost";

type UserProfilePostProps = {
  imageUrl: string;
  likes: Array<string>;
  _id: string;
  users: Array<any>;
};

export default function UserProfilePost({
  imageUrl,
  likes,
  _id,
  users,
}: UserProfilePostProps) {
  return (
    <div className="rounded-lg relative text-center ">
      {imageUrl && (
        <img
          className="w-[245px] rounded-lg object-cover max-sm:w-full max-sm:min-h-[550px] bg-red-500 h-[300px]"
          src={imageUrl}
        />
      )}
      {imageUrl && (
        <div>
          <div className="absolute bottom-8 left-8">
            <div className="flex justify-between items-center">
              <LikePost postId={_id} likes={likes} />
            </div>
          </div>
          <div className="absolute bottom-8 right-8">
            <div className="flex justify-between items-center ">
              <SavePost users={users} postId={_id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
