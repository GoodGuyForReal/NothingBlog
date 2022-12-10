import React, { useState } from 'react'
import MyBlogs from './MyBlogs'
import { db, storage } from '../../Firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { UserBlog } from '../../context/BlogContext'
import { doc, updateDoc } from 'firebase/firestore'
import '../css/Style.css'
import { useNavigate } from 'react-router-dom'
import SavedBlogs from './SavedBlogs'

const Account = () => {
  const [img, setImg] = useState(null)
  const [popUp, setPopUp] = useState(false)

  const navigate = useNavigate();

  //?Context API
  const { url, userInfo } = UserBlog()
  console.log(userInfo)


  //?Image file picker
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0])
    }
  }

  //?User Profile Update
  const handlesubmit = async (event) => {
    event.preventDefault()
    try {
      //?Image update
      const imageRef = ref(storage, `ppimage/${userInfo?.email}`)
      await uploadBytes(imageRef, img)

      await updateDoc(doc(db, 'users', `${userInfo.email}`), {
        ppImage: `${url}`,
      });
      setImg(null)

    } catch (error) {
      alert('image Could not be uploaded')
    }
  }

  //?Pop Up CloseBtn Handler
  const handlepopclose = () => {
    setImg(null)
    setPopUp(false)
  }

  //?User Blogsarray
  const userBlog = userInfo?.userBlogs
  console.log(userBlog)


  //?User Debugger
  console.log(img)
  console.log(img?.size);
  console.log(url);
  console.log(userInfo)


  return (
    <div>
      {popUp && <div className='ProfilePopUp fixed bg-[#00000060] top-0 left-0 bottom-0 right-0 flex items-center justify-center'>
        <div className='bg-white p-10 rounded-md flex flex-col gap-7 items-center'>

          <img src={userInfo?.ppImage} alt="" className='bg-[#00000060] object-cover h-[120px] w-[120px] rounded-full' />
          <input onChange={handleImg} type='file' className='w-[250px]' />
          {img?.size > 200000 && <p className='text-[#fe3949]'>image size is higer than 500 X 500</p>}
          <div className='flex gap-3'>
            {img?.size > 200000 ? null : <button className='py-2 px-6 hover:bg-[#d42080] hover:duration-300 bg-[#fe39a2] text-white font-medium rounded-md text-[16px]' onClick={handlesubmit} >Save</button>}
            <button className='py-2 px-6 hover:bg-[#fe39a2] hover:text-white hover:duration-300 text-[#fe39a2] font-medium rounded-md text-[16px]' onClick={handlepopclose} >Close</button>
          </div>

        </div>
      </div>}

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          <div className='py-4 flex gap-4'>
            <div className='text-center'>
              {userInfo?.ppImage === '' ? <div className='defppimage bg-black object-cover object-center h-[120px] w-[120px] rounded-full' /> : <img src={userInfo?.ppImage} alt="" className='defppimage object-cover object-center h-[120px] w-[120px] rounded-full' />}


            </div>
            <div className='flex flex-col gap-5'>

              <p className='text-[36px] leading-[120%] font-bold text-[#000000]'>@{userInfo?.displayName}</p>

              <div className='flex gap-2'>
                <p className='text-[15px] text-[#000000] py-2 px-6 border border-[#0000002e] rounded-md '>{userInfo?.email}</p>
                <p className='text-[15px] text-[#000000] py-2 px-6 border border-[#0000002e] rounded-md '>joined: {userInfo?.joinedDate}</p>

                <p className='text-[15px] text-[#000000] py-2 px-6 border border-[#0000002e] rounded-md '>Blogs: {userBlog?.length === 0 || userBlog?.length === undefined ? '0' : userBlog?.length}</p>
              </div>
              <div className='flex gap-3'>

                <button className='py-2 px-6 border border-[#fe39a2]  duration-300 text-[#fe39a2] font-medium rounded-md text-[15px] mt-3 hover:bg-[#fe39a2] hover:text-[#ffffff]' onClick={() => setPopUp(true)} >Edit Profile</button>

                <button onClick={() => navigate('/CreatePage')} className='py-2 px-6 border hover:bg-[#ff5ab2] bg-[#fe39a2] duration-300 text-[#ffffff] font-medium rounded-md text-[15px] mt-3'>Create +</button>

              </div>
              <div className='flex gap-2'>

              </div>


            </div>
          </div>
        </div>
      </section>

      <section>
        <MyBlogs />
      </section>
      <section>
        <SavedBlogs />
      </section>

    </div>
  )
}

export default Account