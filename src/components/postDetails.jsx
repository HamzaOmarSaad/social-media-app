import axios from "axios";
import { Message } from "iconsax-reactjs";
import React, {  useState } from "react";
import { useParams } from "react-router";
import CommentElement from "../pages/CommentElement";
import { useQuery } from "@tanstack/react-query";

function PostDetails() {
  const parameters = useParams();
  const [PostComments, setPostComments] = useState([]);

  const { data, isLoading } = useQuery({
    queryFn: getPostDetials,
    queryKey: ["postdetails", parameters.id],
  });

  async function getPostDetials() {
    try {
      const response = await axios.get(
        `https://linked-posts.routemisr.com/posts/${parameters.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setPostComments(response.data.post.comments);
      return response.data;
    } catch (error) {
      console.log("🚀 ~ PostDetails ~ error:", error);
      return error;
    }
  }

  return isLoading ? (
    <div>loading</div>
  ) : (
    <div className="mx-auto w-80/100 my-2 bg-white dark:bg-gray-800 p-3 rounded-2xl">
      <div className="card_header flex ">
        <div className="rounded-2xl overflow-hidden size-10 bg-zinc-400">
          <img src={data?.post.user?.photo} alt="" />
        </div>
        <div className="content ps-3">
          <p>{data?.post.user?.name}</p>
          <p>{data?.post.createdAt}</p>
        </div>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400 py-2">
        {data?.post.body}
      </p>
      <div className="image ">
        <img src={data?.post.image} className="rounded-3xl" alt="" />
      </div>
      <div className="comments">
        <div className="icons flex gap-2">
          <Message size="32" color="#FF8A65" />
          <p>
            {data?.post.comments?.length} <span>comments</span>
          </p>
        </div>
        {PostComments?.map((item) => (
          <CommentElement key={item._id} comment={item} />
        ))}
      </div>
    </div>
  );
}

export default PostDetails;
