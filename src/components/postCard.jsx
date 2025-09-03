import { Card, TextInput } from "flowbite-react";
import { I3Square, Message } from "iconsax-reactjs";
import { Link } from "react-router";
import PostDetails from "../pages/postDetails";
import { useForm } from "react-hook-form";
import AppButton from "../shared/appButton";
import CommentElement from "./CommentElement";
import CreateComment from "./CreateComment";
import moment from "moment";

export default function PostCard({ postData }) {
  return (
    <div className="  mx-auto my-2  bg-white dark:bg-gray-800 p-3 rounded-2xl ">
      <div className="header flex justify-between ">
        <div className="creator-info flex ">
          <div className="rounded-2xl overflow-hidden size-10 bg-zinc-400">
            <img src={postData?.user?.photo} alt="" className="size-full" />
          </div>
          <div className="content ps-3">
            <p>{postData?.user?.name}</p>
            <p>{moment(postData?.createdAt).format("lll")}</p>
          </div>
        </div>
        {localStorage.getItem("userId") === postData?.user._id ? (
          <I3Square size="32" color="#FF8A65" />
        ) : (
          ""
        )}
      </div>

      <p className="font-normal text-gray-700 dark:text-gray-400 py-2">
        {postData?.body}
      </p>
      <div className="image ">
        <img src={postData?.image} className=" rounded-3xl" alt="" />
      </div>
      <div className="card-footer flex justify-end p-2 text-blue-500 underline">
        <Link to={`/posts/${postData?._id}`}> see more comments</Link>
      </div>
      <div className="commentsNo flex gap-4">
        <Message color="gray" />
        <p> {postData?.comments.length} comments</p>
      </div>
      {postData?.comments[0] && (
        <CommentElement
          comment={postData?.comments[postData?.comments.length - 1]}
        />
      )}
      <CreateComment postId={postData?._id} />
    </div>
  );
}
