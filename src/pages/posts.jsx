import AppButton from "../shared/appButton";
import { UserContext } from "../context/UserContext";
import PostCreate from "../components/postCreate";
import PostCard from "../components/postCard";
// import { useEffect, useState } from 'react'
import axios from "axios";
import { Key } from "iconsax-reactjs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

function Posts() {
  const [page, setPage] = useState(1);

  // manage calling function  that call api in the mounting phase  + return data replacing the use effect and use state
  const { data, isLoading } = useQuery({
    queryFn: getPosts,
    queryKey: ["posts", page],
    enabled: true, // this call api when mounting
  });

  function goBack() {
    if (page === 1) {
      toast.error("no pages to load");
    } else {
      setPage((prev) => prev - 1);
    }
  }
  function goNext() {
    setPage((prev) => prev + 1);
  }
  async function getPosts() {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts?sort=-createdAt&limit=10&page=${page}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data;
      // setAllPosts(data.posts)
    } catch (error) {
      console.log("🚀 ~ getPosts ~ error:", error);
      return error;
    }
  }

  return (
    <div className="posts container w-60/100 mx-auto">
      <PostCreate />
      {isLoading
        ? "loading"
        : data.posts.map((item) => <PostCard key={item._id} postData={item} />)}

      <div className="traverse flex justify-between">
        <AppButton onClick={goBack}>prev</AppButton>
        <AppButton onClick={goNext}>next</AppButton>
      </div>
    </div>
  );
}

export default Posts;
