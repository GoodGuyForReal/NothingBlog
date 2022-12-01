import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard'
import { UserBlog } from '../../context/BlogContext'
import CloseIcon from '../assets/CloseIcon'


const Discover = () => {
  const { blogs } = UserBlog()
  const [search, setSearch] = useState('')
  const [defult, setdefult] = useState([])
  const [genre, setGenre] = useState('')

  //?Search Engine
  useEffect(() => {
    setdefult(blogs)

  }, [blogs])
  console.log(defult)

  const banner = `https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80`

  const genrefilter = defult.filter((item) => item.genre.toLowerCase() === `${genre}`.toLowerCase())
  console.log(genrefilter);

  console.log(genre)


  return (
    <div>
      <section className='heroSection h-[50vh] w-full'>
        <div className=' h-full w-full relative'>
          <div className='absolute py-5 px-5 z-10 flex flex-col items-center justify-center gap-10 w-full h-full'>
            <div className='flex flex-col items-center justify-center max-w-[150vh] gap-5'>

              <div className='w-full'>
                <h1 className='text-[42px] font-bold leading-[120%] text-white'>Nothing Blog</h1>
                <p className='text-[20px] w-[70%] font-normal text-white'>The internet’s source for stories.
                  Powered by creators everywhere.</p>
              </div>

              <input onChange={(e) => setSearch(e.target.value.toLocaleLowerCase().trim())} type="text" placeholder='Search for stories' className='py-3 pl-6  rounded-full w-full' />

              <div className='filterCell flex flex-wrap gap-3'>
                <button onClick={(e) => setGenre('Life')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] text-white border border-[#fff] rounded-full'>Life</button>
                <button onClick={(e) => setGenre('Politic')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] text-white border border-[#fff] rounded-full'>Politic</button>
                <button onClick={(e) => setGenre('Technology')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] text-white border border-[#fff] rounded-full'>Technology</button>
                <button onClick={(e) => setGenre('Relationships')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] text-white border border-[#fff] rounded-full'>Relationships</button>
                <button onClick={(e) => setGenre('Space')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] text-white border border-[#fff] rounded-full'>Space</button>
              </div>

            </div>
          </div>
          <div className='absolute z-[1] bg-[#00000053] h-full w-full object-cover'></div>
          <img src={banner} alt={banner} className='absolute z-0 h-full w-full object-cover' />
        </div>
      </section>

      <section className='latest py-10 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          <h1 className='text-[18px] text-[#0000007a]'>Discover</h1>
          <hr />
          <div className='filterdiv flex gap-4'>
            {search.trim() === '' ? null
              : <p className='py-2 mt-5 px-6 rounded-full bg-[#fe39a2b6] text-[#ffffff] font-medium max-w-max text-[14px]'>Key Word: {search}</p>}

            {genre.trim() === '' ? null
              : <p onClick={() => setGenre('')} className='py-2 mt-5 px-3 flex gap-4 items-center rounded-full duration-200 hover:bg-[#fe39a29b] bg-[#fe39a2b6] text-[#ffffff] font-medium max-w-max text-[14px] cursor-pointer'>{genre} <CloseIcon /></p>}

          </div>
          <div className='topics'></div>
          <div className='smSection'>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {
                genrefilter.length === 0
                  ?
                  defult.filter((item) => {
                    return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search)
                  }).map((item, id) => (
                    <BlogCard item={item} key={id} />
                  ))
                  :
                  genrefilter.filter((item) => {
                    return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search) || item.desc.toLowerCase().includes(search)
                  }).map((item, id) => (
                    <BlogCard item={item} key={id} />
                  ))

              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Discover