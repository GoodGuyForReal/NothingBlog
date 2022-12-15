import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../Firebase';
import MdBlogCard from '../MdBlogCard';

const PersonProfile = () => {

  const { state: details } = useLocation();

  const [userIdInfo, setUserIdInfo] = useState([])
  const [userIdInfoBlogs, setUserIdInfoBlogs] = useState([])

  console.log(details)
  //?Person Details
  useEffect(() => {
    onSnapshot(doc(db, "users", `${details?.userId}`), (doc) => {
      setUserIdInfo(doc.data())
    });

  }, [details?.userId])



  const userBlog = userIdInfo?.userBlogs
  const path = userBlog?.map((item) => item?.id)
  console.log(path)

  useEffect(() => {
    const userBlogsArr = []
    for (let i = 0; i < path?.length; i++) {
      onSnapshot(doc(db, "discoverBlogs", `${path[i]}`), (doc) => {
        userBlogsArr.push({ ...doc.data(), id: doc.id })
        setUserIdInfoBlogs(userBlogsArr)
      })
    }

  }, [userIdInfo])



  return (
    <div>

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          <div className='py-4 flex flex-col md:flex-row gap-4'>
            <div className='text-center'>
              {userIdInfo?.ppImage === '' ? <div className='defppimage bg-black object-cover object-center h-[120px] w-[120px] rounded-full' /> : <img src={userIdInfo?.ppImage} alt={userIdInfo?.ppImage} className='defppimage object-cover object-center h-[120px] w-[120px] rounded-full' />}
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-[24px] leading-[120%] font-semibold text-[#000000]'>@{userIdInfo?.displayName}</p>
              <div className='flex gap-2'>
                <p className='text-[15px] leading-[120%] text-[#000000] py-2 px-6 border border-[#0000002e] rounded-md '>joined: {userIdInfo?.joinedDate}</p>
                <p className='text-[15px] leading-[120%] text-[#000000] py-2 px-6 border border-[#0000002e] rounded-md '>Blogs: {userIdInfoBlogs.length}</p>
              </div>

              {userIdInfo?.bio !== "" ? <div>
                <legend className='text-[#a9a9a9]'>bio</legend>
                <p className=''>{userIdInfo?.bio}</p>
              </div> : null}

            </div>
          </div>
        </div>
      </section>

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        {userIdInfoBlogs.length === 0 ? <div className='w-[1000px]'>
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
              {userIdInfoBlogs?.map((item, id, deleteBlog) => (
                <MdBlogCard item={item} key={id} deleteBlog={deleteBlog} />
              ))}
            </div>
          </div>
        </div>}
      </section>

    </div>
  )
}

export default PersonProfile