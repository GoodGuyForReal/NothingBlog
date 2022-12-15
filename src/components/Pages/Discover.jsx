import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard'
import { UserBlog } from '../../context/BlogContext'
import CloseIcon from '../assets/CloseIcon'
import { genredata } from '../../utils/Genre.js';
import LeftArrowIcon from '../assets/LeftArrow';
import RightArrowIcon from '../assets/RightArrow';


const Discover = () => {
  const { blogs } = UserBlog()

  const [search, setSearch] = useState('')
  const [defult, setdefult] = useState([])
  const [genre, setGenre] = useState('')
  const [limitBlogsPerPage, setlimitBlogsPerPage] = useState(9)


  const latest = (i, sn, fn) => {
    return i.slice(sn, fn)
  }

  //?Search Engine
  const itemPerPage = latest(blogs, 0, limitBlogsPerPage)
  useEffect(() => {

    setdefult(itemPerPage)

  }, [limitBlogsPerPage, blogs])
  //console.log(defult)

  //? Paginatons on scrollbar
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {

      setlimitBlogsPerPage(prev => prev + 9)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])


  //?bg image url
  const banner = `https://images.unsplash.com/photo-1669569244017-54e818632745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80`

  //?Filter by Genre
  const genrefilter = blogs.filter((item) => item?.genre.toLowerCase() === `${genre}`.toLowerCase())


  const btnNextHandle = () => {
    const box = document.querySelector('.genreSlider');
    box.scrollLeft = box.scrollLeft - 500
  }

  const btnBackHandle = () => {
    const box = document.querySelector('.genreSlider');
    box.scrollLeft = box.scrollLeft + 500
  }

  return (
    <div>
      <section className='heroSection h-[60vh]'>
        <div className=' h-full relative '>
          <div className='absolute py-5 px-5 z-10 flex flex-col items-center justify-center gap-10 w-full h-full'>
            <div className='flex flex-col items-center justify-center w-full max-w-[900px] gap-5'>

              <div className='w-full'>
                <h1 className='text-[48px] font-bold leading-[120%] mb-4 text-white'>Nothing Blog</h1>
                <p className='text-[20px] w-[70%] font-normal text-white'>The internet’s source for stories.
                  Powered by creators everywhere.</p>
              </div>

              <input onChange={(e) => setSearch(e.target.value.toLocaleLowerCase().trim())} type="text" placeholder='Search for stories' className='py-4 pl-6 text-[18px] rounded-full w-full' />
            </div>
          </div>
          <div className='absolute z-[1] bg-[#00000053] h-full w-full object-cover'></div>
          <img src={banner} alt={banner} className='absolute z-0 h-full w-full object-cover' />
        </div>

        <div className='flex relative w-full group'>
          <button onClick={btnNextHandle} className="swiper-button-prev group-hover:block hover:opacity-100 absolute left-0 z-10 bg-gradient-to-l from-white top-0 bottom-[13%] w-[40px] bg-white"><LeftArrowIcon /></button>
          <div className='genreSlider scrollbar-hide flex w-full gap-7 overflow-x-auto mt-4 pb-7 scroll-smooth px-7'>
            {
              genredata.map((items, id) => (
                <div key={id}>
                  <button onClick={() => setGenre(items?.genre)} className='py-2 px-4 text-[16px] duration-300 hover:text-[#6c6c6c] text-black '>{items?.genre}</button>
                </div>
              ))
            }
          </div>
          <button onClick={btnBackHandle} className="swiper-button-next absolute z-10 right-0 hover:opacity-100 group-hover:block bg-gradient-to-r from-white bg-white w-[40px] top-0 bottom-[13%] text-white"><RightArrowIcon /></button>
        </div>
      </section>

      <section className='latest py-10 mt-12 mx-5 flex justify-center items-center'>
        <div className='w-[1000px]'>
          <h1 className='text-[18px] text-[#0000007a]'>Discover</h1>
          <hr />
          <div className='filterdiv flex gap-4'>
            {search.trim() === '' ? null
              : <p className='py-2 mt-5 px-6 rounded-full bg-[#fe39a2b6] text-[#ffffff] font-medium max-w-max text-[14px]'>Key Word: {search}</p>}

            {genre.trim() === '' ? null
              : <p onClick={() => setGenre('')} className='py-2 mt-5 px-3 flex gap-4 items-center rounded-full duration-200 hover:bg-[#fe39a29b] bg-[#fe39a2b6] text-[#ffffff] font-medium max-w-max text-[14px] cursor-pointer'>{genre} <CloseIcon /></p>}

          </div>
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