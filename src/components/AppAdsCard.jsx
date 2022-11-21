import React from 'react'

const AppAdsCard = () => {
  return (
    <div className='w-full h-full py-10 text-center flex flex-col gap-5 px-10 items-center justify-center bg-[#F42A79]'>
      <h1 className='text-white text-[20px]'>NothingBlog</h1>
      <p className='text-white text-[28px] w-[95%] md:w-[90%] lg:md:w-[70%] font-semibold leading-[150%]'>The freshest links about design and interactive, from around the web. A designer’s must!</p>
      <button className='py-2 px-7 border rounded-full text-[16px] text-white font-medium hover:bg-white hover:text-black  duration-300' >Download from Google</button>
    </div>
  )
}

export default AppAdsCard