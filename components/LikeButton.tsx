import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";

interface IProps {
  handleDislike: () => void;
  handleLike: () => void;
  likes: any[];
}

const LikeButton = ({ handleDislike, handleLike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => {
    return item._ref === userProfile?._id;
  });

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, filterLikes]);

  return (
    <div className="flex gap-6 pb-3">
      <div className="mt-4 flex gap-3 justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            onClick={handleDislike}
            className="bg-primary rounded-full p-2 text-[#f51997]"
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div onClick={handleLike} className="bg-primary rounded-full p-2">
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
