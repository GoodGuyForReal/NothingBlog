import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { UserBlog } from '../../context/BlogContext';
import { genredata } from '../../utils/Genre.js';

import {
    CheckIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/20/solid'
import { arrayRemove, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import CloseIcon from '../assets/CloseIcon';
import { UserAuth } from '../../context/AuthContext';

const BlogDetail = () => {
    const { state: details } = useLocation();
    const [isEdit, setIsEdit] = useState(false)
    const [img, setImg] = useState(details?.imgLink)
    const [title, setTitle] = useState(details?.title)
    const [desc, setDesc] = useState(details?.desc)
    const [genre, setGenre] = useState(details?.genre)
    const [userIdInfo, setuserIdInfo] = useState([])

    const navigate = useNavigate();


    console.log(details)

    const { id } = useParams();
    console.log(id);
    const { user } = UserAuth()
    const { userInfo } = UserBlog()
    console.log(userInfo);

    //? Author Information
    useEffect(() => {
        onSnapshot(doc(db, "users", `${details?.userId}`), (doc) => {
            setuserIdInfo(doc.data())
        });

    }, [details?.userId])

    console.log(userIdInfo);

    //? EditBlog button function
    const handleEdit = () => {
        setIsEdit(true)
    }

    //? saveBlog button function
    const handleSave = async () => {


        const UserArr = doc(db, 'discoverBlogs', `${details?.id}`)
        await updateDoc(UserArr, {
            title: title,
            desc: desc,
            imgLink: img,
            genre: genre,
        })
        const path = userInfo?.userBlogs?.find((item) => item?.id === details?.id)
        console.log(path)

        // const UserArrblogs = doc(db, 'users', `${userInfo?.email}`)
        // await updateDoc(UserArrblogs, path, {
        //     userBlogs: arrayUnion({
        //         title: title,
        //         desc: desc,
        //         imgLink: img,
        //         genre: genre,
        //     })
        // })
        setIsEdit(false)
        navigate(-1)


    }

    //? deleteBlog button function
    const deleteBlog = async () => {
        // eslint-disable-next-line no-restricted-globals
        let result = confirm("Want to delete?");
        if (result) {
            await deleteDoc(doc(db, 'discoverBlogs', details?.id))

            const path = userInfo?.userBlogs?.find((item) => item?.id === details?.id)
            console.log(path)
            try {
                const washingtonRef = doc(db, 'users', userInfo?.email);
                await updateDoc(washingtonRef, {
                    userBlogs: arrayRemove(path)
                });
            } catch (e) {
                console.log(e.message);
            }

        }
        navigate(-1)
    }

    //? Read time Calculator
    function readingTime() {
        const text = details?.desc
        const wpm = 225;
        const words = text?.trim().split(/\s+/)?.length;
        return Math.ceil(words / wpm);
    }
    console.log(readingTime());

    return (
        <div className='flex justify-center items-center'>
            <div className='py-10 mx-5 w-[1000px]'>

                <div className='top-name flex flex-col  md:flex-row items-center justify-between w-full'>

                    <div className='py-4 flex gap-4 mb-5 border-b w-full'>
                        <img src={userIdInfo?.ppImage} alt="" className='bg-black object-cover h-[58px] w-[58px] rounded-full cursor-pointer' onClick={() => navigate(`/PersonProfile/${details?.id}`, { state: details })} />
                        <div>
                            <p className='text-[20px] font-semibold leading-[120%] mb-1 text-[#000000]'>{userIdInfo?.displayName}</p>
                            <div className='flex gap-4 items-center'>
                                <p className='text-[15px] leading-[120%] text-[#0000007a]'>{details?.creationDate}</p>
                                <p>&#8226;</p>
                                <p className='py-1 px-4 flex gap-4 items-center rounded-full bg-[#ecececb6] text-[#484848b6] font-medium max-w-max text-[14px] cursor-pointer'>{details?.genre}</p>
                                <p>&#8226;</p>
                                <p className='py-1 px-4 flex gap-4 items-center rounded-full bg-[#ecececb6] text-[#484848b6] font-medium max-w-max text-[14px] cursor-pointer'>{readingTime()} min read⚡</p>

                            </div>
                        </div>

                    </div>

                    <div>
                        {user?.email === details?.userId && <div className='blogUserBtns flex items-center'>
                            <span className="flex gap-3">
                                {!isEdit ? <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => handleEdit()}
                                >
                                    <PencilIcon className=" h-5 w-5 text-gray-500" aria-hidden="true" />
                                    Edit
                                </button> : <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => setIsEdit(false)}
                                >
                                    <PencilIcon className=" h-5 w-5 text-gray-500" aria-hidden="true" />
                                    Cancel
                                </button>}

                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => deleteBlog()}
                                >
                                    <TrashIcon className=" h-5 w-5  text-gray-500 " aria-hidden="true" />
                                    Delete
                                </button>

                            </span>

                            <span className="ml-3 sm:block">

                            </span>

                            {isEdit && <span className="sm:ml-3">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => handleSave()}
                                >
                                    <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Publish
                                </button>
                            </span>}

                        </div>}
                    </div>

                </div>

                <div className='mainBlog flex flex-col gap-5 py-5'>

                    {isEdit !== false ? <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' defaultValue={details?.title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder={details?.title} /> : <h1 className='text-[42px] leading-[110%] font-bold'>{details?.title}</h1>}

                    {isEdit !== false && <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' defaultValue={details?.imgLink} onChange={(e) => setImg(e.target.value)} type="text" placeholder={details?.imgLink} />}

                    <img src={details?.imgLink} alt={details?.imgLink} defaultValue={details?.imgLink} className='object-cover w-full rounded-md' />


                    {isEdit !== false ?
                        <div className='filterCell flex flex-wrap gap-3 justify-center'>
                            <p onClick={() => setGenre('')} className='py-2 px-6 flex gap-4 items-center rounded-full duration-200 hover:bg-[#fe39a29b] bg-[#fe39a2b6] text-[#ffffff] font-medium max-w-max text-[14px] cursor-pointer'>{genre} <CloseIcon /></p>

                            {
                                genredata.map((items, id) => (
                                    <div key={id}>
                                        <button onClick={() => setGenre(items?.genre)} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>{items?.genre}</button>
                                    </div>
                                ))
                            }
                        </div>
                        : null}
                    {isEdit !== false ? <textarea onChange={(e) => setDesc(e.target.value)} defaultValue={details?.desc} className='p-3 h-[70vh] border border-[#848484] rounded-md text-[20px]' /> : <p className='text-[20px] font-normal leading-[160%]' >{details?.desc}</p>}
                </div>

            </div>
        </div>
    )
}

export default BlogDetail