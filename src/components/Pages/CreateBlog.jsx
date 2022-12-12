import React, { useState } from 'react'
import { UserAuth } from '../../context/AuthContext.js'
import { db } from '../../Firebase'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import { UserBlog } from '../../context/BlogContext.js';
import CloseIcon from '../assets/CloseIcon.jsx';
import { genredata } from '../../utils/Genre.js';

const CreateBlog = () => {
    const [descInput, setDescInput] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [img, setImg] = useState([''])
    const [genre, setGenre] = useState('')


    console.log(descInput);
    const { userInfo } = UserBlog()
    const { user } = UserAuth()
    console.log(user);

    console.log(genredata)

    const resetInputFields = () => {
        setGenre('')
        setImg('')
        setDescInput('')
        setTitleInput('')
    }

    //?Create Blog
    const createBlog = async (event) => {
        event.preventDefault();
        if (descInput === '' || titleInput === '' || img === '') {
            alert('Please fill the all fields')
            return;
        }

        const fireBaseTimeStamp = Timestamp.fromDate(new Date())
        const creationDate = fireBaseTimeStamp.toDate().toDateString();
        //?Discover Blog 
        const docRef = await addDoc(collection(db, 'discoverBlogs'), {
            title: titleInput,
            desc: descInput,
            userId: userInfo.email,
            imgLink: img,
            creationDate: creationDate,
            genre: genre,
        })


        const blogData = {
            userBlogs: arrayUnion({
                userId: userInfo.email,
                id: docRef?.id
            })
        }
        const blogReference = doc(db, 'users', `${user?.email}`)
        await updateDoc(blogReference, blogData)

        resetInputFields()
    }

    //? #C5D4EB - #A3CEEF

    return (
        <div>
            {genre.trim() === '' ? null
                : <p onClick={() => setGenre('')} className='py-2 mt-5 px-3 flex gap-4 items-center rounded-full duration-200 hover:bg-[#fe39a29b] bg-[#fe39a2b6] text-[#ffffff] font-medium max-w-max text-[14px] cursor-pointer'>{genre} <CloseIcon /></p>}

            <div className='filterCell flex flex-wrap gap-3 w-full justify-center mb-5'>
                {
                    genredata.map((items, id) => (
                        <div key={id}>
                            <button onClick={() => setGenre(items?.genre)} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>{items?.genre}</button>
                        </div>
                    ))
                }
            </div>

            <form onSubmit={createBlog} className='flex flex-col w-full gap-5'>
                <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' onChange={(e) => setImg(e.target.value)} value={img} type="text" placeholder='img Link' />
                <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' onChange={(e) => setTitleInput(e.target.value)} value={titleInput} type="text" placeholder='Give a good title' />
                <textarea required className='p-3 h-[70vh] border border-[#848484] rounded-md text-[18px]' onChange={(e) => setDescInput(e.target.value)} value={descInput} type="text" placeholder='Write a good story' />

                <button className='py-3 px-6 bg-[#ff3694] text-white font-medium rounded-md' type="submit">Publish</button>
            </form>

        </div>
    )
}

export default CreateBlog