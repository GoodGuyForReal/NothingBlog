import React, { useState } from 'react'
import { UserAuth } from '../../context/AuthContext.js'
import { db } from '../../Firebase'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { UserBlog } from '../../context/BlogContext.js';
import CloseIcon from '../assets/CloseIcon.jsx';
import TextEditor from '../TextEditor.jsx';

const CreateBlog = () => {

    const [descInput, setDescInput] = useState('')
    const [titleInput, setTitleInput] = useState('')
    const [img, setImg] = useState([''])
    const [genre, setGenre] = useState('')


    console.log(descInput);
    const { userInfo } = UserBlog()
    const { user } = UserAuth()
    console.log(user);

    //Time 
    const joind = (e) => {
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const d = new Date();
        const monthtime = month[d.getMonth()];
        const year = d.getFullYear();
        const day = d.getDate();
        return `${monthtime}, ${day}, ${year}`
    }

    const resetInputFields = () => {
        setGenre('')
        setImg('')
        setDescInput('')
        setTitleInput('')
    }

    // Create Blog
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

        //!@Users SAVE TEST PROCCECC
        const blogData = {
            userBlogs: arrayUnion({
                userId: userInfo.email,
                id : docRef?.id
            })
        }
        const blogReference = doc(db, 'users', `${user?.email}`)
        await updateDoc(blogReference, blogData)



        // const blogIdData = {
        //     blogId: docRef?.id,
        //     userId: userInfo.uuid,
        // }
        // const blogIdReference = collection(db, "discoverBlogs")
        // await addDoc(blogIdReference, blogIdData)

        resetInputFields()
    }

    return (
        <div>
            {genre.trim() === '' ? null
                : <p onClick={() => setGenre('')} className='py-2 mt-5 px-3 flex gap-4 items-center rounded-full duration-200 hover:bg-[#fe39a29b] bg-[#fe39a2b6] text-[#ffffff] font-medium max-w-max text-[14px] cursor-pointer'>{genre} <CloseIcon /></p>}
            <div className='filterCell flex flex-wrap gap-3 w-full justify-center mb-5'>
                <button onClick={() => setGenre('Life')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Life</button>
                <button onClick={() => setGenre('Politic')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Politic</button>
                <button onClick={() => setGenre('Technology')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Technology</button>
                <button onClick={() => setGenre('Relationships')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Relationships</button>
                <button onClick={() => setGenre('Space')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Space</button>
                <button onClick={() => setGenre('Sport')} className='py-2 px-6 text-[14px] duration-300 hover:bg-[#fe39a2] hover:border-[#fe39a2] hover:text-white text-[#fe39a2] border border-[#fe39a2] rounded-full'>Sport</button>
            </div>
            <form onSubmit={createBlog} className='flex flex-col w-full gap-5'>
                <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' onChange={(e) => setImg(e.target.value)} value={img} type="text" placeholder='img Link' />
                <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' onChange={(e) => setTitleInput(e.target.value)} value={titleInput} type="text" placeholder='Give a good title' />
                <textarea required className='p-3 h-[70vh] border border-[#848484] rounded-md text-[18px]' onChange={(e) => setDescInput(e.target.value)} value={descInput} type="text" placeholder='Write a good story' />

                <button className='py-3 px-6 bg-[#ff3694] text-white font-medium rounded-md' type="submit">Publish</button>
            </form>

            <TextEditor />

        </div>
    )
}

export default CreateBlog