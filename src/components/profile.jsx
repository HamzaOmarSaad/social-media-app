import AppButton from "../shared/appButton";
import { UserContext } from "../context/UserContext";
import PostCreate from "../pages/postCreate";
import PostCard from "../pages/postCard";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UserData from "../pages/UserData";
import { useContext } from "react";


export default function Profile() {

  const { data, isLoading } = useQuery({
    queryFn: getUserPosts,
    queryKey: ["userPosts"],
  });
  const { userData } = useContext(UserContext)


  async function getUserPosts() {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/${localStorage.getItem("userId")}/posts`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      return data;
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="posts container w-60/100 mx-auto">
      <UserData Data={userData} />
      <PostCreate />
      {isLoading
        ? "loading"
        : data.posts?.map((item) => <PostCard key={item._id} postData={item} />)}

    </div>
  );
}

