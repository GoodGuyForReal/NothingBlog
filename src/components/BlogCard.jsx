import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { db } from '../Firebase'
import SavedIcon from './assets/SavedIcon'
import SaveIcon from './assets/SaveIcon'
import { ToastContainer, toast } from 'react-toastify';

const BlogCard = ({ item, id }) => {
    const [userIdInfo, setuserIdInfo] = useState([])
    const [blogSaved, setBlogSaved] = useState(false)
    const navigate = useNavigate()

    const { user } = UserAuth()

    //? Title length
    const limit = (text, limit) => {
        if (text.length > limit) {
            return `${text.slice(0, limit)}...`
        } else {
            return `${text.slice(0, limit)}`
        }

    }

    //?Auther User Information
    useEffect(() => {
        onSnapshot(doc(db, "users", `${item?.userId}`), (doc) => {
            setuserIdInfo(doc.data())
        });
    }, [item?.userId])


    const notify = (msg) => toast(msg);
    //?Save Blog
    const updateSavedBlogsRef = doc(db, "users", `${user?.email}`)

    const SaveBtnHandler = async () => {
        await updateDoc(updateSavedBlogsRef, {
            savedBlogs: arrayUnion({
                userId: item?.userId,
                id: item?.id
            })
        })
        notify(`${item?.title} - Has been saved 👍`)
        setBlogSaved(true)
        
    }


    return (
        <div key={id} className='h-full w-full py-4 cursor-pointer'>
            <div onClick={() => navigate(`/BlogDetail/${item?.id}`, { state: item })}>
                <img src={`${item?.imgLink}`} alt={`${item[0]?.img}`} className='h-[190px] w-full object-cover rounded-md bg-[#ffffff] ' />
                <p className='py-1 mt-3 px-4 flex gap-4 items-center rounded-full bg-[#ecececb6] text-[#484848b6] font-medium max-w-max text-[14px] cursor-pointer'>{item?.genre}</p>
                <h1 className='text-[24px] font-bold leading-[120%] my-2 text-[#272727]'>{limit(item?.title, 80)}</h1>
                <p className='text-[18px] leading-[120%] text-[#0000007a]'>{limit(item?.desc, 100)}</p>
            </div>
            <div className='py-4 flex gap-2 items-center' onClick={() => navigate(`/PersonProfile/${item?.id}`, { state: item })}>
                <img src={userIdInfo?.ppImage} alt="" className='object-cover h-[42px] w-[42px] rounded-full' />
                <div>
                    <p className='text-[15px] leading-[120%] text-[#0000007a]'>{userIdInfo?.displayName}</p>
                    <p className='text-[15px] leading-[120%] text-[#0000007a]'>{item?.creationDate}</p>
                </div>
            </div>
       
            <div>
                {!blogSaved ? <button onClick={SaveBtnHandler}>
                    <SaveIcon />
                </button> : <button>
                    <SavedIcon />
                </button>}
            </div>
            <ToastContainer />
        </div>
    )
}

export default BlogCard