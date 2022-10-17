import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import NoResults from "./NoResults";

interface IProps {
  comment: string;
  comments: IComment[];
  isPostingComment: boolean;
  setComment: Dispatch<SetStateAction<string>>
  addComment: (e: React.FormEvent) => void;
}

interface IComment {
  comment: string;
  lenght?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  comments,
  isPostingComment,
  setComment,
  addComment,
}: IProps) => {
  const { userProfile,allUsers } = useAuthStore();
  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[330px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <React.Fragment key={idx}>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center cursor-pointer" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex gap-3 flex-start">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
                            />
                          </div>
                          <div className="">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-xs text-gray-400">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="">
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </React.Fragment>
          ))
        ) : (
          <NoResults text={"No comments"} />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              className="border-gray-100 border-2 w-[230px] md:w-[550px] lg:w-[350px] bg-primary px-6 py-4 text-md font-medium focus:outline-none focus:border-2 focus:border-gray-300 rounded-lg flex-1"
              onChange={(e) => setComment(e.target.value)}
              type="text"
              value={comment}
              placeholder="Add comment"
            />
            <button onClick={addComment} className="text-md text-gray-400">
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
