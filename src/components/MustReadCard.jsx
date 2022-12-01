import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase'


const MdBlogCard = ({ item, id }) => {

    const navigate = useNavigate()

    const limit = (text, limit) => {
        return `${text.slice(0, limit)}...`
    }

    const deleteBlog = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        let result = confirm("Want to delete?");
        if (result) {
            await deleteDoc(doc(db, 'Blogs', id))
        } else {

        }

    }


    return (
        <div key={id} className='h-[400px] w-full cursor-pointer'>
            <div className='relative h-full' onClick={() => navigate(`/BlogDetail/${item?.id}`, { state: item })}>
                <div className='bg-[#0000007d] absolute z-10 h-full w-full rounded-md'></div>
                <img src={`${item?.img}`} alt={`${item[0]?.img}`} className='h-full w-full object-cover absolute z-0 rounded-md' />

                <div className='absolute z-20 py-4 flex flex-col gap-4 bottom-0 left-5'>
                <p className='py-1 mt-5 px-4 flex gap-4 items-center rounded-full bg-[#ecececb6] text-[#484848b6] font-medium max-w-max text-[14px] cursor-pointer'>{item?.genre}</p>
                    <h1 className='text-[32px] font-bold leading-[120%] mb-2 w-[90%] text-white'>{item?.title}</h1>
                    <div className='flex gap-4 '>
                        <img src={item?.userimage} alt="" className='bg-white object-cover h-[42px] w-[42px] rounded-full' />
                        <div>
                            <p className='text-[15px] leading-[120%] text-white'>{item?.displayname}</p>
                            <p className='text-[15px] leading-[120%] text-white'>{item?.time}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button className='py-2 px-5 bg-red-500 text-white' onClick={() => deleteBlog(item.id)}>Delete This Blog</button> */}

        </div>
    )
}

export default MdBlogCard