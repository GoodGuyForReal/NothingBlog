import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { UserBlog } from '../../context/BlogContext'
import { db } from '../../Firebase'
import SavedCard from '../SavedCard'

const SavedBlogs = () => {
    const { userInfo } = UserBlog()

    const [UserSavedBlogInfo, setUserSavedBlogInfo] = useState([])


    //?User Saved Blogs  Array 
    const userBlog = userInfo?.savedBlogs
    console.log(userBlog)

    const path = userBlog?.map((item) => item?.id)
    console.log(path)
    useEffect(() => {
        const userBlogsArr = []
        for (let i = 0; i < path?.length; i++) {
            onSnapshot(doc(db, "discoverBlogs", `${path[i]}`), (doc) => {
                userBlogsArr.push({ ...doc.data(), id: doc.id })
                setUserSavedBlogInfo(userBlogsArr)
            })
        }
    }, [userBlog])
    console.log(UserSavedBlogInfo);



    return (
        <section className='latest py-10 mx-5 flex justify-center items-center'>
            {!UserSavedBlogInfo?.length > 0 ? null : <div className='w-[1000px]'>
                <h1 className='text-[18px] text-[#0000007a]'>Saved Blogs</h1>
                <hr />
                <div className='mdSection'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5'>
                        {UserSavedBlogInfo?.map((item, id) => (
                            <SavedCard item={item} key={id} />
                        ))}
                    </div>
                </div>
            </div>}
        </section>
    )
}

export default SavedBlogs