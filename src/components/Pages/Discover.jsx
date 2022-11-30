import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard'
import { UserBlog } from '../../context/BlogContext'


const Discover = () => {
  const { blogs } = UserBlog()
  const [search, setSearch] = useState('')
  const [defult, setdefult] = useState([])

  const latest = (i, sn, fn) => {
    return i.slice(sn, fn)
  }

  //?Search Engine
  // const arr = []
  // const searchfilter = blogs.forEach(element => {
  //   return arr.push(element.title)
  // });
  // const result = arr.find((el) => el.toLowerCase().includes(search.toLowerCase()));
  // console.log(arr)
  // console.log(result)
  // console.log( searchfilter);

  useEffect(() => {
    setdefult(blogs)
  }, [blogs])
  console.log(defult)


  return (
    <section className='latest py-10 mx-5 flex justify-center items-center'>
      <div className='w-[1000px]'>

        <div>
          <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search stories' />
        </div>

        <div className='filterCell flex flex-wrap gap-3'>

          <button className='py-2 px-6 text-[14px] duration-300 hover:bg-[#000] hover:text-white border border-[#000] rounded-full'>Life</button>
          <button className='py-2 px-6 text-[14px] duration-300 hover:bg-[#000] hover:text-white border border-[#000] rounded-full'>Politic</button>
          <button className='py-2 px-6 text-[14px] duration-300 hover:bg-[#000] hover:text-white border border-[#000] rounded-full'>Technology</button>
          <button className='py-2 px-6 text-[14px] duration-300 hover:bg-[#000] hover:text-white border border-[#000] rounded-full'>Relationships</button>
          <button className='py-2 px-6 text-[14px] duration-300 hover:bg-[#000] hover:text-white border border-[#000] rounded-full'>Space</button>

        </div>

        <div className='smSection'>
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

            {
              defult.filter((item) => {
                return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search)
              } ).map((item, id) => (
                <BlogCard item={item} key={id} />
              ))
            }

          </div>
        </div>
      </div>
    </section>
  )
}

export default Discover