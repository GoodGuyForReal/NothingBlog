import React, { useState } from 'react'
import { UserAuth } from '../../context/AuthContext.js'
import { db } from '../../Firebase'
import { addDoc, collection } from 'firebase/firestore'

const CreateBlog = () => {

    const [input, setInput] = useState('')
    const [titleinput, setTitleInput] = useState('')
    const [img, setImg] = useState([''])


    console.log(input);

    const { user } = UserAuth()
    console.log(user);

    //Time 
    const time = new Date()
    console.log(time.getTime())
    console.log(time)

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
        })
        setImg('')
        setInput('')
        setTitleInput('')
    }

    // const userBlog = blogs.filter((user) => {
    //     return user.userid === 'tarik'
    // })
    // console.log(userBlog)
    // console.log(blogs);

    // Read the blog from firebase 



    // Delete Blogs




    return (
        <div>

            <form onSubmit={createBlog} className='flex flex-col w-[50vh]'>
                <input className='py-2 px-10  border border-black' onChange={(e) => setImg(e.target.value)} value={img} type="text" placeholder='img Link' />
                <input className='py-2 px-10  border border-black' onChange={(e) => setTitleInput(e.target.value)} value={titleinput} type="text" placeholder='title' />
                <textarea className='p-10 h-[40vh] border border-black' onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='desc' />
                <button className='py-2 px-5 bg-[#ff3694] text-white font-medium' type="submit">Publish</button>
            </form>




        </div>
    )
}

export default CreateBlog