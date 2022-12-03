import { async } from '@firebase/util';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useLocation } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';
import { UserBlog } from '../../context/BlogContext';
import { db } from '../../Firebase';
import MdBlogCard from '../MdBlogCard';

const PersonProfile = () => {

  const { state: details } = useLocation();
  const { user } = UserAuth()
  const { blogs, userInfo } = UserBlog()
  console.log(details)


  console.log(userInfo)



  const userBlog = blogs.filter((userblogs) => {
    return userblogs.userid === details?.userid
  })
  console.log(userBlog)



  const handleFollow = async () => {

    //?current user arrayUnion
    const UserArr = doc(db, 'usersinfo', `${user?.email}`)
    await updateDoc(UserArr, {
      followarr: arrayUnion({
        email: details?.userid,
        displayname: details?.displayname,
        userimage: details?.userimage,
      })
    })

    //?Followed user arrayUnion
    const personArr = doc(db, 'usersinfo', `${details?.userid}`)
    await updateDoc(personArr, {
      followersarr: arrayUnion({
        email: userInfo?.email,
        displayname: userInfo?.displayName,
        userimage: userInfo?.userimage,
      })
    })

  }


  return (
    <div>

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          <div className='py-4 flex gap-4'>
            <div className='text-center'>
              {details?.userimage === '' ? <div className='defppimage bg-black object-cover object-center h-[120px] w-[120px] rounded-full' /> : <img src={details?.userimage} alt="" className='defppimage object-cover object-center h-[120px] w-[120px] rounded-full' />}
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-[24px] leading-[120%] font-semibold text-[#000000]'>@{details?.displayname}</p>
              <div className='flex gap-2'>
                <p className='text-[15px] leading-[120%] text-[#000000] py-2 px-6 border border-[#0000002e] rounded-md '>{details?.userid}</p>
                <p className='text-[15px] leading-[120%] text-[#000000] py-2 px-6 border border-[#0000002e] rounded-md '>joined: {details?.joinedDate}</p>
                <p className='text-[15px] leading-[120%] text-[#000000] py-2 px-6 border border-[#0000002e] rounded-md '>Blogs: {userBlog.length}</p>
                <button onClick={() => handleFollow()}>Follow +</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        {userBlog.length === 0 ? <div className='w-[1000px]'>
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
              {userBlog.map((item, id, deleteBlog) => (
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