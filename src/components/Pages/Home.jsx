import React from 'react'
import BlogCard from '../BlogCard'
import MdBlogCard from '../MdBlogCard'
import '../css/Style.css'
import MustReadCard from '../MustReadCard'
import AppAdsCard from '../AppAdsCard'
import { UserBlog } from '../../context/BlogContext'

const Home = () => {

  const { blogs } = UserBlog();


  const latest = (i, sn, fn) => {
    return i.slice(sn, fn)
  }
  console.log(latest(blogs, 2))


  return (
    <div>

      <section className='heroSection'>
        <div className='h-[70vh] bg-black'>

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