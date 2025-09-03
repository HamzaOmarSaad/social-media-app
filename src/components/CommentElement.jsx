import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MessageRemove } from "iconsax-reactjs";
import moment from "moment/moment";
import React from "react";
import toast from "react-hot-toast";

function CommentElement({ comment }) {
      const queryClient = useQueryClient();

  async function deleteComment() {

    try {
          await axios.delete(
            `https://linked-posts.routemisr.com/comments/${comment._id}`,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
      );
      toast.success("comment Deleted")
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });

    } catch (error) {
      console.log("🚀 ~ deleteComment ~ error:", error)
            toast.error(error?.response?.data.error);

      
    }

    
  }
  return (
    <div className="first-comment bg-zinc-300 dark:bg-gray-700 rounded-2xl py-3 mt-4">
      <div className="flex gap-1 px-3">
        <div className="rounded-2xl overflow-hidden size-10 bg-zinc-400">
          <img
            src={
              comment?.commentCreator?.photo.includes("undefined")
                ? "https://linked-posts.routemisr.com/uploads/default-profile.png "
                : comment?.commentCreator?.photo
            }
            alt=""
          />
        </div>
        <div>
          <p>{comment?.commentCreator.name}</p>

          <p>{moment(comment?.createdAt).format("lll")}</p>
        </div>
      </div>
      <div className="flex justify-between px-2">
        <p className="p-2"> {comment?.content}</p>
        {(localStorage.getItem("userId") === comment.commentCreator._id )?
          <MessageRemove onClick={deleteComment} size="32" color="#FF8A65" /> :
          ""
        }
      </div>
    </div>
  );
}

export default CommentElement;
