import { async } from '@firebase/util'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { UserBlog } from '../../context/BlogContext'
import { db } from '../../Firebase'
import PPdefult from '../assets/PPdefult'


const SignUp = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verify, setVerify] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const { SignUp } = UserAuth()

    //Joined Day
    const joind = (e) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        const monthtime = month[d.getMonth()];
        const year = d.getFullYear();
        const day = d.getDate();
        return `${monthtime}, ${day}, ${year}`
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()

        if (password !== verify) {
            return setError('Passwords do not match');
        }

        try {
            await SignUp(email, password, verify)

            await setDoc(doc(db, 'usersinfo', email), {
                displayName,
                email,
                joinedDate: joind(),
                userimage: 'https://firebasestorage.googleapis.com/v0/b/nothingblog-94410.appspot.com/o/ppimage%2Fblank-profile-picture-973460__480.webp?alt=media&token=aa9a4fb7-4d32-4157-80e2-48050cff82df',
                insagram: '',
                linkedin: '',
                github: '',
                snapchat: ''
            })

            navigate('/');
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
        }
    }




    return (
        <div className='h-[100vh] w-full bg-black'>

            <div className='SignUpPage items-center justify-center h-[100vh]'>

                <div className='h-full w-full flex flex-col items-center justify-center ' >
                    <div className='SignUpleftbody flex flex-col gap-10'>
                        <div className='text-left'>
                            <h1 className='text-white font-medium text-[38px]'>Welcome</h1>
                            <p className='text-[#fff7] text-[15px]'>Welcome please enter your deatil</p>
                            {error && <p className='bg-white text-[15px] rounded-md mt-5 duration-300 ease-out text-black p-3'>{error}</p>}
                        </div>
                        <form className='flex flex-col gap-5 text-center'>
                            <input onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder='User Name' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                            <input onChange={(e) => setVerify(e.target.value)} type="password" placeholder='Verify your password' className='p-3 bg-black border rounded-md border-[#fff7] w-[50vh] text-white' />
                            <button onClick={HandleSubmit} className='bg-white text-black py-3 hover:duration-300 hover:bg-[#dedede]'>Sign Up</button>
                            <Link className='text-white underline hover:duration-300 hover:text-[#c1c1c1]' to={'/SignIn'}>Do you have an account</Link>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SignUp