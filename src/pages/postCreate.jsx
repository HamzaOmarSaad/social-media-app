import React, { useContext, useRef } from 'react'
import { UserContext } from '../context/UserContext';
import { useForm } from 'react-hook-form';
import { Card, FileInput, HelperText, TextInput } from 'flowbite-react';
import { Image } from 'iconsax-reactjs';
import AppButton from '../shared/appButton';


export default function PostCreate() {
    const {  userData } = useContext(UserContext);
    const{register ,handleSubmit,}= useForm()
    const element=useRef()

    async function postSend( value){


    }

    return (
        <div className="postCreate  bg-white dark:bg-gray-800  rounded-xl mt-5 p-2 ">
            <div className="font-bold border-b-2 py-2  ">post something</div>
            <div className="flex items-center gap-4 py-4 ">
                <div className="rounded-2xl overflow-hidden size-10 bg-zinc-400">
                    <img src={userData?.user?.photo} alt="" />
                </div>
                <form onSubmit={handleSubmit(postSend)} className=" grow">
                    <div>
                        <TextInput 
                            type="text" 
                            placeholder="write yor post here"                    
                            {...register("body")} 
                        />
                    </div>
                    <div id="fileUpload" className="max-w-md hidden">
                        <FileInput id="file" ref={element} />
                    </div>
                </form>
                <Image size="32" color="#FF8A65" onClick={()=>element.current.click()}/>
            </div>
            <AppButton className="w-95/100 mx-auto bg-zinc-700 mb-4">submit</AppButton>


        
        </div>
    )
}

