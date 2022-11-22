import React, { useState, useEffect } from 'react'
import { UserAuth } from '../../context/AuthContext'
import CreateBlog from './CreateBlog'
import MyBlogs from './MyBlogs'
import { storage } from '../../Firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { UserBlog } from '../../context/BlogContext'

const Account = () => {
  const [img, setImg] = useState(null)
  // const [url, setUrl] = useState(null)



  const { user } = UserAuth();
  console.log(user)

  const { url } = UserBlog()


  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0])
    }
  }


  const handlesubmit = () => {
    const imageRef = ref(storage, `ppimage/${user?.email}`)
    uploadBytes(imageRef, img).then(() => {
      alert('image upladed successfully')
      setImg(null)
    })
  }

console.log(url);

  // const personpp = ref(storage, `ppimage/${user?.email}`)
  // useEffect(() => {

  //   getDownloadURL(personpp).then((url) => {
  //     return setUrl(url)
  //   }).catch((error) => console.log(error.message))

  // }, [personpp])


  return (
    <div>

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          {/* user profile img and the other information on the top and add a buttton to direct to creatblog page */}
          <div className='py-4 flex gap-4'>
            <div>
              <img src={url} alt="" className='object-cover h-[120px] w-[120px] rounded-full' />
              <input onChange={handleImg} type='file' />
              <button onClick={handlesubmit} >Submit</button>
            </div>
            <div>
              <p className='text-[24px] leading-[120%] font-semibold text-[#000000]'>{user?.email}</p>
              <p className='text-[15px] leading-[120%] text-[#0000007a]'>Nov 9</p>
              <p className='text-[15px] leading-[120%] text-[#0000007a]'>Blogs: 3</p>
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