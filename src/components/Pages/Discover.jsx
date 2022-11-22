import React from 'react'
import BlogCard from '../BlogCard'
import { UserBlog } from '../../context/BlogContext'

const Discover = () => {
  const { blogs } = UserBlog()

  const latest = (i, sn, fn) => {
    return i.slice(sn, fn)
  }
  console.log(latest(blogs, 2))



  return (
    <section className='latest py-10 mx-5 flex justify-center items-center'>
      <div className='w-[1000px]'>
        <div className='smSection'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {latest(blogs).map((item, id, deleteBlog) => (
              <BlogCard item={item} key={id} deleteBlog={deleteBlog} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Discover