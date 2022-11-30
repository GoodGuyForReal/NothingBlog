import React, { useState } from 'react'
import { UserAuth } from '../../context/AuthContext.js'
import { db } from '../../Firebase'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { UserBlog } from '../../context/BlogContext.js';

const CreateBlog = () => {

    const [input, setInput] = useState('')
    const [titleinput, setTitleInput] = useState('')
    const [img, setImg] = useState([''])


    console.log(input);
    const { url, userInfo } = UserBlog()
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
    // Create Blog
    const createBlog = async (e) => {
        e.preventDefault(e);

        if (input === '' || titleinput === '' || img === '') {
            alert('Please fill the all fields')
            return;
        }
        await addDoc(collection(db, 'Blogs'), {
            title: titleinput,
            desc: input,
            userid: user?.email,
            img: img,
            displayname: userInfo?.displayName,
            time: joind(),
            userimage: userInfo?.userimage,
            joinedDate : userInfo?.joinedDate,
            uuid: uuidv4(),
        })

        const UserArr = doc(db, 'usersinfo', `${user?.email}`)
        await updateDoc(UserArr, {
            blogdetails: arrayUnion({
                title: titleinput,
                desc: input,
                userid: user?.email,
                displayname: userInfo?.displayName,
                img: img,
                time: joind(),
                uuid: uuidv4(),
                userimage: userInfo?.userimage
            })
        })

        setImg('')
        setInput('')
        setTitleInput('')
    }

    console.log(uuidv4());




    return (
        <div>
            <form onSubmit={createBlog} className='flex flex-col w-full gap-5'>
                <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' onChange={(e) => setImg(e.target.value)} value={img} type="text" placeholder='img Link' />
                <input required className='py-3 px-3  border border-[#848484] rounded-md text-[18px]' onChange={(e) => setTitleInput(e.target.value)} value={titleinput} type="text" placeholder='Give a good title' />
                <textarea required className='p-3 h-[40vh] border border-[#848484] rounded-md text-[18px]' onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Write a good story' />
                <button className='py-3 px-6 bg-[#ff3694] text-white font-medium rounded-md' type="submit">Publish</button>
            </form>
        </div>
    )
}

export default CreateBlog