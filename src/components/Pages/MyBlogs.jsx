import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { UserBlog } from '../../context/BlogContext'
import { db } from '../../Firebase'
import MdBlogCard from '../MdBlogCard'

const MyBlogs = () => {
    const { userInfo } = UserBlog()

    const [userIdInfo, setuserIdInfo] = useState([])

    const userBlog = userInfo?.userBlogs

    console.log(userBlog)
    const path = userBlog?.map((item) => item?.id)
    console.log(path)

    //!user blogsarray 
    useEffect(() => {
        const userBlogsArr = []
        for (let i = 0; i < path?.length; i++) {
            onSnapshot(doc(db, "discoverBlogs", `${path[i]}`), (doc) => {
                
                userBlogsArr.push({ ...doc.data(), id: doc.id })
                setuserIdInfo(userBlogsArr)
            })
            
            console.log(userIdInfo);
        }
    }, [path, userIdInfo])
    console.log(userIdInfo);
    //!................................................................


    return (
        <section className='latest py-10 mx-5 flex justify-center items-center'>
            {userIdInfo?.length === 0 ? <div className='w-[1000px]'>
                <h1 className='text-[18px] text-[#0000007a]'>My Blogs</h1>
                <hr />
                <div className='mdSection'>
                    <h1>Its Empty</h1>
                </div>
            </div> : <div className='w-[1000px]'>
                <h1 className='text-[18px] text-[#0000007a]'>My Blogs</h1>
                <hr />
                <div className='mdSection'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5'>
                        {userIdInfo?.map((item, id) => (
                            <MdBlogCard item={item} key={id} />
                        ))}
                    </div>
                </div>
            </div>}
        </section>
    )
}

export default MyBlogs