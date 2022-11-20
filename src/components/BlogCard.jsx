import React from 'react'

const BlogCard = ({ item, deleteBlog }) => {
    return (
        <div className='h-full py-20 w-[500px]'>

            <img src={`${item?.img}`} alt={`${item[0]?.img}`} className='h-full w-full object-cover' />
            <p >{item?.userid}</p>
            <h1 className='text-[24px] font-bold leading-[120%] mb-5'>{item?.title}</h1>
            <p>{item?.desc}</p>
            {/* <button className='py-2 px-5 bg-red-500 text-white' onClick={() => deleteBlog(item.id)}>Delete This Blog</button> */}
        </div>
    )
}

export default BlogCard