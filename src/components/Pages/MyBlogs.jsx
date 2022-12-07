import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { UserBlog } from '../../context/BlogContext'
import { db } from '../../Firebase'
import MdBlogCard from '../MdBlogCard'

const MyBlogs = () => {
    const [userIdBlogs, setuserIdBlogs] = useState([])
    const { userInfo } = UserBlog()

    const userBlog = userInfo?.userBlogs
    console.log(userBlog)

    return (
        <section className='latest py-10 mx-5 flex justify-center items-center'>
            {userBlog?.length === 0 ? <div className='w-[1000px]'>
                <h1 className='text-[18px] text-[#0000007a]'>My Blogs</h1>
                <hr />
                <div className='mdSection'>
                    <h1>Its Empty</h1>
                </div>
            </div> : <div className='w-[1000px]'>
                <h1 className='text-[18px] text-[#0000007a]'>My Blogs</h1>
                <hr />
                <div className='mdSection'>
                    {/* <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5'>
                        {userBlog?.map((item, id) => (
                            <MdBlogCard item={item} key={id} />
                        ))}
                    </div> */}
                </div>
            </div>}
        </section>
    )
}

export default MyBlogs