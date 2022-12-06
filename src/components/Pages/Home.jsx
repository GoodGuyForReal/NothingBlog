import React from 'react'
import BlogCard from '../BlogCard'
import MdBlogCard from '../MdBlogCard'
import '../css/Style.css'
import MustReadCard from '../MustReadCard'
import AppAdsCard from '../AppAdsCard'
import { UserBlog } from '../../context/BlogContext'

const Home = () => {

  const { blogs } = UserBlog();
console.log(blogs)

  const latest = (i, sn, fn) => {
    return i.slice(sn, fn)
  }
  console.log(latest(blogs, 2))
  const banner = `https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80`

  return (
    <div>

      <section className='heroSection'>
        <div className='h-[70vh] w-full relative'>
          <div className='absolute py-5 px-5 z-10 flex flex-col items-center justify-center gap-10 w-full h-full'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-[100px] font-bold leading-[120%] text-white'>Blogers' Secret Source</h1>
              <p className='text-[24px] font-normal text-white'>Discover stories, thinking, and expertise from writers on any topic.</p>
            </div>
            <div className='flex gap-5'>
              <button className='py-3 px-10 font-medium rounded-full hover:bg-[#ff5ab2] duration-300 text-white bg-[#fe39a2]'>Start reading</button>
              <button className='py-3 px-10 font-medium rounded-full hover:bg-[#fe39a2] text-white duration-300 border-[#ffffff] border'>Discover</button>
            </div>
          </div>
          <div className='absolute z-[1] bg-[#0000003b] h-full w-full object-cover'></div>
          <img src={banner} alt={banner} className='absolute z-0 h-full w-full object-cover' />
        </div>
      </section>

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          <h1 className='text-[18px] text-[#0000007a]'>Latest Stories</h1>
          <hr />
          <div className='mdSection'>
            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5'>
              {latest(blogs, 0, 2).map((item, id, deleteBlog) => (
                <MdBlogCard item={item} key={id} deleteBlog={deleteBlog} />
              ))}
            </div>
          </div>

          <div className='smSection'>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {latest(blogs, 2, 11).map((item, id, deleteBlog) => (
                <BlogCard item={item} key={id} deleteBlog={deleteBlog} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='mustRead py-10 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          <h1 className='text-[18px] text-[#0000007a]'>Must Read</h1>
          <hr />
          <div className='flex flex-col gap-[15px] mt-5'>

            <div className=''>
              {latest(blogs, 11, 12).map((item, id, deleteBlog) => (
                <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
              ))}
            </div>

            <div className='mustReadCradSec '>
              {latest(blogs, 12, 14).map((item, id, deleteBlog) => (
                <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
              ))}
            </div>

            <div className='mustReadCradSecRev'>
              {latest(blogs, 14, 16).map((item, id, deleteBlog) => (
                <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
              ))}
            </div>

            <div className='mustReadCradSec '>
              {latest(blogs, 16, 18).map((item, id, deleteBlog) => (
                <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
              ))}
            </div>

            <div className='mustReadCradSecRev '>
              {latest(blogs, 18, 20).map((item, id, deleteBlog) => (
                <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className='adsCard py-10 flex justify-center items-center'>
        <div className='max-h-fit w-[1000px]'>
          <AppAdsCard />
        </div>
      </section>

    </div>
  )
}

export default Home