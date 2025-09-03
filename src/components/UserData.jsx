import { Edit, PasswordCheck } from "iconsax-reactjs";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { Card, FileInput, HelperText, TextInput } from "flowbite-react";
import { Image } from "iconsax-reactjs";
import AppButton from "../shared/appButton";
import axios from "axios";
import toast from "react-hot-toast";

function UserData({ Data }) {

      const {logout} =useContext(UserContext)
  
  const fileUpload = useRef();
  const [display, setDisplay] = useState("hidden");
  const { handleSubmit, reset, setValue, watch, register } = useForm();

  async function changeProfile() {
    const myformdata = new FormData();
    myformdata.append("photo", fileUpload.current.files[0]);
    try {
      await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        myformdata,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("photo uploaded");

      reset();
      if (fileUpload.current) fileUpload.current.value = "";
    } catch (error) {
      toast.error(error?.response.data.error);
    }
  }
  function changedisplay() {
    setDisplay("block");
  }
  async function changePass(values) {
    console.log("🚀 ~ changePass ~ values:", values)
    try {
      await axios.patch(
        "https://linked-posts.routemisr.com/users/change-password", values, {
          headers: {
            token:localStorage.getItem("token")
          }
        }
      );
      toast.success("password changed")
      reset()
      setDisplay("hidden")
      logout()
      
    } catch (error) {
      toast.error(error?.response?.data.error)
      
    }
  }
  return (
    <div className="info   mx-auto my-2  bg-white dark:bg-gray-800 p-3 rounded-2xl ">
      <div className="user-data flex justify-between items-center">
        <div className="profile-info flex gap-8 items-center">
          <div className="rounded-2xl  relative size-34 bg-zinc-400 overflow-hidden ">
            <img src={Data?.user?.photo} alt="" className="size-full" />
            <Edit
              size="42"
              color="#FF8A65"
              onClick={() => fileUpload.current.click()}
              className=" cursor-pointer absolute bottom-0 end-0 bg-zinc-800 rounded-2xl "
            />
          </div>
          <div className="dark:text-white grow">
            <h1 className="font-bold text-4xl"> {Data?.user?.name}</h1>
          </div>
        </div>
        <div className="change-pass">
          <PasswordCheck size="32" color="#FF8A65" onClick={changedisplay} />
        </div>
      </div>
      <div className="image-input">
        <form onSubmit={handleSubmit(changeProfile)} className="image-input">
          <input
            type="file"
            ref={fileUpload}
            className="hidden"
            onChange={(e) => {
              setValue("photo", e.target.files);
            }}
          />
          {watch("photo") && (
            <AppButton className="w-full my-4 " type="submit">
              upload photo
            </AppButton>
          )}
        </form>
        <div className="preview">
          {watch("photo") && (
            <img
              className="  rounded-3xl p-4 mx-auto"
              src={URL.createObjectURL(fileUpload.current.files[0])}
              alt="img prev"
            />
          )}
        </div>
      </div>

      <div className={display}>
        <form onSubmit={handleSubmit(changePass)}>
          <TextInput
            {...register("password")}
            type="text"
            placeholder="write your old password"
            className="py-3"
          />
          <TextInput
            {...register("newPassword")}
            type="text"
            placeholder="write your  new password"
            className="py-3"
          />
          <AppButton type="submit" className="w-full py-2">change password</AppButton>
        </form>
      </div>
    </div>
  );
}

export default UserData;
