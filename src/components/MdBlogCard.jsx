import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase'


const MdBlogCard = ({ item , id  }) => {

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
        <div key={id}  className='h-full w-full py-6 cursor-pointer'>
            <div onClick={() => navigate(`/BlogDetail/${item?.id}`, { state: item })}>
                <img src={`${item?.img}`} alt={`${item[0]?.img}`} className='h-[300px] w-full object-cover rounded-md' />
                <h1 className='text-[24px] font-bold leading-[120%] mb-2 text-[#272727]'>{item?.title}</h1>
                <p className='text-[18px] leading-[120%] text-[#0000007a]'>{limit(item?.desc, 100)}</p>
                <div className='py-4 flex gap-4'>
                   
                   <img src="" alt="" className='bg-black object-cover h-[42px] w-[42px] rounded-full' />
                   
                   <div>
                       <p className='text-[15px] leading-[120%] text-[#0000007a]'>{item?.userid}</p>
                       <p className='text-[15px] leading-[120%] text-[#0000007a]'>Nov 9</p>
                   </div>
               </div>
            </div>
            {/* <button className='py-2 px-5 bg-red-500 text-white' onClick={() => deleteBlog(item.id)}>Delete This Blog</button> */}

        </div>
    )
}

export default MdBlogCard