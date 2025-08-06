
import { Card } from "flowbite-react";

export default function PostCard( {postData}) {

  return (
    <div className="  mx-auto my-2  bg-white dark:bg-gray-800 p-3 rounded-2xl " >
        <div className="card_header flex ">
            <div className="rounded-2xl overflow-hidden size-10 bg-zinc-400">
                <img src={postData?.user?.photo} alt="" />
            </div>
            <div className="content ps-3">
                <p>{postData?.user?.name}</p>
                <p>{postData?.createdAt}</p>
            </div>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400 py-2">
            {postData?.body} 
        </p>
        <div className="image ">
            <img src={postData?.image}  className=" rounded-3xl" alt="" />

        </div>
    </div>
  );
}
