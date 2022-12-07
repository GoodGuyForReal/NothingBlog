import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase'


const BlogCard = ({ item, id }) => {
    const [userIdInfo, setuserIdInfo] = useState([])
    const navigate = useNavigate()



    const limit = (text, limit) => {
        return `${text.slice(0, limit)}...`
    }


    useEffect(() => {
        onSnapshot(doc(db, "users", `${item?.userId}`), (doc) => {
            setuserIdInfo(doc.data())
        });
    }, [item?.userId])

    console.log(userIdInfo);


    return (
        <div key={id} className='h-full w-full py-6 cursor-pointer'>
            <div onClick={() => navigate(`/BlogDetail/${item?.id}`, { state: item })}>
                <img src={`${item?.imgLink}`} alt={`${item[0]?.img}`} className='h-[190px] w-full object-cover rounded-md ' />
                <p className='py-1 mt-3 px-4 flex gap-4 items-center rounded-full bg-[#ecececb6] text-[#484848b6] font-medium max-w-max text-[14px] cursor-pointer'>{item?.genre}</p>
                <h1 className='text-[24px] font-bold leading-[120%] my-2 text-[#272727]'>{limit(item?.title, 80)}</h1>
                <p className='text-[18px] leading-[120%] text-[#0000007a]'>{limit(item?.desc, 100)}</p>
            </div>
            <div className='py-4 flex gap-2 items-center' onClick={() => navigate(`/PersonProfile/${item?.id}`, { state: item })}>
                <img src={userIdInfo?.ppImage} alt="" className='bg-black object-cover h-[42px] w-[42px] rounded-full' />
                <div>
                    <p className='text-[15px] leading-[120%] text-[#0000007a]'>{userIdInfo?.displayName}</p>
                    <p className='text-[15px] leading-[120%] text-[#0000007a]'>{item?.creationDate}</p>
                </div>
            </div>

        </div>
    )
}

export default BlogCard