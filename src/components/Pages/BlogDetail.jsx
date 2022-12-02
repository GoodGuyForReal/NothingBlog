import React, { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { UserBlog } from '../../context/BlogContext';

import {
    CheckIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/20/solid'
import { arrayUnion, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { async } from '@firebase/util';
import CloseIcon from '../assets/CloseIcon';

const BlogDetail = () => {
    const { state: details } = useLocation();
    const [isEdit, setIsEdit] = useState(false)
    const [img, setImg] = useState(details?.img)
    const [title, setTitle] = useState(details?.title)
    const [desc, setDesc] = useState(details?.desc)
    const [genre, setGenre] = useState(details?.genre)

    const navigate = useNavigate();


    console.log(details)

    const { id } = useParams();
    console.log(id);

    const { userInfo } = UserBlog()
    console.log(userInfo);



    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleSave = async () => {
        setIsEdit(false)

        const UserArr = doc(db, 'Blogs', `${details?.id}`)
        await updateDoc(UserArr, {
            title: title,
            desc: desc,
            img: img,
            genre: genre,
        })


        // const UserArrblogs = doc(db, 'usersinfo', `${userInfo?.email}`)
        // await updateDoc(UserArrblogs, {
        //     blogdetails: arrayUnion({
        //         title: title,
        //         desc: desc,
        //         img: img,
        //         genre: genre,
        //     })
        // })


        navigate(-1)
    }

    const deleteBlog = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        let result = confirm("Want to delete?");
        if (result) {
            await deleteDoc(doc(db, 'Blogs', `${details?.id}`))
        }
        navigate(-1)
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='py-10 mx-5 w-[800px]'>

                <div className='top-name flex items-center justify-between'>

                    <div className='py-4 flex gap-4'>
                        <img src={details?.userimage} alt="" className='bg-black object-cover h-[58px] w-[58px] rounded-full' />
                        <div>
                            <p className='text-[20px] font-semibold leading-[120%] text-[#000000]'>{details?.displayname}</p>
                            <div className='flex gap-4 items-center'>
                                <p className='text-[15px] leading-[120%] text-[#0000007a]'>{details?.time}</p>
                                <p>&#8226;</p>
                                <p className='py-1 px-4 flex gap-4 items-center rounded-full bg-[#ecececb6] text-[#484848b6] font-medium max-w-max text-[14px] cursor-pointer'>{details?.genre}</p>
                            </div>
                        </div>

                    </div>

                    {userInfo?.email === details?.userid && <div className='blogUserBtns flex items-center'>
                        <span className="hidden sm:block">
                            {!isEdit ? <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => handleEdit()}
                            >
                                <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                Edit
                            </button> : <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => setIsEdit(false)}
                            >
                                <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                Cancel
                            </button>}





                        </span>

                        <span className="ml-3 hidden sm:block">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => deleteBlog()}
                            >
                                <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                Delete
                            </button>
                        </span>

                        <span className="sm:ml-3">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => handleSave()}
                            >
                                <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                Publish
                            </button>
                        </span>

                    </div>}

                </div>

                <div className='mainBlog flex flex-col gap-5'>

                    {isEdit !== false ? <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' defaultValue={details?.title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder={details?.title} /> : <h1 className='text-[38px] font-bold'>{details?.title}</h1>}

                    {isEdit !== false && <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' defaultValue={details?.img} onChange={(e) => setImg(e.target.value)} type="text" placeholder={details?.img} />}

                    <img src={details?.img} alt={details?.img} defaultValue={details?.img} className='object-cover w-full rounded-md' />

                    {isEdit !== false ?
                        <div className='filterCell flex flex-wrap gap-3'>
                            <button onClick={() => setGenre('Life')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Life</button>
                            <button onClick={() => setGenre('Politic')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Politic</button>
                            <button onClick={() => setGenre('Technology')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Technology</button>
                            <button onClick={() => setGenre('Relationships')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Relationships</button>
                            <button onClick={() => setGenre('Space')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Space</button>
                            <button onClick={() => setGenre('Sport')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Sport</button>
                            <p onClick={() => setGenre('')} className='py-2 mt-5 px-3 flex gap-4 items-center rounded-full duration-200 hover:bg-[#fe39a29b] bg-[#fe39a2b6] text-[#ffffff] font-medium max-w-max text-[14px] cursor-pointer'>{genre} <CloseIcon /></p>
                        </div>
                        : null}


                    {isEdit !== false ? <textarea onChange={(e) => setDesc(e.target.value)} className='p-3 h-[70vh] border border-[#848484] rounded-md text-[18px]' >{details?.desc}</textarea> : <p className='text-[18px] font-normal leading-[160%]'>{details?.desc}</p>}
                </div>

            </div>
        </div>
    )
}

export default BlogDetail