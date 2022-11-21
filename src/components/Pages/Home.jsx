import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../Firebase'
import BlogCard from '../BlogCard'
import MdBlogCard from '../MdBlogCard'
import '../css/Style.css'
import MustReadCard from '../MustReadCard'
import AppAdsCard from '../AppAdsCard'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  console.log(blogs)
  useEffect(() => {
    const q = query(collection(db, 'Blogs'));
    const unsubscribe = onSnapshot(q, (query) => {
      let blogsarray = [];
      query.forEach((doc) => {
        blogsarray.push({ ...doc.data(), id: doc.id })
      });

      setBlogs(blogsarray)

    })
    return () => unsubscribe()

  }, [])


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

      <section className='adsCard py-10'>
        <div className='max-h-fit mx-5 sm:mx-10 md:mx-28 lg:mx-48'>
          <AppAdsCard />
        </div>
      </section>

      <section className='latest py-10 mx-5 sm:mx-10 md:mx-28 lg:mx-48'>

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

      </section>

      <section className='mustRead py-10 mx-5 sm:mx-10 md:mx-28 lg:mx-48'>
        <h1 className='text-[18px] text-[#0000007a]'>Must Read</h1>
        <hr />
        <div className='flex flex-col gap-[15px] mt-5'>

          <div className=''>
            {latest(blogs, 2, 3).map((item, id, deleteBlog) => (
              <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
            ))}
          </div>

          <div className='mustReadCradSec '>
            {latest(blogs, 2, 4).map((item, id, deleteBlog) => (
              <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
            ))}
          </div>

          <div className='mustReadCradSecRev'>
            {latest(blogs, 4, 6).map((item, id, deleteBlog) => (
              <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
            ))}
          </div>

          <div className='mustReadCradSec '>
            {latest(blogs, 6, 8).map((item, id, deleteBlog) => (
              <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
            ))}
          </div>

          <div className='mustReadCradSecRev '>
            {latest(blogs, 8, 10).map((item, id, deleteBlog) => (
              <MustReadCard item={item} key={id} deleteBlog={deleteBlog} />
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home