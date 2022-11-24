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
    const { url } = UserBlog()
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
            time: joind(),
            UserImage: url,
        })
     
        const UserArr = doc(db, 'users', `${user?.email}`)
            await updateDoc(UserArr, {
                blogdetails: arrayUnion({
                    title: titleinput,
                    desc: input,
                    userid: user?.email,
                    img: img,
                    time: joind(),
                    uuid: uuidv4(),
                    UserImage: url
                })
            })
    
        setImg('')
        setInput('')
        setTitleInput('')
    }

    console.log(uuidv4());




    return (
        <div>

            <form onSubmit={createBlog} className='flex flex-col w-[50vh]'>
                <input required className='py-2 px-10  border border-black' onChange={(e) => setImg(e.target.value)} value={img} type="text" placeholder='img Link' />
                <input required className='py-2 px-10  border border-black' onChange={(e) => setTitleInput(e.target.value)} value={titleinput} type="text" placeholder='title' />
                <textarea required className='p-10 h-[40vh] border border-black' onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='desc' />
                <button className='py-2 px-5 bg-[#ff3694] text-white font-medium' type="submit">Publish</button>
            </form>

        </div>
    )
}

export default CreateBlog