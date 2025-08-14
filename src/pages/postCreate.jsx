import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { Card, FileInput, HelperText, TextInput } from "flowbite-react";
import { Image } from "iconsax-reactjs";
import AppButton from "../shared/appButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function PostCreate() {
  const { userData } = useContext(UserContext);
  const { register, handleSubmit, watch, setValue ,reset } = useForm();
  const fileUpload = useRef();
  const [isloading, setisloading] = useState(false)
  const queryclient=useQueryClient()

  async function postSend(value) {
    const myformdata = new FormData();
    myformdata.append("body", value.body);
    myformdata.append("image", fileUpload.current.files[0]);
    setisloading(true)
    try {
      await axios.post("https://linked-posts.routemisr.com/posts", myformdata, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success("post created");
      queryclient.invalidateQueries({queryKey:["posts",]})
      queryclient.invalidateQueries({ queryKey: ["userPosts"] });

      reset()
      if (fileUpload.current) fileUpload.current.value = "";
    } catch (error) {
      toast.error(error?.response.data.error);
    } finally {
      setisloading(false)
    }
  }
  return (
    <div className="postCreate  bg-white dark:bg-gray-800  rounded-xl mt-5 p-2 ">
      <div className="font-bold border-b-2 py-2  ">post something</div>
      <form onSubmit={handleSubmit(postSend)} className=" ">
        <div className="flex items-center gap-2 p-2">
          <div className="rounded-2xl overflow-hidden size-10 bg-zinc-400">
            <img src={userData?.user?.photo} alt="" className="size-full" />
          </div>
          <div className="grow">
            <TextInput
              {...register("body")}
              type="text"
              placeholder="write yor post here"
            />
          </div>
          <div className="image-input">
            <input
              type="file"
              ref={fileUpload}
              className="hidden"
              onChange={(e) => {
                setValue("image", e.target.files);
              }}
            />
            <Image
              size="32"
              color="#FF8A65"
              onClick={() => fileUpload.current.click()}
            />
          </div>
        </div>
        <div className="preview">
          {watch("image") && (
            <img
              className="  rounded-3xl p-4 mx-auto"
              src={URL.createObjectURL(fileUpload.current.files[0])}
              alt="img prev"
            />
          )}
        </div>

        <AppButton
          isloading={isloading}
          type="submit"
          className="w-95/100 mx-auto bg-zinc-700 mb-4"
        >
          submit
        </AppButton>
      </form>
    </div>
  );
}
