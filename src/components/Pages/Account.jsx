import React, { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import MyBlogs from './MyBlogs'
import { db, storage } from '../../Firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { UserBlog } from '../../context/BlogContext'
import { doc, updateDoc } from 'firebase/firestore'
import '../css/Style.css'
import { async } from '@firebase/util'
import { useNavigate } from 'react-router-dom'

const Account = () => {
  const [img, setImg] = useState(null)
  const [popUp, setPopUp] = useState(false)

  const navigate = useNavigate();


  const { user } = UserAuth();
  console.log(user)

  const { url, blogs, userInfo } = UserBlog()
  console.log(userInfo)

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0])
    }
  }

  const localdate = user?.metadata;
  console.log(localdate);

  const handlesubmit = async () => {

    if (img) {
      const imageRef = ref(storage, `ppimage/${userInfo?.email}`)
      uploadBytes(imageRef, img).then(() => {
        alert('image upladed successfully')
        setImg(null)
      })

      await updateDoc(doc(db, 'usersinfo', `${userInfo?.email}`), {
        displayName: userInfo?.displayName,
        email: userInfo?.email,
        joinedDate: userInfo?.joinedDate,
        userimage: url
      });

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
              <img src={userInfo?.userimage} alt="" className='defppimage object-cover object-center h-[120px] w-[120px] rounded-full' />
              <button className='py-2 px-6 hover:duration-300 text-[#fe39a2] font-medium rounded-md text-[16px] mt-3' onClick={() => setPopUp(true)} >Edit</button>
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-[24px] leading-[120%] font-semibold text-[#000000]'>@{userInfo?.displayName}</p>
              <div className='flex gap-2'>
                <p className='text-[15px] leading-[120%] text-[#0000007a] py-2 px-6 border rounded-md '>{userInfo?.email}</p>
                <p className='text-[15px] leading-[120%] text-[#0000007a] py-2 px-6 border rounded-md '>joined: {userInfo?.joinedDate}</p>
                <p className='text-[15px] leading-[120%] text-[#0000007a] py-2 px-6 border rounded-md '>Blogs: {userBlog.length}</p>
                <button navigate={'/CreatePage'} className='text-[15px] font-medium leading-[120%] text-[#ffffff] bg-[#fe39a2] py-2 px-6 border rounded-md '>Create +</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <MyBlogs />
      </section>

    </div>
  )
}

export default Account