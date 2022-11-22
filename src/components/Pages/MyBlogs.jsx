import React from 'react'
import { UserAuth } from '../../context/AuthContext'
import { UserBlog } from '../../context/BlogContext'
import MdBlogCard from '../MdBlogCard'

const MyBlogs = () => {

    const { user } = UserAuth()
    const { blogs } = UserBlog()
    
    console.log(user);
    const latest = (i, sn, fn) => {
        return i.slice(sn, fn)
    }


    const userBlog = blogs.filter((userblogs) => {
        return userblogs.userid === user?.email
    })
    console.log(userBlog)



    return (
        <section className='latest py-10 mx-5 flex justify-center items-center'>
            <div className='w-[1000px]'>
                <h1 className='text-[18px] text-[#0000007a]'>My Blogs</h1>
                <hr />
                <div className='mdSection'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5'>
                        {latest(userBlog).map((item, id, deleteBlog) => (
                            <MdBlogCard item={item} key={id} deleteBlog={deleteBlog} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyBlogs