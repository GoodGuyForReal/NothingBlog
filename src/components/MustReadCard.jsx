import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { db } from '../Firebase'
import WhiteSavedIcon from './assets/WhiteSavedIcon'
import WhiteSaveIcon from './assets/WhiteSaveIcon'


const MdBlogCard = ({ item, id }) => {
    const [userIdInfo, setuserIdInfo] = useState([])
    const navigate = useNavigate()
    const [blogSaved, setBlogSaved] = useState(false)
    const { user } = UserAuth()


    const limit = (text, limit) => {
        return `${text.slice(0, limit)}...`
    }

    useEffect(() => {
        onSnapshot(doc(db, "users", `${item?.userId}`), (doc) => {
            setuserIdInfo(doc.data())
        });
    }, [item?.userId])

    console.log(userIdInfo);


    const updateSavedBlogsRef = doc(db, "users", `${user?.email}`)

    const SaveBtnHandler = async () => {
        await updateDoc(updateSavedBlogsRef, {
            savedBlogs: arrayUnion({
                userId: item?.userId,
                id: item?.id
            })
        })
        setBlogSaved(true)
    }


    return (
        <div key={id} className='h-[400px] w-full cursor-pointer'>
            <div className='relative h-full' onClick={() => navigate(`/BlogDetail/${item?.id}`, { state: item })}>
                <div className='bg-[#0000007d] absolute z-10 h-full w-full rounded-md'></div>
                <img src={`${item?.imgLink}`} alt={`${item[0]?.imgLink}`} className='h-full w-full object-cover absolute z-0 rounded-md' />

                <div className='absolute z-20 py-4 flex flex-col gap-4 bottom-0 left-5'>
                    <p className='py-1 mt-5 px-4 flex gap-4 items-center rounded-full bg-[#ffffff] text-[#000000] font-medium max-w-max text-[14px] cursor-pointer'>{item?.genre}</p>
                    <h1 className='text-[32px] font-bold leading-[120%] mb-2 w-[90%] text-white'>{limit(item?.title, 80)}</h1>
                    <div className='py-4 flex gap-2 items-center' onClick={() => navigate(`/PersonProfile/${item?.id}`, { state: item })}>
                        <img src={userIdInfo?.ppImage} alt="" className='bg-black object-cover h-[42px] w-[42px] rounded-full' />
                        <div>
                            <p className='text-[15px] leading-[120%] text-[#ffffff]'>{userIdInfo?.displayName}</p>
                            <p className='text-[15px] leading-[120%] text-[#ffffff]'>{item?.creationDate}</p>
                        </div>
                    </div>

                    {!blogSaved ? <button onClick={SaveBtnHandler}>
                        <WhiteSaveIcon />
                    </button> : <button>
                        <WhiteSavedIcon />
                    </button>}

                </div>


            </div>
        </div>
    )
}

export default MdBlogCard