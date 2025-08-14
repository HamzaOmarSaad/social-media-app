import axios from "axios";
import { TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import AppButton from "../shared/appButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CreateComment( {postId}) {
    const { handleSubmit, register, reset } = useForm();
    const queryClient= useQueryClient()
    
    const { mutate ,isPending } = useMutation({
        mutationFn: writeComment,
        onSuccess: () => {
            toast.success("comment created")
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
            reset()
        },        
        onError: (error) => {
            toast.error(error?.response.data.error);            

            
        }
        
    })

  async function writeComment(values) {
      await axios.post("https://linked-posts.routemisr.com/comments", values, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    }
  return (
    <div className="writeComment py-4">
      <form onSubmit={handleSubmit(mutate)} className=" ">
        <div className=" my-4 ">
          <TextInput
            {...register("content")}
            type="text"
            placeholder="write yor comment here"
          />
        </div>
        <input
          type="text"
          value={postId}
          disabled
          className=" hidden"
          {...register("post")}
        />

        <AppButton
          isloading={isPending}
          type="submit"
          className="w-full mx-auto bg-zinc-700 mb-4"
        >
          add comment
        </AppButton>
      </form>
    </div>
  );
}

export default CreateComment;
