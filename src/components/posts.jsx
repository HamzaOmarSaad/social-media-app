import AppButton from '../shared/appButton'
import {UserContext} from '../context/UserContext'
import PostCreate from '../pages/postCreate'
import PostCard from '../pages/postCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Key } from 'iconsax-reactjs'



function Posts() {
    const [allPosts,setAllPosts]= useState([])

    async function getPosts()
    {
        try {
            const {data} = await axios.get("https://linked-posts.routemisr.com/posts",{
            headers:{
                "token":localStorage.getItem("token")
            }
        }) 

        setAllPosts(data.posts)

        } catch (error) {
            console.log("🚀 ~ getPosts ~ error:", error)
            
        }

    }


    useEffect(()=>{
        getPosts()
    },[])


        return (
        <div className='posts container w-60/100 mx-auto'>
            <PostCreate/>
            {!allPosts.length? "loading":allPosts.map((item)=><PostCard key={item._id} postData={item}/>)}
        </div>

    )
}

export default Posts
