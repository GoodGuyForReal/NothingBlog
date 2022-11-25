import React, { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import CreateBlog from './CreateBlog'
import MyBlogs from './MyBlogs'
import { db, storage } from '../../Firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { UserBlog } from '../../context/BlogContext'
import { doc, updateDoc } from 'firebase/firestore'

const Account = () => {
  const [img, setImg] = useState(null)
  const [popUp, setPopUp] = useState(false)



  const { user } = UserAuth();
  console.log(user)

  const { url, blogs , userInfo } = UserBlog()
console.log(userInfo)

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0])
    }
  }

  const localdate = user?.metadata;
  console.log(localdate);

  const handlesubmit = () => {

    if (img) {
      const imageRef = ref(storage, `ppimage/${userInfo?.email}`)
      uploadBytes(imageRef, img).then(() => {
        alert('image upladed successfully')
        setImg(null)
      })

      const ppUpdate = doc(db, "usersInfo", `${userInfo?.email}`)
      updateDoc(ppUpdate, {
        UserImage: userInfo.UserImage
      })
      document.location.reload()
    } else {
      alert('image Could not be uploaded')
    }

  }
  const x = doc(db, 'usersinfo', `${userInfo?.email}`)
  console.log(x)

  console.log(img)
  console.log(url);

  const userBlog = blogs.filter((userblogs) => {
    return userblogs.userid === userInfo?.email
  })
  console.log(userBlog)

  const ppUpdateee = doc(db, "usersInfo", `${userInfo?.email}`)
  console.log(ppUpdateee);

  return (
    <div>
      {popUp && <div className='ProfilePopUp fixed bg-[#00000060] top-0 left-0 bottom-0 right-0 flex items-center justify-center'>
        <div className='bg-white p-10 rounded-md flex flex-col gap-7 items-center'>

          <img src={url} alt="" className='object-cover h-[120px] w-[120px] rounded-full' />
          <input onChange={handleImg} type='file' className='w-[250px]' />
          <div className='flex gap-3'>
            <button className='py-2 px-6 hover:bg-[#d42080] hover:duration-300 bg-[#fe39a2] text-white font-medium rounded-md text-[16px]' onClick={handlesubmit} >Save</button>
            <button className='py-2 px-6 hover:bg-[#fe39a2] hover:text-white hover:duration-300 text-[#fe39a2] font-medium rounded-md text-[16px]' onClick={() => setPopUp(false)} >Close</button>
          </div>

        </div>
      </div>}

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          {/* user profile img and the other information on the top and add a buttton to direct to creatblog page */}
          <div className='py-4 flex gap-4'>
            <div className='text-center'>
              <img src={url} alt="" className='object-cover h-[120px] w-[120px] rounded-full' />
              <button className='py-2 px-6 hover:duration-300 text-[#fe39a2] font-medium rounded-md text-[16px] mt-3' onClick={() => setPopUp(true)} >Edit</button>
            </div>
            <div>
              <p className='text-[24px] leading-[120%] font-semibold text-[#000000]'>{user?.email}</p>
              <p className='text-[15px] leading-[120%] text-[#0000007a]'>{userInfo?.displayName}</p>
              <p className='text-[15px] leading-[120%] text-[#0000007a]'>{userInfo?.joinedDate}</p>
              <p className='text-[15px] leading-[120%] text-[#0000007a]'>Blogs: {userBlog.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <MyBlogs />
      </section>

      <section>
        <CreateBlog />
      </section>
    </div>
  )
}

export default Account